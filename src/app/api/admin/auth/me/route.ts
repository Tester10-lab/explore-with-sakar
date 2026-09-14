import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { getAdminUser } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const admin = getAdminUser();
  return NextResponse.json({
    authenticated: true,
    user: {
      username: admin.username,
      role: 'admin',
      updatedAt: admin.updatedAt,
    },
  });
}
