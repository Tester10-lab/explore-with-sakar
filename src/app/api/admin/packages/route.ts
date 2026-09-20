export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAllPackages, createPackage } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';
import { revalidateContent } from '@/lib/revalidate';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const packages = await getAllPackages(true);
    return NextResponse.json({ success: true, packages });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    const newPackage = await createPackage({
      name: body.name,
      slug: body.slug,
      summary: body.summary || '',
      price: body.price !== undefined && body.price !== '' ? Number(body.price) : undefined,
      currency: body.currency || 'USD',
      priceNote: body.priceNote || '',
      duration: body.duration || '',
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      inclusions: Array.isArray(body.inclusions) ? body.inclusions : [],
      exclusions: Array.isArray(body.exclusions) ? body.exclusions : [],
      accommodationStyle: body.accommodationStyle || '',
      heroImage: body.heroImage || { src: '', alt: '' },
      gallery: Array.isArray(body.gallery) ? body.gallery : [],
      relatedExperience: body.relatedExperience || undefined,
      featured: Boolean(body.featured),
      status: body.status || 'published',
    });

    revalidateContent('packages');

    return NextResponse.json({ success: true, package: newPackage });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}
