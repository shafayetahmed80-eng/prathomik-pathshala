const fs = require('fs');
const content = fs.readFileSync('src/components/MultimediaSlideDeck.tsx', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('showSentencePuzzle') || l.includes('puzzleSolved')) {
    console.log(`${i + 1}: ${l.trim().slice(0, 100)}`);
  }
});
