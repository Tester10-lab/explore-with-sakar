import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { CmsBrandPartner } from '@/types/cms';

interface BrandPartnersProps {
  partners: CmsBrandPartner[];
}

export default function BrandPartners({ partners }: BrandPartnersProps) {
  if (!partners || partners.length === 0) return null;

  // Clean URL helper to prevent relative URL bugs (e.g. www.example.com -> https://www.example.com)
  const cleanWebsiteUrl = (url?: string) => {
    if (!url) return undefined;
    const trimmed = url.trim();
    if (!trimmed) return undefined;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  // Ensure enough items in the marquee loop so it moves seamlessly across wide screens
  const repeatCount = Math.max(3, Math.ceil(10 / partners.length));
  const repeatedPartners = Array.from({ length: repeatCount }, () => partners).flat();

  const renderPartnerCard = (partner: CmsBrandPartner, key: string) => {
    const url = cleanWebsiteUrl(partner.websiteUrl);
    const CardTag = url ? 'a' : 'div';
    const cardProps = url
      ? {
          href: url,
          target: '_blank' as const,
          rel: 'noopener noreferrer',
          title: `Visit ${partner.name}`,
        }
      : {};

    return (
      <CardTag
        key={key}
        {...cardProps}
        className="group relative flex items-center gap-3.5 h-16 sm:h-20 px-5 sm:px-6 bg-white/95 hover:bg-white rounded-xl border border-parchment-300/80 hover:border-terracotta/40 shadow-subtle hover:shadow-warm hover:-translate-y-0.5 transition-all duration-300 cursor-pointer shrink-0"
      >
        {/* Partner Logo */}
        <div className="relative w-16 sm:w-20 h-10 sm:h-12 flex items-center justify-center shrink-0">
          <Image
            src={partner.logoUrl}
            alt={partner.name}
            fill
            sizes="120px"
            className="object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
          />
        </div>

        {/* Partner Name & Category */}
        <div className="flex flex-col justify-center min-w-0 pr-1">
          <span className="text-xs sm:text-sm font-semibold text-himalaya-900 group-hover:text-terracotta transition-colors truncate max-w-[140px] sm:max-w-[180px]">
            {partner.name}
          </span>
          {partner.categoryLabel && (
            <span className="text-[10px] text-himalaya-500 font-medium tracking-wide truncate">
              {partner.categoryLabel}
            </span>
          )}
        </div>

        {/* Link icon on hover */}
        {url && (
          <ExternalLink className="w-3.5 h-3.5 text-himalaya-400 group-hover:text-terracotta opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-0.5" />
        )}
      </CardTag>
    );
  };

  return (
    <section className="relative py-10 sm:py-14 bg-gradient-to-b from-parchment-100 to-parchment-200/70 border-y border-parchment-300/80 overflow-hidden">
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

      {/* Moving Logos Marquee */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Subtle gradient masks on left and right for seamless edge fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 z-10 bg-gradient-to-r from-parchment-100 via-parchment-100/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 z-10 bg-gradient-to-l from-parchment-100 via-parchment-100/80 to-transparent" />

        {/* Infinite scrolling ticker */}
        <div className="animate-marquee-infinite flex items-center gap-5 sm:gap-7">
          {/* Primary loop track */}
          <div className="flex items-center gap-5 sm:gap-7 shrink-0">
            {repeatedPartners.map((partner, index) =>
              renderPartnerCard(partner, `track-a-${index}`)
            )}
          </div>

          {/* Secondary loop track for infinite seamless repetition */}
          <div className="flex items-center gap-5 sm:gap-7 shrink-0" aria-hidden="true">
            {repeatedPartners.map((partner, index) =>
              renderPartnerCard(partner, `track-b-${index}`)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
