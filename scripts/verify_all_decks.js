const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'slidesData.ts');
const content = fs.readFileSync(filePath, 'utf8');

const regex = /"([^"]+)":\s*([A-Z0-9_]+_DECK)/g;
let match;
const decks = [];

const registryStart = content.indexOf('export const SLIDE_DECKS: Record<string, SlideDeck> = {');
const registryEnd = content.indexOf('};', registryStart);
const registryStr = content.substring(registryStart, registryEnd);

while ((match = regex.exec(registryStr)) !== null) {
  decks.push({ id: match[1], constant: match[2] });
}

console.log("=================================================");
console.log(`TOTAL INTERACTIVE SLIDE DECKS REGISTERED: ${decks.length}`);
console.log("=================================================");
decks.forEach((d, idx) => {
  console.log(`${(idx + 1).toString().padStart(2, ' ')}. [${d.id}] -> ${d.constant}`);
});
