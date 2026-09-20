import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { getAllHandwrittenReviews, createHandwrittenReview } from '@/lib/db';
import { revalidateContent } from '@/lib/revalidate';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const pages = await getAllHandwrittenReviews(true);
  return NextResponse.json({ success: true, pages });
}

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    if (!body.guestName || !body.image) {
      return NextResponse.json(
        { error: 'Guest Name and Handwritten Review Image are required' },
        { status: 400 }
      );
    }

    const newPage = await createHandwrittenReview({
      guestName: body.guestName.trim(),
      country: body.country ? body.country.trim() : '',
      date: body.date ? body.date.trim() : new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      image: body.image,
      note: body.note ? body.note.trim() : '',
      pageNumber: typeof body.pageNumber === 'number' ? body.pageNumber : undefined,
      order: typeof body.order === 'number' ? body.order : undefined,
      isVisible: body.isVisible !== undefined ? Boolean(body.isVisible) : true,
    });

    revalidateContent('handwrittenReviews');

    return NextResponse.json({ success: true, page: newPage });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    console.error('Create handwritten review error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload handwritten review' },
      { status: 500 }
    );
  }
}
