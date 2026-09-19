'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  Compass,
  Phone,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import CTASection from '@/components/common/CTASection';
import { CmsEvent } from '@/types/cms';

interface EventsClientProps {
  initialEvents: CmsEvent[];
}

export default function EventsClient({ initialEvents }: EventsClientProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'festival' | 'spiritual' | 'community'>('all');

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return initialEvents;
    return initialEvents.filter((e) => e.category === activeFilter);
  }, [activeFilter, initialEvents]);

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge="Cultural Gatherings & Festivals"
        nepaliTitle="चाडपर्व तथा विशेष कार्यक्रमहरू"
        title="Nepal Cultural Festivals & Community Events"
        subtitle="Journey through Nepal’s living calendar: ancient masked festivals, seasonal sound retreats, harvest celebrations, and meaningful community conservation events."
        backgroundImage="/explore-with-sakar/images/heritage/temple-courtyard.jpg"
        breadcrumbs={[{ label: 'Events' }]}
      />

      {/* 2. Filter Bar */}
      <section className="py-8 bg-white border-b border-parchment-300 sticky top-16 z-30 shadow-subtle">
        <div className="editorial-container">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-2 sm:pb-0 scrollbar-none">
            {[
              { key: 'all', label: 'All Gatherings' },
              { key: 'festival', label: 'Sacred Festivals' },
              { key: 'spiritual', label: 'Spiritual Retreats' },
              { key: 'community', label: 'Community & Impact' },
            ].map((tab) => {
              const isActive = activeFilter === tab.key;
              const count =
                tab.key === 'all'
                  ? initialEvents.length
                  : initialEvents.filter((e) => e.category === tab.key).length;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key as any)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-terracotta text-white shadow-warm'
                      : 'bg-parchment-100 text-himalaya-700 hover:bg-parchment-200 border border-parchment-300'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-parchment-300 text-himalaya-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Events Grid */}
      <section className="py-16 sm:py-24 bg-sand">
        <div className="editorial-container space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="rounded-2xl bg-white border border-parchment-300 overflow-hidden shadow-subtle hover:shadow-floating transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Event Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-himalaya-900">
                    <Image
                      src={evt.image || '/explore-with-sakar/images/heritage/temple-courtyard.jpg'}
                      alt={evt.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/70 via-transparent to-transparent" />

                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-terracotta">
                        {evt.categoryLabel || evt.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-medium">
                      <span className="flex items-center space-x-1 drop-shadow">
                        <MapPin className="w-3.5 h-3.5 text-terracotta" />
                        <span>{evt.location}</span>
                      </span>
                      {evt.nepaliName && (
                        <span className="font-editorial-serif text-white/90 drop-shadow">
                          {evt.nepaliName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5 text-xs text-terracotta font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{evt.date}</span>
                      </div>
                      <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950 group-hover:text-terracotta transition-colors leading-snug">
                        {evt.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-himalaya-700 font-light leading-relaxed">
                      {evt.shortDesc}
                    </p>

                    {/* Highlights */}
                    {evt.highlights && evt.highlights.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-parchment-200">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-himalaya-900">
                          Experience Highlights:
                        </h4>
                        <ul className="space-y-1 text-xs text-himalaya-700">
                          {evt.highlights.map((hl, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 shrink-0" />
                              <span className="font-light">{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Sakar’s Local Tip */}
                    {evt.sakarNote && (
                      <div className="p-3.5 rounded-xl bg-parchment-100 border border-parchment-300/80 text-xs text-himalaya-800 italic">
                        &ldquo;{evt.sakarNote}&rdquo;
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/contact?subject=${encodeURIComponent(`Inquiry about ${evt.title}`)}`}
                    className="w-full flex items-center justify-center py-2.5 rounded-xl bg-parchment-200 hover:bg-terracotta hover:text-white text-himalaya-900 text-xs font-bold uppercase tracking-wider transition-colors duration-200"
                  >
                    <span>Plan Your Trip for this Event</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Special Custom Notice */}
          <div className="p-8 rounded-3xl bg-white border border-parchment-300 text-center max-w-3xl mx-auto space-y-4 shadow-subtle">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Lunar Calendar Guidance</span>
            </span>
            <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950">
              Planning Around Traditional Festival Dates?
            </h3>
            <p className="text-sm text-himalaya-700 font-light leading-relaxed">
              Most sacred festivals in Nepal follow ancient lunar calendars (Bikram Sambat), meaning dates shift slightly every Gregorian year. Sakar can pinpoint exact ritual times and arrange special homestays or monastic visits.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/9779840482692?text=Namaste%20Sakar%2C%20I%20would%20like%20to%20know%20more%20about%20upcoming%20festival%20dates%20in%20Nepal."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-warm"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span>Ask Sakar via WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-himalaya-950 hover:bg-terracotta text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>Request Festival Itinerary</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <CTASection
        title="Ready to Weave an Event into Your Nepal Journey?"
        subtitle="Tell Sakar what kind of cultural or spiritual gathering calls to you, and we will build it seamlessly into your unhurried route."
        primaryButtonText="Contact Sakar"
        primaryButtonHref="/contact"
        secondaryButtonText="Browse All Experiences"
        secondaryButtonHref="/experience"
      />
    </div>
  );
}
