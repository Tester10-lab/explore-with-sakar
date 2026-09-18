import { MongoClient, Db } from 'mongodb';
import dns from 'dns';

// Configure DNS resolution fallback for SRV lookups if needed
if (typeof dns.setServers === 'function') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch {
    // In restricted runtimes, ignore
  }
}

const DEFAULT_URI =
  'mongodb+srv://explorewithsakar_db_user:SakarTravel2026@cluster0.1dq7qw7.mongodb.net/explore_with_sakar?retryWrites=true&w=majority&appName=Cluster0';

const uri = process.env.MONGODB_URI || DEFAULT_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;

export async function getDb(): Promise<Db | null> {
  try {
    const c = await clientPromise;
    return c.db('explore_with_sakar');
  } catch (err) {
    console.error('MongoDB connection error in getDb():', err);
    return null;
  }
}
