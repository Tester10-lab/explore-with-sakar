export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { updatePackage, deletePackage, getPackageBySlug } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';
import { revalidateContent } from '@/lib/revalidate';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await updatePackage(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
    revalidateContent('packages');
    return NextResponse.json({ success: true, package: updated });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const deleted = await deletePackage(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
    revalidateContent('packages');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
