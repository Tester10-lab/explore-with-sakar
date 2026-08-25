import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

export default function JournalHero() {
  return (
    <div className="py-16 sm:py-24 bg-parchment-200/90 border-b border-parchment-300 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron/5 rounded-full blur-3xl pointer-events-none" />

      <div className="editorial-container text-center max-w-3xl mx-auto relative z-10 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>FROM SAKAR&apos;S JOURNAL</span>
        </div>

        <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-himalaya-950 tracking-tight">
          Sakar&apos;s Journal
        </h1>

        <p className="text-base sm:text-lg text-himalaya-700 font-light font-display-serif italic leading-relaxed">
          &ldquo;Stories, reflections and quiet discoveries from the roads, villages, temples and mountains of Nepal.&rdquo;
        </p>

        <p className="text-xs sm:text-sm text-himalaya-600 font-light max-w-2xl mx-auto leading-relaxed pt-1">
          A personal Nepal travel journal, cultural magazine, and spiritual reflection space by local guide Sakar. Read these quiet accounts to understand Nepal through local eyes before ever booking a journey.
        </p>

        {/* Editorial Draft Notice Badge */}
        <div className="pt-2">
          <span className="inline-block text-[11px] font-mono uppercase px-3 py-1 rounded-md bg-sand border border-parchment-300 text-himalaya-600">
            DRAFT / SAMPLE EDITORIAL ARCHITECTURE • STORIES CURATED BY SAKAR
          </span>
        </div>
      </div>
    </div>
  );
}
