export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAllExperiences, createExperience } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const experiences = await getAllExperiences(true);
    return NextResponse.json({ success: true, experiences });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
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

    const newExperience = await createExperience({
      title: body.title,
      slug: body.slug,
      subtitle: body.subtitle || '',
      tagline: body.tagline || '',
      nepaliTitle: body.nepaliTitle || '',
      category: body.category || 'heritage',
      categoryLabel: body.categoryLabel || 'Living Heritage',
      duration: body.duration || '3 - 5 Days',
      difficulty: body.difficulty || 'Moderate',
      location: body.location || 'Kathmandu Valley',
      elevation: body.elevation || '',
      groupSize: body.groupSize || 'Private / 2 - 8 Travelers',
      season: body.season || 'Year Round',
      featured: Boolean(body.featured),
      featuredOrder:
        body.featuredOrder !== undefined && body.featuredOrder !== '' && body.featuredOrder !== null
          ? Number(body.featuredOrder)
          : undefined,
      homepageVisible: body.homepageVisible !== undefined ? Boolean(body.homepageVisible) : true,
      blogVisible: body.blogVisible !== undefined ? Boolean(body.blogVisible) : true,
      whatMakesDifferent: body.whatMakesDifferent || '',
      idealFor: body.idealFor || '',
      seoTitle: body.seoTitle || '',
      seoDescription: body.seoDescription || '',
      ogImage: body.ogImage || '',
      ctaText: body.ctaText || '',
      ctaLink: body.ctaLink || '',
      heroImage: body.heroImage || { src: '', alt: '' },
      gallery: Array.isArray(body.gallery) ? body.gallery : [],
      shortDescription: body.shortDescription || '',
      fullDescription: Array.isArray(body.fullDescription) ? body.fullDescription : [body.fullDescription || ''],
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      inclusions: Array.isArray(body.inclusions) ? body.inclusions : [],
      exclusions: Array.isArray(body.exclusions) ? body.exclusions : [],
      days: Array.isArray(body.days) ? body.days : [],
      sakarNote: body.sakarNote || '',
      impactFootprint: body.impactFootprint || '',
      relatedDestination: body.relatedDestination || undefined,
      relatedPackage: body.relatedPackage || undefined,
      status: body.status || 'published',
    });

    return NextResponse.json({ success: true, experience: newExperience });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
