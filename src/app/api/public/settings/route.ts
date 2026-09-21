import { NextResponse } from 'next/server';
import { getPublicSettings, getPublicNavigation } from '@/lib/content';

export async function GET() {
  try {
    const [settings, navigation] = await Promise.all([
      getPublicSettings(),
      getPublicNavigation(),
    ]);
    return NextResponse.json(
      { settings, navigation },
      {
        headers: {
          // Cache public settings at the CDN edge for 60s; serve stale for up to 1h while revalidating.
          // Settings change infrequently and are already cached server-side via unstable_cache.
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}
