import { MongoClient } from 'mongodb';
import crypto from 'crypto';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || 'explore_with_sakar_dev';

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI environment variable is not set.');
  process.exit(1);
}

function hashPassword(password, salt) {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, generatedSalt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt: generatedSalt };
}

async function main() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  // Check current admin document
  const doc = await db.collection('cms_data').findOne({ key: 'admin' });
  console.log('\n=== Current admin doc ===');
  console.log(JSON.stringify(doc?.value || doc, null, 2));

  // Test if 'sakar2026' matches the stored hash
  if (doc?.value?.passwordHash && doc?.value?.salt) {
    const { hash } = hashPassword('sakar2026', doc.value.salt);
    const match = hash === doc.value.passwordHash;
    console.log('\n=== Password check: "sakar2026" ===');
    console.log('Matches stored hash:', match);

    const { hash: hash2 } = hashPassword('sakar@admin2026', doc.value.salt);
    const match2 = hash2 === doc.value.passwordHash;
    console.log('Matches stored hash: "sakar@admin2026":', match2);
  } else {
    console.log('\nNo admin doc found in DB — will be created on first login using default password.');
  }

  await client.close();
}

main().catch(console.error);
