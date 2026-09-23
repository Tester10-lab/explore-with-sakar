import { NextRequest, NextResponse } from 'next/server';
import { createInquiry, getAllEvents } from '@/lib/db';

function sanitize(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const fullName = sanitize(body.fullName);
    const email = sanitize(body.email);
    const whatsapp = sanitize(body.whatsapp);
    const country = sanitize(body.country);
    const travelDates = sanitize(body.travelDates);
    const approximateDuration = sanitize(body.approximateDuration);
    const travelersCount = sanitize(body.travelersCount);
    const travelStyle = sanitize(body.travelStyle);
    const homestayInterest = sanitize(body.homestayInterest);
    const message = sanitize(body.message);

    const preferredInterests: string[] = Array.isArray(body.preferredInterests)
      ? body.preferredInterests.map((item: unknown) => sanitize(item)).filter(Boolean)
      : [];

    // Validation
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: 'Please enter your full name.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // If message is omitted or too short, construct a helpful default summary
    const finalMessage =
      message && message.length >= 5
        ? message
        : `Custom journey inquiry from ${fullName}.${travelDates ? ` Dates: ${travelDates}.` : ''}${
            approximateDuration ? ` Duration: ${approximateDuration}.` : ''
          }${travelersCount ? ` Party: ${travelersCount}.` : ''}${
            preferredInterests.length > 0 ? ` Interests: ${preferredInterests.join(', ')}.` : ''
          }`;

    let interestedEvent: { id: string; title: string } | undefined = undefined;
    const reqEventId = typeof body.interestedEventId === 'string'
      ? sanitize(body.interestedEventId)
      : (body.interestedEvent && typeof body.interestedEvent.id === 'string'
          ? sanitize(body.interestedEvent.id)
          : '');

    if (reqEventId) {
      try {
        const events = await getAllEvents(false);
        const matched = (events || []).find((e) => e.id === reqEventId && e.isVisible !== false);
        if (matched) {
          interestedEvent = {
            id: matched.id,
            title: matched.title,
          };
        }
      } catch (err) {
        console.warn('Could not validate event for inquiry:', err);
      }
    }

    const newInquiry = await createInquiry({
      fullName,
      email,
      whatsapp: whatsapp || undefined,
      country: country || undefined,
      travelDates: travelDates || undefined,
      approximateDuration: approximateDuration || undefined,
      travelersCount: travelersCount || undefined,
      travelStyle: travelStyle || undefined,
      preferredInterests,
      homestayInterest: homestayInterest || undefined,
      message: finalMessage,
      interestedEvent,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Namaste! Your inquiry has been received. Sakar will contact you personally soon.',
        inquiryId: newInquiry.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === 'MongoUnavailableError') {
      return NextResponse.json(
        { error: 'Database unavailable. Change was not saved.' },
        { status: 503 }
      );
    }
    console.error('Inquiry submission error:', error);
    return NextResponse.json(
      { error: 'Something went wrong submitting your inquiry. Please try again or message Sakar directly on WhatsApp.' },
      { status: 500 }
    );
  }
}
