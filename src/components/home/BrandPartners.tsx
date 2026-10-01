import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CmsBrandPartner } from '@/types/cms';

interface BrandPartnersProps {
  partners: CmsBrandPartner[];
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  'travel-agency': { bg: 'bg-terracotta/10', text: 'text-terracotta' },
  'ngo': { bg: 'bg-moss/10', text: 'text-moss' },
  'tourism-board': { bg: 'bg-saffron/10', text: 'text-saffron' },
  'adventure-gear': { bg: 'bg-himalaya-700/10', text: 'text-himalaya-700' },
  'media': { bg: 'bg-sky-500/10', text: 'text-sky-600' },
};

export default function BrandPartners({ partners }: BrandPartnersProps) {
  if (!partners || partners.length === 0) return null;

  // Group by category
  const grouped = partners.reduce<Record<string, CmsBrandPartner[]>>((acc, p) => {
    const cat = p.category || 'travel-agency';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  const categoryOrder = ['tourism-board', 'travel-agency', 'ngo', 'adventure-gear', 'media'];
  const sortedCategories = categoryOrder.filter((c) => grouped[c]);

  return (
    <section className="py-20 sm:py-28 bg-parchment-100 border-b border-parchment-300">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-terracotta/10 text-terracotta border border-terracotta/20 mb-3">
            <span>🤝</span>
            <span>Our Partners</span>
          </span>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
            Trusted By Leading Organizations
          </h2>
          <p className="text-base text-himalaya-700 font-light mt-3 leading-relaxed">
            We collaborate with trusted organizations to deliver authentic, responsible, and meaningful travel experiences across Nepal.
          </p>
        </div>

        {/* Partners by Category */}
        <div className="space-y-12">
          {sortedCategories.map((category) => {
            const categoryPartners = grouped[category];
            const style = CATEGORY_STYLES[category] || CATEGORY_STYLES['travel-agency'];
            const label = categoryPartners[0]?.categoryLabel || category;

            return (
              <div key={category}>
                {/* Category Label */}
                <div className="flex items-center gap-3 mb-6">
                  <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${style.bg} ${style.text}`}>
                    {label}
                  </span>
                  <div className="flex-1 h-px bg-parchment-300/60" />
                </div>

                {/* Partner Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                  {categoryPartners.map((partner) => {
                    const Wrapper = partner.websiteUrl ? 'a' : 'div';
                    const wrapperProps = partner.websiteUrl
                      ? {
                          href: partner.websiteUrl,
                          target: '_blank' as const,
                          rel: 'noopener noreferrer',
                        }
                      : {};

                    return (
                      <Wrapper
                        key={partner.id}
                        {...wrapperProps}
                        className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-parchment-300/80 shadow-subtle hover:shadow-editorial hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                      >
                        {/* Logo */}
                        <div className="relative w-full aspect-[3/2] flex items-center justify-center mb-3">
                          <Image
                            src={partner.logoUrl}
                            alt={partner.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                            className="object-contain p-2 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                          />
                        </div>

                        {/* Name */}
                        <span className="text-xs font-semibold text-himalaya-700 text-center leading-tight group-hover:text-himalaya-950 transition-colors">
                          {partner.name}
                        </span>

                        {/* Description */}
                        {partner.description && (
                          <span className="text-[10px] text-himalaya-500 text-center mt-1 line-clamp-2 font-light">
                            {partner.description}
                          </span>
                        )}
                      </Wrapper>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
