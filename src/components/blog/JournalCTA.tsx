'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

interface JournalCTAProps {
  cta: {
    title: string;
    description: string;
    buttonText: string;
    experienceSlug?: string;
  };
}

export default function JournalCTA({ cta }: JournalCTAProps) {
  return (
    <div className="my-12 p-8 sm:p-10 rounded-3xl bg-himalaya-950 text-white shadow-floating border border-himalaya-800">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/20 text-terracotta-light text-xs font-semibold uppercase tracking-wider border border-terracotta/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Connect Story to Experience</span>
        </div>

        <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {cta.title}
        </h3>

        <p className="text-sm sm:text-base text-parchment-100 font-normal leading-relaxed">
          {cta.description}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/#booking"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-parchment-100 text-himalaya-950 font-bold text-sm shadow-xl transition-all hover:scale-[1.02]"
          >
            <span>{cta.buttonText}</span>
            <ArrowRight className="w-4 h-4 ml-2 text-terracotta" />
          </Link>

          {cta.experienceSlug && (
            <Link
              href={`/experiences/${cta.experienceSlug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>View Related Itinerary</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
