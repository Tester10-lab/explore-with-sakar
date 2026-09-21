const fs = require('fs');
const content = fs.readFileSync('sakar dai blog.md', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < 254; i++) {
  const line = lines[i].trim();
  if (line.match(/^BLOG/i) || line.match(/^Title:/i)) {
    console.log(`L${i+1}: ${line}`);
  }
}
