import { NextRequest, NextResponse } from 'next/server';
import { getAllExperiences, createExperience } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const experiences = getAllExperiences(true);
    return NextResponse.json({ experiences });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    const newExperience = createExperience({
      title: body.title,
      slug: body.slug,
      category: body.category || 'heritage',
      categoryLabel: body.categoryLabel || 'Living Heritage',
      duration: body.duration || '3 - 5 Days',
      difficulty: body.difficulty || 'Moderate',
      location: body.location || 'Kathmandu Valley',
      elevation: body.elevation || '',
      groupSize: body.groupSize || 'Private / 2 - 8 Travelers',
      season: body.season || 'Year Round',
      featured: Boolean(body.featured),
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
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
