import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { getPageContent } from '@/lib/content';
import ContactClient from '@/components/contact/ContactClient';

const FALLBACK_METADATA: Metadata = {
  title: 'Contact Sakar | Start Planning Your Nepal Journey',
  description:
    'Direct contact with Sakar Aryal via WhatsApp, email, or inquiry form to plan your custom Nepal journey.',
  alternates: { canonical: 'https://explorewithsakar.com/contact' },
};

export async function generateMetadata(): Promise<Metadata> {
  return await buildPageMetadata('contact', FALLBACK_METADATA);
}

export default async function ContactPage() {
  const pageContent = await getPageContent('contact');
  return <ContactClient pageContent={pageContent} />;
}
