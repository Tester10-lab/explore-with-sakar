'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Sparkles,
  Check,
  ArrowRight,
  Quote,
  BookOpen,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import CTASection from '@/components/common/CTASection';
import { BEYOND_EXPERIENCES } from '@/data/beyond-the-map';
import { PageContent } from '@/types/cms';
import { getPageHeroOverrides, isSectionVisible } from '@/lib/pageContentHelper';

const ITEMS_PER_PAGE = 4;

interface GoBeyondExperienceProps {
  pageContent?: PageContent | null;
}

export default function GoBeyondExperience({ pageContent }: GoBeyondExperienceProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(BEYOND_EXPERIENCES.length / ITEMS_PER_PAGE);

  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  const startIdx = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const currentExperiences = BEYOND_EXPERIENCES.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const endIdx = Math.min(safeCurrentPage * ITEMS_PER_PAGE, BEYOND_EXPERIENCES.length);

  const hero = getPageHeroOverrides(pageContent, {
    badge: 'Independent Experience Package',
    title: 'Go Beyond the Map',
    subtitle: 'A sequenced editorial journey through living courtyards, ancient trade corridors, multi-generational artisan workshops, and calm Himalayan waters with Sakar.',
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById('beyond-editorial-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Hero */}
      {hero.visible && (
        <PageHero
          badge={hero.badge}
          nepaliTitle="नक्साभन्दा परको यात्रा"
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage="/images/beyond-the-map/living-courtyards.jpg"
          breadcrumbs={[
            { label: 'Experiences', href: '/experience' },
            { label: 'Go Beyond the Map' },
          ]}
        />
      )}

      {/* 2. Editorial Philosophy Banner */}
      {isSectionVisible(pageContent, 'sec-btm-manifesto', 'philosophy') && (
        <section className="py-16 sm:py-20 bg-white border-b border-parchment-300">
          <div className="editorial-container">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dedicated Experience Package</span>
              </span>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                Not Just Visiting Places — Stepping Inside the Living Soul of Nepal
              </h2>

              <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed">
                Most visitors see Nepal through the hurried frame of a tour bus window or the crowded ticket gates of main monuments. <strong className="font-semibold text-himalaya-900">&ldquo;Go Beyond the Map&rdquo;</strong> is our personal pledge to walk past superficial facades into the real, beating pulse of our homeland.
              </p>

              {/* Chapter Quick Index */}
              <div className="pt-6 border-t border-parchment-200">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-himalaya-500 mb-3">
                  The 4 Canonical Narratives:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {BEYOND_EXPERIENCES.map((exp) => (
                    <button
                      key={exp.id}
                      onClick={() => scrollToSection(exp.id)}
                      className="px-3.5 py-1.5 rounded-full text-xs transition-all font-mono bg-parchment-100 text-himalaya-700 hover:bg-parchment-200 border border-parchment-300 hover:border-terracotta"
                      title={`${exp.pageNumber}: ${exp.title}`}
                    >
                      <span className="font-bold text-terracotta">{exp.pageNumber}:</span> {exp.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Paginated Experiences Main Section */}
      {isSectionVisible(pageContent, 'sec-btm-chapters', 'chapters-grid', 'experiences') && (
        <section id="beyond-editorial-grid" className="py-20 sm:py-28 bg-parchment-100 scroll-mt-24">
        <div className="editorial-container">
          {/* Top Pagination Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 p-4 sm:p-5 rounded-2xl bg-white border border-parchment-300 shadow-subtle">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-bold text-xs">
                {safeCurrentPage}
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-himalaya-950">
                  Showing Chapters {startIdx + 1}–{endIdx} of {BEYOND_EXPERIENCES.length}
                </p>
                <p className="text-[11px] text-himalaya-500 font-serif">
                  Page {safeCurrentPage} of {totalPages} • Curated sequentially by Sakar
                </p>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage <= 1}
                className="px-3 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-parchment-300 bg-white text-himalaya-700 hover:bg-parchment-200 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
                aria-label="Previous experiences"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isCurrent = pageNum === safeCurrentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center ${
                        isCurrent
                          ? 'bg-terracotta text-white shadow-warm'
                          : 'bg-white text-himalaya-700 hover:bg-parchment-200 border border-parchment-300'
                      }`}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage >= totalPages}
                className="px-3 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-parchment-300 bg-white text-himalaya-700 hover:bg-parchment-200 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
                aria-label="Next experiences"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sequential Experience Narrative Cards */}
          <div className="space-y-24">
            {currentExperiences.map((journey, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <article
                  key={journey.id}
                  id={journey.id}
                  className="bg-white rounded-3xl border border-parchment-300 shadow-editorial overflow-hidden p-6 sm:p-10 lg:p-14 transition-all duration-300 hover:shadow-floating"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    {/* Media Column */}
                    <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-himalaya-900 shadow-editorial border border-parchment-300">
                        <Image
                          src={journey.image}
                          alt={journey.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 450px"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/70 via-transparent to-transparent" />
                        
                        {/* Page Badge On Image */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-full bg-terracotta text-white font-mono font-bold text-xs uppercase tracking-wider shadow-warm">
                            {journey.pageNumber}
                          </span>
                        </div>

                        {/* Location Tag */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <div className="flex items-center space-x-1.5 text-xs text-parchment-200">
                            <MapPin className="w-3.5 h-3.5 text-terracotta" />
                            <span>{journey.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Practical Details Grid */}
                      <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-parchment-50 border border-parchment-200 text-xs">
                        <div>
                          <span className="block text-[10px] font-mono uppercase tracking-wider text-himalaya-400">Duration</span>
                          <span className="font-semibold text-himalaya-900">{journey.duration}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono uppercase tracking-wider text-himalaya-400">Group Format</span>
                          <span className="font-semibold text-himalaya-900">{journey.groupSize}</span>
                        </div>
                      </div>

                      {/* Key Historical / Conservation Quote */}
                      <div className="p-5 rounded-2xl bg-parchment-100 border border-parchment-300 relative">
                        <Quote className="w-6 h-6 text-terracotta/20 absolute top-4 right-4" />
                        <p className="font-editorial-serif italic text-sm text-himalaya-900 leading-relaxed">
                          &ldquo;{journey.keyQuote.quote}&rdquo;
                        </p>
                        <p className="text-[11px] font-mono font-semibold text-terracotta mt-2 uppercase tracking-wider">
                          — {journey.keyQuote.attribution}
                        </p>
                      </div>

                      {/* Inquiry Action */}
                      <div className="pt-2">
                        <Link
                          href={`/contact?subject=${encodeURIComponent(journey.ctaSubject)}`}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-himalaya-950 hover:bg-terracotta text-white text-xs font-bold uppercase tracking-wider shadow-subtle hover:shadow-warm transition-all text-center w-full"
                        >
                          <span>Inquire About {journey.title}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Content Column: Full Text Attached to Experience */}
                    <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="space-y-2 border-b border-parchment-200 pb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold text-terracotta uppercase tracking-wider">
                            {journey.pageNumber} • {journey.tagline}
                          </span>
                          {journey.nepaliTitle && (
                            <span className="text-xs font-serif text-himalaya-500">
                              • {journey.nepaliTitle}
                            </span>
                          )}
                        </div>

                        <h3 className="font-editorial-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-himalaya-950 leading-tight">
                          {journey.title}
                        </h3>
                        <p className="font-editorial-serif italic text-lg sm:text-xl text-terracotta">
                          {journey.subtitle}
                        </p>
                      </div>

                      {/* The "Beyond the Map" Promise Card */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-terracotta/5 border border-terracotta/15 space-y-2">
                        <div className="flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-wider">
                          <Sparkles className="w-4 h-4 text-terracotta" />
                          <span>The &ldquo;Beyond the Map&rdquo; Promise</span>
                        </div>
                        <p className="text-xs sm:text-sm text-himalaya-800 font-light leading-relaxed">
                          {journey.promise}
                        </p>
                      </div>

                      {/* Experience Overview */}
                      <div className="space-y-3">
                        <h4 className="font-editorial-serif text-lg font-bold text-himalaya-950">
                          Experience Overview
                        </h4>
                        <p className="text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
                          {journey.experienceOverview}
                        </p>
                      </div>

                      {/* Highlights Bullet List */}
                      <div className="space-y-3 pt-2">
                        <h4 className="font-editorial-serif text-sm font-bold uppercase tracking-wider text-himalaya-950 flex items-center gap-2">
                          <Check className="w-4 h-4 text-terracotta" />
                          <span>Curated Exploration Highlights</span>
                        </h4>
                        <ul className="grid grid-cols-1 gap-2.5">
                          {journey.highlights.map((item, hIdx) => (
                            <li
                              key={hIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-himalaya-800 font-light"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expandable Story Sections (All complete narrative paragraphs) */}
                      <div className="space-y-6 pt-4 border-t border-parchment-200">
                        <div className="flex items-center gap-2 text-himalaya-900">
                          <BookOpen className="w-4 h-4 text-terracotta" />
                          <h4 className="font-editorial-serif text-base font-bold">
                            Complete Narrative & Cultural Immersion
                          </h4>
                        </div>

                        <div className="space-y-6">
                          {journey.storySections.map((section, sIdx) => (
                            <div key={sIdx} className="space-y-3 p-5 rounded-2xl bg-parchment-50 border border-parchment-200">
                              <h5 className="font-editorial-serif font-bold text-sm sm:text-base text-himalaya-950 border-b border-parchment-200 pb-2">
                                {section.heading}
                              </h5>
                              <div className="space-y-3 text-xs sm:text-sm text-himalaya-700 font-light leading-relaxed">
                                {section.paragraphs.map((p, pIdx) => (
                                  <p key={pIdx}>{p}</p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Pagination Toolbar */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-parchment-300 shadow-subtle">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-himalaya-950">
                Page {safeCurrentPage} of {totalPages}
              </p>
              <p className="text-[11px] text-himalaya-500 font-serif">
                Showing experiences {startIdx + 1} through {endIdx} of {BEYOND_EXPERIENCES.length}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage <= 1}
                className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-parchment-300 bg-white text-himalaya-700 hover:bg-parchment-200 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
                aria-label="Previous experiences"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isCurrent = pageNum === safeCurrentPage;
                  const pageStart = (pageNum - 1) * ITEMS_PER_PAGE + 1;
                  const pageEnd = Math.min(pageNum * ITEMS_PER_PAGE, BEYOND_EXPERIENCES.length);
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 sm:px-4 h-10 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1 ${
                        isCurrent
                          ? 'bg-terracotta text-white shadow-warm'
                          : 'bg-white text-himalaya-700 hover:bg-parchment-200 border border-parchment-300'
                      }`}
                      aria-label={`Go to page ${pageNum}: experiences ${pageStart} to ${pageEnd}`}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      <span>Page {pageNum}</span>
                      <span className="hidden md:inline text-[10px] opacity-80">
                        (Exp {String(pageStart).padStart(2, '0')}–{String(pageEnd).padStart(2, '0')})
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage >= totalPages}
                className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-parchment-300 bg-white text-himalaya-700 hover:bg-parchment-200 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
                aria-label="Next experiences"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 4. Bottom CTA */}
      {isSectionVisible(pageContent, 'sec-btm-cta', 'cta') && (
        <CTASection
          title="Ready to Weave These Experiences Into a Bespoke Journey?"
          subtitle="Every chapter can be experienced individually or combined into an unhurried multi-day expedition guided personally by Sakar."
          primaryButtonText="Inquire About Beyond the Map"
          primaryButtonHref="/contact?subject=Go%20Beyond%20the%20Map%20Custom%20Journey"
          secondaryButtonText="Explore All Experiences"
          secondaryButtonHref="/experience"
        />
      )}
    </div>
  );
}
