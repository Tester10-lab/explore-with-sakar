export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getDestinationById, updateDestination, deleteDestination } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';
import { revalidateContent } from '@/lib/revalidate';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const destination = await getDestinationById(params.id);
  if (!destination) {
    return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, destination });
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
    const updated = await updateDestination(params.id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    revalidateContent('destinations');

    return NextResponse.json({ success: true, destination: updated });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to update destination' }, { status: 500 });
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
    const success = await deleteDestination(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }
    revalidateContent('destinations');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to delete destination' }, { status: 500 });
  }
}
