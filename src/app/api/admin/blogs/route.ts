export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSessionFromRequest, getAdminSession } from '@/lib/auth';
import { getAllBlogsAsync, createBlogAsync } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const blogs = await getAllBlogsAsync(true);
  return NextResponse.json({ success: true, blogs });
}

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req) || await getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'Title and Slug are required' }, { status: 400 });
    }

    // Sanitize slug
    const cleanSlug = body.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-');

    const newBlog = await createBlogAsync({
      slug: cleanSlug,
      title: body.title.trim(),
      subtitle: body.subtitle || '',
      excerpt: body.excerpt || '',
      category: body.category || "Sakar's Journal",
      author: body.author || {
        name: 'Sakar',
        role: 'Responsible Tour Director & Founder',
        avatar: '/explore-with-sakar/images/sakar/sakar-portrait.jpg',
        bio: 'Local host, mindful traveler, and cultural storyteller living in Kathmandu.',
      },
      publishedAt: body.publishedAt || new Date().toISOString().split('T')[0],
      readingTime: body.readingTime || '5 min read',
      featuredImage: body.featuredImage || {
        src: '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
        alt: body.title,
      },
      tags: Array.isArray(body.tags) ? body.tags : (body.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      status: body.status || 'published',
      content: Array.isArray(body.content) ? body.content : [{ type: 'paragraph', content: body.excerpt || body.title }],
      contextualCta: body.contextualCta || {
        title: 'Plan a Journey With Sakar',
        description: 'Connect directly to design your meaningful travel experience in Nepal.',
        buttonText: 'Inquire About This Journey',
      },
      relatedSlugs: Array.isArray(body.relatedSlugs) ? body.relatedSlugs : [],
    });

    try {
      revalidatePath('/blog');
      revalidatePath(`/blog/${newBlog.slug}`);
      revalidatePath('/admin/blogs');
    } catch (e) {
      console.warn('Path revalidation error:', e);
    }

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error: any) {
    console.error('Create blog error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to create blog' }, { status: 500 });
  }
}
