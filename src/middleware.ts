import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'sakar_admin_session';

function isTokenExpired(token: string | undefined): boolean {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    const payload = JSON.parse(json);
    if (!payload.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch {
    return true;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isInvalidOrExpired = isTokenExpired(token);

  // 1. API Admin Protection
  if (pathname.startsWith('/api/admin')) {
    if (pathname === '/api/admin/auth/login') {
      return NextResponse.next();
    }
    if (isInvalidOrExpired) {
      const res = NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
      if (token) {
        res.cookies.delete(COOKIE_NAME);
      }
      return res;
    }
    return NextResponse.next();
  }

  // 2. Admin Web UI Protection
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
      if (!isInvalidOrExpired) {
        // If already logged in with a valid token, redirect to dashboard
        const dashboardUrl = new URL('/admin', request.url);
        return NextResponse.redirect(dashboardUrl);
      }
      return NextResponse.next();
    }

    // Protected admin route: if no token or expired, redirect to login & clear cookie
    if (isInvalidOrExpired) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const res = NextResponse.redirect(loginUrl);
      if (token) {
        res.cookies.delete(COOKIE_NAME);
      }
      return res;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
