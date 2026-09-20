export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { updatePhotoAsync, deletePhotoAsync } from '@/lib/db';
import { revalidateContent } from '@/lib/revalidate';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const updated = await updatePhotoAsync(params.id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    revalidateContent('photos');

    return NextResponse.json({ success: true, photo: updated });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    console.error('Update photo error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update photo' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const success = await deletePhotoAsync(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    revalidateContent('photos');

    return NextResponse.json({ success: true, message: 'Photo deleted successfully' });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    console.error('Delete photo error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete photo' }, { status: 500 });
  }
}
