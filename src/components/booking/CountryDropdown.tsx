'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, Globe } from 'lucide-react';
import { COUNTRIES, ALL_COUNTRIES_SORTED, CountryInfo, findCountryByName } from '@/data/countries';

interface CountryDropdownProps {
  value: string;
  onChange: (countryName: string, countryInfo?: CountryInfo) => void;
  placeholder?: string;
  className?: string;
}

export default function CountryDropdown({
  value,
  onChange,
  placeholder = 'Select your country',
  className = '',
}: CountryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = findCountryByName(value);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Auto-focus search input when opened
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Filter countries by query
  const query = search.trim().toLowerCase();
  const filteredCountries = ALL_COUNTRIES_SORTED.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.code.toLowerCase().includes(query) ||
      c.dialCode.includes(query)
  );

  const handleSelect = (c: CountryInfo) => {
    onChange(c.name, c);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950 flex items-center justify-between transition-colors hover:bg-parchment-100 text-left"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2.5 truncate">
          {selectedCountry ? (
            <>
              <span className="text-base shrink-0">{selectedCountry.flag}</span>
              <span className="font-medium truncate text-himalaya-950">{selectedCountry.name}</span>
            </>
          ) : value ? (
            <span className="font-medium truncate text-himalaya-950">{value}</span>
          ) : (
            <span className="text-himalaya-400 flex items-center gap-2">
              <Globe className="w-4 h-4 text-himalaya-400" />
              <span>{placeholder}</span>
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-himalaya-500 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-terracotta' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-sand rounded-2xl border border-parchment-300 shadow-floating overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-80 flex flex-col">
          {/* Search Bar */}
          <div className="p-3 border-b border-parchment-300 bg-parchment-100/80 sticky top-0 z-10">
            <div className="relative">
              <Search className="w-4 h-4 text-himalaya-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country or code..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-white border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-himalaya-950 placeholder:text-himalaya-400"
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="overflow-y-auto p-1.5 space-y-0.5 divide-y divide-parchment-200/50">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-himalaya-600">
                No country found matching &ldquo;{search}&rdquo;
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = selectedCountry?.code === c.code || value.toLowerCase() === c.name.toLowerCase();
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`w-full px-3 py-2.5 rounded-lg text-left text-xs sm:text-sm flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-terracotta/10 text-terracotta font-bold'
                        : 'hover:bg-parchment-200 text-himalaya-900 font-normal'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base shrink-0">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[11px] text-himalaya-500 font-mono">{c.dialCode}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-terracotta" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
