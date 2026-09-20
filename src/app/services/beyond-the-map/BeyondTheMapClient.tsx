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
import { BEYOND_EXPERIENCES, BeyondExperience, StorySection } from '@/data/beyond-the-map';

export type { BeyondExperience, StorySection };
export { BEYOND_EXPERIENCES };

const ITEMS_PER_PAGE = 4;

export default function BeyondTheMapClient() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(BEYOND_EXPERIENCES.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedExperiences = BEYOND_EXPERIENCES.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  const startIdx = (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIdx = Math.min(safeCurrentPage * ITEMS_PER_PAGE, BEYOND_EXPERIENCES.length);

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
      <PageHero
        badge="Curated Editorial Series"
        nepaliTitle="नक्साभन्दा परको यात्रा"
        title="Go Beyond the Map"
        subtitle="A sequenced editorial journey through living courtyards, ancient trade corridors, multi-generational artisan workshops, and calm Himalayan waters with Sakar."
        backgroundImage="/images/beyond-the-map/living-courtyards.jpg"
        breadcrumbs={[
          { label: 'Experiences', href: '/experience' },
          { label: 'Go Beyond the Map' },
        ]}
      />

      {/* 2. Editorial Philosophy Banner */}
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

            {/* Quick Navigation to the 4 Experiences */}
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

      {/* 3. Paginated Experiences Main Section */}
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
                  Viewing Experiences {startIdx}–{endIdx} of {BEYOND_EXPERIENCES.length}
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
                  const pageStart = (pageNum - 1) * ITEMS_PER_PAGE + 1;
                  const pageEnd = Math.min(pageNum * ITEMS_PER_PAGE, BEYOND_EXPERIENCES.length);
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                        isCurrent
                          ? 'bg-terracotta text-white shadow-warm'
                          : 'bg-white text-himalaya-700 hover:bg-parchment-200 border border-parchment-300'
                      }`}
                      aria-label={`Page ${pageNum} (Experiences ${pageStart} to ${pageEnd})`}
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

          {/* Experience Stories */}
          <div className="space-y-24 sm:space-y-32">
            {paginatedExperiences.map((exp) => (
              <article
                key={exp.id}
                id={exp.id}
                className="scroll-mt-32 rounded-3xl bg-white border border-parchment-300 overflow-hidden shadow-warm transition-all duration-300 hover:shadow-floating"
              >
                {/* Visual Header */}
                <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-himalaya-950">
                  <Image
                    src={exp.image}
                    alt={exp.imageAlt}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950 via-himalaya-950/40 to-transparent" />

                  <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-himalaya-950 font-mono text-xs font-bold uppercase tracking-wider shadow-sm">
                      {exp.pageNumber}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-himalaya-900/80 backdrop-blur-md text-parchment-200 text-xs font-medium border border-white/20">
                      {exp.location}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white max-w-4xl">
                    {exp.nepaliTitle && (
                      <span className="font-serif text-sm sm:text-base text-saffron-light tracking-widest block mb-1">
                        {exp.nepaliTitle}
                      </span>
                    )}
                    <h3 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-base sm:text-xl font-display-serif italic text-parchment-200 max-w-3xl">
                      &ldquo;{exp.subtitle}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-10 lg:p-14 space-y-12">
                  {/* Promise & Overview */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-10 border-b border-parchment-200">
                    <div className="lg:col-span-7 space-y-4">
                      <span className="text-xs uppercase font-bold tracking-widest text-terracotta block">
                        The Host&apos;s Promise
                      </span>
                      <p className="font-editorial-serif text-xl sm:text-2xl text-himalaya-950 font-bold leading-snug">
                        {exp.promise}
                      </p>
                      <p className="text-sm sm:text-base text-himalaya-700 font-light leading-relaxed pt-2">
                        {exp.experienceOverview}
                      </p>
                    </div>

                    <div className="lg:col-span-5 bg-parchment-100 rounded-2xl p-6 sm:p-7 border border-parchment-300/80 space-y-5">
                      <div className="flex items-start space-x-3">
                        <Quote className="w-5 h-5 text-terracotta shrink-0 mt-1" />
                        <div>
                          <p className="font-display-serif italic text-sm sm:text-base text-himalaya-900 leading-relaxed">
                            &ldquo;{exp.keyQuote.quote}&rdquo;
                          </p>
                          <span className="block text-xs uppercase tracking-wider font-semibold text-himalaya-500 mt-2">
                            — {exp.keyQuote.attribution}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-parchment-200 text-xs text-himalaya-700 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-himalaya-900">Pace:</span>
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-himalaya-900">Atmosphere:</span>
                          <span>{exp.tagline.split('•')[0]?.trim()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-himalaya-900">Format:</span>
                          <span>{exp.groupSize}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase font-bold tracking-widest text-himalaya-900 flex items-center">
                      <Sparkles className="w-3.5 h-3.5 mr-2 text-terracotta" />
                      What You Encounter Hand-in-Hand
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {exp.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start space-x-3 p-4 rounded-xl bg-parchment-50 border border-parchment-200 text-xs sm:text-sm text-himalaya-800"
                        >
                          <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full Story Narrative Sections */}
                  <div className="space-y-8 pt-6 border-t border-parchment-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold tracking-widest text-himalaya-500 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-terracotta" />
                        Full Narrative Text
                      </span>
                      <span className="text-xs font-mono text-terracotta font-semibold">
                        {exp.pageNumber} of 04
                      </span>
                    </div>

                    <div className="space-y-8">
                      {exp.storySections.map((sec, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-6 sm:p-8 rounded-2xl bg-parchment-50/70 border border-parchment-200 space-y-4"
                        >
                          <h5 className="font-editorial-serif text-lg sm:text-xl font-bold text-himalaya-950 flex items-center">
                            <span className="w-6 h-6 rounded-full bg-himalaya-950 text-white text-xs flex items-center justify-center mr-3 font-mono">
                              {sIdx + 1}
                            </span>
                            {sec.heading}
                          </h5>
                          <div className="space-y-3.5 text-sm sm:text-base text-himalaya-800 font-light leading-relaxed pl-9">
                            {sec.paragraphs.map((p, pIdx) => (
                              <p key={pIdx}>{p}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action for this Narrative */}
                  <div className="pt-6 border-t border-parchment-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-himalaya-600 font-serif italic text-center sm:text-left">
                      Would you like Sakar to personally guide you through {exp.title}?
                    </p>
                    <Link
                      href={`/contact?subject=${encodeURIComponent(exp.ctaSubject)}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-himalaya-950 hover:bg-terracotta text-white text-xs font-bold uppercase tracking-wider transition-colors duration-300 shadow-subtle"
                    >
                      <span>Inquire About This Journey</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Pagination Toolbar */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-parchment-300 shadow-subtle">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-himalaya-950">
                Page {safeCurrentPage} of {totalPages}
              </p>
              <p className="text-[11px] text-himalaya-500 font-serif">
                Showing experiences {startIdx} through {endIdx} of {BEYOND_EXPERIENCES.length}
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

      {/* 4. Final Consultation CTA */}
      <CTASection
        title="Ready to Weave These Experiences Into a Bespoke Journey?"
        subtitle="Every chapter can be experienced individually or combined into an unhurried multi-day expedition guided personally by Sakar."
        primaryButtonText="Inquire About Beyond the Map"
        primaryButtonHref="/contact?subject=Go%20Beyond%20the%20Map%20Custom%20Journey"
        secondaryButtonText="Explore All Journeys"
        secondaryButtonHref="/experience"
      />
    </div>
  );
}
