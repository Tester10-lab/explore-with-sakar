import { NextRequest, NextResponse } from 'next/server';
import { reorderServices } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!Array.isArray(body.serviceIds)) {
      return NextResponse.json({ error: 'serviceIds must be an array' }, { status: 400 });
    }

    reorderServices(body.serviceIds);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to reorder services' }, { status: 500 });
  }
}
