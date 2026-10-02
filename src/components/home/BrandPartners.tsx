'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CmsBrandPartner } from '@/types/cms';

interface BrandPartnersProps {
  partners?: CmsBrandPartner[];
}

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

  if (activePartners.length === 0) {
    return null;
  }

  // Clean URL helper so external websites open properly
  const cleanWebsiteUrl = (url?: string) => {
    if (!url) return undefined;
    const trimmed = url.trim();
    if (!trimmed) return undefined;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  // Repeat partners so marquee flows seamlessly and infinitely across all screen sizes
  const repeatCount = Math.max(4, Math.ceil(16 / activePartners.length));
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
    <section className="relative py-10 sm:py-14 bg-parchment-100 overflow-hidden">
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

      {/* Static Banner Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-terracotta/10 text-terracotta border border-terracotta/20 mb-2">
          <span>🤝</span>
          <span>Collaborations & Network</span>
        </span>
        <h2 className="font-editorial-serif text-xl sm:text-2xl lg:text-3xl font-bold text-himalaya-950 tracking-tight">
          Trusted Partners & Organizations
        </h2>
        <p className="text-xs sm:text-sm text-himalaya-600 font-light mt-1 max-w-xl mx-auto">
          Working alongside recognized travel partners, community initiatives & local organizations across Nepal.
        </p>
      </div>

      {/* Moving Logos Infinite Marquee */}
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
    </section>
  );
}
