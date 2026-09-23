import { MongoClient, Db } from 'mongodb';
import dns from 'dns';

export class MongoUnavailableError extends Error {
  constructor(message = 'Database unavailable.') {
    super(message);
    this.name = 'MongoUnavailableError';
  }
}

// Apply custom DNS servers only in local development when explicitly requested.
// On Vercel / AWS Lambda, external UDP port 53 is blocked by security groups,
// which causes dns.setServers(['8.8.8.8']) to hang and drop packets indefinitely.
if (
  process.env.MONGODB_DNS_SERVERS &&
  typeof dns.setServers === 'function' &&
  !process.env.VERCEL &&
  process.env.NODE_ENV !== 'production'
) {
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
// Shorter cooldown (5s) so a transient network blip doesn't block all
// requests for 10 seconds on Vercel serverless warm invocations.
const FAILURE_COOLDOWN_MS = 5000;

let hasWarnedMissingUriDev = false;

export function isMongoCoolingDown(): boolean {
  return Date.now() - lastFailureTime < FAILURE_COOLDOWN_MS;
}

export function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  const isProduction = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);

  // During `next build`, never try to connect — use seed data instead.
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    throw new MongoUnavailableError('Skipping MongoDB during build phase — seed data will be used.');
  }

  if (!uri) {
    if (isProduction) {
      console.warn('[mongodb] MONGODB_URI environment variable is missing in production. Falling back to seed data.');
      console.warn('[mongodb] *** ACTION REQUIRED: Set MONGODB_URI in Vercel project environment variables. ***');
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

  // Reuse cached connection across warm serverless invocations.
  if (globalThis._mongoClientPromise) {
    console.log('[PERF:MONGO:CONNECT_REUSED] using cached MongoClient promise');
    return globalThis._mongoClientPromise;
  }

  console.log('[PERF:MONGO:CONNECT_START] initiating new MongoClient connection...');
  const connectStart = Date.now();

  if (typeof dns.setServers === 'function' && !process.env.VERCEL) {
    try {
      const dnsServers = process.env.MONGODB_DNS_SERVERS || '8.8.8.8,1.1.1.1';
      const servers = dnsServers.split(',').map((s) => s.trim()).filter(Boolean);
      if (servers.length > 0) {
        dns.setServers(servers);
      }
    } catch {
      // ignore
    }
  }

  const client = new MongoClient(uri, {
    // Connection pool: 10 connections is fine for Vercel serverless.
    maxPoolSize: 10,
    // 5s timeouts give Atlas enough headroom on cold starts without blocking
    // requests for too long.
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    timeoutMS: 5000,
    // Keep alive prevents the connection being dropped between warm invocations.
    socketTimeoutMS: 10000,
  });

  const connectionTimeout = new Promise<never>((_, reject) => {
    const timer = setTimeout(() => {
      reject(new MongoUnavailableError('MongoDB connection timed out after 5000ms'));
    }, 5000);
    // Don't keep Node process alive just for the timer if unreferenced
    if (typeof timer.unref === 'function') {
      timer.unref();
    }
  });

  const promise = Promise.race([client.connect(), connectionTimeout])
    .then((c) => {
      lastFailureTime = 0;
      const durationMs = Date.now() - connectStart;
      console.log(`[PERF:MONGO:CONNECT_DONE] durationMs=${durationMs}`);
      if (isProduction) {
        console.log('[mongodb] Connected successfully to Atlas.');
      }
      return c;
    })
    .catch((err) => {
      lastFailureTime = Date.now();
      globalThis._mongoClientPromise = undefined;
      const durationMs = Date.now() - connectStart;
      const msg = `MongoDB connection error: ${err.message || err}`;
      console.error(`[PERF:MONGO:CONNECT_FAIL] durationMs=${durationMs} ${msg}`);
      throw new MongoUnavailableError(msg);
    });

  globalThis._mongoClientPromise = promise;
  return promise;
}

export default getMongoClient;

export async function getDb(): Promise<Db> {
  try {
    const client = await getMongoClient();
    // Default database name matches the production Atlas database.
    // Set MONGODB_DB in Vercel env vars to override (e.g. explore_with_sakar_dev for staging).
    const dbName = process.env.MONGODB_DB || 'explore_with_sakar';
    return client.db(dbName);
  } catch (err: any) {
    if (err instanceof MongoUnavailableError) {
      throw err;
    }
    throw new MongoUnavailableError(err.message || 'Database unavailable');
  }
}
