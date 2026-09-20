export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAllDestinations, createDestination, reorderDestinations } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';
import { revalidateContent } from '@/lib/revalidate';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const destinations = await getAllDestinations(true);
    return NextResponse.json({ success: true, destinations });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (body.action === 'reorder' && Array.isArray(body.ids)) {
      await reorderDestinations(body.ids);
      revalidateContent('destinations');
      return NextResponse.json({ success: true });
    }

    const { name, slug, nepaliName, tagline, elevation, description, image, highlights, isVisible } = body;
    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    const destination = await createDestination({
      name: name.trim(),
      slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      nepaliName: nepaliName?.trim() || '',
      tagline: tagline?.trim() || '',
      elevation: elevation?.trim() || '',
      description: description?.trim() || '',
      image: image || { src: '', alt: '' },
      highlights: Array.isArray(highlights) ? highlights : [],
      isVisible: isVisible !== false,
    });

    revalidateContent('destinations');

    return NextResponse.json({ success: true, destination }, { status: 201 });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 });
  }
}
