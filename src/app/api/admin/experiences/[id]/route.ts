export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { updateExperience, deleteExperience } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await updateExperience(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, experience: updated });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const deleted = await deleteExperience(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
