export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import {
  isGscOAuthConfigured,
  getGscProperty,
  getStoredGscAuth,
  getValidAccessToken,
} from '@/lib/googleSearchConsole';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const configured = isGscOAuthConfigured();
  const property = getGscProperty();
  const auth = await getStoredGscAuth();

  let connected = false;
  if (auth && auth.refreshToken) {
    // Verify token can be obtained/refreshed
    const token = await getValidAccessToken();
    connected = Boolean(token);
  }

  return NextResponse.json({
    success: true,
    configured,
    connected,
    property,
    lastUpdated: auth?.connectedAt,
  });
}
