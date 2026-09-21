import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { getPublicFaq } from '@/lib/content';
import FAQClient from './FAQClient';

const FALLBACK_METADATA: Metadata = {
  title: 'Frequently Asked Questions | Explore With Sakar',
  description: 'Clear, honest answers about Nepal travel: best seasons, visa on arrival, homestay living standards, altitude safety, booking deposits, and responsible tourism.',
  alternates: { canonical: 'https://explorewithsakar.com/faq' },
};

export async function generateMetadata(): Promise<Metadata> {
  return await buildPageMetadata('faq', FALLBACK_METADATA);
}

export default async function FAQPage() {
  const faqItems = await getPublicFaq();

  return <FAQClient initialFaq={faqItems} />;
}
