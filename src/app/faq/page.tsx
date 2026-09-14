'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Sparkles,
  Phone,
  ArrowRight,
  Search,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import FAQAccordion from '@/components/common/FAQAccordion';
import CTASection from '@/components/common/CTASection';
import { FAQ_ITEMS, FAQ_CATEGORIES } from '@/data/faq';
import { useSettings } from '@/context/SettingsContext';

export default function FAQPage() {
  const { settings } = useSettings();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const whatsappUrl = `https://wa.me/${settings.contact?.whatsappNumber || '9779840482692'}?text=${encodeURIComponent(
    'Namaste Sakar, I have a question about planning a trip in Nepal.'
  )}`;

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge="Help & Clarity"
        nepaliTitle="प्रायः सोधिने प्रश्नहरू"
        title="Frequently Asked Questions"
        subtitle="Clear, honest answers about our homestays, trip customization, physical requirements, booking policies, and responsible tourism standards."
        backgroundImage="/explore-with-sakar/images/mountains/alpine-valley.jpg"
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      {/* 2. Search & Category Filter */}
      <section className="py-12 bg-white border-b border-parchment-300 sticky top-16 z-30 shadow-subtle">
        <div className="editorial-container space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-himalaya-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., visa, altitude, food, deposit)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-parchment-100 border border-parchment-300 text-sm text-himalaya-900 placeholder:text-himalaya-500 focus:outline-none focus:ring-2 focus:ring-terracotta focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-himalaya-500 hover:text-himalaya-900"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-2 sm:pb-0 scrollbar-none">
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-terracotta text-white shadow-warm'
                      : 'bg-parchment-100 text-himalaya-700 hover:bg-parchment-200 border border-parchment-300'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Accordion List */}
      <section className="py-20 sm:py-28 bg-sand">
        <div className="editorial-container max-w-4xl mx-auto">
          {filteredItems.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-himalaya-600 font-medium px-2">
                <span>
                  Showing {filteredItems.length}{' '}
                  {filteredItems.length === 1 ? 'question' : 'questions'}
                </span>
                {activeCategory !== 'all' && (
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="text-terracotta hover:underline"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              <FAQAccordion items={filteredItems} />
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-parchment-300 shadow-subtle space-y-4">
              <HelpCircle className="w-12 h-12 text-terracotta mx-auto" />
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                No matching questions found
              </h3>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light max-w-md mx-auto">
                Have a specific question not listed here? Message Sakar directly on WhatsApp or submit a quick inquiry.
              </p>
              <div className="pt-2 flex justify-center gap-4">
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-parchment-200 text-xs font-semibold text-himalaya-900"
                >
                  View All FAQs
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider"
                >
                  Ask Sakar on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CTA Section */}
      <CTASection
        title="Ready to Plan Your Nepal Journey?"
        subtitle="Have remaining questions about dates, routes, or homestay accommodations? Contact Sakar directly."
        primaryButtonText="Ask a Question / Inquire"
        primaryButtonHref="/contact"
        secondaryButtonText="Chat on WhatsApp"
        secondaryButtonHref={whatsappUrl}
      />
    </div>
  );
}
