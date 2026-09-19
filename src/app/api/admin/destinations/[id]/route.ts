export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getDestinationById, updateDestination, deleteDestination } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const destination = getDestinationById(params.id);
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
    const updated = updateDestination(params.id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, destination: updated });
  } catch (error: any) {
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
    const success = deleteDestination(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete destination' }, { status: 500 });
  }
}
