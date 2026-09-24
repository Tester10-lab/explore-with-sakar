export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAllEvents, createEvent, reorderEvents } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';
import { revalidateContent } from '@/lib/revalidate';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const events = await getAllEvents(true);
    return NextResponse.json({ success: true, events });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Handle reorder
    if (body.action === 'reorder' && Array.isArray(body.ids)) {
      await reorderEvents(body.ids);
      revalidateContent('events');
      return NextResponse.json({ success: true });
    }

    const { title, nepaliName, category, categoryLabel, date, location, season, image, shortDesc, highlights, sakarNote, isVisible, time, route, flyerImage, isTomorrow } = body;
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const event = await createEvent({
      title: title.trim(),
      nepaliName: nepaliName?.trim() || '',
      category: category || 'festival',
      categoryLabel: categoryLabel?.trim() || '',
      date: date?.trim() || '',
      location: location?.trim() || '',
      season: season?.trim() || '',
      image: image?.trim() || '',
      shortDesc: shortDesc?.trim() || '',
      highlights: Array.isArray(highlights) ? highlights : [],
      sakarNote: sakarNote?.trim() || '',
      isVisible: isVisible !== false,
      time: time?.trim() || '',
      route: route?.trim() || '',
      flyerImage: flyerImage?.trim() || '',
      isTomorrow: Boolean(isTomorrow),
    });

    revalidateContent('events');

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
