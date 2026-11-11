/**
 * Zero-dependency resumable Cloudflare R2 uploader (S3-compatible SigV4).
 * Uses native Node `https.request` (isolated sockets) with automatic retries
 * and 8 MiB S3 Multipart Upload for large PDFs so transient broadband drops never restart from zero.
 *
 * Usage:
 *   node scripts/upload-r2.mjs --dry-run
 *   node scripts/upload-r2.mjs
 */

import crypto from "crypto";
import fs from "fs";
import https from "https";
import path from "path";

const SOURCE_DIR = path.resolve("NCTB_Primary_Collection_Web");
const EMPTY_SHA256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
const PART_SIZE = 8 * 1024 * 1024; // 8 MiB (above S3/R2 5 MiB minimum part size)
const MULTIPART_THRESHOLD = 10 * 1024 * 1024;
const MAX_RETRIES = 5;
const SOCKET_IDLE_TIMEOUT_MS = 120_000;

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const val = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

function encodeRfc3986(value) {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (ch) => `%${ch.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

function encodeCanonicalPath(bucket, key) {
  const segments = key.split("/").map(encodeRfc3986);
  return `/${encodeRfc3986(bucket)}/${segments.join("/")}`;
}

function buildCanonicalQueryString(queryParams = {}) {
  const entries = Object.entries(queryParams);
  if (entries.length === 0) return "";
  return entries
    .map(([k, v]) => [encodeRfc3986(k), encodeRfc3986(v ?? "")])
    .sort((a, b) => (a[0] === b[0] ? a[1].localeCompare(b[1]) : a[0].localeCompare(b[0])))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
}

function hmac(key, data) {
  return crypto.createHmac("sha256", key).update(data).digest();
}

function sha256Hex(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function signR2Request({
  method,
  host,
  canonicalUri,
  canonicalQueryString,
  payloadHash,
  accessKeyId,
  secretAccessKey,
  extraHeaders = {},
}) {
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const region = "auto";
  const service = "s3";

  const headersToSign = {
    host,
    "x-amz-content-sha256": payloadHash,
    "x-amz-date": amzDate,
    ...extraHeaders,
  };

  const sortedNames = Object.keys(headersToSign)
    .map((k) => k.toLowerCase())
    .sort();

  const canonicalHeaders = sortedNames
    .map((name) => {
      const originalKey = Object.keys(headersToSign).find((k) => k.toLowerCase() === name);
      return `${name}:${String(headersToSign[originalKey]).trim()}\n`;
    })
    .join("");

  const signedHeaders = sortedNames.join(";");
  const canonicalRequest = [
    method,
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join("\n");

  const kDate = hmac(`AWS4${secretAccessKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  const kSigning = hmac(kService, "aws4_request");
  const signature = crypto.createHmac("sha256", kSigning).update(stringToSign).digest("hex");

  return {
    ...headersToSign,
    Authorization: `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
  };
}

function sendSignedRequest({
  method,
  host,
  canonicalUri,
  queryParams,
  body,
  creds,
  extraHeaders = {},
}) {
  const payload = body ? (Buffer.isBuffer(body) ? body : Buffer.from(body, "utf8")) : null;
  const payloadHash = payload ? sha256Hex(payload) : EMPTY_SHA256;
  const canonicalQueryString = buildCanonicalQueryString(queryParams);
  const fullPath = canonicalQueryString ? `${canonicalUri}?${canonicalQueryString}` : canonicalUri;

  const headers = signR2Request({
    method,
    host,
    canonicalUri,
    canonicalQueryString,
    payloadHash,
    ...creds,
    extraHeaders: {
      ...(payload ? { "content-length": String(payload.byteLength) } : {}),
      ...extraHeaders,
    },
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: host,
        port: 443,
        path: fullPath,
        method,
        headers,
        agent: false, // Dedicated socket prevents pooled keep-alive ECONNRESET drops
        timeout: SOCKET_IDLE_TIMEOUT_MS,
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          resolve({
            status: res.statusCode || 0,
            headers: res.headers,
            text: Buffer.concat(chunks).toString("utf8"),
          });
        });
      }
    );

    req.on("timeout", () => {
      req.destroy(new Error(`Socket idle timeout (${SOCKET_IDLE_TIMEOUT_MS}ms) on ${method} ${fullPath}`));
    });
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function withRetries(label, fn) {
  let lastErr;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt === MAX_RETRIES) break;
      const delayMs = 1500 * Math.pow(2, attempt - 1);
      console.warn(`   ↻ Retry ${attempt}/${MAX_RETRIES - 1} for ${label} after error: ${err.message} (waiting ${delayMs}ms)`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw lastErr;
}

function collectPdfFiles(rootDir) {
  const results = [];
  function walk(currentDir) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.toLowerCase().endsWith(".pdf")) {
        const key = path.relative(rootDir, fullPath).replace(/\\/g, "/");
        results.push({ fullPath, key, size: fs.statSync(fullPath).size });
      }
    }
  }
  walk(rootDir);
  return results.sort((a, b) => a.key.localeCompare(b.key));
}

async function checkRemoteExists({ host, canonicalUri, creds, expectedSize }) {
  const res = await withRetries("HEAD", () =>
    sendSignedRequest({
      method: "HEAD",
      host,
      canonicalUri,
      creds,
    })
  );
  if (res.status < 200 || res.status >= 300) return false;
  const remoteSize = Number(res.headers["content-length"] || "0");
  return remoteSize === expectedSize;
}

async function uploadSinglePut({ item, host, canonicalUri, creds }) {
  const fileBuffer = fs.readFileSync(item.fullPath);
  const res = await withRetries(item.key, () =>
    sendSignedRequest({
      method: "PUT",
      host,
      canonicalUri,
      body: fileBuffer,
      creds,
      extraHeaders: {
        "content-type": "application/pdf",
        "content-disposition": "inline",
        "cache-control": "public, max-age=31536000, immutable",
      },
    })
  );

  if (res.status < 200 || res.status >= 300) {
    throw new Error(`HTTP ${res.status} PUT ${item.key}: ${res.text.slice(0, 200)}`);
  }
}

async function uploadMultipart({ item, host, canonicalUri, creds }) {
  const initRes = await withRetries(`init ${item.key}`, () =>
    sendSignedRequest({
      method: "POST",
      host,
      canonicalUri,
      queryParams: { uploads: "" },
      creds,
      extraHeaders: {
        "content-type": "application/pdf",
        "content-disposition": "inline",
        "cache-control": "public, max-age=31536000, immutable",
      },
    })
  );

  if (initRes.status < 200 || initRes.status >= 300) {
    throw new Error(`HTTP ${initRes.status} CreateMultipartUpload ${item.key}: ${initRes.text.slice(0, 200)}`);
  }

  const uploadIdMatch = initRes.text.match(/<UploadId>([^<]+)<\/UploadId>/);
  if (!uploadIdMatch) {
    throw new Error(`Missing UploadId in response: ${initRes.text.slice(0, 200)}`);
  }
  const uploadId = uploadIdMatch[1];

  const totalParts = Math.ceil(item.size / PART_SIZE);
  const completedParts = [];
  const fd = fs.openSync(item.fullPath, "r");

  try {
    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      const start = (partNumber - 1) * PART_SIZE;
      const length = Math.min(PART_SIZE, item.size - start);
      const partBuf = Buffer.allocUnsafe(length);
      fs.readSync(fd, partBuf, 0, length, start);

      const partRes = await withRetries(`${item.key} part ${partNumber}/${totalParts}`, async () => {
        const r = await sendSignedRequest({
          method: "PUT",
          host,
          canonicalUri,
          queryParams: { partNumber: String(partNumber), uploadId },
          body: partBuf,
          creds,
        });
        if (r.status < 200 || r.status >= 300) {
          throw new Error(`HTTP ${r.status} UploadPart ${partNumber}: ${r.text.slice(0, 200)}`);
        }
        return r;
      });

      const rawEtag = String(partRes.headers.etag || "").trim();
      if (!rawEtag) {
        throw new Error(`Missing ETag for part ${partNumber} of ${item.key}`);
      }
      const normalizedEtag = rawEtag.startsWith('"') ? rawEtag : `"${rawEtag}"`;
      completedParts.push({ partNumber, etag: normalizedEtag });
      process.stdout.write(`   📦 part ${partNumber}/${totalParts} (${(length / 1024 / 1024).toFixed(1)} MB) ok\n`);
    }

    const partsXml = completedParts
      .map((p) => `<Part><PartNumber>${p.partNumber}</PartNumber><ETag>${p.etag}</ETag></Part>`)
      .join("");
    const completeXml = `<CompleteMultipartUpload>${partsXml}</CompleteMultipartUpload>`;

    const completeRes = await withRetries(`complete ${item.key}`, () =>
      sendSignedRequest({
        method: "POST",
        host,
        canonicalUri,
        queryParams: { uploadId },
        body: completeXml,
        creds,
        extraHeaders: { "content-type": "application/xml" },
      })
    );

    if (completeRes.status < 200 || completeRes.status >= 300 || completeRes.text.includes("<Error>")) {
      throw new Error(`CompleteMultipartUpload failed (${completeRes.status}): ${completeRes.text.slice(0, 300)}`);
    }
  } catch (err) {
    // Cleanup incomplete multipart upload so R2 doesn't retain orphan parts
    await sendSignedRequest({
      method: "DELETE",
      host,
      canonicalUri,
      queryParams: { uploadId },
      creds,
    }).catch(() => undefined);
    throw err;
  } finally {
    fs.closeSync(fd);
  }
}

async function uploadSingleFile({ item, host, bucket, creds }) {
  const canonicalUri = encodeCanonicalPath(bucket, item.key);
  const alreadyUploaded = await checkRemoteExists({
    host,
    canonicalUri,
    creds,
    expectedSize: item.size,
  });

  if (alreadyUploaded) {
    return { status: "skipped" };
  }

  if (item.size >= MULTIPART_THRESHOLD) {
    await uploadMultipart({ item, host, canonicalUri, creds });
  } else {
    await uploadSinglePut({ item, host, canonicalUri, creds });
  }

  return { status: "uploaded" };
}

async function main() {
  loadEnvFile(path.resolve(".env.r2"));

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source PDF folder not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  const files = collectPdfFiles(SOURCE_DIR);
  const totalMB = (files.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024)).toFixed(1);
  const isDryRun = process.argv.includes("--dry-run");

  console.log(`📚 Found ${files.length} PDF files (${totalMB} MB) in ${SOURCE_DIR}`);

  if (isDryRun) {
    files.slice(0, 10).forEach((f, idx) => {
      console.log(`  [${idx + 1}/${files.length}] ${f.key} (${(f.size / 1024 / 1024).toFixed(1)} MB)`);
    });
    console.log("✅ Dry run complete.");
    return;
  }

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET_NAME || "pathshala-books";

  if (!accountId || !accessKeyId || !secretAccessKey) {
    console.error(
      "❌ Missing R2 credentials. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY (and optional R2_BUCKET_NAME) in .env.r2 or environment."
    );
    process.exit(1);
  }

  const host = `${accountId}.r2.cloudflarestorage.com`;
  const creds = { accessKeyId, secretAccessKey };
  let uploaded = 0;
  let skipped = 0;

  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    const sizeMB = (item.size / (1024 * 1024)).toFixed(1);
    const result = await uploadSingleFile({ item, host, bucket, creds });
    if (result.status === "skipped") {
      skipped++;
      console.log(`⏭️  [${i + 1}/${files.length}] Skipped (already exists): ${item.key}`);
    } else {
      uploaded++;
      console.log(`✅ [${i + 1}/${files.length}] Uploaded (${sizeMB} MB): ${item.key}`);
    }
  }

  console.log(`\n🎉 Finished! Uploaded: ${uploaded}, Skipped: ${skipped}, Total: ${files.length}`);
}

main().catch((err) => {
  console.error("❌ Upload failed:", err);
  process.exit(1);
});
