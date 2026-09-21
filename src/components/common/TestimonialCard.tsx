import React from 'react';
import { Quote } from 'lucide-react';
import { Testimonial } from '@/types';
import { ExtendedTestimonial } from '@/types/cms';

interface TestimonialCardProps {
  testimonial: Testimonial | ExtendedTestimonial;
  featured?: boolean;
}

export default function TestimonialCard({ testimonial, featured = false }: TestimonialCardProps) {
  const flag = testimonial.countryFlag || '🌍';
  return (
    <div
      className={`relative p-8 sm:p-10 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
        featured
          ? 'bg-gradient-to-br from-himalaya-900 to-himalaya-950 text-white border-himalaya-800 shadow-floating'
          : 'bg-white text-himalaya-900 border-parchment-300 shadow-subtle hover:shadow-editorial'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <span
            className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
              featured
                ? 'bg-white/10 text-saffron-light border border-white/10'
                : 'bg-terracotta/10 text-terracotta border border-terracotta/20'
            }`}
          >
            {testimonial.journey}
          </span>
          <span className="text-xl" title={testimonial.country}>
            {flag}
          </span>
        </div>

        <Quote
          className={`w-8 h-8 mb-4 ${
            featured ? 'text-saffron/40' : 'text-terracotta/30'
          }`}
        />

        <p
          className={`font-display-serif italic text-lg sm:text-xl font-normal leading-relaxed mb-6 ${
            featured ? 'text-parchment-100' : 'text-himalaya-950'
          }`}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div
        className={`pt-6 border-t ${
          featured ? 'border-white/15 text-parchment-300' : 'border-parchment-200 text-himalaya-600'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4
              className={`font-editorial-serif text-base font-bold ${
                featured ? 'text-white' : 'text-himalaya-950'
              }`}
            >
              {testimonial.author}
            </h4>
            <p className="text-xs font-light">
              {testimonial.country} • {testimonial.date}
            </p>
          </div>
          <div className="flex items-center space-x-1 text-saffron">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-sm">★</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
