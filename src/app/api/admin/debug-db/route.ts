export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest, getAdminSession } from '@/lib/auth';
import { getDb, MongoUnavailableError } from '@/lib/mongodb';

async function isAuthorized(req: NextRequest): Promise<boolean> {
  try {
    const session = getSessionFromRequest(req) || (await getAdminSession(req));
    if (session) return true;
  } catch {
    // session check may throw if ADMIN_JWT_SECRET is missing
  }
  const syncSecret = process.env.SYNC_SECRET || process.env.ADMIN_JWT_SECRET;
  const headerSecret = req.headers.get('x-sync-secret');
  if (syncSecret && headerSecret === syncSecret) return true;
  return false;
}

/**
 * Temporary production diagnostics endpoint.
 * Returns safe metadata about the database connection and record counts.
 * Does NOT expose credentials, passwords, or URIs.
 *
 * Remove this file once production issues are resolved.
 */
export async function GET(req: NextRequest) {
  const authorized = await isAuthorized(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized — provide admin session or x-sync-secret header' }, { status: 401 });
  }

  const mongoUri = process.env.MONGODB_URI || '';
  const mongoDb = process.env.MONGODB_DB || 'explore_with_sakar';
  const adminJwtSecretSet = Boolean(process.env.ADMIN_JWT_SECRET);
  const adminUsernameSet = Boolean(process.env.ADMIN_USERNAME);
  const syncSecretSet = Boolean(process.env.SYNC_SECRET);
  const nodeEnv = process.env.NODE_ENV || 'unknown';
  const isVercel = Boolean(process.env.VERCEL);
  const nextPhase = process.env.NEXT_PHASE || 'runtime';
  const cmsStorage = process.env.CMS_STORAGE || '(not set)';

  // Mask the URI to show only host portion (no credentials)
  let safeHost = '(not set)';
  if (mongoUri) {
    try {
      // Extract host from mongodb+srv://user:pass@host/db
      const withoutProto = mongoUri.replace(/^mongodb(\+srv)?:\/\//, '');
      const afterAt = withoutProto.includes('@') ? withoutProto.split('@')[1] : withoutProto;
      safeHost = afterAt.split('/')[0]; // cluster0.xxxxx.mongodb.net
    } catch {
      safeHost = '(parse error)';
    }
  }

  // Test MongoDB connection and get counts
  let connectionStatus = 'NOT ATTEMPTED';
  let blogCount = -1;
  let experienceCount = -1;
  let collectionName = 'cms_store';
  let activeStoreExists = false;
  let blogsFieldExists = false;
  let experiencesFieldExists = false;
  let migrationsRun: string[] = [];
  let errorMessage = '';

  try {
    const db = await getDb();
    connectionStatus = 'SUCCESS';

    const col = db.collection(collectionName);
    const doc = await col.findOne(
      { _id: 'active_store' as any },
      { projection: { blogs: 1, experiences: 1, _migrations: 1 } }
    );

    activeStoreExists = doc !== null;

    if (doc) {
      blogsFieldExists = doc.blogs !== undefined;
      experiencesFieldExists = doc.experiences !== undefined;
      blogCount = Array.isArray(doc.blogs) ? doc.blogs.length : -1;
      experienceCount = Array.isArray(doc.experiences) ? doc.experiences.length : -1;
      migrationsRun = Array.isArray(doc._migrations) ? doc._migrations : [];
    }
  } catch (err: any) {
    connectionStatus = err instanceof MongoUnavailableError ? 'UNAVAILABLE' : 'ERROR';
    errorMessage = err.message || String(err);
  }

  return NextResponse.json({
    diagnostics: {
      environment: {
        nodeEnv,
        isVercel,
        nextPhase,
        cmsStorage,
        adminJwtSecretSet,
        adminUsernameSet,
        syncSecretSet,
      },
      mongodb: {
        host: safeHost,
        database: mongoDb,
        collection: collectionName,
        uriSet: Boolean(mongoUri),
        connectionStatus,
        error: errorMessage || null,
      },
      activeStore: {
        exists: activeStoreExists,
        blogsFieldExists,
        experiencesFieldExists,
        blogCount,
        experienceCount,
        migrationsRun,
      },
      seedFallback: {
        note: 'If connectionStatus is SUCCESS but blogCount is 0, the blogs field in MongoDB is empty.',
        action: 'Call POST /api/admin/sync-seed to push seed data to production MongoDB.',
      },
    },
  });
}
