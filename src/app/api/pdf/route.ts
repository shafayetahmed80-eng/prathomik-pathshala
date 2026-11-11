import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  CLASS_FOLDER_MAP,
  encodePdfObjectKey,
  normalizeCdnBaseUrl,
  resolvePdfObjectKey,
  type PdfResourceType,
} from "@/data/pdfManifest";

const SUBJECT_VARIANTS: Record<string, string[]> = {
  english: ["english", "ইংরেজি"],
  গণিত: ["গণিত", "math"],
  বাংলা: ["বাংলা", "bangla"],
  বিজ্ঞান: ["বিজ্ঞান", "science"],
  সমাজ: ["সমাজ", "বাংলাদেশ ও বিশ্বপরিচয়", "সামাজিক বিজ্ঞান", "পরিবেশ পরিচিতি"],
  ইসলাম: ["ইসলাম"],
  হিন্দু: ["হিন্দু"],
  বৌদ্ধ: ["বৌদ্ধ"],
  খ্রিষ্ট: ["খ্রিষ্ট", "খ্রিস্ট"],
  শিল্পকলা: ["শিল্পকলা"],
  স্বাস্থ্য: ["স্বাস্থ্য", "শারীরিক"],
};

function getCollectionRoots(): string[] {
  const localProjectDir = path.join(process.cwd(), "NCTB_Primary_Collection_Web");
  const roots: string[] = [];

  if (process.env.NCTB_COLLECTION_DIR) roots.push(process.env.NCTB_COLLECTION_DIR);
  if (process.env.NCTB_WEB_COLLECTION_DIR) roots.push(process.env.NCTB_WEB_COLLECTION_DIR);

  roots.push(localProjectDir);
  roots.push(["D:", "NCTB_Primary_Collection_Web"].join(path.sep));
  roots.push(["D:", "NCTB_Primary_Collection"].join(path.sep));

  return roots;
}

function getCdnBaseUrl(): string | null {
  return normalizeCdnBaseUrl(
    process.env.NCTB_PDF_CDN_URL ||
      process.env.NCTB_PDF_BASE_URL ||
      process.env.NEXT_PUBLIC_PDF_CDN_URL
  );
}

interface ParsedPdfQuery {
  classId: string;
  type: PdfResourceType;
  fileName: string;
  download: boolean;
  proxy: boolean;
}

function parsePdfQuery(request: NextRequest): ParsedPdfQuery | null {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("class");
  const typeParam = searchParams.get("type");
  const fileName = searchParams.get("file");

  if (!classId || !typeParam || !fileName) return null;
  const type: PdfResourceType =
    typeParam === "teachers_guide" ? "teachers_guide" : "textbook";
  const download = searchParams.get("download") === "1";
  const proxy = searchParams.get("proxy") === "1";

  return { classId, type, fileName, download, proxy };
}

function buildContentDisposition(
  dispositionType: "inline" | "attachment",
  fileName: string
): string {
  const safeBase = path.basename(fileName).replace(/["\r\n]/g, "");
  const fullPdfName = safeBase.toLowerCase().endsWith(".pdf") ? safeBase : `${safeBase}.pdf`;
  const encoded = encodeURIComponent(fullPdfName);
  const asciiSlug =
    fullPdfName
      .replace(/\.pdf$/i, "")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "nctb-book";
  return `${dispositionType}; filename="${asciiSlug}.pdf"; filename*=UTF-8''${encoded}`;
}

function parseByteRange(
  rangeHeader: string,
  fileSize: number
): { start: number; end: number } | null {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(rangeHeader.trim());
  if (!match) return null;
  const [, rawStart, rawEnd] = match;
  if (!rawStart && !rawEnd) return null;

  let start: number;
  let end: number;
  if (!rawStart) {
    const suffixLen = Number(rawEnd);
    if (!Number.isFinite(suffixLen) || suffixLen <= 0) return null;
    start = Math.max(0, fileSize - suffixLen);
    end = fileSize - 1;
  } else {
    start = Number(rawStart);
    end = rawEnd ? Number(rawEnd) : fileSize - 1;
  }

  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    start < 0 ||
    start >= fileSize ||
    end < start
  ) {
    return null;
  }

  return { start, end: Math.min(end, fileSize - 1) };
}

function createNodeFileWebStream(
  filePath: string,
  options?: { start?: number; end?: number }
): ReadableStream<Uint8Array> {
  let fileStream: fs.ReadStream | null = null;
  return new ReadableStream({
    start(controller) {
      fileStream = fs.createReadStream(/*turbopackIgnore: true*/ filePath, options);
      fileStream.on("data", (chunk) => {
        controller.enqueue(
          typeof chunk === "string" ? Buffer.from(chunk) : new Uint8Array(chunk)
        );
      });
      fileStream.on("end", () => controller.close());
      fileStream.on("error", (err) => controller.error(err));
    },
    cancel() {
      try {
        fileStream?.destroy();
      } catch {}
    },
  });
}

function resolveLocalPdfPath(query: ParsedPdfQuery): string | null {
  const baseDirs = getCollectionRoots();
  const folderName = CLASS_FOLDER_MAP[query.classId] || path.basename(query.classId);
  const subFolder = query.type === "textbook" ? "পাঠ্যবই" : "শিক্ষক সহায়িকা";
  const safeFileName = path.basename(query.fileName);
  const fullFileName = safeFileName.endsWith(".pdf") ? safeFileName : `${safeFileName}.pdf`;

  for (const baseDir of baseDirs) {
    const targetDir = path.join(/*turbopackIgnore: true*/ baseDir, folderName, subFolder);
    const candidatePath = path.join(/*turbopackIgnore: true*/ targetDir, fullFileName);

    if (fs.existsSync(/*turbopackIgnore: true*/ candidatePath)) {
      return candidatePath;
    }

    if (!fs.existsSync(/*turbopackIgnore: true*/ targetDir)) continue;

    try {
      const files = fs.readdirSync(/*turbopackIgnore: true*/ targetDir);
      const cleanSearch = safeFileName.replace(".pdf", "").trim();
      let match = files.find(
        (f) => f.includes(cleanSearch) || cleanSearch.includes(f.replace(".pdf", ""))
      );

      if (!match) {
        const keyword = cleanSearch
          .replace(/শিক্ষক\s*সহায়িকা|Teacher'?s\s*Guide/gi, "")
          .trim()
          .toLowerCase();
        if (keyword) {
          match = files.find((f) => {
            const lowerF = f.toLowerCase();
            return lowerF.includes(keyword) || keyword.includes(lowerF.replace(".pdf", ""));
          });
        }
      }

      if (!match) {
        const lowerSearch = cleanSearch.toLowerCase();
        for (const variants of Object.values(SUBJECT_VARIANTS)) {
          if (variants.some((v) => lowerSearch.includes(v))) {
            match = files.find((f) => variants.some((v) => f.toLowerCase().includes(v)));
            if (match) break;
          }
        }
      }

      if (match) {
        return path.join(/*turbopackIgnore: true*/ targetDir, match);
      }
    } catch {
      // Fallback gracefully if directory read fails
    }
  }

  return null;
}

function buildCdnPdfUrl(query: ParsedPdfQuery): { cdnUrl: string | null; objectKey: string } {
  const objectKey = resolvePdfObjectKey(query.classId, query.type, query.fileName);
  const cdnBase = getCdnBaseUrl();
  if (!cdnBase) return { cdnUrl: null, objectKey };
  return {
    cdnUrl: `${cdnBase}/${encodePdfObjectKey(objectKey)}`,
    objectKey,
  };
}

function notFoundResponse(code: string, objectKey: string, isHead = false): NextResponse {
  const headers = {
    "X-PDF-Error-Code": code,
    "Cache-Control": "no-store",
  };
  if (isHead) {
    return new NextResponse(null, { status: 404, headers });
  }
  return NextResponse.json(
    {
      error: code === "PDF_STORAGE_NOT_CONFIGURED"
        ? "PDF storage or CDN is not configured on this server yet."
        : "File not found on storage or CDN.",
      code,
      objectKey,
    },
    { status: 404, headers }
  );
}

/**
 * Checks PDF availability locally first, then via server-side HEAD against Cloudflare R2 CDN,
 * returning structured `X-PDF-Error-Code` headers without browser CORS errors.
 */
export async function HEAD(request: NextRequest) {
  const query = parsePdfQuery(request);
  if (!query) {
    return new NextResponse(null, { status: 400 });
  }

  const localPath = resolveLocalPdfPath(query);
  if (localPath && fs.existsSync(/*turbopackIgnore: true*/ localPath)) {
    const stat = fs.statSync(/*turbopackIgnore: true*/ localPath);
    const sizeStr = stat.size.toString();
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": sizeStr,
        "X-PDF-Size": sizeStr,
        "Accept-Ranges": "bytes",
        "X-PDF-Source": "local",
        "Cache-Control": "no-store",
      },
    });
  }

  const { cdnUrl, objectKey } = buildCdnPdfUrl(query);
  if (!cdnUrl) {
    return notFoundResponse("PDF_STORAGE_NOT_CONFIGURED", objectKey, true);
  }

  try {
    const upstream = await fetch(cdnUrl, {
      method: "HEAD",
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (upstream.ok) {
      const len = upstream.headers.get("content-length");
      return new NextResponse(null, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          ...(len ? { "Content-Length": len, "X-PDF-Size": len } : {}),
          "Accept-Ranges": "bytes",
          "X-PDF-Source": "cloudflare-r2",
          "Cache-Control": "no-store",
        },
      });
    }
    return notFoundResponse("CDN_FILE_MISSING", objectKey, true);
  } catch {
    return new NextResponse(null, {
      status: 502,
      headers: { "X-PDF-Error-Code": "CDN_UNREACHABLE" },
    });
  }
}

/**
 * Serves PDFs from local collection when present (supporting HTTP 206 byte-ranges),
 * redirects directly (`307`) to Cloudflare R2 / CDN with zero Node.js memory load,
 * or streams byte-range chunks cleanly (`?proxy=1`) when cross-origin R2 CORS isn't yet enabled.
 */
export async function GET(request: NextRequest) {
  const query = parsePdfQuery(request);
  if (!query) {
    return NextResponse.json(
      { error: "Missing parameters (class, type, file)" },
      { status: 400 }
    );
  }

  const dispositionType = query.download ? "attachment" : "inline";
  const range = request.headers.get("range");
  const localPath = resolveLocalPdfPath(query);

  if (!localPath || !fs.existsSync(/*turbopackIgnore: true*/ localPath)) {
    const { cdnUrl, objectKey } = buildCdnPdfUrl(query);
    if (!cdnUrl) {
      return notFoundResponse("PDF_STORAGE_NOT_CONFIGURED", objectKey, false);
    }

    if (!query.proxy) {
      return NextResponse.redirect(cdnUrl, {
        status: 307,
        headers: {
          "Cache-Control": "no-store",
          "X-PDF-Source": "cloudflare-r2",
        },
      });
    }

    // Streaming Range-chunk proxy fallback for client PDF.js when R2 CORS isn't configured
    try {
      const upstream = await fetch(cdnUrl, {
        headers: range ? { Range: range } : undefined,
        cache: "no-store",
        signal: request.signal,
      });

      if (upstream.status === 404) {
        return notFoundResponse("CDN_FILE_MISSING", objectKey, false);
      }

      if (!upstream.ok && upstream.status !== 206) {
        const resHeaders: Record<string, string> = {
          "X-PDF-Source": "cloudflare-r2-proxy",
          "Cache-Control": "no-store",
        };
        const contentRange = upstream.headers.get("content-range");
        if (contentRange) resHeaders["Content-Range"] = contentRange;
        return new NextResponse(null, { status: upstream.status, headers: resHeaders });
      }

      const headers: Record<string, string> = {
        "Content-Type": upstream.headers.get("content-type") || "application/pdf",
        "Accept-Ranges": upstream.headers.get("accept-ranges") || "bytes",
        "Content-Disposition": buildContentDisposition(dispositionType, query.fileName),
        "Cache-Control": "public, max-age=3600",
        "X-PDF-Source": "cloudflare-r2-proxy",
      };

      const contentLength = upstream.headers.get("content-length");
      const contentRange = upstream.headers.get("content-range");
      if (contentLength) headers["Content-Length"] = contentLength;
      if (contentRange) headers["Content-Range"] = contentRange;

      return new NextResponse(upstream.body, {
        status: upstream.status,
        headers,
      });
    } catch {
      return NextResponse.json(
        { error: "Unable to stream PDF from CDN.", code: "CDN_UNREACHABLE" },
        { status: 502, headers: { "X-PDF-Error-Code": "CDN_UNREACHABLE" } }
      );
    }
  }

  const contentDisposition = buildContentDisposition(
    dispositionType,
    path.basename(localPath)
  );

  try {
    const stat = fs.statSync(/*turbopackIgnore: true*/ localPath);
    const fileSize = stat.size;

    if (range) {
      const parsedRange = parseByteRange(range, fileSize);
      if (!parsedRange) {
        return new NextResponse(null, {
          status: 416,
          headers: { "Content-Range": `bytes */${fileSize}` },
        });
      }

      const { start, end } = parsedRange;
      const chunksize = end - start + 1;
      const stream = createNodeFileWebStream(localPath, { start, end });

      return new NextResponse(stream, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize.toString(),
          "Content-Type": "application/pdf",
          "Content-Disposition": contentDisposition,
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    const stream = createNodeFileWebStream(localPath);
    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Length": fileSize.toString(),
        "Content-Type": "application/pdf",
        "Content-Disposition": contentDisposition,
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error streaming file";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
