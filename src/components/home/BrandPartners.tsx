'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  Users,
  ShieldCheck,
  Layers,
  HeartHandshake,
  Camera,
  Globe2,
  Handshake,
  MessageCircle,
} from 'lucide-react';
import { CmsBrandPartner } from '@/types/cms';

interface BrandPartnersProps {
  partners?: CmsBrandPartner[];
}

const SUPPORT_SERVICES = [
  {
    icon: Compass,
    title: 'Local research & destination development',
  },
  {
    icon: Users,
    title: 'Cultural and community experiences',
  },
  {
    icon: ShieldCheck,
    title: 'Government-licensed guiding',
  },
  {
    icon: Layers,
    title: 'Local coordination and logistics',
  },
  {
    icon: HeartHandshake,
    title: 'Responsible volunteering initiatives',
  },
  {
    icon: Camera,
    title: 'Content creation & storytelling',
  },
  {
    icon: Globe2,
    title: 'Community-based tourism projects',
  },
  {
    icon: Handshake,
    title: 'Partnership development & local introductions',
  },
];

export default function BrandPartners({ partners: initialPartners = [] }: BrandPartnersProps) {
  const [partnerList, setPartnerList] = useState<CmsBrandPartner[]>(initialPartners);
  const [hasCheckedLive, setHasCheckedLive] = useState(initialPartners.length > 0);

  // Fetch live partners from public API on mount to guarantee up-to-date data
  useEffect(() => {
    let active = true;
    fetch('/api/public/brand-partners')
      .then((res) => res.json())
      .then((data) => {
        if (active && Array.isArray(data.partners) && data.partners.length > 0) {
          setPartnerList(data.partners);
        }
        if (active) {
          setHasCheckedLive(true);
        }
      })
      .catch((err) => {
        console.warn('Failed to load live brand partners:', err);
        if (active) {
          setHasCheckedLive(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  // Filter to visible partners
  const activePartners = partnerList.filter((p) => p.isVisible !== false);

  // Clean URL helper so external websites open properly
  const cleanWebsiteUrl = (url?: string) => {
    if (!url) return undefined;
    const trimmed = url.trim();
    if (!trimmed) return undefined;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  // Repeat partners so marquee flows seamlessly across wide screens
  const repeatCount = Math.max(4, Math.ceil(16 / Math.max(activePartners.length, 1)));
  const repeatedPartners = Array.from({ length: repeatCount }, () => activePartners).flat();

  const renderPartnerLogo = (partner: CmsBrandPartner, key: string) => {
    const url = cleanWebsiteUrl(partner.websiteUrl);
    const CardTag = url ? 'a' : 'div';
    const cardProps = url
      ? {
          href: url,
          target: '_blank' as const,
          rel: 'noopener noreferrer',
          title: partner.name,
        }
      : {
          title: partner.name,
        };

    return (
      <CardTag
        key={key}
        {...cardProps}
        className="group relative flex items-center justify-center h-16 sm:h-20 w-32 sm:w-44 px-2 cursor-pointer shrink-0 transition-transform duration-300 hover:scale-110"
      >
        {/* Full-color Logo Only — No Card Background, No Border */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={partner.logoUrl}
            alt={partner.name}
            fill
            sizes="(max-width: 640px) 130px, 180px"
            className="object-contain transition-transform duration-300 drop-shadow-sm"
          />
        </div>
      </CardTag>
    );
  };

  return (
    <section className="relative py-16 sm:py-24 bg-parchment-100 border-t border-parchment-300/80 overflow-hidden">
      <style jsx>{`
        @keyframes logoMarqueeLoop {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-infinite-track {
          display: flex;
          width: max-content;
          animation: logoMarqueeLoop 30s linear infinite;
          will-change: transform;
        }
        .marquee-infinite-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Partnership Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-terracotta/10 text-terracotta border border-terracotta/20 mb-4">
            <span>🤝</span>
            <span>B2B & Organizational Collaborations</span>
          </span>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
            Planning to work in Nepal? Let&apos;s connect.
          </h2>
          <p className="text-base sm:text-lg text-himalaya-700 font-light mt-4 leading-relaxed">
            I collaborate with international travel companies, destination managers, content creators, NGOs, educational groups, and responsible-tourism organizations seeking a reliable Nepal-based partner.
          </p>
        </div>

        {/* Capabilities Grid: "I can support with" */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-14">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-himalaya-500">
              Areas of Collaboration & Support
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {SUPPORT_SERVICES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/70 hover:bg-white border border-parchment-300/60 hover:border-terracotta/30 shadow-subtle hover:shadow-warm transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 group-hover:bg-terracotta group-hover:text-white transition-colors duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-himalaya-800 leading-snug group-hover:text-himalaya-950 transition-colors">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 sm:mb-20">
          <a
            href="#inquiry"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-himalaya-950 hover:bg-terracotta text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-subtle hover:shadow-warm"
          >
            <span>Start a Partnership Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/9779840482692?text=Namaste%20Sakar%2C%20I%20am%20interested%20in%20exploring%20a%20partnership%20collaboration%20in%20Nepal."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-parchment-200/80 text-himalaya-900 border border-parchment-300 font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-subtle"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Moving Logos Infinite Marquee (Only shown if partners exist) */}
      {activePartners.length > 0 && (
        <div className="pt-4 border-t border-parchment-300/50">
          <div className="text-center mb-5">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-himalaya-400">
              Trusted Network & Collaborations
            </span>
          </div>

          <div className="relative w-full overflow-hidden py-3">
            {/* Subtle gradient masks on left and right for seamless edge fade */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 z-10 bg-gradient-to-r from-parchment-100 via-parchment-100/80 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 z-10 bg-gradient-to-l from-parchment-100 via-parchment-100/80 to-transparent" />

            {/* Seamless Infinite scrolling ticker — No borders, no card backgrounds */}
            <div className="marquee-infinite-track flex items-center gap-8 sm:gap-14">
              {/* Primary loop track */}
              <div className="flex items-center gap-8 sm:gap-14 shrink-0">
                {repeatedPartners.map((partner, index) =>
                  renderPartnerLogo(partner, `track-a-${index}`)
                )}
              </div>

              {/* Secondary loop track for mathematically seamless infinite repetition */}
              <div className="flex items-center gap-8 sm:gap-14 shrink-0" aria-hidden="true">
                {repeatedPartners.map((partner, index) =>
                  renderPartnerLogo(partner, `track-b-${index}`)
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
