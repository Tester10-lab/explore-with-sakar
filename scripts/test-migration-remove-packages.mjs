import { MongoClient } from 'mongodb';
import fs from 'fs';
import dns from 'dns';

if (process.env.MONGODB_DNS_SERVERS && typeof dns.setServers === 'function') {
  dns.setServers(process.env.MONGODB_DNS_SERVERS.split(','));
}

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

async function main() {
  console.log(`Connecting to ${DB_NAME}...`);
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const col = db.collection('cms_store');

  console.log('--- Step 1: Simulate pre-migration database state ---');
  // Add packages page and packages nav link
  await col.updateOne(
    { _id: 'active_store' },
    {
      $pull: {
        migrations: '2026-remove-packages',
        pages: { slug: 'packages' },
        'navigation.mainNav': { url: '/packages' }
      }
    }
  );

  await col.updateOne(
    { _id: 'active_store' },
    {
      $push: {
        pages: { slug: 'packages', name: 'Legacy Packages', url: '/packages' },
        'navigation.mainNav': { id: 'nav-test-pkg', label: 'Packages', url: '/packages' }
      }
    }
  );

  let doc = await col.findOne({ _id: 'active_store' });
  const hasPrePage = (doc.pages || []).some(p => p.slug === 'packages');
  const hasPreNav = (doc.navigation?.mainNav || []).some(n => n.url === '/packages');
  console.log(`Pre-migration state: pages has /packages: ${hasPrePage}, nav has /packages: ${hasPreNav}`);

  console.log('\n--- Step 2: Run migration 2026-remove-packages (First execution) ---');
  const { runPendingMigrations } = await import('../src/lib/migrations.ts');
  await runPendingMigrations(db);

  doc = await col.findOne({ _id: 'active_store' });
  const hasPostPage = (doc.pages || []).some(p => p.slug === 'packages');
  const hasPostNav = (doc.navigation?.mainNav || []).some(n => n.url === '/packages');
  const migrationRecorded = (doc.migrations || []).includes('2026-remove-packages');
  console.log(`Post-migration state: pages has /packages: ${hasPostPage}, nav has /packages: ${hasPostNav}`);
  console.log(`Migration recorded in migrations array: ${migrationRecorded}`);

  console.log('\n--- Step 3: Run migration second time (Idempotency test) ---');
  // Attempt running again
  await runPendingMigrations(db);
  const doc2 = await col.findOne({ _id: 'active_store' });
  const hasPostPage2 = (doc2.pages || []).some(p => p.slug === 'packages');
  const hasPostNav2 = (doc2.navigation?.mainNav || []).some(n => n.url === '/packages');
  console.log(`Second run state: pages has /packages: ${hasPostPage2}, nav has /packages: ${hasPostNav2}`);

  await client.close();

  const pass = !hasPostPage && !hasPostNav && migrationRecorded && !hasPostPage2 && !hasPostNav2;
  console.log(`\n=== Migration 2026-remove-packages Check: ${pass ? 'PASS' : 'FAIL'} ===`);
  process.exit(pass ? 0 : 1);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
