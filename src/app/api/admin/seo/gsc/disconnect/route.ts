export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { clearStoredGscAuth } from '@/lib/googleSearchConsole';

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await clearStoredGscAuth();
    return NextResponse.json({ success: true, message: 'Google Search Console disconnected successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to disconnect' }, { status: 500 });
  }
}
