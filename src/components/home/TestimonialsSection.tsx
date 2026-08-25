'use client';

import React from 'react';
import Image from 'next/image';
import { TESTIMONIALS } from '@/data/homestays';
import { Sparkles, Quote, Star } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-parchment-100 relative">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Traveler Experiences</span>
          </div>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
            Voices From Fellow Travelers
          </h2>
          <p className="text-sm sm:text-base text-himalaya-700 font-light mt-3">
            Memories of quiet mornings, heartfelt homestay laughter, and transformational journeys shared with Sakar.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-sand border border-parchment-300 p-6 sm:p-8 shadow-subtle hover:shadow-editorial transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center space-x-1 text-saffron">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <h4 className="font-editorial-serif text-base font-bold text-himalaya-950 leading-snug">
                  &ldquo;{t.highlight}&rdquo;
                </h4>

                <p className="text-xs sm:text-sm text-himalaya-700 font-light leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-parchment-300 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-sm text-himalaya-950">
                    {t.author}
                  </h5>
                  <p className="text-xs text-himalaya-600 font-light">
                    {t.country} {t.countryFlag} • {t.journey}
                  </p>
                </div>
                <span className="text-[10px] text-himalaya-500">{t.date}</span>
              </div>
            </div>
          ))}
      </div>
      </div>
    </section>
  );
}
