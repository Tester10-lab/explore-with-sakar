import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { updateHandwrittenReview, deleteHandwrittenReview } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const updated = updateHandwrittenReview(params.id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Handwritten review page not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, page: updated });
  } catch (error: any) {
    console.error('Update handwritten review error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update handwritten review' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const success = deleteHandwrittenReview(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Handwritten review page not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Handwritten review page deleted successfully' });
  } catch (error: any) {
    console.error('Delete handwritten review error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete handwritten review' }, { status: 500 });
  }
}
