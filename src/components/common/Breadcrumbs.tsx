'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  light?: boolean;
}

export default function Breadcrumbs({ items, className = '', light = false }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-3 ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1.5 text-xs font-medium tracking-wide">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className={`inline-flex items-center transition-colors ${
              light
                ? 'text-white/70 hover:text-white'
                : 'text-himalaya-600 hover:text-terracotta'
            }`}
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center">
              <ChevronRight
                className={`w-3.5 h-3.5 mx-1 ${
                  light ? 'text-white/40' : 'text-himalaya-400'
                }`}
              />
              {isLast || !item.href ? (
                <span
                  aria-current="page"
                  className={`truncate max-w-[200px] sm:max-w-none ${
                    light ? 'text-saffron-light font-semibold' : 'text-himalaya-950 font-semibold'
                  }`}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    light
                      ? 'text-white/70 hover:text-white'
                      : 'text-himalaya-600 hover:text-terracotta'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
