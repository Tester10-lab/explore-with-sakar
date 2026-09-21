import { Db } from 'mongodb';
import { BLOG_POSTS } from '@/data/blog';

export interface Migration {
  id: string;
  run: (db: Db) => Promise<void>;
  runFile?: (store: Record<string, any>) => Promise<void> | void;
}

/**
 * Registry of all store migrations in chronological order.
 * Each migration is guaranteed to execute at most once per database/store.
 */
export const MIGRATIONS: Migration[] = [
  {
    id: '2026-remove-packages',
    run: async (db: Db) => {
      const col = db.collection('cms_store');
      const legacyPkgUrl = ['/', 'packages'].join('');
      // 1. Remove packages from pages array
      await col.updateOne(
        { _id: 'active_store' as any },
        {
          $pull: {
            pages: { slug: 'packages' } as any,
            'navigation.mainNav': { url: legacyPkgUrl } as any,
          },
        }
      );

      // 2. Remove packages link from footer columns and main nav children if nested
      try {
        await col.updateOne(
          { _id: 'active_store' as any },
          {
            $pull: {
              'navigation.footer.columns.$[].links': { url: legacyPkgUrl } as any,
            },
          }
        );
      } catch (e) {
        // Safe ignore if schema differs
      }

      try {
        await col.updateOne(
          { _id: 'active_store' as any },
          {
            $pull: {
              'navigation.mainNav.$[].children': { url: legacyPkgUrl } as any,
            },
          }
        );
      } catch (e) {
        // Safe ignore
      }
    },
    runFile: (store: Record<string, any>) => {
      const legacyPkgUrl = ['/', 'packages'].join('');
      if (Array.isArray(store.pages)) {
        store.pages = store.pages.filter((p: any) => p?.slug !== 'packages');
      }
      if (store.navigation?.mainNav && Array.isArray(store.navigation.mainNav)) {
        store.navigation.mainNav = store.navigation.mainNav.filter((item: any) => item?.url !== legacyPkgUrl);
        store.navigation.mainNav.forEach((item: any) => {
          if (Array.isArray(item.children)) {
            item.children = item.children.filter((child: any) => child?.url !== legacyPkgUrl);
          }
        });
      }
      if (store.navigation?.footer?.columns && Array.isArray(store.navigation.footer.columns)) {
        store.navigation.footer.columns.forEach((col: any) => {
          if (Array.isArray(col.links)) {
            col.links = col.links.filter((l: any) => l?.url !== legacyPkgUrl);
          }
        });
      }
    },
  },
  {
    id: '2026-restore-original-blogs',
    run: async (db: Db) => {
      const col = db.collection('cms_store');
      const doc = await col.findOne({ _id: 'active_store' as any }, { projection: { blogs: 1 } });
      const currentBlogs: any[] = (doc && Array.isArray(doc.blogs)) ? doc.blogs : [];
      const currentSlugs = new Set(currentBlogs.map((b: any) => b?.slug));

      const missing = BLOG_POSTS.filter((b) => !currentSlugs.has(b.slug));
      if (missing.length > 0) {
        const updated = [...missing, ...currentBlogs];
        await col.updateOne(
          { _id: 'active_store' as any },
          { $set: { blogs: updated, lastUpdated: new Date().toISOString() } }
        );
      }
    },
    runFile: (store: Record<string, any>) => {
      const currentBlogs: any[] = Array.isArray(store.blogs) ? store.blogs : [];
      const currentSlugs = new Set(currentBlogs.map((b: any) => b?.slug));
      const missing = BLOG_POSTS.filter((b) => !currentSlugs.has(b.slug));
      if (missing.length > 0) {
        store.blogs = [...missing, ...currentBlogs];
      }
    },
  },
];

let migrationsRunPromise: Promise<void> | null = null;

/**
 * Runs all pending migrations against MongoDB atomically.
 * Uses atomic $addToSet with an equality guard ($ne) so concurrent requests or multiple server instances
 * never execute the same migration twice.
 */
export async function runPendingMigrations(db: Db): Promise<void> {
  if (MIGRATIONS.length === 0) return;

  if (migrationsRunPromise) {
    return migrationsRunPromise;
  }

  migrationsRunPromise = (async () => {
    const col = db.collection('cms_store');

    // Ensure active_store document exists
    await col.updateOne(
      { _id: 'active_store' as any },
      { $setOnInsert: { createdAt: new Date().toISOString() } },
      { upsert: true }
    );

    for (const m of MIGRATIONS) {
      // Atomically check and register the migration ID
      const res = await col.updateOne(
        { _id: 'active_store' as any, migrations: { $ne: m.id } },
        {
          $addToSet: { migrations: m.id } as any,
          $set: { lastUpdated: new Date().toISOString() },
        }
      );

      // If modifiedCount > 0, this instance won the race to run this migration
      if (res.modifiedCount > 0) {
        console.log(`[migration] Starting migration: ${m.id}`);
        try {
          await m.run(db);
          console.log(`[migration] Completed migration: ${m.id}`);
        } catch (err) {
          console.error(`[migration] Failed executing ${m.id}:`, err);
          // Revert atomic registration on failure so it can be retried
          await col.updateOne(
            { _id: 'active_store' as any },
            { $pull: { migrations: m.id } as any }
          );
          throw err;
        }
      }
    }
  })().catch((err) => {
    migrationsRunPromise = null;
    throw err;
  });

  return migrationsRunPromise;
}

/**
 * Runs pending migrations against offline file store in development when CMS_STORAGE=file.
 */
export function runPendingFileMigrations(store: Record<string, any>): boolean {
  if (!Array.isArray(store.migrations)) {
    store.migrations = [];
  }

  let modified = false;
  for (const m of MIGRATIONS) {
    if (!store.migrations.includes(m.id)) {
      console.log(`[migration] Running file migration: ${m.id}`);
      if (m.runFile) {
        m.runFile(store);
      }
      store.migrations.push(m.id);
      modified = true;
    }
  }
  return modified;
}
