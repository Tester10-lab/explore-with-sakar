import { NextRequest, NextResponse } from 'next/server';
import { getAllServices, createService } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const services = getAllServices(true);
    return NextResponse.json({ services });
  } catch (error: any) {
    console.error('Fetch services error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
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

    const newService = createService({
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
    console.error('Create service error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
