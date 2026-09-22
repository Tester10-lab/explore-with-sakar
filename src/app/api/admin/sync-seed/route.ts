export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest, getAdminSession } from '@/lib/auth';
import { getDb, MongoUnavailableError } from '@/lib/mongodb';
import { getSeedForKey } from '@/lib/seed';
import { invalidateStoreCache } from '@/lib/store';
import { revalidateTag } from 'next/cache';

/**
 * Auth check that falls back to a shared secret key when the admin session is broken.
 * This allows the endpoint to be called even when ADMIN_JWT_SECRET differs between
 * environments (which is the root cause of admin APIs returning 401 in production).
 */
async function isAuthorized(req: NextRequest): Promise<boolean> {
  // Option 1: valid admin session cookie
  try {
    const session = getSessionFromRequest(req) || (await getAdminSession(req));
    if (session) return true;
  } catch {
    // session check may throw if ADMIN_JWT_SECRET is missing — fall through
  }
  // Option 2: SYNC_SECRET header for bootstrapping (set in Vercel env)
  const syncSecret = process.env.SYNC_SECRET || process.env.ADMIN_JWT_SECRET;
  const headerSecret = req.headers.get('x-sync-secret');
  if (syncSecret && headerSecret === syncSecret) return true;
  return false;
}

/**
 * POST /api/admin/sync-seed
 *
 * Pushes seed data from data/cms-store.json into the production MongoDB
 * active_store document WITHOUT overwriting existing data that has been
 * edited by the admin.
 *
 * Strategy per field:
 *   - blogs:       $set only if field is missing OR empty (preserves edited blogs)
 *   - experiences: $set only if field is missing OR empty
 *   - All other fields: never overwritten (navigation, settings, etc. are admin-managed)
 *
 * Returns safe counts. Does not expose credentials.
 *
 * This endpoint is intentionally admin-only.
 * Remove or disable once the initial sync is confirmed.
 */
export async function POST(req: NextRequest) {
  const authorized = await isAuthorized(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized — provide admin session or x-sync-secret header' }, { status: 401 });
  }

  let body: { fields?: string[]; force?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    // default: sync blogs and experiences
  }

  const fieldsToSync: string[] = body.fields || ['blogs', 'experiences'];
  const force = Boolean(body.force); // if true, overwrites existing non-empty data

  const report: Record<string, any> = {};

  try {
    const db = await getDb();
    const col = db.collection('cms_store');

    // Read current active_store to decide what needs seeding
    const projection: Record<string, 1> = { _id: 1 };
    for (const f of fieldsToSync) {
      projection[f] = 1;
    }
    const existing = await col.findOne({ _id: 'active_store' as any }, { projection });

    const setPayload: Record<string, any> = { lastUpdated: new Date().toISOString() };

    for (const field of fieldsToSync) {
      const currentVal = existing ? existing[field] : undefined;
      const isEmpty =
        currentVal === undefined ||
        currentVal === null ||
        (Array.isArray(currentVal) && currentVal.length === 0);

      if (isEmpty || force) {
        const seedData = getSeedForKey(field);
        if (seedData !== undefined && seedData !== null) {
          setPayload[field] = seedData;
          report[field] = {
            action: force && !isEmpty ? 'overwritten (force=true)' : 'seeded (was empty)',
            count: Array.isArray(seedData) ? seedData.length : 'object',
          };
        } else {
          report[field] = { action: 'skipped (no seed data)', count: 0 };
        }
      } else {
        report[field] = {
          action: 'skipped (already has data)',
          count: Array.isArray(currentVal) ? currentVal.length : 'object',
        };
      }
    }

    // Write all fields that need syncing in one operation
    const syncedFields = Object.keys(setPayload).filter((k) => k !== 'lastUpdated');
    if (syncedFields.length > 0) {
      await col.updateOne(
        { _id: 'active_store' as any },
        { $set: setPayload },
        { upsert: true }
      );

      // Invalidate in-process cache and Next.js data cache for synced fields
      for (const field of syncedFields) {
        invalidateStoreCache(field);
        try {
          revalidateTag(`cms:${field}`);
        } catch {
          // revalidateTag may not be available in all contexts
        }
      }
    }

    return NextResponse.json({
      success: true,
      database: process.env.MONGODB_DB || 'explore_with_sakar',
      syncedFields,
      report,
    });
  } catch (err: any) {
    const isUnavailable = err instanceof MongoUnavailableError;
    return NextResponse.json(
      {
        success: false,
        error: isUnavailable ? 'MongoDB unavailable' : err.message || String(err),
      },
      { status: isUnavailable ? 503 : 500 }
    );
  }
}
