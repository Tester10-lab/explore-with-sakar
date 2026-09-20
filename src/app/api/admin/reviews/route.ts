import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { getAllReviews, createReview } from '@/lib/db';
import { revalidateContent } from '@/lib/revalidate';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const reviews = await getAllReviews(false);
  return NextResponse.json({ success: true, reviews });
}

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    if (!body.author || !body.quote) {
      return NextResponse.json({ error: 'Customer Name and Review Text are required' }, { status: 400 });
    }

    const newReview = await createReview({
      author: body.author.trim(),
      country: body.country || 'International Traveler',
      countryFlag: body.countryFlag || '🌍',
      journey: body.journey || 'Authentic Nepal Cultural Journey',
      date: body.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      highlight: body.highlight || 'An extraordinary, life-changing journey with Sakar.',
      quote: body.quote.trim(),
      rating: typeof body.rating === 'number' ? Math.max(1, Math.min(5, body.rating)) : 5,
      avatar: body.avatar || '/explore-with-sakar/images/sakar/sakar-portrait.jpg',
      status: body.status || 'approved',
      isVisible: body.isVisible !== undefined ? Boolean(body.isVisible) : true,
    });

    revalidateContent('reviews');

    return NextResponse.json({ success: true, review: newReview });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    console.error('Create review error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to create review' }, { status: 500 });
  }
}
