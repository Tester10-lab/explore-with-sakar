export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getLeaveAMark, updateLeaveAMark } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';
import { revalidateTag } from 'next/cache';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req) || (await getAdminSession(req));
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const content = await getLeaveAMark();
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch Leave a Mark content' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = getSessionFromRequest(req) || (await getAdminSession(req));
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await updateLeaveAMark(body);
    revalidateTag('cms:leaveAMark');
    return NextResponse.json({ success: true, content: updated });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to update Leave a Mark content' }, { status: 500 });
  }
}
