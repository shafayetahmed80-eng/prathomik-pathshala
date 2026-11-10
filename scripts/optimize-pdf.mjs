import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { PDFDocument } from "pdf-lib";

const execFileAsync = promisify(execFile);

const TOOLS_DIR = path.resolve(".tools");
const POPPLER_BIN = path.join(TOOLS_DIR, "poppler-24.08.0", "Library", "bin");
const PDFTOCAIRO = path.join(POPPLER_BIN, "pdftocairo.exe");
const PDFINFO = path.join(POPPLER_BIN, "pdfinfo.exe");
const QPDF = path.join(TOOLS_DIR, "qpdf-12.4.2-msvc64", "bin", "qpdf.exe");

/**
 * Get PDF page count and sizes
 */
export async function getPdfInfo(pdfPath) {
  const { stdout } = await execFileAsync(PDFINFO, [pdfPath]);
  const pagesMatch = stdout.match(/Pages:\s+(\d+)/);
  const sizeMatch = stdout.match(/Page size:\s+([\d.]+)\s+x\s+([\d.]+)/);
  
  return {
    pages: pagesMatch ? parseInt(pagesMatch[1], 10) : 0,
    widthPts: sizeMatch ? parseFloat(sizeMatch[1]) : 595.28,
    heightPts: sizeMatch ? parseFloat(sizeMatch[2]) : 841.89,
  };
}

/**
 * Optimize a PDF file
 * @param {string} inputPdf - Path to original PDF
 * @param {string} outputPdf - Path for optimized output PDF
 * @param {object} options - { dpi: 150, quality: 85, firstPage: 1, lastPage: 0, progressCb }
 */
export async function optimizePdf(inputPdf, outputPdf, options = {}) {
  const {
    dpi = 150,
    jpegQuality = 85,
    firstPage = 1,
    lastPage = 0,
    progressCb = () => {},
  } = options;

  const originalStat = fs.statSync(inputPdf);
  const tempDir = path.join(TOOLS_DIR, `temp_${Date.now()}`);
  fs.mkdirSync(tempDir, { recursive: true });

  try {
    const info = await getPdfInfo(inputPdf);
    const targetLastPage = lastPage > 0 ? lastPage : info.pages;
    const totalPagesToProcess = targetLastPage - firstPage + 1;

    progressCb({ stage: "rendering", current: 0, total: totalPagesToProcess });

    // Step 1: Render pages using pdftocairo
    const imgPrefix = path.join(tempDir, "page");
    const cairoArgs = [
      "-jpeg",
      "-jpegopt", `quality=${jpegQuality}`,
      "-r", dpi.toString(),
      "-f", firstPage.toString(),
      "-l", targetLastPage.toString(),
      inputPdf,
      imgPrefix,
    ];

    await execFileAsync(PDFTOCAIRO, cairoArgs);

    // Collect rendered JPEG pages in numeric order
    const files = fs.readdirSync(tempDir)
      .filter((f) => f.endsWith(".jpg") || f.endsWith(".jpeg"))
      .sort((a, b) => {
        const numA = parseInt(a.replace(/[^\d]/g, ""), 10);
        const numB = parseInt(b.replace(/[^\d]/g, ""), 10);
        return numA - numB;
      });

    if (files.length === 0) {
      throw new Error("No page images were rendered by pdftocairo");
    }

    progressCb({ stage: "assembling", total: files.length });

    // Step 2: Build optimized PDF using pdf-lib
    const pdfDoc = await PDFDocument.create();

    for (let i = 0; i < files.length; i++) {
      const imgPath = path.join(tempDir, files[i]);
      const imgBytes = fs.readFileSync(imgPath);
      // Ensure isolated Uint8Array so pdf-lib's DataView doesn't read from Node's internal buffer pool
      const isolatedBytes = new Uint8Array(imgBytes);
      const embeddedImg = await pdfDoc.embedJpg(isolatedBytes);

      // Preserve aspect ratio and page geometry
      const imgWidth = embeddedImg.width;
      const imgHeight = embeddedImg.height;
      const ptsWidth = (imgWidth / dpi) * 72;
      const ptsHeight = (imgHeight / dpi) * 72;

      const page = pdfDoc.addPage([ptsWidth, ptsHeight]);
      page.drawImage(embeddedImg, {
        x: 0,
        y: 0,
        width: ptsWidth,
        height: ptsHeight,
      });

      if (i % 10 === 0 || i === files.length - 1) {
        progressCb({ stage: "assembling", current: i + 1, total: files.length });
      }
    }

    const unlinearizedPdfPath = path.join(tempDir, "unlinearized.pdf");
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(unlinearizedPdfPath, pdfBytes);

    progressCb({ stage: "linearizing" });

    // Step 3: Linearize for Fast Web View using QPDF
    const targetDir = path.dirname(outputPdf);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    await execFileAsync(QPDF, [
      "--linearize",
      "--object-streams=generate",
      unlinearizedPdfPath,
      outputPdf,
    ]);

    const newStat = fs.statSync(outputPdf);
    return {
      originalSizeMB: (originalStat.size / (1024 * 1024)).toFixed(2),
      optimizedSizeMB: (newStat.size / (1024 * 1024)).toFixed(2),
      reductionPercent: (
        ((originalStat.size - newStat.size) / originalStat.size) *
        100
      ).toFixed(1),
      totalPages: files.length,
    };
  } finally {
    // Cleanup temporary images
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {}
  }
}

// CLI execution test
if (process.argv[1]?.endsWith("optimize-pdf.mjs")) {
  const [,, inPdf, outPdf, pCount] = process.argv;
  if (!inPdf || !outPdf) {
    console.log("Usage: node scripts/optimize-pdf.mjs <input.pdf> <output.pdf> [maxPages]");
    process.exit(1);
  }

  const maxPages = pCount ? parseInt(pCount, 10) : 0;
  console.log(`Starting optimization: ${inPdf} -> ${outPdf} (maxPages: ${maxPages || "all"})`);

  optimizePdf(inPdf, outPdf, {
    dpi: 150,
    jpegQuality: 85,
    lastPage: maxPages,
    progressCb: (p) => console.log(`Progress:`, p),
  })
    .then((stats) => {
      console.log("Optimization successfully completed!");
      console.log(stats);
    })
    .catch((err) => {
      console.error("Optimization failed:", err);
      process.exit(1);
    });
}
