const fs = require('fs');

const content = fs.readFileSync('sakar dai blog.md', 'utf8');
const lines = content.split('\n');

function getRange(startLine, endLine) {
  return lines.slice(startLine - 1, endLine).join('\n').trim();
}

console.log('Line count:', lines.length);

const items = [
  { name: '1. Kathmandu Valley Hidden Spiritual', start: 256, end: 276 },
  { name: '2. Pashupati', start: 277, end: 281 },
  { name: '3. Himalayan Shamanism', start: 282, end: 301 },
  { name: '4. Beyond Names', start: 302, end: 320 },
  { name: '5. Sound', start: 321, end: 355 },
  { name: '6. Buddhism', start: 356, end: 364 },
  { name: '7. Taudaha & Pharping', start: 365, end: 380 },
  { name: '8. Birth Chart', start: 381, end: 388 },
  { name: '9. Kathmandu Durbar Square', start: 393, end: 512 },
  { name: '10. Bhaktapur Durbar Square', start: 513, end: 576 },
  { name: '11. Patan Durbar Square', start: 577, end: 682 },
  { name: '12. Pokhara', start: 683, end: 908 },
  { name: '13. Chitwan', start: 909, end: 933 },
];

items.forEach(it => {
  const text = getRange(it.start, it.end);
  console.log(`=== ${it.name} (${it.start}-${it.end}) Length: ${text.length} ===`);
  console.log(text.slice(0, 120).replace(/\n/g, ' ') + '...');
});
