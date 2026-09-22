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

// Check cms-store.json
const storePath = path.resolve(process.cwd(), 'data', 'cms-store.json');
const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));

console.log('--- Canonical cms-store.json ---');
console.log('Blogs in cms-store.json:', store.blogs?.length || 0);
console.log('Experiences in cms-store.json:', store.experiences?.length || 0);

// Check src/data/blog.ts
const blogTsPath = path.resolve(process.cwd(), 'src', 'data', 'blog.ts');
const blogTsContent = fs.readFileSync(blogTsPath, 'utf8');
const slugMatches = [...blogTsContent.matchAll(/"slug":\s*"([^"]+)"/g)].map(m => m[1]);
const uniqueSlugs = new Set(slugMatches);
console.log('--- Static Fallback src/data/blog.ts ---');
console.log('Total blog items in blog.ts:', slugMatches.length);
console.log('Unique blog slugs in blog.ts:', uniqueSlugs.size);


async function checkMongo() {
  if (!process.env.MONGODB_URI) {
    console.log('No MONGODB_URI found.');
    return;
  }
  const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    for (const dbName of ['explore_with_sakar_dev', 'explore_with_sakar']) {
      try {
        const db = client.db(dbName);
        const doc = await db.collection('cms_store').findOne(
          { _id: 'active_store' },
          { projection: { 'blogs.id': 1, 'blogs.slug': 1, 'experiences.id': 1, 'experiences.slug': 1 } }
        );
        if (doc) {
          const blogs = doc.blogs || [];
          const blogIds = new Set(blogs.map(b => b.id));
          const blogSlugs = new Set(blogs.map(b => b.slug));
          const exps = doc.experiences || [];
          console.log(`--- MongoDB ${dbName} ---`);
          console.log(`Blogs count: ${blogs.length} (Unique IDs: ${blogIds.size}, Unique Slugs: ${blogSlugs.size})`);
          console.log(`Experiences count: ${exps.length}`);
        }
      } catch (err) {
        console.log(`Error checking ${dbName}:`, err.message);
      }
    }
  } finally {
    await client.close();
  }
}

checkMongo().catch(console.error);
