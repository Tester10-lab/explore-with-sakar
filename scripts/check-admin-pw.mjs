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

  // Test if configured password matches the stored hash
  const testPw = process.env.ADMIN_PASSWORD;
  if (doc?.value?.passwordHash && doc?.value?.salt && testPw) {
    const { hash } = hashPassword(testPw, doc.value.salt);
    const match = hash === doc.value.passwordHash;
    console.log('\n=== Password check for configured ADMIN_PASSWORD ===');
    console.log('Matches stored hash:', match);
  } else if (!testPw) {
    console.log('\nADMIN_PASSWORD environment variable not set.');
  } else {
    console.log('\nNo admin doc found in DB.');
  }

  await client.close();
}

main().catch(console.error);
