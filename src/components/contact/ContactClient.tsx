'use client';

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import InquiryForm from '@/components/booking/InquiryForm';
import { useSettings } from '@/context/SettingsContext';
import { PageContent } from '@/types/cms';
import { getPageHeroOverrides, isSectionVisible } from '@/lib/pageContentHelper';

import { EventOption } from '@/components/booking/InquiryForm';

interface ContactClientProps {
  pageContent?: PageContent | null;
  availableEvents?: EventOption[];
}

export default function ContactClient({ pageContent, availableEvents }: ContactClientProps) {
  const { settings } = useSettings();

  const hero = getPageHeroOverrides(pageContent, {
    badge: 'Direct Host Communication',
    title: 'Begin Your Journey With Sakar',
    subtitle: 'Every meaningful journey begins with a simple conversation. Reach out directly to discuss dates, routes, and authentic cultural experiences.',
  });

  const whatsappUrl = `https://wa.me/${settings.contact?.whatsappNumber || '9779840482692'}?text=${encodeURIComponent(
    settings.contact?.whatsappDefaultMessage ||
      'Namaste Sakar, I am interested in planning an authentic Nepal journey.'
  )}`;

  return (
    <div className="min-h-screen bg-parchment-100 pb-16">
      {/* 1. Page Hero */}
      {hero.visible && (
        <PageHero
          badge={hero.badge}
          nepaliTitle="सम्पर्क तथा यात्रा परामर्श"
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage="/explore-with-sakar/images/mountains/sunrise-himalayas.jpg"
          breadcrumbs={[{ label: 'Contact' }]}
        />
      )}

      {/* 2. Direct Contact Channels */}
      {isSectionVisible(pageContent, 'sec-cnt-channels', 'contact-channels') && (
        <section className="py-12 bg-white border-b border-parchment-300">
          <div className="editorial-container max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* WhatsApp */}
              <div className="p-6 sm:p-8 rounded-3xl bg-sand/60 border border-parchment-300 text-center space-y-3 hover:bg-white hover:shadow-subtle transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-editorial-serif text-lg font-bold text-himalaya-950">
                  WhatsApp Direct
                </h3>
                <p className="text-xs text-himalaya-600 font-light">
                  {settings.contact?.phoneDisplay || '+977 984-0482692'}
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-bold text-emerald-700 hover:underline pt-1"
                >
                  Chat with Sakar on WhatsApp →
                </a>
              </div>

              {/* Email */}
              <div className="p-6 sm:p-8 rounded-3xl bg-sand/60 border border-parchment-300 text-center space-y-3 hover:bg-white hover:shadow-subtle transition-all">
                <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-editorial-serif text-lg font-bold text-himalaya-950">
                  Email Inquiries
                </h3>
                <p className="text-xs text-himalaya-600 font-light">
                  {settings.contact?.email || 'Explorewithsakar@gmail.com'}
                </p>
                <a
                  href={`mailto:${settings.contact?.email || 'Explorewithsakar@gmail.com'}`}
                  className="inline-block text-xs font-bold text-terracotta hover:underline pt-1"
                >
                  Send Email to Sakar →
                </a>
              </div>

              {/* Base Location */}
              <div className="p-6 sm:p-8 rounded-3xl bg-sand/60 border border-parchment-300 text-center space-y-3 hover:bg-white hover:shadow-subtle transition-all">
                <div className="w-12 h-12 rounded-2xl bg-saffron/15 text-saffron-dark flex items-center justify-center mx-auto">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-editorial-serif text-lg font-bold text-himalaya-950">
                  Kathmandu Base
                </h3>
                <p className="text-xs text-himalaya-600 font-light">
                  {settings.contact?.addressDetails || 'Patan & Thamel Heritage Quarter'}
                </p>
                <span className="inline-block text-xs text-himalaya-500 pt-1">
                  {settings.contact?.address || 'Kathmandu, Nepal'}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Inquiry Form Section */}
      {isSectionVisible(pageContent, 'sec-cnt-form', 'inquiry-form') && (
        <section className="py-8">
          <InquiryForm availableEvents={availableEvents} />
        </section>
      )}
    </div>
  );
}
