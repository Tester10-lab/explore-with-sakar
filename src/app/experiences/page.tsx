'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Sparkles, ArrowRight } from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import ExperienceCard from '@/components/common/ExperienceCard';
import CTASection from '@/components/common/CTASection';
import { EXPERIENCES } from '@/data/experiences';
import { ExperienceCategory } from '@/types';
import { ExtendedExperience } from '@/types/cms';

const CATEGORIES: { key: ExperienceCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All Journeys' },
  { key: 'adventure', label: 'Go Beyond the Map' },
  { key: 'spiritual', label: 'Go Within' },
  { key: 'homestay', label: 'Feel Closer' },
  { key: 'responsible', label: 'Leave a Mark' },
  { key: 'heritage', label: 'Living Heritage' },
];

const ITEMS_PER_PAGE = 4;

function ExperiencesContent() {
  const searchParams = useSearchParams();
  const [experiences, setExperiences] = useState<any[]>(EXPERIENCES);
  const [activeCategory, setActiveCategory] = useState<ExperienceCategory | 'all'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const categoryParam = searchParams.get('category') || searchParams.get('pillar');
    if (categoryParam) {
      if (categoryParam === 'responsible' || categoryParam === 'leave-a-mark') {
        setActiveCategory('responsible');
      } else if (categoryParam === 'spiritual' || categoryParam === 'within') {
        setActiveCategory('spiritual');
      } else if (categoryParam === 'homestay' || categoryParam === 'feel-closer') {
        setActiveCategory('homestay');
      } else if (categoryParam === 'adventure' || categoryParam === 'beyond-the-map') {
        setActiveCategory('adventure');
      } else if (categoryParam === 'heritage') {
        setActiveCategory('heritage');
      }
      setCurrentPage(1);
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadLiveExperiences() {
      try {
        const res = await fetch('/api/public/content');
        if (res.ok) {
          const data = await res.json();
          if (data.experiences && data.experiences.length > 0) {
            setExperiences(data.experiences);
          }
        }
      } catch (err) {
        // Fallback
      }
    }
    loadLiveExperiences();
  }, []);

  const matchesCategory = (category: string, targetKey: ExperienceCategory | 'all') => {
    if (targetKey === 'all') return true;
    if (targetKey === 'adventure') return category === 'adventure' || category === 'beyond-the-map';
    if (targetKey === 'spiritual') return category === 'spiritual' || category === 'spiritual-wellness';
    if (targetKey === 'homestay') return category === 'homestay' || category === 'homestays';
    if (targetKey === 'responsible') return category === 'responsible' || category === 'leave-a-mark';
    if (targetKey === 'heritage') return category === 'heritage' || category === 'culture';
    return category === targetKey;
  };

  const filteredExperiences = useMemo(() => {
    return experiences.filter((e) => matchesCategory(e.category, activeCategory));
  }, [activeCategory, experiences]);

  const totalPages = Math.max(1, Math.ceil(filteredExperiences.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedExperiences = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredExperiences.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredExperiences, safeCurrentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById('experiences-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategorySelect = (key: ExperienceCategory | 'all') => {
    setActiveCategory(key);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge="Curated Itineraries"
        nepaliTitle="हाम्रा विशेष यात्राहरू"
        title="Immersive Nepal Journeys"
        subtitle="We design private, slow-paced journeys meant to spark genuine connection with sacred shrines, village families, and quiet Himalayan ridges."
        backgroundImage="/explore-with-sakar/images/mountains/sunrise-himalayas.jpg"
        breadcrumbs={[{ label: 'Experiences' }]}
      />

      {/* 2. Interactive Category Filter */}
      <section className="py-12 bg-white border-b border-parchment-300 sticky top-16 z-30 shadow-subtle">
        <div className="editorial-container">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              const count = experiences.filter((e) => matchesCategory(e.category, cat.key)).length;

              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategorySelect(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-terracotta text-white shadow-warm'
                      : 'bg-parchment-100 text-himalaya-700 hover:bg-parchment-200 border border-parchment-300'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-parchment-300 text-himalaya-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Experiences Grid */}
      <section id="experiences-grid" className="py-20 sm:py-28 bg-sand">
        <div className="editorial-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paginatedExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>

          {/* Pagination Controls: 4 items per page, page numbers 1, 2, 3, 4, 5... */}
          {totalPages > 1 && (
            <div className="mt-16 pt-8 border-t border-parchment-300 flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-xs sm:text-sm text-himalaya-600 font-light">
                Showing <span className="font-semibold text-himalaya-950">{(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredExperiences.length)}</span> of <span className="font-semibold text-himalaya-950">{filteredExperiences.length}</span> curated experiences
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
        title="Want to Blend Elements from Multiple Itineraries?"
        subtitle="All our journeys are 100% customizable. Connect with Sakar to weave your dream route."
        primaryButtonText="Plan a Custom Route"
        primaryButtonHref="/contact"
        secondaryButtonText="View Ready Packages"
        secondaryButtonHref="/packages"
      />
    </div>
  );
}

export default function ExperiencesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-parchment-100 flex items-center justify-center">
          <p className="font-editorial-serif text-terracotta">Loading experiences...</p>
        </div>
      }
    >
      <ExperiencesContent />
    </Suspense>
  );
}
