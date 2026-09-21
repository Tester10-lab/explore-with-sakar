const fs = require('fs');
const content = fs.readFileSync('sakar dai blog.md', 'utf8');
const lines = content.split('\n');

console.log('--- Scanning lines 250 to 935 ---');
for (let i = 250; i < 935; i++) {
  const line = lines[i].trim();
  if (
    line.startsWith('#') ||
    /^\d+\)/.test(line) ||
    /^[A-Z\s]{4,30}$/.test(line) ||
    line.includes('Durbar Square') ||
    line.includes('Pokhara') ||
    line.includes('Chitwan')
  ) {
    console.log(`L${i+1}: ${line.slice(0, 100)}`);
  }
}
