const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'MultimediaSlideDeck.tsx');
const content = fs.readFileSync(filePath, 'utf8');

const regex = /setSelectedDeckId\("([^"]+)"\)/g;
let match;
const modalDeckIds = [];

while ((match = regex.exec(content)) !== null) {
  modalDeckIds.push(match[1]);
}

console.log("Total setSelectedDeckId occurrences in MultimediaSlideDeck:", modalDeckIds.length);
console.log("Unique IDs in modal:", modalDeckIds);

const slidesDataContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'slidesData.ts'), 'utf8');
const allDecksMatch = slidesDataContent.match(/"([^"]+)":\s*[A-Z0-9_]+_DECK/g);
const allDeckIds = allDecksMatch.map(x => x.match(/"([^"]+)":/)[1]);

console.log("\nTotal Decks in slidesData.ts:", allDeckIds.length);

const missingFromModal = allDeckIds.filter(id => !modalDeckIds.includes(id));
console.log("\nMISSING FROM LESSON SELECTOR MODAL (" + missingFromModal.length + " decks):");
missingFromModal.forEach(id => console.log(" - " + id));
