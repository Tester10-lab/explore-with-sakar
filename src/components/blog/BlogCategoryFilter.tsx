'use client';

import React from 'react';
import { BlogCategory } from '@/types';
import { BLOG_CATEGORIES } from '@/data/blog';

interface BlogCategoryFilterProps {
  activeCategory: BlogCategory | 'All';
  onSelectCategory: (category: BlogCategory | 'All') => void;
  counts: Record<string, number>;
}

export default function BlogCategoryFilter({
  activeCategory,
  onSelectCategory,
  counts,
}: BlogCategoryFilterProps) {
  const allTabs: { id: BlogCategory | 'All'; label: string }[] = [
    { id: 'All', label: 'All Stories' },
    ...BLOG_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <div className="w-full overflow-x-auto pb-4 pt-2">
      <div className="flex items-center justify-start lg:justify-center flex-nowrap lg:flex-wrap gap-2 min-w-max px-4">
        {allTabs.map((tab) => {
          const isSelected = activeCategory === tab.id;
          const count = tab.id === 'All' ? counts['total'] || 0 : counts[tab.id] || 0;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center space-x-1.5 ${
                isSelected
                  ? 'bg-terracotta text-white shadow-warm font-semibold'
                  : 'bg-sand hover:bg-parchment-300 text-himalaya-800 border border-parchment-300'
              }`}
            >
              <span>{tab.label}</span>
              {count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-parchment-300 text-himalaya-700'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
