'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';

interface PageHeroProps {
  badge?: string;
  nepaliTitle?: string;
  title: string;
  subtitle?: string;
  quote?: string;
  backgroundImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  compact?: boolean;
  children?: React.ReactNode;
}

export default function PageHero({
  badge,
  nepaliTitle,
  title,
  subtitle,
  quote,
  backgroundImage,
  breadcrumbs,
  compact = false,
  children,
}: PageHeroProps) {
  const hasBg = Boolean(backgroundImage);

  return (
    <header
      className={`relative w-full overflow-hidden ${
        hasBg
          ? compact
            ? 'py-20 sm:py-28'
            : 'py-24 sm:py-36 lg:py-44'
          : 'py-16 sm:py-24 bg-parchment-100 border-b border-parchment-300'
      }`}
    >
      {/* Background Image & Overlays */}
      {hasBg && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <Image
            src={backgroundImage!}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-himalaya-950/60 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950 via-himalaya-950/40 to-transparent" />
          <div className="absolute inset-0 opacity-20 film-grain pointer-events-none" />
        </div>
      )}

      {/* Pattern texture if no image */}
      {!hasBg && (
        <div className="absolute inset-0 opacity-30 film-grain pointer-events-none" />
      )}

      <div className="editorial-container relative z-10">
        {/* Optional Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} light={hasBg} />
          </div>
        )}

        <div className="max-w-4xl space-y-4 sm:space-y-6">
          {/* Badge & Nepali Subtitle */}
          <div className="flex flex-wrap items-center gap-3">
            {badge && (
              <span
                className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  hasBg
                    ? 'bg-white/15 text-parchment-100 backdrop-blur-md border border-white/20'
                    : 'bg-terracotta/10 text-terracotta border border-terracotta/20'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-terracotta-light" />
                <span>{badge}</span>
              </span>
            )}

            {nepaliTitle && (
              <span
                className={`font-serif text-sm sm:text-base tracking-widest ${
                  hasBg ? 'text-saffron-light/90' : 'text-saffron-dark font-medium'
                }`}
              >
                {nepaliTitle}
              </span>
            )}
          </div>

          {/* Main Title */}
          <h1
            className={`font-editorial-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] ${
              hasBg ? 'text-white drop-shadow-md' : 'text-himalaya-950'
            }`}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              className={`text-lg sm:text-xl font-normal leading-relaxed max-w-3xl ${
                hasBg ? 'text-parchment-100 drop-shadow-sm' : 'text-himalaya-800'
              }`}
            >
              {subtitle}
            </p>
          )}

          {/* Quote */}
          {quote && (
            <blockquote
              className={`font-display-serif italic text-base sm:text-xl pt-2 border-l-2 pl-4 max-w-2xl ${
                hasBg
                  ? 'border-saffron-light text-parchment-300'
                  : 'border-terracotta text-himalaya-800'
              }`}
            >
              &ldquo;{quote}&rdquo;
            </blockquote>
          )}

          {children && <div className="pt-2">{children}</div>}
        </div>
      </div>
    </header>
  );
}
