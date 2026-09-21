'use client';

import React, { useState, useMemo } from 'react';
import { Star, ShieldCheck, ArrowRight } from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import TestimonialCard from '@/components/common/TestimonialCard';
import CTASection from '@/components/common/CTASection';
import { ExtendedTestimonial, HandwrittenReviewPage } from '@/types/cms';
import dynamic from 'next/dynamic';

const GuestBook = dynamic(() => import('@/components/reviews/GuestBook'), {
  ssr: false,
  loading: () => (
    <div className="h-[550px] w-full flex flex-col items-center justify-center bg-sand/60 rounded-3xl border border-parchment-300 animate-pulse text-himalaya-500 font-editorial-serif text-lg">
      <span>Opening Sakar&apos;s Guest Journal...</span>
    </div>
  ),
});

interface ReviewsClientProps {
  initialReviews: ExtendedTestimonial[];
  initialHandwrittenReviews: HandwrittenReviewPage[];
}

export default function ReviewsClient({
  initialReviews,
  initialHandwrittenReviews,
}: ReviewsClientProps) {
  const [reviews] = useState<ExtendedTestimonial[]>(initialReviews);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const approvedReviews = useMemo(() => {
    return reviews.filter((r) => r.status === 'approved' && r.isVisible !== false);
  }, [reviews]);

  // Extract unique journey types
  const categories = useMemo(() => {
    const set = new Set<string>();
    approvedReviews.forEach((r) => {
      if (r.journey) set.add(r.journey.split(' ')[0] || r.journey);
    });
    return ['All', ...Array.from(set)];
  }, [approvedReviews]);

  const filteredReviews = useMemo(() => {
    if (activeFilter === 'All') return approvedReviews;
    return approvedReviews.filter((r) => r.journey?.toLowerCase().includes(activeFilter.toLowerCase()));
  }, [activeFilter, approvedReviews]);

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge="Traveler Reflections"
        nepaliTitle="यात्रीहरूको वास्तविक अनुभव"
        title="Traveler Reviews & Reflections"
        subtitle="Genuine words from international guests who journeyed through the living culture, quiet mountain paths, and village homes of Nepal with Sakar."
        backgroundImage="/explore-with-sakar/images/homestays/village-meal.jpg"
        breadcrumbs={[{ label: 'Reviews' }]}
      />

      {/* 2. Trust Metrics Bar */}
      <section className="py-12 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1 text-saffron">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-saffron" />
                ))}
              </div>
              <span className="font-editorial-serif text-2xl font-bold text-himalaya-950 block">5.0 / 5.0</span>
              <span className="text-xs text-himalaya-600 font-light">Average Guest Rating</span>
            </div>

            <div className="space-y-1">
              <span className="font-editorial-serif text-2xl font-bold text-terracotta block">100%</span>
              <span className="text-xs text-himalaya-600 font-light">Verified Traveler Feedback</span>
            </div>

            <div className="space-y-1">
              <span className="font-editorial-serif text-2xl font-bold text-himalaya-950 block">10+ Years</span>
              <span className="text-xs text-himalaya-600 font-light">Local Hosting & Guiding</span>
            </div>

            <div className="space-y-1">
              <span className="font-editorial-serif text-2xl font-bold text-emerald-700 block">0</span>
              <span className="text-xs text-himalaya-600 font-light">Mass-Tour Middlemen</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Handwritten Guestbook Section */}
      <section id="handwritten-journal" className="py-20 sm:py-28 bg-parchment-100 border-b border-parchment-300">
        <div className="editorial-container">
          <SectionHeading
            tag="Physical Guest Journal"
            nepaliTag="हातले लेखिएका सम्झनाहरू"
            title="Sakar's Handwritten Guest Journal"
            description="Real handwritten notes, letters, sketches, and heartfelt gratitude penned by travelers in Sakar's physical leatherbound guestbook over the years. Click or drag to flip through the 20 pages."
          />
          <GuestBook initialPages={initialHandwrittenReviews} />
        </div>
      </section>

      {/* 4. Review Cards Grid */}
      <section className="py-20 sm:py-28 bg-sand">
        <div className="editorial-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                Verified Guest Stories
              </span>
              <h2 className="font-editorial-serif text-3xl font-bold text-himalaya-950 mt-1">
                All Traveler Reflections ({approvedReviews.length})
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeFilter === cat
                      ? 'bg-terracotta text-white shadow-warm'
                      : 'bg-white text-himalaya-700 hover:bg-parchment-200 border border-parchment-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredReviews.map((t, idx) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                featured={idx === 0}
              />
            ))}
          </div>

          {/* Sakar's Hosting Commitment Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-parchment-300 shadow-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-terracotta">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Our Commitment to Every Traveler</span>
                </span>
                <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950">
                  Every Review Tells a Story of Genuine Human Connection
                </h3>
                <p className="text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
                  We don&apos;t buy reviews, hire influencers, or fabricate feedback. The reflections above come from conscious travelers who trusted Sakar to guide them through Nepal with dignity, authenticity, and care.
                </p>
              </div>

              <div className="lg:col-span-4 text-center lg:text-right">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-himalaya-950 hover:bg-terracotta text-white font-semibold text-xs tracking-widest uppercase transition-all shadow-subtle hover:shadow-warm"
                >
                  <span>Plan Your Journey</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <CTASection
        title="Ready to Create Your Own Meaningful Nepal Story?"
        subtitle="Connect directly with Sakar to discuss your dates, route ideas, and cultural curiosities."
        primaryButtonText="Begin Your Journey"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Experiences"
        secondaryButtonHref="/experience"
      />
    </div>
  );
}
