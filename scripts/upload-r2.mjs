/**
 * Zero-dependency resumable uploader for Cloudflare R2 (S3-compatible SigV4).
 *
 * Usage:
 *   node scripts/upload-r2.mjs --dry-run
 *   R2_ACCOUNT_ID=... R2_ACCESS_KEY_ID=... R2_SECRET_ACCESS_KEY=... R2_BUCKET_NAME=... node scripts/upload-r2.mjs
 *
 * Or place credentials in a gitignored `.env.r2` file in the project root.
 */

import crypto from "crypto";
import fs from "fs";
import path from "path";

const SOURCE_DIR = path.resolve("NCTB_Primary_Collection_Web");
const EMPTY_SHA256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

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
    "",
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
  const headers = signR2Request({
    method: "HEAD",
    host,
    canonicalUri,
    payloadHash: EMPTY_SHA256,
    ...creds,
  });

  const res = await fetch(`https://${host}${canonicalUri}`, { method: "HEAD", headers });
  if (!res.ok) return false;
  const remoteSize = Number(res.headers.get("content-length") || "0");
  return remoteSize === expectedSize;
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

  const fileBuffer = fs.readFileSync(item.fullPath);
  const payloadHash = sha256Hex(fileBuffer);
  const headers = signR2Request({
    method: "PUT",
    host,
    canonicalUri,
    payloadHash,
    ...creds,
    extraHeaders: {
      "content-type": "application/pdf",
      "content-disposition": "inline",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });

  const res = await fetch(`https://${host}${canonicalUri}`, {
    method: "PUT",
    headers: {
      ...headers,
      "content-length": String(fileBuffer.byteLength),
    },
    body: fileBuffer,
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} uploading ${item.key}: ${errText.slice(0, 200)}`);
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
