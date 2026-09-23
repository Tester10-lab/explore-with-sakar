import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest, COOKIE_NAME } from '@/lib/auth';
import { getAdminUser } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    const res = NextResponse.json({ authenticated: false }, { status: 401 });
    res.cookies.delete(COOKIE_NAME);
    return res;
  }

  const admin = await getAdminUser();
  return NextResponse.json({
    authenticated: true,
    user: {
      username: admin.username,
      role: 'admin',
      updatedAt: admin.updatedAt,
    },
  });
}
