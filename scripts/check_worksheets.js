const fs = require('fs');
const content = fs.readFileSync('src/data/slidesData.ts', 'utf8');

const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('export const SLIDE_DECKS')) {
    console.log(i + 1, l);
    for (let j = 1; j < 40; j++) {
      console.log(lines[i + j]);
    }
  }
});
