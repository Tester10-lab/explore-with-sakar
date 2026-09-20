export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { getAllPhotosAsync, createPhotoAsync } from '@/lib/db';
import { revalidateContent } from '@/lib/revalidate';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const photos = await getAllPhotosAsync();
  return NextResponse.json({ success: true, photos });
}

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    if (!body.image) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const newPhoto = await createPhotoAsync({
      title: body.title || 'Nepal Journey Moment',
      nepaliTitle: body.nepaliTitle || '',
      category: body.category || 'mountains',
      categoryLabel: body.categoryLabel || 'Himalayan Vistas',
      location: body.location || 'Nepal',
      image: body.image,
      alt: body.alt || body.title || 'Photograph of Nepal',
      orientation: body.orientation || 'landscape',
      caption: body.caption || '',
      featured: Boolean(body.featured),
    });

    revalidateContent('photos');

    return NextResponse.json({ success: true, photo: newPhoto });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    console.error('Create photo error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to create photo' }, { status: 500 });
  }
}
