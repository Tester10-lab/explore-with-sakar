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
  Clock,
  Navigation,
  X,
  Eye,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import CTASection from '@/components/common/CTASection';
import { CmsEvent } from '@/types/cms';

interface EventsClientProps {
  initialEvents: CmsEvent[];
}

export default function EventsClient({ initialEvents }: EventsClientProps) {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'tomorrow' | 'festival' | 'spiritual' | 'community'
  >('all');
  const [selectedFlyer, setSelectedFlyer] = useState<{
    title: string;
    image: string;
  } | null>(null);
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);

  const tomorrowCount = useMemo(() => {
    return initialEvents.filter(
      (e) => e.isTomorrow || e.categoryLabel?.toLowerCase().includes('tomorrow')
    ).length;
  }, [initialEvents]);

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return initialEvents;
    if (activeFilter === 'tomorrow') {
      return initialEvents.filter(
        (e) =>
          e.isTomorrow || e.categoryLabel?.toLowerCase().includes('tomorrow')
      );
    }
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
        backgroundImage="/images/events/indrajatra-koney-yaa.jpg"
        breadcrumbs={[{ label: 'Events' }]}
      />

      {/* 2. Filter Bar */}
      <section className="py-6 sm:py-8 bg-white border-b border-parchment-300 sticky top-16 z-30 shadow-subtle">
        <div className="editorial-container">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-2 sm:pb-0 scrollbar-none">
            {[
              { key: 'all', label: 'All Gatherings' },
              {
                key: 'tomorrow',
                label: 'Tomorrow (Sep 25)',
                isTomorrowTab: true,
              },
              { key: 'festival', label: 'Sacred Festivals' },
              { key: 'spiritual', label: 'Spiritual Retreats' },
              { key: 'community', label: 'Community & Impact' },
            ].map((tab) => {
              const isActive = activeFilter === tab.key;
              const count =
                tab.key === 'all'
                  ? initialEvents.length
                  : tab.key === 'tomorrow'
                  ? tomorrowCount
                  : initialEvents.filter((e) => e.category === tab.key).length;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key as any)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap flex items-center space-x-1.5 ${
                    isActive
                      ? tab.isTomorrowTab
                        ? 'bg-amber-600 text-white shadow-warm'
                        : 'bg-terracotta text-white shadow-warm'
                      : tab.isTomorrowTab
                      ? 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300'
                      : 'bg-parchment-100 text-himalaya-700 hover:bg-parchment-200 border border-parchment-300'
                  }`}
                >
                  {tab.isTomorrowTab && (
                    <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                  )}
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : tab.isTomorrowTab
                        ? 'bg-amber-200 text-amber-950 font-bold'
                        : 'bg-parchment-300 text-himalaya-600'
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
      <section className="py-14 sm:py-20 bg-sand">
        <div className="editorial-container space-y-12">
          {activeFilter === 'tomorrow' && (
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="p-2.5 rounded-xl bg-amber-200/70 text-amber-800">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-editorial-serif text-lg font-bold">
                    Schedule for Tomorrow — Friday, September 25, 2026
                  </h3>
                  <p className="text-xs text-amber-800/80">
                    Kathmandu Valley & Patan Sacred Processions, Chariot Routes,
                    and Evening Fire Illuminations.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveFilter('all')}
                className="self-start sm:self-auto text-xs font-bold uppercase tracking-wider text-amber-900 underline hover:text-amber-700"
              >
                View All Events →
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt) => {
              const isTomorrow =
                evt.isTomorrow ||
                evt.categoryLabel?.toLowerCase().includes('tomorrow');

              return (
                <div
                  key={evt.id}
                  className={`rounded-2xl bg-white border overflow-hidden shadow-subtle hover:shadow-floating transition-all duration-300 flex flex-col justify-between group ${
                    isTomorrow
                      ? 'border-amber-300/80 ring-1 ring-amber-300/40'
                      : 'border-parchment-300'
                  }`}
                >
                  <div>
                    {/* Event Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-himalaya-900">
                      <Image
                        src={
                          evt.image ||
                          '/explore-with-sakar/images/heritage/temple-courtyard.jpg'
                        }
                        alt={evt.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 items-center">
                        {isTomorrow ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white shadow-sm flex items-center space-x-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Tomorrow</span>
                          </span>
                        ) : null}
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-terracotta">
                          {evt.categoryLabel || evt.category}
                        </span>
                      </div>

                      {/* Optional Flyer Lightbox Trigger */}
                      {evt.flyerImage && (
                        <div className="absolute top-3.5 right-3.5">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedFlyer({
                                title: evt.title,
                                image: evt.flyerImage!,
                              })
                            }
                            className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-himalaya-950/80 hover:bg-himalaya-950 text-white backdrop-blur-sm transition-colors flex items-center space-x-1 border border-white/20"
                            title="View Schedule Flyer"
                          >
                            <Eye className="w-3 h-3 text-amber-300" />
                            <span>Schedule Card</span>
                          </button>
                        </div>
                      )}

                      {/* Bottom Info on Image */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-medium">
                        <span className="flex items-center space-x-1 drop-shadow">
                          <MapPin className="w-3.5 h-3.5 text-terracotta" />
                          <span className="truncate max-w-[200px]">
                            {evt.location}
                          </span>
                        </span>
                        {evt.nepaliName && (
                          <span className="font-editorial-serif text-white/90 drop-shadow text-xs sm:text-sm">
                            {evt.nepaliName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 space-y-4">
                      {/* Date & Time */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-terracotta font-semibold">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{evt.date}</span>
                          </span>
                          {evt.time && (
                            <span className="flex items-center space-x-1 text-himalaya-800 bg-amber-100/70 px-2 py-0.5 rounded-md font-medium text-[11px]">
                              <Clock className="w-3 h-3 text-amber-700" />
                              <span>{evt.time}</span>
                            </span>
                          )}
                        </div>

                        <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950 group-hover:text-terracotta transition-colors leading-snug">
                          {evt.title}
                        </h3>
                      </div>

                      {/* Route Details if available */}
                      {evt.route && (
                        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-himalaya-800 space-y-1">
                          <div className="flex items-center space-x-1 text-amber-900 font-bold text-[11px] uppercase tracking-wider">
                            <Navigation className="w-3 h-3 text-amber-700" />
                            <span>Procession Route:</span>
                          </div>
                          <p className="font-light text-[11px] leading-relaxed text-himalaya-700">
                            {evt.route}
                          </p>
                        </div>
                      )}

                      {/* Short Description */}
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

                      {/* Sakar’s Local Tip / Philosophy Note */}
                      {evt.sakarNote && (
                        <div className="p-3.5 rounded-xl bg-parchment-100 border border-parchment-300/80 text-xs text-himalaya-800 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta block">
                            Sakar’s Local Guidance:
                          </span>
                          <p className="italic leading-relaxed font-light">
                            &ldquo;
                            {expandedStoryId === evt.id ||
                            evt.sakarNote.length <= 220
                              ? evt.sakarNote
                              : `${evt.sakarNote.slice(0, 220)}...`}
                            &rdquo;
                          </p>
                          {evt.sakarNote.length > 220 && (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedStoryId(
                                  expandedStoryId === evt.id ? null : evt.id
                                )
                              }
                              className="text-[11px] font-bold text-terracotta hover:underline inline-flex items-center space-x-0.5 pt-1 not-italic"
                            >
                              <span>
                                {expandedStoryId === evt.id
                                  ? 'Show Less'
                                  : 'Read Full Reflection'}
                              </span>
                              {expandedStoryId === evt.id ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-6 pt-0 space-y-2">
                    {evt.flyerImage && (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedFlyer({
                            title: evt.title,
                            image: evt.flyerImage!,
                          })
                        }
                        className="w-full py-2 rounded-xl border border-amber-300 text-amber-900 bg-amber-50/50 hover:bg-amber-100 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center space-x-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-700" />
                        <span>View Schedule Flyer</span>
                      </button>
                    )}

                    <Link
                      href={`/contact?event=${encodeURIComponent(evt.id)}`}
                      className="w-full flex items-center justify-center py-2.5 rounded-xl bg-parchment-200 hover:bg-terracotta hover:text-white text-himalaya-900 text-xs font-bold uppercase tracking-wider transition-colors duration-200"
                    >
                      <span>Join / Plan Trip for this Event</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
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
              Most sacred festivals in Nepal follow ancient lunar calendars
              (Bikram Sambat), meaning dates shift slightly every Gregorian
              year. Sakar can pinpoint exact ritual times and arrange special
              homestays, rooftop views, or monastic visits.
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

      {/* 4. Schedule Flyer Modal Lightbox */}
      {selectedFlyer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedFlyer(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-parchment-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-parchment-200 bg-parchment-50">
              <h3 className="font-editorial-serif text-sm sm:text-base font-bold text-himalaya-950 truncate pr-4">
                {selectedFlyer.title} — Schedule Card
              </h3>
              <button
                type="button"
                onClick={() => setSelectedFlyer(null)}
                className="p-1 rounded-full hover:bg-parchment-200 text-himalaya-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[4/5] w-full bg-himalaya-950">
              <Image
                src={selectedFlyer.image}
                alt={selectedFlyer.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, 500px"
              />
            </div>

            <div className="p-4 bg-white flex items-center justify-between">
              <span className="text-xs text-himalaya-600">
                Official Festival Calendar Detail
              </span>
              <button
                type="button"
                onClick={() => setSelectedFlyer(null)}
                className="px-4 py-1.5 rounded-lg bg-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta-dark transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. CTA Section */}
      <CTASection
        title="Ready to Weave an Event into Your Nepal Journey?"
        subtitle="Tell Sakar what kind of cultural or spiritual gathering calls to you, and we will build it seamlessly into your unhurried route."
        primaryButtonText="Contact Sakar"
        primaryButtonHref="/contact"
        secondaryButtonText="Browse All Experiences"
        secondaryButtonHref="/experiences"
      />
    </div>
  );
}
