import fs from 'fs';
import path from 'path';
import dns from 'dns';
import { MongoClient } from 'mongodb';

// 1. Load .env.local
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

// Apply custom DNS servers for SRV resolution
if (process.env.MONGODB_DNS_SERVERS && typeof dns.setServers === 'function') {
  try {
    const servers = process.env.MONGODB_DNS_SERVERS.split(',').map((s) => s.trim()).filter(Boolean);
    if (servers.length > 0) {
      dns.setServers(servers);
    }
  } catch (err) {
    console.warn('Failed to set custom DNS servers:', err);
  }
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Error: MONGODB_URI not found in environment or .env.local');
  process.exit(1);
}

// 2. Load canonical blogs from data/cms-store.json
const cmsStorePath = path.resolve(process.cwd(), 'data', 'cms-store.json');
if (!fs.existsSync(cmsStorePath)) {
  console.error(`Error: Canonical CMS file not found at ${cmsStorePath}`);
  process.exit(1);
}

const cmsData = JSON.parse(fs.readFileSync(cmsStorePath, 'utf8'));
const canonicalBlogs = Array.isArray(cmsData.blogs) ? cmsData.blogs : [];

async function syncDbCollection(db) {
  const col = db.collection('cms_store');

  // Fast projection: fetch only id and slug of existing blogs
  const doc = await col.findOne(
    { _id: 'active_store' },
    { projection: { 'blogs.id': 1, 'blogs.slug': 1 } }
  );

  const existingMeta = doc && Array.isArray(doc.blogs) ? doc.blogs : [];
  const existingIds = new Set(existingMeta.map((b) => b.id).filter(Boolean));
  const existingSlugs = new Set(existingMeta.map((b) => b.slug).filter(Boolean));

  const missingBlogs = [];
  for (const cBlog of canonicalBlogs) {
    const exists = (cBlog.id && existingIds.has(cBlog.id)) || (cBlog.slug && existingSlugs.has(cBlog.slug));
    if (!exists) {
      missingBlogs.push({
        ...cBlog,
        id: cBlog.id || `blog-${Date.now()}-${cBlog.slug}`,
        status: cBlog.status || 'published',
        createdAt: cBlog.createdAt || new Date().toISOString(),
        updatedAt: cBlog.updatedAt || new Date().toISOString(),
      });
    }
  }

  const existingCount = existingMeta.length;
  const insertedCount = missingBlogs.length;
  const preservedCount = existingCount;

  // Insert missing records without overwriting or downloading existing records
  if (missingBlogs.length > 0) {
    await col.updateOne(
      { _id: 'active_store' },
      {
        $push: { blogs: { $each: missingBlogs } },
        $set: { lastUpdated: new Date().toISOString() },
        $addToSet: { migrations: '2026-sync-all-37-blogs' },
      },
      { upsert: true }
    );
  } else {
    // Ensure migration marker is set
    await col.updateOne(
      { _id: 'active_store' },
      { $addToSet: { migrations: '2026-sync-all-37-blogs' } }
    );
  }

  // Verify final count and detect any duplicates
  const verifyDoc = await col.findOne(
    { _id: 'active_store' },
    { projection: { 'blogs.id': 1, 'blogs.slug': 1 } }
  );
  const finalMeta = verifyDoc && Array.isArray(verifyDoc.blogs) ? verifyDoc.blogs : [];

  const idCounts = new Map();
  const slugCounts = new Map();
  let duplicateIds = 0;
  let duplicateSlugs = 0;

  for (const b of finalMeta) {
    if (b.id) idCounts.set(b.id, (idCounts.get(b.id) || 0) + 1);
    if (b.slug) slugCounts.set(b.slug, (slugCounts.get(b.slug) || 0) + 1);
  }

  for (const count of idCounts.values()) {
    if (count > 1) duplicateIds += (count - 1);
  }
  for (const count of slugCounts.values()) {
    if (count > 1) duplicateSlugs += (count - 1);
  }

  return {
    canonicalCount: canonicalBlogs.length,
    existingCount,
    missingCount: insertedCount,
    insertedCount,
    preservedCount,
    duplicateIds,
    duplicateSlugs,
    finalCount: finalMeta.length,
  };
}

async function main() {
  const activeDbName = process.env.MONGODB_DB || 'explore_with_sakar_dev';

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });

  try {
    await client.connect();
    console.log('MongoDB connection: SUCCESS');

    // Sync explore_with_sakar (production database) if it exists
    try {
      const prodDb = client.db('explore_with_sakar');
      const prodCols = await prodDb.listCollections().toArray();
      if (prodCols.some((c) => c.name === 'cms_store')) {
        const prodResult = await syncDbCollection(prodDb);
        // If activeDbName is explore_with_sakar, print its result
        if (activeDbName === 'explore_with_sakar') {
          printSummary(prodResult);
          return;
        }
      }
    } catch {
      // Best effort
    }

    // Sync active database
    const activeDb = client.db(activeDbName);
    const result = await syncDbCollection(activeDb);
    printSummary(result);
  } catch (err) {
    console.error('MongoDB sync error:', err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

function printSummary(result) {
  console.log(`Canonical blogs: ${result.canonicalCount}`);
  console.log(`Existing MongoDB blogs: ${result.existingCount}`);
  console.log(`Missing blogs: ${result.missingCount}`);
  console.log(`Inserted: ${result.insertedCount}`);
  console.log(`Preserved existing: ${result.preservedCount}`);
  console.log(`Duplicate IDs: ${result.duplicateIds}`);
  console.log(`Duplicate slugs: ${result.duplicateSlugs}`);
  console.log(`Final MongoDB blog count: ${result.finalCount}`);

  if (result.finalCount === 37 && result.duplicateIds === 0 && result.duplicateSlugs === 0) {
    console.log('BLOG SYNC: SUCCESS');
  } else {
    console.error(`BLOG SYNC: FAILED (Expected 37, got ${result.finalCount})`);
    process.exit(1);
  }
}

main();
