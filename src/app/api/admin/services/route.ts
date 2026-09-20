export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAllServices, createService } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const services = await getAllServices(true);
    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    console.error('Fetch services error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    const newService = await createService({
      slug: body.slug,
      title: body.title,
      nepaliTitle: body.nepaliTitle || '',
      tagline: body.tagline || '',
      shortDescription: body.shortDescription || '',
      fullPhilosophy: Array.isArray(body.fullPhilosophy) ? body.fullPhilosophy : [],
      heroImage: body.heroImage || { src: '', alt: '' },
      keyFeatures: Array.isArray(body.keyFeatures) ? body.keyFeatures : [],
      quote: body.quote || '',
      quoteAuthor: body.quoteAuthor || '',
      badge: body.badge || '',
      relatedSlug: body.relatedSlug || '',
      status: body.status || 'published',
    });

    return NextResponse.json({ success: true, service: newService });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    console.error('Create service error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
