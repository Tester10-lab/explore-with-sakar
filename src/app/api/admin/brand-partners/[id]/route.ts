export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { updateBrandPartner, deleteBrandPartner } from '@/lib/db';
import { revalidateContent } from '@/lib/revalidate';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const updated = await updateBrandPartner(id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    revalidateContent('brandPartners');

    return NextResponse.json({ success: true, partner: updated });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json(
        { error: 'Database unavailable. Change was not saved.' },
        { status: 503 }
      );
    }
    console.error('Update brand partner error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update brand partner' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await deleteBrandPartner(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    revalidateContent('brandPartners');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json(
        { error: 'Database unavailable. Change was not saved.' },
        { status: 503 }
      );
    }
    console.error('Delete brand partner error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to delete brand partner' },
      { status: 500 }
    );
  }
}
