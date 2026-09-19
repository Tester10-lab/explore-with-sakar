import React from 'react';
import { Metadata } from 'next';
import { getLiveEvents } from '@/lib/cms';
import EventsClient from './EventsClient';

export const metadata: Metadata = {
  title: 'Nepal Cultural Festivals & Sacred Events | Explore With Sakar',
  description: 'Experience Nepal’s living spiritual calendar: Indra Jatra, Tihar, Mani Rimdu, Solstice retreats, and Shivaratri with authentic local hosting by Sakar.',
};

export default function EventsPage() {
  const events = getLiveEvents(false);

  return <EventsClient initialEvents={events} />;
}
