import fs from 'fs';
import path from 'path';
import dns from 'dns';
import { MongoClient } from 'mongodb';

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

if (process.env.MONGODB_DNS_SERVERS && typeof dns.setServers === 'function') {
  try {
    dns.setServers(process.env.MONGODB_DNS_SERVERS.split(',').map((s) => s.trim()).filter(Boolean));
  } catch (err) {
    console.warn('DNS setServers failed:', err);
  }
}

const storePath = path.resolve(process.cwd(), 'data', 'cms-store.json');
const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));

// Topic quotes and key metadata mapping
const TOPIC_UPDATES = {
  'kathmandu-durbar-square': {
    category: 'beyond-the-map',
    categoryLabel: 'Beyond the Map',
    keyQuote: {
      quote: 'Kathmandu reminds the world that the future of cities is not only about technology, but also about preserving communities where people live, work, and care for each other.',
      attribution: 'Heritage Conservationist Anil Chitrakar',
    },
  },
  'bhaktapur-durbar-square': {
    category: 'beyond-the-map',
    categoryLabel: 'Beyond the Map',
    keyQuote: {
      quote: 'To walk through Bhaktapur is to realize that a city does not need to forget its ancestors in order to live in the modern world.',
      attribution: 'Himalayan Cultural Historian',
    },
  },
  'patan-durbar-square': {
    category: 'beyond-the-map',
    categoryLabel: 'Beyond the Map',
    keyQuote: {
      quote: 'The true museum of Patan has no ticket counter. It is the sound of the hammer meeting bronze in a quiet back courtyard.',
      attribution: 'Master Repoussé Metalsmith',
    },
  },
  'pokhara-laid-back-city': {
    category: 'beyond-the-map',
    categoryLabel: 'Beyond the Map',
    keyQuote: {
      quote: 'Pokhara is where the mountains don’t just watch over you; they invite you to breathe slower and remember what stillness feels like.',
      attribution: 'Sakar • Responsible Tour Director',
    },
  },
  'spiritual-immersion-singing-bowls': {
    category: 'go-within',
    categoryLabel: 'Go Within',
    keyQuote: {
      quote: 'The singing bowl does not force silence upon the mind; it creates a vibration so pure that chaos simply loses its desire to stay.',
      attribution: 'Master Sound Healer Santa Ratna Shakya',
    },
  },
  'pharping-sacred-cave-meditation': {
    category: 'go-within',
    categoryLabel: 'Go Within',
    keyQuote: {
      quote: 'In the stillness of Asura Cave, Guru Padmasambhava proved that true victory is not conquering lands, but subduing the wandering mind.',
      attribution: 'Nyingma Lineage Elder',
    },
  },
  'namo-buddha-sacred-ridge-walk': {
    category: 'go-within',
    categoryLabel: 'Go Within',
    keyQuote: {
      quote: 'At Namo Buddha, generosity is not a transaction; it is the ultimate realization that all suffering beings are interconnected.',
      attribution: 'Thrangu Rinpoche Monastic Tradition',
    },
  },
  'monastery-chanting-inner-silence': {
    category: 'go-within',
    categoryLabel: 'Go Within',
    keyQuote: {
      quote: 'When the dawn horns sound across the valley, the morning mist lifts and you hear the sound of centuries praying for world peace.',
      attribution: 'Sakar • Responsible Tour Director',
    },
  },
  'living-courtyards-kathmandu': {
    category: 'go-deeper',
    categoryLabel: 'Go Deeper',
    keyQuote: {
      quote: 'The courtyards of Kathmandu are outdoor living rooms where five generations dry grain, carve deities, and tell the story of their ancestors.',
      attribution: 'Newari Cultural Elder',
    },
  },
  'echoes-in-stone-patan-bhaktapur': {
    category: 'go-deeper',
    categoryLabel: 'Go Deeper',
    keyQuote: {
      quote: 'Every carving in Patan was placed there not as ornament, but as a protective prayer etched in grey stone.',
      attribution: 'Patan Guild Master',
    },
  },
  'artisans-path-heritage-deep-dive': {
    category: 'go-deeper',
    categoryLabel: 'Go Deeper',
    keyQuote: {
      quote: 'A statue made with machine has no soul. When you hammer copper for three months, your breath enters the bronze.',
      attribution: 'Master Lost-Wax Caster',
    },
  },
  'sacred-geometry-architecture-valley': {
    category: 'go-deeper',
    categoryLabel: 'Go Deeper',
    keyQuote: {
      quote: 'The three royal cities were laid out as a giant cosmic yantra. Walking here is an unhurried pilgrimage through sacred mathematics.',
      attribution: 'Himalayan Architectural Scholar',
    },
  },
  'langtang-tamang-heritage-trail': {
    category: 'leave-a-mark',
    categoryLabel: 'Leave a Mark',
    keyQuote: {
      quote: 'When you trek with purpose in Langtang, your presence helps rebuild schools and keeps traditional Tamang stone hearths burning.',
      attribution: 'Langtang Community Cooperative',
    },
  },
  'chitwan-indigenous-tharu-guardians': {
    category: 'leave-a-mark',
    categoryLabel: 'Leave a Mark',
    keyQuote: {
      quote: 'The forest gave us life, and in return we protect the tiger and the rhino with traditional indigenous knowledge.',
      attribution: 'Tharu Community Forest Ranger',
    },
  },
  'community-sacred-forest-reforestation': {
    category: 'leave-a-mark',
    categoryLabel: 'Leave a Mark',
    keyQuote: {
      quote: 'Planting a native oak or rhododendron tree in the Himalayan foothills is an offering that outlives our children.',
      attribution: 'Community Forestry Leader',
    },
  },
};

// 4th topic for Leave a Mark
const CAPACITY_BUILDING_TOPIC = {
  id: 'exp-strategic-capacity-building',
  title: 'Strategic Community & Administrative Empowerment',
  slug: 'strategic-community-capacity-building',
  category: 'leave-a-mark',
  categoryLabel: 'Leave a Mark',
  duration: '2–4 Weeks (Immersive)',
  difficulty: 'Professional Fellowship',
  location: 'Kathmandu Valley & Highland Grassroots Hubs',
  groupSize: 'Private / 1–4 Professional Fellows',
  season: 'Year-Round',
  featured: true,
  featuredOrder: 4,
  homepageVisible: true,
  status: 'published',
  heroImage: {
    src: '/explore-with-sakar/images/homestays/village-meal.jpg',
    alt: 'Strategic Community & Administrative Empowerment with Sakar',
    caption: 'Quiet architects for change: pairing professional skills with grassroots Nepali leaders.',
  },
  gallery: [
    { src: '/explore-with-sakar/images/homestays/village-meal.jpg', alt: 'Community meeting' },
    { src: '/explore-with-sakar/images/trails/suspension-bridge.jpg', alt: 'Highland trail' },
    { src: '/explore-with-sakar/images/homestays/welcome-tea.jpg', alt: 'Hospitality' },
  ],
  shortDescription:
    'Match your actual professional skills with local communities in Nepal that need structural, strategic, and administrative empowerment. We don’t just want you to paint a wall; we want you to help build the blueprint.',
  fullDescription: [
    'Traditional voluntourism often focuses on short-term manual labor that feels good but leaves little lasting impact. We take a different approach. We believe true volunteering means matching your actual professional skills with local communities that need structural, strategic, and administrative empowerment. We don’t just want you to paint a wall; we want you to help build the blueprint.',
    'Leave a Mark is a specialized branch of our journeys designed for professionals—project managers, financial planners, writers, and strategists—who want to dedicate a portion of their travel to high-level community development.',
    'Many local NGOs, community groups, and grassroots initiatives in Nepal have the passion and the workforce, but they lack the administrative frameworks to secure funding or execute complex logistics. This program places you behind the scenes as a quiet architect for change.',
  ],
  keyQuote: {
    quote: 'True volunteering means matching your professional skills with communities that need structural empowerment. You leave behind an invisible but indestructible infrastructure.',
    attribution: 'Sakar • Responsible Tour Director',
  },
  highlights: [
    'Project proposal structuring for international grants and partnerships',
    'Deliverable breakdowns and timeline compression for local teams',
    'Financial budgeting, resource allocation, and sustainable operational models',
    'Direct mentoring alongside grassroots community leaders and coordinators',
  ],
  days: [
    {
      day: 1,
      title: 'Arrival, Orientation & Community Introduction',
      description: 'Meet local coordinators in Kathmandu, review organizational goals, and align on fellowship deliverables.',
    },
    {
      day: 2,
      title: 'Field Assessment & Framework Structuring',
      description: 'Observe grassroots field operations and structure the 3-month deliverable blueprint.',
    },
    {
      day: 3,
      title: 'Proposal & Budget Finalization',
      description: 'Collaborative working sessions to produce actionable project proposals and sustainable financial tools.',
    },
  ],
};

// Update store.experiences
let updatedExperiences = store.experiences || [];

// 1. Update existing topics
updatedExperiences = updatedExperiences.map((exp) => {
  if (TOPIC_UPDATES[exp.slug]) {
    const update = TOPIC_UPDATES[exp.slug];
    return {
      ...exp,
      category: update.category,
      categoryLabel: update.categoryLabel,
      keyQuote: update.keyQuote,
      updatedAt: new Date().toISOString(),
    };
  }
  return exp;
});

// 2. Add 4th Leave a Mark topic if not present
if (!updatedExperiences.some((e) => e.slug === 'strategic-community-capacity-building')) {
  updatedExperiences.push(CAPACITY_BUILDING_TOPIC);
}

// 3. Save to data/cms-store.json
store.experiences = updatedExperiences;
fs.writeFileSync(storePath, JSON.stringify(store, null, 2), 'utf8');
console.log('Successfully updated data/cms-store.json experiences!');

// 4. Update MongoDB active_store.experiences in both databases
async function syncMongo() {
  if (!process.env.MONGODB_URI) return;
  const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const activeDbName = process.env.MONGODB_DB || 'explore_with_sakar_dev';
    for (const dbName of [activeDbName, 'explore_with_sakar']) {
      try {
        const db = client.db(dbName);
        const col = db.collection('cms_store');
        await col.updateOne(
          { _id: 'active_store' },
          {
            $set: {
              experiences: updatedExperiences,
              lastUpdated: new Date().toISOString(),
            },
          },
          { upsert: true }
        );
        console.log(`Updated experiences in MongoDB ${dbName}!`);
      } catch (err) {
        console.warn(`Could not update ${dbName}:`, err.message);
      }
    }
  } finally {
    await client.close();
  }
}

syncMongo().catch(console.error);
