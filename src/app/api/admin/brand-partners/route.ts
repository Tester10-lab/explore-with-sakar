export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { getAllBrandPartners, createBrandPartner } from '@/lib/db';
import { revalidateContent } from '@/lib/revalidate';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const partners = await getAllBrandPartners(true);
  return NextResponse.json({ success: true, partners });
}

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    if (!body.name || !body.logoUrl) {
      return NextResponse.json(
        { error: 'Partner name and logo are required' },
        { status: 400 }
      );
    }

    const newPartner = await createBrandPartner({
      name: body.name.trim(),
      logoUrl: body.logoUrl,
      websiteUrl: body.websiteUrl || '',
      category: body.category || 'travel-agency',
      categoryLabel: body.categoryLabel || 'Travel Agency',
      description: body.description || '',
      isVisible: body.isVisible !== undefined ? Boolean(body.isVisible) : true,
    });

    revalidateContent('brandPartners');

    return NextResponse.json({ success: true, partner: newPartner });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json(
        { error: 'Database unavailable. Change was not saved.' },
        { status: 503 }
      );
    }
    console.error('Create brand partner error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create brand partner' },
      { status: 500 }
    );
  }
}
