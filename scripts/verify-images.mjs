import fs from 'fs';
import path from 'path';

const dataFiles = [
  'src/data/pages.ts',
  'src/data/destinations.ts',
  'src/data/packages.ts',
  'src/data/experiences.ts',
  'src/data/homestays.ts',
  'src/data/blogPosts.ts'
];

let checked = 0;
let missing = [];

for (const file of dataFiles) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/['"]\/(?:explore-with-sakar\/)?images\/[^'"]+['"]/g) || [];
  
  for (const m of matches) {
    checked++;
    const clean = m.replace(/['"]/g, '').replace('/explore-with-sakar', '');
    const full = path.join(process.cwd(), 'public', clean);
    if (!fs.existsSync(full)) {
      missing.push({ file, src: clean });
    }
  }
}

console.log(`Verified ${checked} image references.`);
const uniqueMissing = [...new Set(missing.map(m => m.src))];
console.log(`Unique missing images (${uniqueMissing.length}):`, uniqueMissing);
