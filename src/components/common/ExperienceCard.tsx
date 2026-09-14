'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin, ArrowRight, Mountain } from 'lucide-react';
import { Experience } from '@/types';
import { ExtendedExperience } from '@/types/cms';

interface ExperienceCardProps {
  experience: Experience | ExtendedExperience;
  compact?: boolean;
}

export default function ExperienceCard({ experience, compact = false }: ExperienceCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-parchment-300 shadow-subtle hover:shadow-editorial transition-all duration-300 hover:-translate-y-1 active:scale-[0.99] touch-manipulation">
      {/* Hero Image */}
      <Link
        href={`/experiences/${experience.slug}`}
        className="block relative aspect-[16/10] overflow-hidden bg-himalaya-900"
      >
        <Image
          src={experience.heroImage.src}
          alt={experience.heroImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Tag */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-himalaya-950 text-[11px] font-bold uppercase tracking-wider rounded-full shadow-sm">
          {experience.categoryLabel}
        </div>

        {/* Elevation Tag if available */}
        {experience.elevation && (
          <div className="absolute top-4 right-4 px-2.5 py-1 bg-himalaya-950/70 backdrop-blur-md text-white text-[11px] font-mono flex items-center space-x-1 rounded-full border border-white/20">
            <Mountain className="w-3 h-3 text-saffron-light" />
            <span>{experience.elevation}</span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
        <div>
          <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950 mb-2 group-hover:text-terracotta transition-colors leading-snug">
            <Link href={`/experiences/${experience.slug}`}>
              {experience.title}
            </Link>
          </h3>

          <p className="text-sm text-himalaya-600 font-light leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
            {experience.shortDescription}
          </p>
        </div>

        <div>
          {/* Metadata chips */}
          <div className="flex items-center justify-between text-xs text-himalaya-600 font-medium py-3 border-t border-parchment-200 mb-4">
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-terracotta" />
              {experience.duration}
            </span>
            <span className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-terracotta" />
              <span className="truncate max-w-[130px]">{experience.location.split(',')[0]}</span>
            </span>
          </div>

          <Link
            href={`/experiences/${experience.slug}`}
            className="flex items-center justify-center w-full py-3 rounded-xl bg-parchment-100 hover:bg-himalaya-950 text-himalaya-900 hover:text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 border border-parchment-300 hover:border-himalaya-950"
          >
            <span>View Full Journey</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
