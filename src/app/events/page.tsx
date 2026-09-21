import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { getPublicEvents } from '@/lib/content';
import EventsClient from './EventsClient';

const FALLBACK_METADATA: Metadata = {
  title: 'Nepal Cultural Festivals & Sacred Events | Explore With Sakar',
  description: 'Experience Nepal’s living spiritual calendar: Indra Jatra, Tihar, Mani Rimdu, Solstice retreats, and Shivaratri with authentic local hosting by Sakar.',
  alternates: { canonical: 'https://explorewithsakar.com/events' },
};

export async function generateMetadata(): Promise<Metadata> {
  return await buildPageMetadata('events', FALLBACK_METADATA);
}

export default async function EventsPage() {
  const events = await getPublicEvents();

  return <EventsClient initialEvents={events} />;
}
