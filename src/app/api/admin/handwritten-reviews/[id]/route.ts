import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { updateHandwrittenReview, deleteHandwrittenReview } from '@/lib/db';
import { revalidateContent } from '@/lib/revalidate';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const updated = await updateHandwrittenReview(params.id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Handwritten review page not found' }, { status: 404 });
    }

    revalidateContent('handwrittenReviews');

    return NextResponse.json({ success: true, page: updated });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
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

    const success = await deleteHandwrittenReview(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Handwritten review page not found' }, { status: 404 });
    }

    revalidateContent('handwrittenReviews');

    return NextResponse.json({ success: true, message: 'Handwritten review page deleted successfully' });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    console.error('Delete handwritten review error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete handwritten review' }, { status: 500 });
  }
}
