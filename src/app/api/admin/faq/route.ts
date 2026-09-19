export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAllFaq, createFaq, reorderFaq } from '@/lib/db';
import { getAdminSession, getSessionFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const faq = getAllFaq(true);
    return NextResponse.json({ success: true, faq });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch FAQ items' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req) || await getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (body.action === 'reorder' && Array.isArray(body.ids)) {
      reorderFaq(body.ids);
      return NextResponse.json({ success: true });
    }

    const { category, question, answer, isVisible } = body;
    if (!question || !answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }

    const item = createFaq({
      category: category || 'planning',
      question: question.trim(),
      answer: answer.trim(),
      isVisible: isVisible !== false,
    });

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create FAQ item' }, { status: 500 });
  }
}
