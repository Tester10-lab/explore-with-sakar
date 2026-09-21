'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Clock, Users, Sparkles } from 'lucide-react';
import { ExtendedExperience } from '@/types/cms';

export type CatalogExperience = {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryLabel?: string;
  featured?: boolean;
  duration?: string;
  location?: string;
  shortDescription?: string;
  groupSize?: string;
  heroImage?: {
    src: string;
    alt: string;
  };
};

interface ExperienceCatalogClientProps {
  initialExperiences: (CatalogExperience | ExtendedExperience)[];
}

const ITEMS_PER_PAGE = 4;

const CATEGORIES = [
  { key: 'all', label: 'All Curated Departures' },
  { key: 'beyond-the-map', label: 'Go Beyond the Map' },
  { key: 'spiritual-wellness', label: 'Go Spiritual' },
  { key: 'homestays', label: 'Feel Closer' },
  { key: 'leave-a-mark', label: 'Leave a Mark' },
];

export default function ExperienceCatalogClient({
  initialExperiences,
}: ExperienceCatalogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const matchesCategory = (category: string, targetKey: string) => {
    if (targetKey === 'all') return true;
    if (targetKey === 'beyond-the-map') return category === 'beyond-the-map' || category === 'adventure' || category === 'heritage';
    if (targetKey === 'spiritual-wellness') return category === 'spiritual-wellness' || category === 'spiritual';
    if (targetKey === 'homestays') return category === 'homestays' || category === 'homestay';
    if (targetKey === 'leave-a-mark') return category === 'leave-a-mark' || category === 'responsible';
    return category === targetKey;
  };

  // Filter out the meta packages from the individual departure grid if needed, or include them
  const filteredExperiences = useMemo(() => {
    return initialExperiences.filter((e) => matchesCategory(e.category, activeCategory));
  }, [activeCategory, initialExperiences]);

  const totalPages = Math.max(1, Math.ceil(filteredExperiences.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedExperiences = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredExperiences.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredExperiences, safeCurrentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById('catalog-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategorySelect = (key: string) => {
    setActiveCategory(key);
    setCurrentPage(1);
  };

  return (
    <section id="catalog-grid" className="py-20 sm:py-28 bg-sand border-b border-parchment-300 scroll-mt-20">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-terracotta block">
              Curated Departures
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-himalaya-950 mt-1">
              Browse All Curated Itineraries
            </h2>
            <p className="text-xs sm:text-sm text-himalaya-600 font-light mt-1">
              Showing 4 itineraries per page with verified local hosting and transparent pricing.
            </p>
          </div>

          <div className="text-xs font-mono bg-white px-4 py-2 rounded-xl border border-parchment-300 text-himalaya-700 shadow-subtle">
            Page <span className="font-bold text-terracotta">{safeCurrentPage}</span> of <span className="font-bold">{totalPages}</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-4 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            const count = initialExperiences.filter((e) => matchesCategory(e.category, cat.key)).length;

            return (
              <button
                key={cat.key}
                onClick={() => handleCategorySelect(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-terracotta text-white shadow-warm'
                    : 'bg-white text-himalaya-700 hover:bg-parchment-200 border border-parchment-300'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-parchment-200 text-himalaya-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paginatedExperiences.map((exp) => (
            <div
              key={exp.id}
              className="group bg-white rounded-3xl overflow-hidden border border-parchment-300 shadow-subtle hover:shadow-editorial transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-himalaya-900">
                <Image
                  src={exp.heroImage?.src || '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg'}
                  alt={exp.heroImage?.alt || exp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-himalaya-950 text-[10px] font-bold uppercase tracking-wider">
                    {exp.categoryLabel || 'Curated'}
                  </span>
                  {exp.featured && (
                    <span className="px-2.5 py-1 rounded-full bg-terracotta text-white text-[10px] font-bold uppercase tracking-wider shadow-subtle flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-terracotta" />
                    <span>{exp.duration}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-terracotta" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-editorial-serif text-2xl font-bold text-himalaya-950 group-hover:text-terracotta transition-colors leading-tight">
                    {exp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-himalaya-600 font-light mt-2 line-clamp-3 leading-relaxed">
                    {exp.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-parchment-200 flex items-center justify-between">
                  <span className="text-[11px] text-himalaya-500 font-mono">
                    {exp.groupSize || 'Private party'}
                  </span>
                  <Link
                    href={`/experience/${exp.slug}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-terracotta hover:text-terracotta-light transition-colors"
                  >
                    <span>View Journey</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls (4 items/page, page numbers 1, 2, 3, 4, 5...) */}
        {totalPages > 1 && (
          <div className="mt-16 pt-8 border-t border-parchment-300 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs sm:text-sm text-himalaya-600 font-light">
              Showing <span className="font-semibold text-himalaya-950">{(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredExperiences.length)}</span> of <span className="font-semibold text-himalaya-950">{filteredExperiences.length}</span> curated departures
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
  );
}
