'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import { ALL_COUNTRIES_SORTED, CountryInfo, findCountryByName, COUNTRIES } from '@/data/countries';

interface PhoneInputWithCodeProps {
  value: string;
  onChange: (fullNumber: string) => void;
  selectedCountryName?: string;
  placeholder?: string;
}

export default function PhoneInputWithCode({
  value,
  onChange,
  selectedCountryName,
  placeholder = 'e.g. 7123 456789',
}: PhoneInputWithCodeProps) {
  // Determine initial dial code and local number
  const defaultDialCode = '+977'; // Nepal default for Explore with Sakar

  const [selectedDialCode, setSelectedDialCode] = useState<string>(() => {
    if (value && value.startsWith('+')) {
      const match = value.match(/^(\+\d{1,4})/);
      if (match) return match[1];
    }
    return defaultDialCode;
  });

  const [localNumber, setLocalNumber] = useState<string>(() => {
    if (value && value.startsWith('+')) {
      const match = value.match(/^(\+\d{1,4})\s*(.*)$/);
      if (match) return match[2];
    }
    return value || '';
  });

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync dial code if Country of Residence changes and user hasn't explicitly set a custom one
  useEffect(() => {
    if (selectedCountryName) {
      const matched = findCountryByName(selectedCountryName);
      if (matched && matched.dialCode) {
        setSelectedDialCode(matched.dialCode);
        const combined = localNumber ? `${matched.dialCode} ${localNumber}` : '';
        onChange(combined);
      }
    }
  }, [selectedCountryName]);

  // Close dial code picker on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsPickerOpen(false);
      }
    }
    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen]);

  // Find info for currently selected dial code
  const currentCountry =
    COUNTRIES.find((c) => c.dialCode === selectedDialCode) ||
    ALL_COUNTRIES_SORTED.find((c) => c.dialCode === selectedDialCode);

  const handleDialCodeSelect = (c: CountryInfo) => {
    setSelectedDialCode(c.dialCode);
    setIsPickerOpen(false);
    setSearch('');
    const combined = localNumber.trim() ? `${c.dialCode} ${localNumber.trim()}` : c.dialCode;
    onChange(combined);
  };

  const handleNumberChange = (num: string) => {
    // Strip redundant leading + or dial codes if pasted
    const cleanNum = num.replace(/^\+/, '');
    setLocalNumber(cleanNum);
    const combined = cleanNum.trim() ? `${selectedDialCode} ${cleanNum.trim()}` : '';
    onChange(combined);
  };

  const query = search.trim().toLowerCase();
  const filteredCountries = ALL_COUNTRIES_SORTED.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.dialCode.includes(query) ||
      c.code.toLowerCase().includes(query)
  );

  return (
    <div className="flex gap-2 relative" ref={pickerRef}>
      {/* Country Code Trigger */}
      <button
        type="button"
        onClick={() => setIsPickerOpen(!isPickerOpen)}
        className="shrink-0 px-3 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950 flex items-center gap-1.5 hover:bg-parchment-100 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isPickerOpen}
        title="Select Country Calling Code"
      >
        <span className="text-base">{currentCountry?.flag || '🌐'}</span>
        <span className="font-semibold text-xs text-himalaya-900 font-mono">{selectedDialCode}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-himalaya-500 transition-transform duration-200 ${
            isPickerOpen ? 'rotate-180 text-terracotta' : ''
          }`}
        />
      </button>

      {/* Local Phone Input */}
      <input
        type="tel"
        value={localNumber}
        onChange={(e) => handleNumberChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950 placeholder:text-himalaya-400"
      />

      {/* Dial Code Dropdown Menu */}
      {isPickerOpen && (
        <div className="absolute z-50 left-0 top-full mt-2 w-72 bg-sand rounded-2xl border border-parchment-300 shadow-floating overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-80 flex flex-col">
          {/* Search Box */}
          <div className="p-2.5 border-b border-parchment-300 bg-parchment-100/90 sticky top-0 z-10">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-himalaya-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search code or country..."
                className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg bg-white border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-himalaya-950 placeholder:text-himalaya-400"
              />
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto p-1 space-y-0.5 divide-y divide-parchment-200/50">
            {filteredCountries.length === 0 ? (
              <div className="p-3 text-center text-xs text-himalaya-600">
                No country code found
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = c.dialCode === selectedDialCode;
                return (
                  <button
                    key={`${c.code}-${c.dialCode}`}
                    type="button"
                    onClick={() => handleDialCodeSelect(c)}
                    className={`w-full px-2.5 py-2 rounded-lg text-left text-xs flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-terracotta/10 text-terracotta font-bold'
                        : 'hover:bg-parchment-200 text-himalaya-900 font-normal'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base shrink-0">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="font-mono text-terracotta font-semibold">{c.dialCode}</span>
                      {isSelected && <Check className="w-3 h-3 text-terracotta" />}
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
