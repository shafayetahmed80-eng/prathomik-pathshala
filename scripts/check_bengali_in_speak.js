const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('VisualStage.tsx'));

const bengaliRegex = /[\u0980-\u09FF]/;
let totalCalls = 0;
let bengaliCalls = 0;
const examples = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('handleSpeak(')) {
      totalCalls++;
      if (bengaliRegex.test(line)) {
        bengaliCalls++;
        examples.push({ file: f, line: i + 1, text: line.trim() });
      }
    }
  });
});

console.log(`Total handleSpeak calls in VisualStages: ${totalCalls}`);
console.log(`Calls containing Bengali characters: ${bengaliCalls}`);
if (examples.length > 0) {
  console.log("Examples:");
  examples.slice(0, 10).forEach(e => console.log(`  [${e.file}:${e.line}] ${e.text}`));
}
