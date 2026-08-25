'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TRAVELER_PERSONAS } from '@/data/personas';
import { EXPERIENCES } from '@/data/experiences';
import { TravelerPersona } from '@/types';
import { Sparkles, ArrowRight, CheckCircle2, MapPin, Clock } from 'lucide-react';

export default function ExperienceFinder() {
  const [selectedPersona, setSelectedPersona] = useState<TravelerPersona>(TRAVELER_PERSONAS[0]);

  // Find matching experiences for the selected persona
  const matchingExperiences = EXPERIENCES.filter((exp) =>
    selectedPersona.recommendedSlugs.includes(exp.slug)
  );

  return (
    <section id="experiences-finder" className="py-20 sm:py-28 bg-parchment-100 relative">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find Your Path</span>
          </div>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight">
            Find Your Nepal Experience
          </h2>
          <p className="text-himalaya-700 text-sm sm:text-base font-light mt-3">
            Travel is deeply personal. Choose the way you love to explore, and let Sakar reveal the side of Nepal that speaks to your soul.
          </p>
        </div>

        {/* 8 Personality Cards Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2.5 sm:gap-3 mb-12">
          {TRAVELER_PERSONAS.map((persona) => {
            const isSelected = selectedPersona.id === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona)}
                className={`p-3.5 sm:p-4 rounded-2xl flex flex-col items-center text-center transition-all duration-300 transform ${
                  isSelected
                    ? 'bg-terracotta text-white shadow-warm scale-105 ring-2 ring-terracotta ring-offset-2'
                    : 'bg-sand hover:bg-parchment-300 text-himalaya-900 shadow-subtle hover:-translate-y-1'
                }`}
              >
                <span className="text-xs font-bold font-editorial-serif tracking-tight leading-tight">
                  {persona.title}
                </span>
                <span
                  className={`text-[10px] mt-1 line-clamp-1 ${
                    isSelected ? 'text-parchment-200' : 'text-himalaya-600'
                  }`}
                >
                  {persona.tagline}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Persona Showcase Card */}
        <div className="rounded-3xl bg-sand border border-parchment-300 p-6 sm:p-10 shadow-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-subtle bg-himalaya-900">
              <Image
                src={selectedPersona.image.src}
                alt={selectedPersona.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/70 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-xs font-serif font-bold text-saffron-light">
                  {selectedPersona.title} Perspective
                </span>
                <p className="text-xs text-parchment-200 font-light italic mt-0.5">
                  &ldquo;{selectedPersona.image.caption}&rdquo;
                </p>
              </div>
            </div>

            {/* Right Details & Matching Journeys */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-xs uppercase font-bold tracking-wider text-terracotta mb-1">
                  <span>Curated for {selectedPersona.title}</span>
                </div>
                <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950">
                  {selectedPersona.tagline}
                </h3>
                <p className="text-sm sm:text-base text-himalaya-700 font-light mt-2 leading-relaxed">
                  {selectedPersona.description}
                </p>
              </div>

              {/* Recommended Journeys for this Persona */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase font-bold tracking-widest text-himalaya-600">
                  Recommended Tailored Journeys:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchingExperiences.map((exp) => (
                    <Link
                      key={exp.id}
                      href={`/experiences/${exp.slug}`}
                      className="group p-3.5 rounded-xl bg-parchment-50 hover:bg-white border border-parchment-300/80 shadow-subtle hover:shadow-warm transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-terracotta">
                          {exp.categoryLabel}
                        </span>
                        <h5 className="font-editorial-serif text-sm font-bold text-himalaya-950 group-hover:text-terracotta transition-colors mt-0.5">
                          {exp.title}
                        </h5>
                        <div className="flex items-center space-x-3 text-[11px] text-himalaya-600 font-light mt-2">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1 text-terracotta-light" />
                            {exp.duration}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-terracotta-light" />
                            {exp.location.split(',')[0]}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center text-xs font-semibold text-terracotta group-hover:translate-x-1 transition-transform">
                        <span>View Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href="#booking"
                  className="inline-flex items-center text-xs sm:text-sm font-bold text-himalaya-950 hover:text-terracotta transition-colors group"
                >
                  <span>Talk with Sakar about a {selectedPersona.title} itinerary</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
