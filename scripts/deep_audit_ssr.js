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
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(full);
    }
  });
  return results;
}

const files = getFiles('src');
console.log(`Analyzing ${files.length} TypeScript files for SSR safety and browser globals...`);

const suspiciousLines = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const relPath = file.replace(/\\/g, '/');
  
  lines.forEach((line, idx) => {
    // Check for unguarded localStorage, window, document outside of useEffect/handlers
    // Especially in useState initializers or top-level module scope
    if (/const\s+\[\w+,\s*set\w+\]\s*=\s*useState\(.*(localStorage|window|document)/.test(line)) {
      suspiciousLines.push({ file: relPath, line: idx + 1, type: 'useState SSR hazard', text: line.trim() });
    }
    if (/localStorage\.getItem/.test(line) && !line.includes('typeof window') && !line.includes('useEffect')) {
      // check if inside a function
    }
  });
});

console.log('Found suspicious SSR patterns:', suspiciousLines);
