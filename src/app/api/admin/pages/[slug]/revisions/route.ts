export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getPageRevisions, savePageRevision, restorePageRevision, getPageBySlug, createPage } from '@/lib/db';
import { getLivePageContent } from '@/lib/cms';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';
import { revalidateContent } from '@/lib/revalidate';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = getSessionFromRequest(req) || (await getAdminSession(req));
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const revisions = await getPageRevisions(params.slug);
    return NextResponse.json({ success: true, revisions });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch revisions' }, { status: 500 });
  }
}

export async function POST(
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

    // Ensure page exists
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

    if (body.action === 'restore' && body.revisionId) {
      const restored = await restorePageRevision(body.revisionId, editorName);
      if (!restored) {
        return NextResponse.json({ error: 'Revision not found' }, { status: 404 });
      }
      revalidateContent('pages', params.slug);
      return NextResponse.json({ success: true, page: restored });
    }

    // Default: save a new revision
    const revision = await savePageRevision(params.slug, editorName, body.status || 'draft');
    return NextResponse.json({ success: true, revision }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to handle revision' }, { status: 500 });
  }
}
