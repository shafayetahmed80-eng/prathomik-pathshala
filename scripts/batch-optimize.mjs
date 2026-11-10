import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { optimizePdf } from "./optimize-pdf.mjs";

const execFileAsync = promisify(execFile);

const DEFAULT_IN_DIR = ["D:", "NCTB_Primary_Collection"].join(path.sep);
const DEFAULT_OUT_DIR = ["D:", "NCTB_Primary_Collection_Web"].join(path.sep);
const TOOLS_DIR = path.resolve(".tools");
const QPDF = path.join(TOOLS_DIR, "qpdf-12.4.2-msvc64", "bin", "qpdf.exe");

function getAllPdfs(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllPdfs(fullPath));
    } else if (item.toLowerCase().endsWith(".pdf")) {
      results.push({
        path: fullPath,
        sizeBytes: stat.size,
        sizeMB: (stat.size / (1024 * 1024)).toFixed(2),
      });
    }
  }
  return results;
}

async function runBatch() {
  const inDir = process.argv[2] || DEFAULT_IN_DIR;
  const outDir = process.argv[3] || DEFAULT_OUT_DIR;

  console.log("==================================================");
  console.log("     NCTB PDF Web Optimization Pipeline          ");
  console.log("==================================================");
  console.log(`Input Directory : ${inDir}`);
  console.log(`Output Directory: ${outDir}`);

  if (!fs.existsSync(inDir)) {
    console.error(`Error: Input directory '${inDir}' does not exist.`);
    process.exit(1);
  }

  const allFiles = getAllPdfs(inDir);
  console.log(`Found ${allFiles.length} PDF files in total.`);

  // Sort by largest first so big wins happen first
  allFiles.sort((a, b) => b.sizeBytes - a.sizeBytes);

  let processedCount = 0;
  let totalSavedMB = 0;
  let totalOriginalMB = 0;
  let totalNewMB = 0;

  for (const file of allFiles) {
    const relativePath = path.relative(inDir, file.path);
    const targetPath = path.join(outDir, relativePath);

    totalOriginalMB += parseFloat(file.sizeMB);

    // Skip if already processed and target exists
    if (fs.existsSync(targetPath)) {
      const existingStat = fs.statSync(targetPath);
      const existingMB = parseFloat((existingStat.size / (1024 * 1024)).toFixed(2));
      totalNewMB += existingMB;
      console.log(`[SKIP] Already exists: ${relativePath} (${existingMB} MB)`);
      continue;
    }

    console.log(`\n--------------------------------------------------`);
    console.log(`[${++processedCount}/${allFiles.length}] Processing: ${relativePath}`);
    console.log(`Original Size: ${file.sizeMB} MB`);

    const startTime = Date.now();
    try {
      const targetParent = path.dirname(targetPath);
      if (!fs.existsSync(targetParent)) {
        fs.mkdirSync(targetParent, { recursive: true });
      }

      // If file is already small (< 20 MB), linearize directly to preserve crisp vectors & add Fast Web View
      if (file.sizeBytes < 20 * 1024 * 1024) {
        await execFileAsync(QPDF, [
          "--linearize",
          "--object-streams=generate",
          file.path,
          targetPath,
        ]);
        const newStat = fs.statSync(targetPath);
        const newMB = (newStat.size / (1024 * 1024)).toFixed(2);
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const saved = parseFloat(file.sizeMB) - parseFloat(newMB);
        totalSavedMB += saved;
        totalNewMB += parseFloat(newMB);
        console.log(`Linearized in ${elapsed}s: ${file.sizeMB} MB -> ${newMB} MB (Vector Preserved)`);
      } else {
        // Heavy print-prepress file: rasterize & compress at 150 DPI
        const stats = await optimizePdf(file.path, targetPath, {
          dpi: 150,
          jpegQuality: 85,
          progressCb: (p) => {
            if (p.stage === "assembling" && p.current) {
              process.stdout.write(`\rAssembling page: ${p.current}/${p.total}... `);
            }
          },
        });

        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const saved = parseFloat(stats.originalSizeMB) - parseFloat(stats.optimizedSizeMB);
        totalSavedMB += saved;
        totalNewMB += parseFloat(stats.optimizedSizeMB);

        console.log(`\nOptimized in ${elapsed}s: ${stats.originalSizeMB} MB -> ${stats.optimizedSizeMB} MB (-${stats.reductionPercent}%)`);
      }
    } catch (err) {
      console.error(`\nFailed to optimize ${relativePath}:`, err.message);
    }
  }

  console.log("\n==================================================");
  console.log("             BATCH PROCESSING COMPLETE            ");
  console.log("==================================================");
  console.log(`Total Original Size  : ${totalOriginalMB.toFixed(2)} MB`);
  console.log(`Total Web Size       : ${totalNewMB.toFixed(2)} MB`);
  console.log(`Total Bandwidth Saved: ${totalSavedMB.toFixed(2)} MB`);
}

runBatch().catch(console.error);
