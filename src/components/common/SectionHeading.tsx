import React from 'react';
import { Sparkles } from 'lucide-react';

interface SectionHeadingProps {
  tag?: string;
  nepaliTag?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  tag,
  nepaliTag,
  title,
  description,
  align = 'center',
  dark = false,
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`space-y-3 mb-12 sm:mb-16 ${
        isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'
      } ${className}`}
    >
      {(tag || nepaliTag) && (
        <div
          className={`flex items-center gap-2 ${
            isCenter ? 'justify-center' : 'justify-start'
          }`}
        >
          {tag && (
            <span
              className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                dark
                  ? 'bg-white/10 text-saffron-light border border-white/15'
                  : 'bg-terracotta/10 text-terracotta border border-terracotta/20'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>{tag}</span>
            </span>
          )}

          {nepaliTag && (
            <span
              className={`font-serif text-xs tracking-wider ${
                dark ? 'text-white/60' : 'text-himalaya-500'
              }`}
            >
              {nepaliTag}
            </span>
          )}
        </div>
      )}

      <h2
        className={`font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${
          dark ? 'text-white' : 'text-himalaya-950'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`text-base sm:text-lg font-light leading-relaxed ${
            dark ? 'text-parchment-200' : 'text-himalaya-700'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
