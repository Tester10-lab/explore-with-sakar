const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const dns = require('dns');

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.substring(0, idx).trim();
      const val = trimmed.substring(idx + 1).trim();
      process.env[key] = val;
    }
  }
}

if (process.env.MONGODB_DNS_SERVERS) {
  try {
    dns.setServers(process.env.MONGODB_DNS_SERVERS.split(','));
  } catch (e) {
    console.warn('Could not set custom DNS servers:', e);
  }
}

const cmsStorePath = path.join(__dirname, '..', 'data', 'cms-store.json');
const mongoUri = process.env.MONGODB_URI;

async function main() {
  console.log("Connecting to MongoDB Atlas...");
  const client = new MongoClient(mongoUri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });
  await client.connect();
  console.log("Connected to MongoDB Atlas.");

  const dbs = ['explore_with_sakar_dev', 'explore_with_sakar'];

  for (const dbName of dbs) {
    console.log(`Updating DB: ${dbName}...`);
    const db = client.db(dbName);
    const col = db.collection('cms_store');

    const doc = await col.findOne({ _id: 'active_store' });
    if (doc) {
      console.log(`[${dbName}] Found active_store document.`);

      let experiences = Array.isArray(doc.experiences) ? doc.experiences : [];
      let services = Array.isArray(doc.services) ? doc.services : [];
      let navigation = doc.navigation || {};

      // Filter out old seed go-within and leave-a-mark topics
      experiences = experiences.filter(exp => {
        const slug = (exp.slug || '').toLowerCase();
        const cat = (exp.category || '').toLowerCase();
        if (slug === 'go-within' || slug === 'leave-a-mark' || slug === 'responsible') return false;
        if (slug.includes('singing-bowls') && cat === 'go-within') return false;
        if (slug.includes('pharping') && cat === 'go-within') return false;
        if (slug.includes('namo-buddha') && cat === 'go-within') return false;
        if (slug.includes('monastery-chanting') && cat === 'go-within') return false;
        if (cat === 'leave-a-mark') return false;
        return true;
      });

      services = services.filter(s => {
        const slug = (s.slug || '').toLowerCase();
        const cat = (s.category || '').toLowerCase();
        if (slug === 'go-within' || slug === 'leave-a-mark') return false;
        if (cat === 'go-within' || cat === 'leave-a-mark') return false;
        return true;
      });

      if (navigation && Array.isArray(navigation.header)) {
        navigation.header = navigation.header.map(item => {
          if (item.label && item.label.toUpperCase() === 'EXPERIENCES') {
            item.children = [
              {
                id: 'nav-beyond',
                label: 'Beyond the Map',
                url: '/experiences/beyond-the-map',
                description: 'Living courtyards, medieval stone mysteries & master artisan guilds.',
                badge: 'Exploration',
                icon: 'Compass',
                visible: true,
                order: 1
              },
              {
                id: 'nav-spiritual',
                label: 'Go Spiritual',
                url: '/experiences/go-spiritual',
                description: 'Sound therapy, dawn monastery chant pujas & sacred meditation retreats.',
                badge: 'Spiritual',
                icon: 'Heart',
                visible: true,
                order: 2
              },
              {
                id: 'nav-homestays',
                label: 'Feel Closer',
                url: '/experiences/homestays',
                description: 'Authentic family village homestays, hearthside cooking & mountain warmth.',
                badge: 'Homestays',
                icon: 'Home',
                visible: true,
                order: 3
              },
              {
                id: 'nav-custom',
                label: 'Custom Private Journeys',
                url: '/experiences/custom-journeys',
                description: '100% tailor-made itineraries for solo travelers, couples & families with Sakar.',
                badge: 'Bespoke',
                icon: 'ShieldCheck',
                visible: true,
                order: 4
              }
            ];
          }
          return item;
        });
      }

      await col.updateOne(
        { _id: 'active_store' },
        {
          $set: {
            experiences,
            services,
            navigation,
            lastUpdated: new Date().toISOString()
          }
        }
      );
      console.log(`[${dbName}] Successfully updated active_store in MongoDB.`);
    } else {
      console.log(`[${dbName}] active_store document not found.`);
    }
  }

  // Update data/cms-store.json locally
  if (fs.existsSync(cmsStorePath)) {
    try {
      const localStore = JSON.parse(fs.readFileSync(cmsStorePath, 'utf8'));
      if (Array.isArray(localStore.experiences)) {
        localStore.experiences = localStore.experiences.filter(exp => {
          const slug = (exp.slug || '').toLowerCase();
          const cat = (exp.category || '').toLowerCase();
          if (slug === 'go-within' || slug === 'leave-a-mark' || slug === 'responsible') return false;
          if (cat === 'leave-a-mark') return false;
          return true;
        });
      }
      fs.writeFileSync(cmsStorePath, JSON.stringify(localStore, null, 2), 'utf8');
      console.log("Updated data/cms-store.json locally.");
    } catch (e) {
      console.error("Error updating local cms-store.json:", e);
    }
  }

  await client.close();
  console.log("Done syncing MongoDB databases.");
}

main().catch(console.error);
