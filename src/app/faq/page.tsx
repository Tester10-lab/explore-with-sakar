import React from 'react';
import { Metadata } from 'next';
import { getLiveFaq } from '@/lib/cms';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Explore With Sakar',
  description: 'Clear, honest answers about Nepal travel: best seasons, visa on arrival, homestay living standards, altitude safety, booking deposits, and responsible tourism.',
};

export default function FAQPage() {
  const faqItems = getLiveFaq(false);

  return <FAQClient initialFaq={faqItems} />;
}
