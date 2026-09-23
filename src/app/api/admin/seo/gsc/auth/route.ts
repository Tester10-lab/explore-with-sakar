export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest, signToken } from '@/lib/auth';
import { isGscOAuthConfigured, getGoogleOAuthUrl } from '@/lib/googleSearchConsole';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isGscOAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          'Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.',
      },
      { status: 400 }
    );
  }

  // Derive redirect URI
  const host = req.headers.get('host') || 'localhost:3000';
  const proto = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${proto}://${host}/api/admin/seo/gsc/callback`;

  // State parameter to verify on callback
  const stateToken = signToken({
    username: session.username,
    role: 'admin',
    exp: Math.floor(Date.now() / 1000) + 15 * 60, // 15 min expiry
  });

  try {
    const authUrl = getGoogleOAuthUrl(redirectUri, stateToken);
    return NextResponse.redirect(authUrl);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to initialize Google OAuth' }, { status: 500 });
  }
}
