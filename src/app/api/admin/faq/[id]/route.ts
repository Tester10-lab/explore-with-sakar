export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getFaqById, updateFaq, deleteFaq } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const item = await getFaqById(params.id);
  if (!item) {
    return NextResponse.json({ error: 'FAQ item not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, item });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await updateFaq(params.id, body);

    if (!updated) {
      return NextResponse.json({ error: 'FAQ item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, item: updated });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to update FAQ item' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const success = await deleteFaq(params.id);
    if (!success) {
      return NextResponse.json({ error: 'FAQ item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to delete FAQ item' }, { status: 500 });
  }
}
