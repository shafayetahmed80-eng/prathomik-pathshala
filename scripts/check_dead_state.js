const fs = require('fs');
const content = fs.readFileSync('src/components/MultimediaSlideDeck.tsx', 'utf8');

const regex = /const\s+\[([a-zA-Z0-9_]+),\s*([a-zA-Z0-9_]+)\]\s*=\s*useState/g;
let m;
const states = [];
while ((m = regex.exec(content)) !== null) {
  states.push({ name: m[1], setter: m[2] });
}

console.log(`Found ${states.length} useState hooks in MultimediaSlideDeck.tsx`);
states.forEach(s => {
  const nameOccurrences = (content.match(new RegExp(`\\b${s.name}\\b`, 'g')) || []).length;
  const setterOccurrences = (content.match(new RegExp(`\\b${s.setter}\\b`, 'g')) || []).length;
  if (setterOccurrences <= 1 || nameOccurrences <= 1) {
    console.log(`Potential dead state: ${s.name} (name refs: ${nameOccurrences}, setter refs: ${setterOccurrences})`);
  }
});
