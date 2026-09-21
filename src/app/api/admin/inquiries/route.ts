export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAllInquiries } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const inquiries = await getAllInquiries();
    if (req.nextUrl.searchParams.get('countOnly') === 'true') {
      const unreadCount = inquiries.filter((i) => i.status === 'unread').length;
      return NextResponse.json({ success: true, unreadCount, totalCount: inquiries.length });
    }
    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    console.error('Fetch inquiries error:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
