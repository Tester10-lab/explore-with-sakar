const fs = require('fs');
const path = require('path');
const dns = require('dns');
const { MongoClient } = require('mongodb');

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn('Could not set custom DNS servers:', e);
}

function getMongoUri() {
  try {
    const envPath = path.join(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/MONGODB_URI\s*=\s*["']?([^"'\r\n]+)["']?/);
      if (match && match[1]) {
        return match[1];
      }
    }
  } catch (e) {
    console.error('Error reading .env.local:', e);
  }
  return process.env.MONGODB_URI;
}

const mongoUri = getMongoUri();

if (!mongoUri) {
  console.error('MONGODB_URI not found!');
  process.exit(1);
}

const defaultNavigation = {
  header: [
    {
      id: 'nav-experiences',
      label: 'EXPERIENCES',
      url: '/experiences',
      subtitle: 'Our Curated Travel Experiences',
      columns: 2,
      visible: true,
      order: 0,
      children: [
        {
          id: 'nav-beyond',
          label: 'Beyond the Map',
          description: 'Living courtyards, medieval stone mysteries & master artisan guilds.',
          url: '/experiences/beyond-the-map',
          badge: 'Exploration',
          icon: 'compass',
          visible: true,
          order: 0,
        },
        {
          id: 'nav-within',
          label: 'Go Within',
          description: 'Himalayan singing bowl resonance, monastery chanting & meditation caves.',
          url: '/experiences/spiritual-wellness',
          badge: 'Spiritual',
          icon: 'sparkles',
          visible: true,
          order: 1,
        },
        {
          id: 'nav-deeper',
          label: 'Go Deeper',
          description: 'Immersive deep-dive journeys into hidden layers, living courtyards & sacred geometry.',
          url: '/experiences/go-deeper',
          badge: 'Immersion',
          icon: 'layers',
          visible: true,
          order: 2,
        },
        {
          id: 'nav-mark',
          label: 'Leave a Mark',
          description: 'Strategic volunteer tourism & administrative empowerment for grassroots communities.',
          url: '/experiences/leave-a-mark',
          badge: 'Strategic',
          icon: 'heart',
          visible: true,
          order: 3,
        },
        {
          id: 'nav-all-exp',
          label: 'All Curated Experiences',
          description: 'View all curated packages, village homestays, and sacred routes.',
          url: '/experiences',
          icon: 'calendar',
          visible: true,
          order: 4,
        },
        {
          id: 'nav-custom-exp',
          label: 'Custom Private Journeys',
          description: '100% tailor-made itineraries for solo travelers, couples & families with Sakar.',
          url: '/experiences/custom-journeys',
          badge: 'Bespoke',
          icon: 'shield-check',
          visible: true,
          order: 5,
        },
      ],
    },
    {
      id: 'nav-events',
      label: 'EVENTS',
      url: '/events',
      visible: true,
      order: 1,
    },
    {
      id: 'nav-stories',
      label: 'STORIES',
      url: '/blog',
      subtitle: 'Perspectives & Reflections',
      columns: 1,
      visible: true,
      order: 2,
      children: [
        {
          id: 'nav-journal',
          label: 'Sakar’s Journal & Blogs',
          description: 'Field notes, personal essays, and reflections on slow travel and heritage.',
          url: '/blog',
          badge: 'Essays',
          icon: 'book-open',
          visible: true,
          order: 0,
        },
        {
          id: 'nav-reviews',
          label: 'Traveler Reviews & Guestbook',
          description: 'Read guest reflections and flip through Sakar’s handwritten guestbook.',
          url: '/reviews',
          badge: 'Reviews',
          icon: 'star',
          visible: true,
          order: 1,
        },
      ],
    },
    {
      id: 'nav-about',
      label: 'ABOUT SAKAR',
      url: '/about',
      visible: true,
      order: 3,
    },
  ],
  footer: [
    {
      id: 'col-exp',
      title: 'Experiences',
      links: [
        { id: 'fl-1', label: 'Go Beyond the Map', url: '/experiences/beyond-the-map', visible: true, order: 0 },
        { id: 'fl-2', label: 'Go Within', url: '/experiences/spiritual-wellness', visible: true, order: 1 },
        { id: 'fl-3', label: 'Go Deeper', url: '/experiences/go-deeper', visible: true, order: 2 },
        { id: 'fl-4', label: 'Leave a Mark', url: '/experiences/leave-a-mark', visible: true, order: 3 },
        { id: 'fl-5', label: 'Custom Private Journeys', url: '/experiences/custom-journeys', visible: true, order: 4 },
        { id: 'fl-6', label: 'All Curated Experiences →', url: '/experiences', visible: true, order: 5 },
      ],
    },
    {
      id: 'col-company',
      title: 'Navigation',
      links: [
        { id: 'fl-7', label: 'Upcoming Cultural Events', url: '/events', visible: true, order: 0 },
        { id: 'fl-8', label: 'Sakar’s Journal & Essays', url: '/blog', visible: true, order: 1 },
        { id: 'fl-9', label: 'Traveler Reviews', url: '/reviews', visible: true, order: 2 },
        { id: 'fl-10', label: 'About Sakar', url: '/about', visible: true, order: 3 },
        { id: 'fl-11', label: 'Plan Your Journey', url: '/contact', visible: true, order: 4 },
      ],
    },
    {
      id: 'col-resources',
      title: 'Slow Travel & Values',
      links: [
        { id: 'fl-12', label: 'Slow Travel Philosophy', url: '/blog/slow-travel-philosophy', visible: true, order: 0 },
        { id: 'fl-13', label: 'Kathmandu Valley Heritage Guide', url: '/blog/kathmandu-valley-heritage-guide', visible: true, order: 1 },
        { id: 'fl-14', label: 'Ethical Travel Practices', url: '/blog/ethical-travel-practices', visible: true, order: 2 },
        { id: 'fl-15', label: 'Village Homestay Guide', url: '/blog/village-homestay-guide', visible: true, order: 3 },
      ],
    },
  ],
};

const expFileContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'experiences.ts'), 'utf8');
const cleanedExpCode = expFileContent
  .replace(/^import .*;$/gm, '')
  .replace(/export const EXPERIENCES: Experience\[\] =/, 'const EXPERIENCES =')
  .replace(/export function getExperienceBySlug[\s\S]*/, '') + '\nreturn EXPERIENCES;';

const experiences = new Function(cleanedExpCode)();

async function syncDatabases() {
  const jsonStorePath = path.join(__dirname, '..', 'data', 'cms-store.json');
  let storeData = {};
  if (fs.existsSync(jsonStorePath)) {
    storeData = JSON.parse(fs.readFileSync(jsonStorePath, 'utf8'));
  }

  storeData.navigation = defaultNavigation;
  storeData.experiences = experiences;
  storeData.updatedAt = new Date().toISOString();

  fs.writeFileSync(jsonStorePath, JSON.stringify(storeData, null, 2), 'utf8');
  console.log(`✅ Updated data/cms-store.json with ${experiences.length} experiences and restored navigation.`);

  const client = new MongoClient(mongoUri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas cluster');

    const dbNames = ['explore_with_sakar_dev', 'explore_with_sakar'];

    for (const dbName of dbNames) {
      const db = client.db(dbName);
      const collection = db.collection('cms_store');

      const existingDoc = await collection.findOne({ _id: 'active_store' });

      if (existingDoc) {
        await collection.updateOne(
          { _id: 'active_store' },
          {
            $set: {
              navigation: defaultNavigation,
              experiences: experiences,
              updatedAt: new Date(),
            },
          }
        );
        console.log(`✅ Synced navigation & experiences to MongoDB DB: ${dbName}`);
      } else {
        await collection.insertOne({
          _id: 'active_store',
          navigation: defaultNavigation,
          experiences: experiences,
          updatedAt: new Date(),
        });
        console.log(`✅ Created active_store in MongoDB DB: ${dbName}`);
      }
    }

    console.log('🎉 All databases successfully synced!');
  } catch (err) {
    console.error('❌ Error syncing MongoDB databases:', err);
  } finally {
    await client.close();
  }
}

syncDatabases();
