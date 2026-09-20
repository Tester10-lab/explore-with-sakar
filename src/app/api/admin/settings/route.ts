export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSessionFromRequest } from '@/lib/auth';
import { getSettingsAsync, updateSettingsAsync } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const settings = await getSettingsAsync();
  return NextResponse.json({ success: true, settings });
}

export async function PUT(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const updated = await updateSettingsAsync(body);

    try {
      revalidatePath('/');
      revalidatePath('/admin/homepage');
      revalidatePath('/admin/settings');
    } catch (e) {
      console.warn('Settings revalidation warning:', e);
    }

    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    if (error?.name === 'MongoUnavailableError') {
      return NextResponse.json({ error: 'Database unavailable. Change was not saved.' }, { status: 503 });
    }
    console.error('Update settings error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update settings' }, { status: 500 });
  }
}
