export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getNavigation, updateNavigation } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';
import { revalidateContent } from '@/lib/revalidate';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const navigation = await getNavigation();
    return NextResponse.json({ success: true, navigation });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch navigation' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body || !Array.isArray(body.header) || !body.footer) {
      return NextResponse.json({ error: 'Invalid navigation data structure' }, { status: 400 });
    }

    const updated = await updateNavigation(body);
    revalidateContent('navigation');
    return NextResponse.json({ success: true, navigation: updated });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to update navigation' }, { status: 500 });
  }
}
