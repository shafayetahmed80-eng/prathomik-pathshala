import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CLASS_FOLDER_MAP: Record<string, string> = {
  "pre-primary": "Pre_Primary",
  "class-1": "Class_1",
  "class-2": "Class_2",
  "class-3": "Class_3",
  "class-4": "Class_4",
  "class-5": "Class_5",
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("class");
  const type = searchParams.get("type"); // "textbook" or "teachers_guide"
  const fileName = searchParams.get("file");

  if (!classId || !type || !fileName) {
    return NextResponse.json({ error: "Missing parameters (class, type, file)" }, { status: 400 });
  }

  const baseDirs = getCollectionRoots();
  const folderName = CLASS_FOLDER_MAP[classId] || classId;
  const subFolder = type === "textbook" ? "পাঠ্যবই" : "শিক্ষক সহায়িকা";

  // Prevent path traversal
  const safeFileName = path.basename(fileName);
  const fullFileName = safeFileName.endsWith(".pdf") ? safeFileName : `${safeFileName}.pdf`;
  
  let targetPath = "";

  // Check Web-Optimized directory first, then fallback to original directory
  for (const baseDir of baseDirs) {
    const targetDir = path.join(/*turbopackIgnore: true*/ baseDir, folderName, subFolder);
    const candidatePath = path.join(/*turbopackIgnore: true*/ targetDir, fullFileName);

    if (fs.existsSync(/*turbopackIgnore: true*/ candidatePath)) {
      targetPath = candidatePath;
      break;
    }

    // Fuzzy match in directory
    if (fs.existsSync(/*turbopackIgnore: true*/ targetDir)) {
      try {
        const files = fs.readdirSync(/*turbopackIgnore: true*/ targetDir);
        const cleanSearch = safeFileName.replace(".pdf", "").trim();
        let match = files.find((f) => f.includes(cleanSearch) || cleanSearch.includes(f.replace(".pdf", "")));

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
          const subjectMap: Record<string, string[]> = {
            "english": ["english", "ইংরেজি"],
            "গণিত": ["গণিত", "math"],
            "বাংলা": ["বাংলা", "bangla"],
            "বিজ্ঞান": ["বিজ্ঞান", "science"],
            "সমাজ": ["সমাজ", "বাংলাদেশ ও বিশ্বপরিচয়", "সামাজিক বিজ্ঞান", "পরিবেশ পরিচিতি"],
            "ইসলাম": ["ইসলাম"],
            "হিন্দু": ["হিন্দু"],
            "বৌদ্ধ": ["বৌদ্ধ"],
            "খ্রিষ্ট": ["খ্রিষ্ট", "খ্রিস্ট"],
            "শিল্পকলা": ["শিল্পকলা"],
            "স্বাস্থ্য": ["স্বাস্থ্য", "শারীরিক"]
          };
          for (const variants of Object.values(subjectMap)) {
            const hasVariant = variants.some(v => cleanSearch.toLowerCase().includes(v));
            if (hasVariant) {
              match = files.find(f => variants.some(v => f.toLowerCase().includes(v)));
              if (match) break;
            }
          }
        }

        if (match) {
          targetPath = path.join(/*turbopackIgnore: true*/ targetDir, match);
          break;
        }
      } catch {
        // Fallback gracefully if directory read fails
      }
    }
  }

  if (!targetPath || !fs.existsSync(/*turbopackIgnore: true*/ targetPath)) {
    return NextResponse.json(
      { error: "File not found", searched: targetPath },
      { status: 404 }
    );
  }

  try {
    const stat = fs.statSync(/*turbopackIgnore: true*/ targetPath);
    const fileSize = stat.size;
    const range = request.headers.get("range");

    if (range) {
      // Partial Content / Range support for smooth PDF streaming
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;

      const fileStream = fs.createReadStream(/*turbopackIgnore: true*/ targetPath, { start, end });
      const stream = new ReadableStream({
        start(controller) {
          fileStream.on("data", (chunk) => controller.enqueue(chunk));
          fileStream.on("end", () => controller.close());
          fileStream.on("error", (err) => controller.error(err));
        },
      });

      return new NextResponse(stream, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize.toString(),
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${encodeURIComponent(path.basename(targetPath))}"`,
        },
      });
    }

    // Full file stream
    const fileStream = fs.createReadStream(/*turbopackIgnore: true*/ targetPath);
    const stream = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Length": fileSize.toString(),
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${encodeURIComponent(path.basename(targetPath))}"`,
        "Accept-Ranges": "bytes",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error streaming file";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
