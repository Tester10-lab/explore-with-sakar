export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { fetchGscPageDetails, getStoredGscAuth } from '@/lib/googleSearchConsole';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const auth = await getStoredGscAuth();
  if (!auth) {
    return NextResponse.json(
      { error: 'Google Search Console is not connected', code: 'NOT_CONNECTED' },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url') || searchParams.get('path') || searchParams.get('slug') || '/';
  const range = searchParams.get('range') || '28d';
  const forceRefresh = searchParams.get('refresh') === 'true';

  try {
    const data = await fetchGscPageDetails(targetUrl, range, forceRefresh);
    return NextResponse.json({ success: true, ...data });
  } catch (err: any) {
    const msg = err?.message || 'Failed to fetch Search Console page performance';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
