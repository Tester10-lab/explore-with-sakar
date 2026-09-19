export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { readStoreAsync, getAllBlogsAsync, getAllPhotosAsync } from '@/lib/db';
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
    // Ensure fresh data from MongoDB
    await readStoreAsync();

    const packages = getLivePackages(false);
    const experiences = getLiveExperiences(false);
    const services = getLiveServices(false);
    const blogs = await getAllBlogsAsync(false);
    const photos = await getAllPhotosAsync();
    const reviews = getLiveReviews();
    const handwrittenReviews = getLiveHandwrittenReviews(false);
    const settings = getLiveSettings();
    const events = getLiveEvents(false);
    const destinations = getLiveDestinations(false);
    const faq = getLiveFaq(false);
    const navigation = getLiveNavigation();

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
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
