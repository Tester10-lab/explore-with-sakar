const fs = require('fs');
const content = fs.readFileSync('sakar dai blog.md', 'utf8');
const lines = content.split('\n');

const blogIndices = [
  { name: 'Blog 1', line: 3 },
  { name: 'Blog 2', line: 22 },
  { name: 'Blog 3', line: 43 },
  { name: 'Blog 4', line: 56 },
  { name: 'Blog 5', line: 60 },
  { name: 'Blog 6', line: 83 },
  { name: 'Blog 7', line: 95 },
  { name: 'Blog 8', line: 114 },
  { name: 'Blog 9', line: 141 },
  { name: 'Blog 10', line: 155 },
  { name: 'Blog 11', line: 165 },
  { name: 'Blog 12', line: 172 },
  { name: 'Blog 13', line: 179 },
  { name: 'Blog 14', line: 191 },
  { name: 'Blog 15', line: 204 },
  { name: 'Blog 16', line: 221 },
  { name: 'Blog 17', line: 227 },
  { name: 'Blog 18', line: 247 },
];

blogIndices.forEach(b => {
  console.log(`=== ${b.name} (line ${b.line}) ===`);
  for (let i = b.line - 1; i < b.line + 3 && i < lines.length; i++) {
    console.log(lines[i].trim());
  }
});
