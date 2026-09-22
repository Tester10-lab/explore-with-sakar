import { MongoClient, Db } from 'mongodb';
import dns from 'dns';

export class MongoUnavailableError extends Error {
  constructor(message = 'Database unavailable.') {
    super(message);
    this.name = 'MongoUnavailableError';
  }
}

// Apply custom DNS servers only when MONGODB_DNS_SERVERS is explicitly set
if (process.env.MONGODB_DNS_SERVERS && typeof dns.setServers === 'function') {
  try {
    const servers = process.env.MONGODB_DNS_SERVERS.split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (servers.length > 0) {
      dns.setServers(servers);
    }
  } catch (err) {
    console.warn('[mongodb] Failed to set custom DNS servers:', err);
  }
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let lastFailureTime = 0;
const FAILURE_COOLDOWN_MS = 10000; // 10s cooldown before retrying connection
let hasWarnedMissingUriDev = false;

export function isMongoCoolingDown(): boolean {
  return Date.now() - lastFailureTime < FAILURE_COOLDOWN_MS;
}

export function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  const isProduction = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);

  // During `next build`, never try to connect — use seed data instead.
  // NEXT_PHASE is set by Next.js to 'phase-production-build' during `next build`.
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    throw new MongoUnavailableError('Skipping MongoDB during build phase — seed data will be used.');
  }

  if (!uri) {
    if (isProduction) {
      console.warn('[mongodb] MONGODB_URI environment variable is missing in production. Falling back to seed data.');
      throw new MongoUnavailableError('MONGODB_URI environment variable is missing.');
    }
    if (!hasWarnedMissingUriDev) {
      console.warn('[mongodb] MONGODB_URI is not set in development. Using file/seed mode.');
      hasWarnedMissingUriDev = true;
    }
    throw new MongoUnavailableError('MONGODB_URI is not set.');
  }

  const now = Date.now();
  if (lastFailureTime > 0 && now - lastFailureTime < FAILURE_COOLDOWN_MS) {
    throw new MongoUnavailableError('MongoDB connection in cooldown period after recent failure.');
  }

  if (globalThis._mongoClientPromise) {
    return globalThis._mongoClientPromise;
  }

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
  });

  const promise = client
    .connect()
    .then((c) => {
      lastFailureTime = 0;
      return c;
    })
    .catch((err) => {
      lastFailureTime = Date.now();
      globalThis._mongoClientPromise = undefined;
      throw new MongoUnavailableError(`MongoDB connection error: ${err.message || err}`);
    });

  globalThis._mongoClientPromise = promise;
  return promise;
}

export default getMongoClient;

export async function getDb(): Promise<Db> {
  try {
    const client = await getMongoClient();
    const dbName = process.env.MONGODB_DB || 'explore_with_sakar';
    return client.db(dbName);
  } catch (err: any) {
    if (err instanceof MongoUnavailableError) {
      throw err;
    }
    throw new MongoUnavailableError(err.message || 'Database unavailable');
  }
}
