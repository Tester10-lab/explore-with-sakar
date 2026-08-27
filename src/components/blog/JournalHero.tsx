import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

export default function JournalHero() {
  return (
    <div className="py-20 sm:py-32 bg-himalaya-950 border-b border-himalaya-900 text-white relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-30 film-grain pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />

      <div className="editorial-container text-center max-w-4xl mx-auto relative z-10 space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta/20 text-terracotta-light text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>From Sakar&apos;s Journal</span>
        </div>

        <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
          Sakar&apos;s Journal
        </h1>

        <p className="text-base sm:text-xl text-himalaya-300 font-light font-display-serif italic max-w-2xl mx-auto">
          &ldquo;Stories, reflections and quiet discoveries from the roads, villages, temples and mountains of Nepal.&rdquo;
        </p>

        <p className="text-xs sm:text-sm text-himalaya-400 font-light max-w-2xl mx-auto leading-relaxed pt-2">
          A personal Nepal travel journal, cultural magazine, and spiritual reflection space by local guide Sakar. Read these quiet accounts to understand Nepal through local eyes before ever booking a journey.
        </p>
      </div>
    </div>
  );
}
