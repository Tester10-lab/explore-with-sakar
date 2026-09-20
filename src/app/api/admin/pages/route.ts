export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getLiveAllPages } from '@/lib/cms';
import { createPage, updatePage } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';
import { revalidateContent } from '@/lib/revalidate';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const pages = await getLiveAllPages();
    return NextResponse.json({ success: true, pages });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug, name, url, seo, sections } = body;

    if (!slug || !name) {
      return NextResponse.json({ error: 'Slug and Name are required' }, { status: 400 });
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const page = await createPage({
      slug: cleanSlug,
      name: name.trim(),
      url: url || `/${cleanSlug}`,
      status: 'draft',
      seo: seo || { title: name, metaDescription: '' },
      sections: Array.isArray(sections) ? sections : [],
      lastEditedBy: session.username || 'admin',
    });

    revalidateContent('pages', cleanSlug);

    return NextResponse.json({ success: true, page }, { status: 201 });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}
