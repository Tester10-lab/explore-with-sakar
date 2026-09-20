export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getLivePageContent } from '@/lib/cms';
import { getPageBySlug, createPage, updatePage, publishPage, unpublishPage } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = getSessionFromRequest(req) || (await getAdminSession(req));
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const page = await getLivePageContent(params.slug);
  return NextResponse.json({ success: true, page });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = getSessionFromRequest(req) || (await getAdminSession(req));
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const editorName = session.username || 'admin';

    // Ensure page exists in store
    let existing = await getPageBySlug(params.slug);
    if (!existing) {
      const defaultPage = await getLivePageContent(params.slug);
      existing = await createPage({
        slug: defaultPage.slug,
        name: defaultPage.name,
        url: defaultPage.url,
        status: defaultPage.status,
        sections: defaultPage.sections,
        seo: defaultPage.seo,
        lastEditedBy: editorName,
      });
    }

    if (body.action === 'publish') {
      const published = await publishPage(params.slug, editorName);
      return NextResponse.json({ success: true, page: published });
    }

    if (body.action === 'unpublish') {
      const draft = await unpublishPage(params.slug);
      return NextResponse.json({ success: true, page: draft });
    }

    const updated = await updatePage(params.slug, {
      ...body,
      lastEditedBy: editorName,
    });

    return NextResponse.json({ success: true, page: updated });
  } catch (error: any) {
    if (error.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}
