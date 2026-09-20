export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { revalidateContent } from '@/lib/revalidate';
import { getSessionFromRequest, getAdminSession } from '@/lib/auth';
import { getBlogBySlugAsync, updateBlogAsync, deleteBlogAsync } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const blog = await getBlogBySlugAsync(params.id, true);
  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, blog });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(req) || await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const updated = await updateBlogAsync(params.id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    revalidateContent('blogs');

    return NextResponse.json({ success: true, blog: updated });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    console.error('Update blog error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromRequest(req) || await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const blogToDelete = await getBlogBySlugAsync(params.id, true);
    const success = await deleteBlogAsync(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    revalidateContent('blogs');

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });

  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    console.error('Delete blog error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete blog' }, { status: 500 });
  }
}
