const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css')) {
      results.push(full);
    }
  });
  return results;
}

const files = getFiles('src');
const printRefs = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('@media print') || l.includes('print:') || l.includes('window.print()')) {
      printRefs.push({
        file: f.replace(/\\/g, '/'),
        line: i + 1,
        text: l.trim().slice(0, 100)
      });
    }
  });
});

console.log(`Found ${printRefs.length} print references across:`);
const filesSet = new Set(printRefs.map(p => p.file));
filesSet.forEach(f => {
  const count = printRefs.filter(p => p.file === f).length;
  console.log(` - ${f} (${count} refs)`);
});
