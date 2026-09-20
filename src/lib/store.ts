import fs from 'fs';
import path from 'path';
import { getDb, MongoUnavailableError } from './mongodb';
import { getSeedForKey, getSeedStoreFromDisk } from './seed';
import { ContactInquiry } from '@/types/cms';

const IS_DEV = process.env.NODE_ENV !== 'production' && !process.env.VERCEL;
const DEV_FILE_DIR = path.join(process.cwd(), '.data');
const DEV_FILE_PATH = path.join(DEV_FILE_DIR, 'dev-store.json');

function isDevFileStorage(): boolean {
  return Boolean(IS_DEV && process.env.CMS_STORAGE === 'file');
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
  const startTime = Date.now();

  // 1. Check if offline file dev mode is enabled
  if (isDevFileStorage()) {
    const store = readDevFileStore();
    let val = store[key];
    if (val === undefined) {
      val = getSeedForKey(key);
      store[key] = val;
      writeDevFileStore(store);
    }
    const elapsed = Date.now() - startTime;
    if (IS_DEV) {
      console.log(`[store] read ${key} ${elapsed}ms (file)`);
    }
    return normalizeCollectionShape(key, val) as T;
  }

  // 2. Read from MongoDB with single-field projection
  try {
    const db = await getDb();
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

    const val = doc ? doc[key] : getSeedForKey(key);
    return normalizeCollectionShape(key, val) as T;
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
    return normalizeCollectionShape(key, seedVal) as T;
  }
}

/**
 * Write a single collection key to MongoDB via $set.
 * Throws MongoUnavailableError on failure. Never falls back to local disk writes on Mongo failure.
 */
export async function writeKey<T = any>(key: string, value: T): Promise<void> {
  const lastUpdated = new Date().toISOString();

  if (isDevFileStorage()) {
    const store = readDevFileStore();
    store[key] = value;
    store.lastUpdated = lastUpdated;
    writeDevFileStore(store);
    return;
  }

  const db = await getDb();
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
  const lastUpdated = new Date().toISOString();

  if (isDevFileStorage()) {
    const store = readDevFileStore();
    if (!Array.isArray(store.inquiries)) {
      store.inquiries = [];
    }
    store.inquiries.unshift(inquiry);
    store.lastUpdated = lastUpdated;
    writeDevFileStore(store);
    return;
  }

  const db = await getDb();
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
  const lastUpdated = new Date().toISOString();

  if (isDevFileStorage()) {
    const store = readDevFileStore();
    const list = store.inquiries || [];
    const idx = list.findIndex((inq: any) => inq.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...updates, updatedAt: lastUpdated };
    store.lastUpdated = lastUpdated;
    writeDevFileStore(store);
    return true;
  }

  const db = await getDb();
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
  const lastUpdated = new Date().toISOString();

  if (isDevFileStorage()) {
    const store = readDevFileStore();
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
