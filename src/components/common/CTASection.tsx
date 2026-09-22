'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  dark?: boolean;
}

export default function CTASection({
  title = "Let's Craft Your Meaningful Journey Through Nepal",
  subtitle = 'Connect directly with Sakar to discuss your preferred travel dates, pace, and cultural interests. Every journey is thoughtfully personalized.',
  primaryButtonText = 'Plan Your Journey',
  primaryButtonHref = '/contact',
  secondaryButtonText = 'Chat on WhatsApp',
  secondaryButtonHref,
  dark = true,
}: CTASectionProps) {
  const { settings } = useSettings();

  const whatsappLink =
    secondaryButtonHref ||
    `https://wa.me/${settings.contact?.whatsappNumber || '9779840482692'}?text=${encodeURIComponent(
      'Namaste Sakar, I would like to consult with you about planning an authentic journey in Nepal.'
    )}`;

  return (
    <section
      className={`py-20 sm:py-28 relative overflow-hidden ${
        dark
          ? 'bg-himalaya-950 text-white'
          : 'bg-parchment-100 text-himalaya-950 border-t border-b border-parchment-300'
      }`}
    >
      {/* Decorative texture */}
      <div className="absolute inset-0 opacity-20 film-grain pointer-events-none" />

      <div className="editorial-container relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest mx-auto border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-saffron-light" />
          <span>Bespoke Private Travel</span>
        </div>

        <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
          {title}
        </h2>

        <p
          className={`text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto ${
            dark ? 'text-parchment-100' : 'text-himalaya-800'
          }`}
        >
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={primaryButtonHref}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-warm hover:shadow-floating"
          >
            <span>{primaryButtonText}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300 border ${
              dark
                ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                : 'bg-white hover:bg-parchment-100 text-himalaya-900 border-parchment-300 shadow-subtle'
            }`}
          >
            <Phone className="w-4 h-4 mr-2 text-emerald-400" />
            <span>{secondaryButtonText}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
