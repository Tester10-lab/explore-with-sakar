export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { getAllBlogs, getAllPhotos } from '@/lib/db';
import {
  getLivePackages,
  getLiveExperiences,
  getLiveServices,
  getLiveReviews,
  getLiveHandwrittenReviews,
  getLiveSettings,
  getLiveEvents,
  getLiveDestinations,
  getLiveFaq,
  getLiveNavigation,
} from '@/lib/cms';

export async function GET() {
  try {
    const [
      packages,
      experiences,
      services,
      blogs,
      photos,
      reviews,
      handwrittenReviews,
      settings,
      events,
      destinations,
      faq,
      navigation,
    ] = await Promise.all([
      getLivePackages(false),
      getLiveExperiences(false),
      getLiveServices(false),
      getAllBlogs(false),
      getAllPhotos(),
      getLiveReviews(),
      getLiveHandwrittenReviews(false),
      getLiveSettings(),
      getLiveEvents(false),
      getLiveDestinations(false),
      getLiveFaq(false),
      getLiveNavigation(),
    ]);

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
        events,
        destinations,
        faq,
        navigation,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: any) {
    console.error('Public content fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch public content',
      },
      { status: 500 }
    );
  }
}
