const fs = require('fs');
const content = fs.readFileSync('src/components/StoryVisualStage.tsx', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('antAnimating') || l.includes('grasshopperAnimating') || l.includes('sunAnimating') || l.includes('animat')) {
    console.log(`${i + 1}: ${l.trim().slice(0, 100)}`);
  }
});
