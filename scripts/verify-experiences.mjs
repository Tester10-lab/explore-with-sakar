import fs from 'fs';
import path from 'path';

const storePath = path.resolve(process.cwd(), 'data', 'cms-store.json');
const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));

const CATEGORIES = {
  'beyond-the-map': ['beyond-the-map', 'go-beyond', 'heritage'],
  'go-within': ['go-within', 'go-spiritual', 'spiritual-wellness', 'spiritual'],
  'go-deeper': ['go-deeper'],
  'leave-a-mark': ['leave-a-mark', 'responsible'],
};

console.log('========================================');
console.log('EXPERIENCES TOPIC AUDIT');
console.log('========================================');

let allPassed = true;

const EXCLUDE_SLUGS = [
  'beyond-the-map',
  'go-beyond',
  'go-spiritual',
  'spiritual-wellness',
  'go-within',
  'leave-a-mark',
  'feel-closer',
  'all-curated-experiences',
  'custom-private-journeys',
];

for (const [key, filter] of Object.entries(CATEGORIES)) {
  const topics = store.experiences.filter(
    (e) => filter.includes(e.category) && !EXCLUDE_SLUGS.includes(e.slug)
  );

  console.log(`\nExperience: ${key}`);
  console.log(`Total topics found: ${topics.length}`);

  if (topics.length < 4) {
    console.error(`FAIL: ${key} has less than 4 topics!`);
    allPassed = false;
  }

  topics.slice(0, 4).forEach((t, i) => {
    const hasQuote = Boolean(t.keyQuote?.quote);
    const hasDuration = Boolean(t.duration);
    const hasGroupSize = Boolean(t.groupSize);
    const hasImage = Boolean(t.heroImage?.src);
    console.log(`  Topic ${i + 1}: ${t.slug}`);
    console.log(`    Title: ${t.title}`);
    console.log(`    Duration: ${t.duration || 'MISSING'}`);
    console.log(`    Group Size: ${t.groupSize || 'MISSING'}`);
    console.log(`    Has Quote: ${hasQuote ? 'YES' : 'NO'}`);
    console.log(`    Has Image: ${hasImage ? 'YES' : 'NO'}`);
    if (!hasQuote || !hasDuration || !hasGroupSize || !hasImage) {
      allPassed = false;
    }
  });
}

// Verify Feel Closer is distinct and preserved
const feelCloserTopics = store.experiences.filter(
  (e) => ['feel-closer', 'homestays', 'homestay'].includes(e.category) && e.slug !== 'feel-closer'
);
console.log(`\nPreserved Feel Closer (Homestays) topics: ${feelCloserTopics.length}`);

console.log('\n========================================');
console.log(`OVERALL AUDIT: ${allPassed ? 'ALL PASS' : 'SOME CHECKS FAILED'}`);
console.log('========================================');
