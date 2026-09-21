export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest, getAdminSession } from '@/lib/auth';
import {
  getAllInquiries,
  getAllServices,
  getAllExperiences,
  getAllBlogs,
  getAllPhotos,
  getAllReviews,
  getSettings,
} from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [inquiries, services, experiences, blogs, photos, reviews, settings] = await Promise.all([
      getAllInquiries(),
      getAllServices(true),
      getAllExperiences(true),
      getAllBlogs(true),
      getAllPhotos(),
      getAllReviews(true),
      getSettings(),
    ]);

    const unreadInquiries = inquiries.filter((i) => i.status === 'unread');
    const publishedExperiences = experiences.filter((e) => e.status === 'published');
    const publishedBlogs = blogs.filter((b) => b.status === 'published');
    const visibleReviews = reviews.filter((r) => r.isVisible);

    // Lightweight recent items
    const recentInquiries = inquiries.slice(0, 5).map((inq: any) => ({
      id: inq.id,
      fullName: inq.fullName || inq.name || 'Anonymous Traveler',
      name: inq.fullName || inq.name || 'Anonymous Traveler',
      email: inq.email,
      phone: inq.whatsapp || inq.phone || '',
      whatsapp: inq.whatsapp || inq.phone || '',
      travelStyle: inq.travelStyle || '',
      status: inq.status,
      createdAt: inq.createdAt,
      message: inq.message ? inq.message.slice(0, 140) : '',
    }));

    const recentBlogs = blogs.slice(0, 5).map((b) => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      category: b.category,
      status: b.status,
      publishedAt: b.publishedAt,
      featuredImage: b.featuredImage ? { src: b.featuredImage.src, alt: b.featuredImage.alt } : undefined,
    }));

    const recentPhotos = photos.slice(0, 6).map((p) => ({
      id: p.id,
      image: p.image,
      alt: p.alt || '',
      featured: !!p.featured,
    }));

    const recentReviews = reviews.slice(0, 2).map((r) => ({
      id: r.id,
      author: r.author,
      countryFlag: r.countryFlag,
      rating: r.rating || 5,
      highlight: r.highlight,
      quote: r.quote,
    }));

    return NextResponse.json({
      success: true,
      counts: {
        inquiries: inquiries.length,
        unreadInquiries: unreadInquiries.length,
        services: services.length,
        experiences: experiences.length,
        publishedExperiences: publishedExperiences.length,
        blogs: blogs.length,
        publishedBlogs: publishedBlogs.length,
        photos: photos.length,
        reviews: reviews.length,
        visibleReviews: visibleReviews.length,
      },
      recentInquiries,
      recentBlogs,
      recentPhotos,
      recentReviews,
      settings,
    });
  } catch (error: any) {
    console.error('Admin dashboard API error:', error);
    return NextResponse.json({ error: 'Failed to load dashboard data' }, { status: 500 });
  }
}
