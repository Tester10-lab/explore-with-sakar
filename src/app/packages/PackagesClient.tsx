'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Sparkles,
  Check,
  X,
  ArrowRight,
  Home,
  HeartHandshake,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import CTASection from '@/components/common/CTASection';
import { ExtendedPackage } from '@/types/cms';

interface PackagesClientProps {
  initialPackages: ExtendedPackage[];
}

const ITEMS_PER_PAGE = 4;

export default function PackagesClient({ initialPackages }: PackagesClientProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.max(1, Math.ceil(initialPackages.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedPackages = initialPackages.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById('packages-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge="Curated Packages"
        nepaliTitle="पारदर्शी यात्रा प्याकेजहरू"
        title="Signature Packages & Transparent Value"
        subtitle="Carefully balanced, unhurried journeys crafted around our core pillars. Every package includes private transport, dedicated hosting by Sakar, and authentic local stays."
        backgroundImage="/explore-with-sakar/images/mountains/himalayan-peaks.jpg"
        breadcrumbs={[{ label: 'Packages' }]}
      />

      {/* 2. Package Highlights & Inclusions Philosophy */}
      <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <SectionHeading
            tag="Our Pricing Philosophy"
            nepaliTag="मूल्य र पारदर्शिता"
            title="What Makes Our Journeys Different"
            description="We believe in complete transparency with zero hidden commissions, tourist markups, or compulsory shopping stops."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-sand/60 border border-parchment-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                100% Private & Fully Guided
              </h3>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                You travel with your own private party. Sakar serves as your personal host and cultural translator throughout your journey.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-sand/60 border border-parchment-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-saffron/15 text-saffron-dark flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                Direct Local Community Fair Share
              </h3>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                Hosting and porter fees go directly into village household hands, sustaining traditional crafts, organic agriculture, and local schools.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-sand/60 border border-parchment-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-moss/10 text-moss-light flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                Tailored Quotations & No Hidden Costs
              </h3>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                Every quote is tailored to your group size, travel season, and accommodation preferences with clear itemized inclusions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Signature Packages (Paginated: 4 per page, numbering > 4) */}
      <section id="packages-grid" className="py-20 sm:py-32 bg-sand border-b border-parchment-300">
        <div className="editorial-container">
          <SectionHeading
            tag="Signature Packages"
            nepaliTag="मुख्य यात्राहरू"
            title="Explore Our Curated Packages"
            description="Choose a curated foundation or customize any route to suit your exact travel dates and wishes."
          />

          <div className="space-y-16">
            {paginatedPackages.map((pkg, idx) => {
              const itemGlobalIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE + idx + 1;
              return (
                <div
                  key={pkg.id}
                  className="bg-white rounded-3xl overflow-hidden border border-parchment-300 shadow-editorial"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Left: Image & Overview */}
                    <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-himalaya-900">
                      <Image
                        src={pkg.heroImage?.src || '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg'}
                        alt={pkg.heroImage?.alt || pkg.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-himalaya-950/20 to-transparent" />

                      <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-himalaya-950">
                        Signature Package {itemGlobalIndex}
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                        <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold leading-tight">
                          {pkg.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium">
                            🕒 {pkg.duration}
                          </span>
                          {pkg.price ? (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-600/80 backdrop-blur-md text-xs font-bold">
                              From ${pkg.price} {pkg.currency} {pkg.priceNote && `(${pkg.priceNote})`}
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium">
                              👥 Custom Group Pricing
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Details, Highlights, Inclusions & CTA */}
                    <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
                            {pkg.summary}
                          </p>
                        </div>

                        {/* Highlights */}
                        {pkg.highlights && pkg.highlights.length > 0 && (
                          <div className="space-y-2.5 pt-4 border-t border-parchment-200">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-himalaya-950">
                              Key Journey Highlights
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {pkg.highlights.map((h, hIdx) => (
                                <div key={hIdx} className="flex items-start text-xs text-himalaya-700 font-light">
                                  <span className="text-terracotta mr-1.5 leading-none mt-0.5">•</span>
                                  <span>{h}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Inclusions / Exclusions breakdown */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-parchment-200">
                          {pkg.inclusions && pkg.inclusions.length > 0 && (
                            <div>
                              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center mb-2">
                                <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                                Always Included
                              </h5>
                              <ul className="space-y-1.5 text-xs text-himalaya-600 font-light">
                                {pkg.inclusions.slice(0, 4).map((inc, iIdx) => (
                                  <li key={iIdx} className="flex items-start">
                                    <span className="text-emerald-600 mr-1.5">✓</span>
                                    <span>{inc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {pkg.exclusions && pkg.exclusions.length > 0 && (
                            <div>
                              <h5 className="text-xs font-bold uppercase tracking-wider text-himalaya-700 flex items-center mb-2">
                                <X className="w-3.5 h-3.5 mr-1 text-terracotta" />
                                Excluded
                              </h5>
                              <ul className="space-y-1.5 text-xs text-himalaya-600 font-light">
                                {pkg.exclusions.slice(0, 3).map((exc, eIdx) => (
                                  <li key={eIdx} className="flex items-start">
                                    <span className="text-terracotta mr-1.5">✕</span>
                                    <span>{exc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Accommodations & Logistics note */}
                        {pkg.accommodationStyle && (
                          <div className="p-4 rounded-2xl bg-parchment-50 border border-parchment-200 text-xs text-himalaya-700 space-y-1">
                            <div className="flex items-center space-x-2 font-medium text-himalaya-900">
                              <Home className="w-3.5 h-3.5 text-terracotta" />
                              <span>Lodging Style: {pkg.accommodationStyle}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom CTA for this package */}
                      <div className="pt-6 border-t border-parchment-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-himalaya-500 block">
                            Private Group Pricing
                          </span>
                          <span className="font-editorial-serif text-lg font-bold text-himalaya-950">
                            {pkg.price ? `$${pkg.price} ${pkg.currency}` : 'Custom Quotation Based on Group Size'}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                          <Link
                            href={`/packages/${pkg.slug}`}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-himalaya-900/30 hover:border-terracotta text-himalaya-900 hover:text-terracotta font-bold text-xs tracking-widest uppercase transition-all duration-300 shrink-0"
                          >
                            <span>View Details</span>
                          </Link>
                          <Link
                            href={`/contact?package=${pkg.slug}`}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-himalaya-950 hover:bg-terracotta text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-subtle hover:shadow-warm shrink-0"
                          >
                            <span>Inquire Now</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls: 4 packages per page, page numbers 1, 2, 3, 4, 5... */}
          {totalPages > 1 && (
            <div className="mt-16 pt-8 border-t border-parchment-300 flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-xs sm:text-sm text-himalaya-600 font-light">
                Showing <span className="font-semibold text-himalaya-950">{(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safeCurrentPage * ITEMS_PER_PAGE, initialPackages.length)}</span> of <span className="font-semibold text-himalaya-950">{initialPackages.length}</span> signature packages
              </p>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage <= 1}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-parchment-300 bg-white text-himalaya-700 hover:bg-parchment-200 disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Previous page"
                >
                  Previous
                </button>

                <div className="flex items-center space-x-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isCurrent = pageNum === safeCurrentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center ${
                          isCurrent
                            ? 'bg-terracotta text-white shadow-warm'
                            : 'bg-white text-himalaya-700 hover:bg-parchment-200 border border-parchment-300'
                        }`}
                        aria-label={`Page ${pageNum}`}
                        aria-current={isCurrent ? 'page' : undefined}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage >= totalPages}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-parchment-300 bg-white text-himalaya-700 hover:bg-parchment-200 disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CTA Section */}
      <CTASection
        title="Need a Custom Quote or Route Adjustment?"
        subtitle="Every package can be shortened, extended, or combined with other valleys. Contact Sakar to receive a bespoke proposal."
        primaryButtonText="Request Custom Proposal"
        primaryButtonHref="/contact"
        secondaryButtonText="Read FAQs"
        secondaryButtonHref="/faq"
      />
    </div>
  );
}
