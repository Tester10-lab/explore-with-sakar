export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSessionFromRequest } from '@/lib/auth';
import { updatePhotoAsync, deletePhotoAsync } from '@/lib/db';

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

    try {
      revalidatePath('/gallery');
      revalidatePath('/admin/photos');
    } catch (e) {
      console.warn('Revalidate warning:', e);
    }

    return NextResponse.json({ success: true, photo: updated });
  } catch (error: any) {
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

    try {
      revalidatePath('/gallery');
      revalidatePath('/admin/photos');
    } catch (e) {
      console.warn('Revalidate warning:', e);
    }

    return NextResponse.json({ success: true, message: 'Photo deleted successfully' });
  } catch (error: any) {
    console.error('Delete photo error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete photo' }, { status: 500 });
  }
}
