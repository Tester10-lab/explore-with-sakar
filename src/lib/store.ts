import fs from 'fs';
import path from 'path';
import { getDb, MongoUnavailableError } from './mongodb';
import { getSeedForKey, getSeedStoreFromDisk } from './seed';
import { ContactInquiry } from '@/types/cms';
import { runPendingMigrations, runPendingFileMigrations } from './migrations';

const IS_DEV = process.env.NODE_ENV !== 'production' && !process.env.VERCEL;
const DEV_FILE_DIR = path.join(process.cwd(), '.data');
const DEV_FILE_PATH = path.join(DEV_FILE_DIR, 'dev-store.json');

/**
 * Module-level flag: set to true once migrations have been verified in this process instance.
 * On Vercel serverless, each cold start gets a fresh process (flag starts false, migrations run).
 * On warm invocations, the flag is already true so we skip the extra MongoDB round-trip.
 * This eliminates 1–3 redundant migration-check queries per warm request.
 */
let migrationsVerifiedInProcess = false;
let migrationsPromise: Promise<void> | null = null;

async function ensureMigrations(db: import('mongodb').Db): Promise<void> {
  if (migrationsVerifiedInProcess) return;
  if (!migrationsPromise) {
    migrationsPromise = (async () => {
      try {
        await runPendingMigrations(db);
        migrationsVerifiedInProcess = true;
      } finally {
        if (!migrationsVerifiedInProcess) {
          migrationsPromise = null;
        }
      }
    })();
  }
  await migrationsPromise;
}

function isDevFileStorage(): boolean {
  return Boolean(IS_DEV && (process.env.CMS_STORAGE === 'file' || !process.env.MONGODB_URI));
}

interface CacheEntry {
  data: any;
  timestamp: number;
}
const readCache = new Map<string, CacheEntry>();
const READ_CACHE_TTL_MS = 30000; // 30 seconds TTL for fast responses (instantly cleared on writeKey)

export function invalidateStoreCache(key?: string): void {
  if (key) {
    readCache.delete(key);
  } else {
    readCache.clear();
  }
}

function readDevFileStore(): Record<string, any> {
  if (!fs.existsSync(DEV_FILE_PATH)) {
    const seedStore = getSeedStoreFromDisk();
    try {
      if (!fs.existsSync(DEV_FILE_DIR)) {
        fs.mkdirSync(DEV_FILE_DIR, { recursive: true });
      }
      fs.writeFileSync(DEV_FILE_PATH, JSON.stringify(seedStore, null, 2), 'utf-8');
    } catch (e) {
      console.error('[store] Error creating dev-store.json:', e);
    }
    return seedStore as unknown as Record<string, any>;
  }
  try {
    return JSON.parse(fs.readFileSync(DEV_FILE_PATH, 'utf-8'));
  } catch (err) {
    console.error('[store] Error reading dev-store.json:', err);
    return getSeedStoreFromDisk() as unknown as Record<string, any>;
  }
}

function writeDevFileStore(store: Record<string, any>): void {
  try {
    if (!fs.existsSync(DEV_FILE_DIR)) {
      fs.mkdirSync(DEV_FILE_DIR, { recursive: true });
    }
    const tempFile = `${DEV_FILE_PATH}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(store, null, 2), 'utf-8');
    fs.renameSync(tempFile, DEV_FILE_PATH);
  } catch (err) {
    console.error('[store] Error writing dev-store.json:', err);
    throw err;
  }
}

/**
 * Normalizes document shapes without ever restoring default content if an array is empty.
 */
function normalizeCollectionShape(key: string, value: any): any {
  if (value === undefined || value === null) {
    return value;
  }
  // If it's an array, ensure it is returned as an array; never re-populate empty array with defaults.
  if (Array.isArray(value)) {
    return value;
  }
  return value;
}

/**
 * Read a single collection key from MongoDB via projection.
 * If key is missing in the database document, seeds it atomically and only once.
 * Falls back to read-only in-memory seed if MongoDB is unavailable.
 */
export async function readKey<T = any>(key: string, options?: { throwOnError?: boolean }): Promise<T> {
  const cached = readCache.get(key);
  if (cached && Date.now() - cached.timestamp < READ_CACHE_TTL_MS) {
    return cached.data as T;
  }

  const startTime = Date.now();

  // 1. Check if offline file dev mode is enabled
  if (isDevFileStorage()) {
    const store = readDevFileStore();
    const migrated = runPendingFileMigrations(store);
    let val = store[key];
    if (val === undefined) {
      val = getSeedForKey(key);
      store[key] = val;
      writeDevFileStore(store);
    } else if (migrated) {
      writeDevFileStore(store);
    }
    const elapsed = Date.now() - startTime;
    if (IS_DEV) {
      console.log(`[store] read ${key} ${elapsed}ms (file)`);
    }
    const res = normalizeCollectionShape(key, val) as T;
    readCache.set(key, { data: res, timestamp: Date.now() });
    return res;
  }

  // 2. Read from MongoDB with single-field projection
  try {
    const db = await getDb();
    await ensureMigrations(db);
    const col = db.collection('cms_store');

    // Fetch only the requested field
    let doc = await col.findOne(
      { _id: 'active_store' as any },
      { projection: { [key]: 1 } }
    );

    // If active_store or key does not exist yet, atomically seed it using pipeline update
    if (!doc || doc[key] === undefined) {
      const seedVal = getSeedForKey(key);
      await col.updateOne(
        { _id: 'active_store' as any },
        [{ $set: { [key]: { $ifNull: [`$${key}`, { $literal: seedVal }] }, lastUpdated: new Date().toISOString() } }],
        { upsert: true }
      );
      doc = await col.findOne(
        { _id: 'active_store' as any },
        { projection: { [key]: 1 } }
      );
    }

    const elapsed = Date.now() - startTime;
    if (IS_DEV) {
      console.log(`[store] read ${key} ${elapsed}ms`);
    }

    let val = doc ? doc[key] : undefined;
    if (val === undefined) {
      val = getSeedForKey(key);
    }
    // For blogs specifically: if MongoDB returned an empty array AND this is a fresh/unseeded DB,
    // the auto-seed pipeline update above already seeded it. If it's still empty after that, it means
    // someone intentionally deleted all blogs — respect that and return empty, not seed data.
    // (The previous unconditional blogs-empty fallback was overriding intentional empty state.)
    const res = normalizeCollectionShape(key, val) as T;
    readCache.set(key, { data: res, timestamp: Date.now() });
    return res;
  } catch (err: any) {
    if (options?.throwOnError) {
      throw err;
    }
    const elapsed = Date.now() - startTime;
    if (IS_DEV) {
      console.warn(`[store] read ${key} ${elapsed}ms (fallback to seed due to: ${err.message})`);
    }
    // Mongo unreachable: reads come from the seed file (read-only, in memory)
    const seedVal = getSeedForKey(key);
    const res = normalizeCollectionShape(key, seedVal) as T;
    readCache.set(key, { data: res, timestamp: Date.now() });
    return res;
  }
}

/**
 * Write a single collection key to MongoDB via $set.
 * Throws MongoUnavailableError on failure. Never falls back to local disk writes on Mongo failure.
 */
export async function writeKey<T = any>(key: string, value: T): Promise<void> {
  invalidateStoreCache(key);
  const lastUpdated = new Date().toISOString();

  if (isDevFileStorage()) {
    const store = readDevFileStore();
    runPendingFileMigrations(store);
    store[key] = value;
    store.lastUpdated = lastUpdated;
    writeDevFileStore(store);
    return;
  }

  const db = await getDb();
  await ensureMigrations(db);
  const col = db.collection('cms_store');
  await col.updateOne(
    { _id: 'active_store' as any },
    { $set: { [key]: value, lastUpdated } },
    { upsert: true }
  );
}

/**
 * Atomic inquiry creation: pushes to the front of the inquiries array.
 */
export async function pushInquiry(inquiry: ContactInquiry): Promise<void> {
  invalidateStoreCache('inquiries');
  const lastUpdated = new Date().toISOString();

  if (isDevFileStorage()) {
    const store = readDevFileStore();
    runPendingFileMigrations(store);
    if (!Array.isArray(store.inquiries)) {
      store.inquiries = [];
    }
    store.inquiries.unshift(inquiry);
    store.lastUpdated = lastUpdated;
    writeDevFileStore(store);
    return;
  }

  const db = await getDb();
  await ensureMigrations(db);
  const col = db.collection('cms_store');
  await col.updateOne(
    { _id: 'active_store' as any },
    {
      $push: { inquiries: { $each: [inquiry], $position: 0 } as any },
      $set: { lastUpdated },
    },
    { upsert: true }
  );
}

/**
 * Atomic inquiry update using arrayFilters (no read-modify-write).
 */
export async function updateInquiryById(id: string, updates: Partial<ContactInquiry>): Promise<boolean> {
  invalidateStoreCache('inquiries');
  const lastUpdated = new Date().toISOString();

  if (isDevFileStorage()) {
    const store = readDevFileStore();
    runPendingFileMigrations(store);
    const list = store.inquiries || [];
    const idx = list.findIndex((inq: any) => inq.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...updates, updatedAt: lastUpdated };
    store.lastUpdated = lastUpdated;
    writeDevFileStore(store);
    return true;
  }

  const db = await getDb();
  await ensureMigrations(db);
  const col = db.collection('cms_store');

  const setFields: Record<string, any> = { lastUpdated };
  for (const [k, v] of Object.entries(updates)) {
    setFields[`inquiries.$[elem].${k}`] = v;
  }
  setFields['inquiries.$[elem].updatedAt'] = lastUpdated;

  const result = await col.updateOne(
    { _id: 'active_store' as any },
    { $set: setFields },
    { arrayFilters: [{ 'elem.id': id }] }
  );
  return result.modifiedCount > 0;
}

/**
 * Atomic inquiry deletion using $pull (no read-modify-write).
 */
export async function deleteInquiryById(id: string): Promise<boolean> {
  invalidateStoreCache('inquiries');
  const lastUpdated = new Date().toISOString();

  if (isDevFileStorage()) {
    const store = readDevFileStore();
    runPendingFileMigrations(store);
    const list = store.inquiries || [];
    const initialLen = list.length;
    store.inquiries = list.filter((inq: any) => inq.id !== id);
    if (store.inquiries.length !== initialLen) {
      store.lastUpdated = lastUpdated;
      writeDevFileStore(store);
      return true;
    }
    return false;
  }

  const db = await getDb();
  await ensureMigrations(db);
  const col = db.collection('cms_store');
  const result = await col.updateOne(
    { _id: 'active_store' as any },
    {
      $pull: { inquiries: { id } as any },
      $set: { lastUpdated },
    }
  );
  return result.modifiedCount > 0;
}
