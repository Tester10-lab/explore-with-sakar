'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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
  { key: 'heritage', label: 'Living Heritage' },
  { key: 'spiritual', label: 'Spiritual & Wellness' },
  { key: 'homestay', label: 'Village Homestays' },
  { key: 'adventure', label: 'Hidden Trails' },
  { key: 'responsible', label: 'Responsible Wildlife' },
];

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<any[]>(EXPERIENCES);
  const [activeCategory, setActiveCategory] = useState<ExperienceCategory | 'all'>('all');

  React.useEffect(() => {
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

  const filteredExperiences = useMemo(() => {
    if (activeCategory === 'all') return experiences;
    return experiences.filter((e) => e.category === activeCategory);
  }, [activeCategory, experiences]);

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
              const count =
                cat.key === 'all'
                  ? experiences.length
                  : experiences.filter((e) => e.category === cat.key).length;

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
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
      <section className="py-20 sm:py-32 bg-sand">
        <div className="editorial-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
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
