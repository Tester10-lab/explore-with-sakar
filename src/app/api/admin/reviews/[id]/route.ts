import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { updateReview, deleteReview } from '@/lib/db';
import { revalidateContent } from '@/lib/revalidate';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const updated = await updateReview(params.id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    revalidateContent('reviews');

    return NextResponse.json({ success: true, review: updated });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    console.error('Update review error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const success = await deleteReview(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    revalidateContent('reviews');

    return NextResponse.json({ success: true, message: 'Review deleted successfully' });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    console.error('Delete review error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete review' }, { status: 500 });
  }
}
