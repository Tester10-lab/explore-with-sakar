const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '..', 'data', 'cms-store.json');
const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));

console.log('Existing blogs in store:', store.blogs.length);

const queries = [
  "Kathmandu Valley's Hidden Spiritual Heritage",
  "A Leisurely Walk Through Pashupati",
  "Himalayan Shamanism",
  "The Moment I Felt the Essence of Shamanic Wisdom",
  "Beyond Names",
  "The Cosmic Language of Sound",
  "The Essence of Buddhism",
  "Taudaha and Pharping",
  "Nepali Birth Chart",
  "Kathmandu Durbar Square",
  "Bhaktapur Durbar Square",
  "Patan Durbar Square",
  "Pokhara",
  "Chitwan National Park",
  "Beyond Tourism",
  "Angel of Slum",
  "Logan Storck"
];

queries.forEach(q => {
  const match = store.blogs.find(b => 
    (b.title && b.title.toLowerCase().includes(q.toLowerCase())) ||
    (b.slug && b.slug.toLowerCase().includes(q.toLowerCase()))
  );
  if (match) {
    console.log(`[FOUND] "${q}" -> slug: "${match.slug}" | title: "${match.title}"`);
  } else {
    console.log(`[MISSING] "${q}"`);
  }
});
