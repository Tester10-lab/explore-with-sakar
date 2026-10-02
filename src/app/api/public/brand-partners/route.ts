export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getAllBrandPartners } from '@/lib/db';

export async function GET() {
  try {
    const partners = await getAllBrandPartners(false);
    return NextResponse.json(
      { partners: partners || [] },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch public brand partners:', error);
    return NextResponse.json({ partners: [] });
  }
}
