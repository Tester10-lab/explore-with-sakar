import React from 'react';
import { Metadata } from 'next';
import { getPublicEvents } from '@/lib/content';
import EventsClient from './EventsClient';

export const metadata: Metadata = {
  title: 'Nepal Cultural Festivals & Sacred Events | Explore With Sakar',
  description: 'Experience Nepal’s living spiritual calendar: Indra Jatra, Tihar, Mani Rimdu, Solstice retreats, and Shivaratri with authentic local hosting by Sakar.',
};

export default async function EventsPage() {
  const events = await getPublicEvents();

  return <EventsClient initialEvents={events} />;
}
