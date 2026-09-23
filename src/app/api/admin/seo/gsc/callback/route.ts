export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { exchangeCodeForTokens } from '@/lib/googleSearchConsole';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const errorParam = searchParams.get('error');

  const host = req.headers.get('host') || 'localhost:3000';
  const proto = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
  const baseUrl = `${proto}://${host}`;

  if (errorParam) {
    return NextResponse.redirect(
      `${baseUrl}/admin/seo?tab=auditor&gsc_error=${encodeURIComponent(`Google OAuth error: ${errorParam}`)}`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${baseUrl}/admin/seo?tab=auditor&gsc_error=${encodeURIComponent('Missing code or state parameter')}`
    );
  }

  // Verify state token
  const verified = verifyToken(state);
  if (!verified || verified.role !== 'admin') {
    return NextResponse.redirect(
      `${baseUrl}/admin/seo?tab=auditor&gsc_error=${encodeURIComponent('Invalid or expired OAuth state')}`
    );
  }

  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${baseUrl}/api/admin/seo/gsc/callback`;

  try {
    await exchangeCodeForTokens(code, redirectUri);
    return NextResponse.redirect(`${baseUrl}/admin/seo?tab=auditor&gsc=connected`);
  } catch (err: any) {
    console.error('[gsc-callback] Error exchanging token:', err?.message || err);
    return NextResponse.redirect(
      `${baseUrl}/admin/seo?tab=auditor&gsc_error=${encodeURIComponent(err?.message || 'Failed to exchange token')}`
    );
  }
}
