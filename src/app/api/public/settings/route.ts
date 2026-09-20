export const dynamic = 'force-dynamic';

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
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}
