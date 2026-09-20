import React from 'react';
import { Metadata } from 'next';
import { getPageContent } from '@/lib/content';
import ContactClient from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Contact Sakar | Start Planning Your Nepal Journey',
  description:
    'Direct contact with Sakar Aryal via WhatsApp, email, or inquiry form to plan your custom Nepal journey.',
  alternates: { canonical: 'https://explorewithsakar.com/contact' },
  openGraph: {
    title: 'Contact Sakar | Start Planning Your Nepal Journey',
    description:
      'Direct contact with Sakar Aryal via WhatsApp, email, or inquiry form to plan your custom Nepal journey.',
    url: 'https://explorewithsakar.com/contact',
  },
};

export default async function ContactPage() {
  const pageContent = await getPageContent('contact');
  return <ContactClient pageContent={pageContent} />;
}
