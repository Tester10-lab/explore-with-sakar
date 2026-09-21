import { MongoClient } from 'mongodb';
import dns from 'dns';

if (process.env.MONGODB_DNS_SERVERS && typeof dns.setServers === 'function') {
  dns.setServers(process.env.MONGODB_DNS_SERVERS.split(','));
}

import fs from 'fs';

if (!process.env.MONGODB_URI && fs.existsSync('.env.local')) {
  for (const line of fs.readFileSync('.env.local', 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const k = trimmed.slice(0, idx).trim();
        const v = trimmed.slice(idx + 1).trim();
        if (!process.env[k]) process.env[k] = v;
      }
    }
  }
}

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || 'explore_with_sakar_dev';

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required.');
}
if (!DB_NAME.endsWith('_dev') && !DB_NAME.endsWith('_test')) {
  throw new Error(`SAFETY: MONGODB_DB must end in _dev or _test (got: ${DB_NAME}). Refusing to run against production.`);
}

async function main() {
  console.log(`Connecting to Atlas dev database: ${DB_NAME}...`);
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const col = db.collection('cms_store');

  console.log(`Connected to Atlas: ${DB_NAME}`);
  const activeDoc = await col.findOne({ _id: 'active_store' });
  console.log(`Atlas active_store document exists: ${Boolean(activeDoc)}`);
  console.log(`Current migrations array:`, activeDoc?.migrations || []);

  const testMigrationId = `test-migration-${Date.now()}`;
  console.log(`Testing atomic lock with ID: ${testMigrationId}`);

  // Run 1: initial run
  const res1 = await col.updateOne(
    { _id: 'active_store', migrations: { $ne: testMigrationId } },
    {
      $addToSet: { migrations: testMigrationId },
      $set: { lastUpdated: new Date().toISOString() }
    }
  );
  console.log(`Attempt 1 modifiedCount: ${res1.modifiedCount} (Expected: 1)`);

  // Run 2: duplicate run
  const res2 = await col.updateOne(
    { _id: 'active_store', migrations: { $ne: testMigrationId } },
    {
      $addToSet: { migrations: testMigrationId },
      $set: { lastUpdated: new Date().toISOString() }
    }
  );
  console.log(`Attempt 2 modifiedCount: ${res2.modifiedCount} (Expected: 0)`);

  // Clean up
  await col.updateOne(
    { _id: 'active_store' },
    { $pull: { migrations: testMigrationId } }
  );
  console.log('Cleaned up test migration marker from active_store.');

  await client.close();

  const pass = res1.modifiedCount === 1 && res2.modifiedCount === 0;
  console.log(`\n=== Migration Mechanism Check Result: ${pass ? 'PASS' : 'FAIL'} ===`);
  process.exit(pass ? 0 : 1);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
