'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/data/faq';

interface FAQAccordionProps {
  items: FAQItem[];
  allowMultiple?: boolean;
}

export default function FAQAccordion({ items, allowMultiple = false }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'bg-white border-terracotta/40 shadow-editorial'
                : 'bg-sand/60 hover:bg-white border-parchment-300 shadow-subtle'
            }`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              aria-expanded={isOpen}
            >
              <div className="flex items-start space-x-3.5">
                <HelpCircle
                  className={`w-5 h-5 mt-0.5 shrink-0 transition-colors ${
                    isOpen ? 'text-terracotta' : 'text-himalaya-400'
                  }`}
                />
                <span
                  className={`font-editorial-serif text-base sm:text-lg font-bold transition-colors leading-snug ${
                    isOpen ? 'text-terracotta-dark' : 'text-himalaya-950'
                  }`}
                >
                  {item.question}
                </span>
              </div>

              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen
                    ? 'rotate-180 bg-terracotta/10 text-terracotta'
                    : 'bg-parchment-200 text-himalaya-600'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-0 text-sm text-himalaya-700 font-light leading-relaxed pl-12 sm:pl-14 border-t border-parchment-200 mt-2">
                <p className="pt-4">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
