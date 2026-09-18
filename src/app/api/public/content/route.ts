export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { readStoreAsync } from '@/lib/db';
import {
  getLivePackages,
  getLiveExperiences,
  getLiveServices,
  getLiveBlogs,
  getLivePhotos,
  getLiveReviews,
  getLiveHandwrittenReviews,
  getLiveSettings,
} from '@/lib/cms';

export async function GET() {
  try {
    // Ensure fresh data from MongoDB
    await readStoreAsync();

    const packages = getLivePackages(false);
    const experiences = getLiveExperiences(false);
    const services = getLiveServices(false);
    const blogs = getLiveBlogs(false);
    const photos = getLivePhotos();
    const reviews = getLiveReviews();
    const handwrittenReviews = getLiveHandwrittenReviews(false);
    const settings = getLiveSettings();

    return NextResponse.json(
      {
        success: true,
        packages,
        experiences,
        services,
        blogs,
        photos,
        reviews,
        handwrittenReviews,
        settings,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: any) {
    console.error('Public content fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
