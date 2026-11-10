const fs = require('fs');
const content = fs.readFileSync('src/components/MultimediaSlideDeck.tsx', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('teamShaplaScore') || l.includes('teamGolapScore')) {
    console.log(`${i + 1}: ${l.trim().slice(0, 100)}`);
  }
});
