export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSessionFromRequest, getAdminSession } from '@/lib/auth';
import { getBlogBySlug, updateBlog, deleteBlog } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const blog = getBlogBySlug(params.id, true);
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
    const updated = updateBlog(params.id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    try {
      revalidatePath('/blog');
      revalidatePath(`/blog/${updated.slug}`);
      revalidatePath('/admin/blogs');
    } catch (e) {
      console.warn('Path revalidation error:', e);
    }

    return NextResponse.json({ success: true, blog: updated });
  } catch (error: any) {
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

    const blogToDelete = getBlogBySlug(params.id, true);
    const success = deleteBlog(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    try {
      revalidatePath('/blog');
      if (blogToDelete?.slug) {
        revalidatePath(`/blog/${blogToDelete.slug}`);
      }
      revalidatePath('/admin/blogs');
    } catch (e) {
      console.warn('Path revalidation error:', e);
    }

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });

  } catch (error: any) {
    console.error('Delete blog error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete blog' }, { status: 500 });
  }
}
