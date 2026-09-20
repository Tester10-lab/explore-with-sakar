export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { reorderServices } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!Array.isArray(body.serviceIds)) {
      return NextResponse.json({ error: 'serviceIds must be an array' }, { status: 400 });
    }

    await reorderServices(body.serviceIds);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to reorder services' }, { status: 500 });
  }
}
