'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, Sparkles, Check } from 'lucide-react';

interface CalendarDateDropdownProps {
  value: string;
  onChange: (dateStr: string) => void;
  placeholder?: string;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const SEASONS = [
  { label: '🌸 Spring (March – May)', desc: 'Rhododendrons, clear skies & mild weather', seasonMonths: 'Spring' },
  { label: '🍁 Autumn (Sept – Nov)', desc: 'Peak festival season, crisp views & harvest', seasonMonths: 'Autumn' },
  { label: '❄️ Winter (Dec – Feb)', desc: 'Quiet mountain trails & crystal mountain views', seasonMonths: 'Winter' },
  { label: '🌿 Summer / Monsoon (Jun – Aug)', desc: 'Lush valleys, Upper Mustang rain shadow', seasonMonths: 'Summer' },
];

export default function CalendarDateDropdown({
  value,
  onChange,
  placeholder = 'Select approximate dates or month',
}: CalendarDateDropdownProps) {
  const currentYear = new Date().getFullYear();
  const availableYears = [currentYear, currentYear + 1, currentYear + 2, currentYear + 3];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(() => {
    if (!value) return new Date().getMonth();
    const idx = MONTH_NAMES.findIndex((m) => value.toLowerCase().includes(m.toLowerCase()));
    return idx >= 0 ? idx : new Date().getMonth();
  });
  const [selectedYear, setSelectedYear] = useState<number>(() => {
    if (!value) return currentYear;
    const match = value.match(/\b(202[4-9]|203[0-5])\b/);
    return match ? parseInt(match[0], 10) : currentYear;
  });
  const [viewMode, setViewMode] = useState<'calendar' | 'season'>('calendar');

  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Calendar calculations
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay(); // 0 is Sunday

  const handleDaySelect = (day: number) => {
    const monthName = MONTH_NAMES[selectedMonth];
    const formatted = `${monthName} ${day}, ${selectedYear}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const handleSelectFullMonth = () => {
    const monthName = MONTH_NAMES[selectedMonth];
    const formatted = `${monthName} ${selectedYear}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const handleSelectSeason = (season: (typeof SEASONS)[0]) => {
    const formatted = `${season.seasonMonths} ${selectedYear} (${season.label.split(' ')[1]})`;
    onChange(formatted);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => Math.max(y - 1, availableYears[0]));
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => Math.min(y + 1, availableYears[availableYears.length - 1]));
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Input / Trigger */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 rounded-xl bg-parchment-50 border border-parchment-300 focus:outline-none focus:ring-2 focus:ring-terracotta/40 text-sm text-himalaya-950 flex items-center justify-between transition-colors hover:bg-parchment-100 text-left"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2.5 truncate">
            <CalendarIcon className="w-4 h-4 text-terracotta shrink-0" />
            {value ? (
              <span className="font-semibold text-himalaya-950 truncate">{value}</span>
            ) : (
              <span className="text-himalaya-400 truncate">{placeholder}</span>
            )}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-himalaya-500 shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-terracotta' : ''
            }`}
          />
        </button>
      </div>

      {/* Calendar Popover with Month & Year Dropdowns */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 sm:left-auto sm:w-[350px] mt-2 bg-sand rounded-2xl border border-parchment-300 shadow-floating p-4 animate-in fade-in zoom-in-95 duration-150">
          {/* View Mode Toggle: Specific Date vs Himalayan Season */}
          <div className="flex rounded-xl bg-parchment-200/70 p-1 mb-3 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white text-himalaya-950 shadow-subtle'
                  : 'text-himalaya-700 hover:text-himalaya-950'
              }`}
            >
              Exact Date / Month
            </button>
            <button
              type="button"
              onClick={() => setViewMode('season')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                viewMode === 'season'
                  ? 'bg-white text-himalaya-950 shadow-subtle'
                  : 'text-himalaya-700 hover:text-himalaya-950'
              }`}
            >
              Travel Seasons
            </button>
          </div>

          {/* Month & Year Dropdown Controls */}
          <div className="flex items-center justify-between gap-1.5 pb-3 border-b border-parchment-300">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg text-himalaya-700 hover:bg-parchment-200 hover:text-himalaya-950 transition-colors"
              title="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {/* Month Dropdown */}
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
                className="px-2 py-1 text-xs sm:text-sm font-bold bg-white text-himalaya-900 border border-parchment-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-terracotta"
              >
                {MONTH_NAMES.map((month, idx) => (
                  <option key={month} value={idx}>
                    {month}
                  </option>
                ))}
              </select>

              {/* Year Dropdown */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
                className="px-2 py-1 text-xs sm:text-sm font-bold bg-white text-himalaya-900 border border-parchment-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-terracotta"
              >
                {availableYears.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg text-himalaya-700 hover:bg-parchment-200 hover:text-himalaya-950 transition-colors"
              title="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {viewMode === 'calendar' ? (
            <div>
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1 text-center py-2 text-[10px] font-bold uppercase tracking-wider text-himalaya-500">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells before 1st of month */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-7 w-7" />
                ))}

                {/* Days in Month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${MONTH_NAMES[selectedMonth]} ${day}, ${selectedYear}`;
                  const isSelected = value.toLowerCase() === dateStr.toLowerCase();

                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      onClick={() => handleDaySelect(day)}
                      className={`h-7 w-7 rounded-lg text-xs font-medium flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-terracotta text-white font-bold shadow-warm'
                          : 'text-himalaya-800 hover:bg-parchment-200 hover:text-himalaya-950'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Quick Select Entire Month Action */}
              <div className="mt-3 pt-2.5 border-t border-parchment-300 flex items-center justify-between text-xs">
                <span className="text-himalaya-600 text-[11px]">Anytime during:</span>
                <button
                  type="button"
                  onClick={handleSelectFullMonth}
                  className="px-2.5 py-1 rounded-lg bg-terracotta/10 hover:bg-terracotta text-terracotta hover:text-white font-semibold transition-all text-xs"
                >
                  Choose entire {MONTH_NAMES[selectedMonth]} {selectedYear}
                </button>
              </div>
            </div>
          ) : (
            /* Seasons Selection Tab */
            <div className="space-y-2 py-2">
              <p className="text-[11px] text-himalaya-600 mb-1">
                Select your preferred trekking and cultural season in {selectedYear}:
              </p>
              {SEASONS.map((season) => (
                <button
                  key={season.label}
                  type="button"
                  onClick={() => handleSelectSeason(season)}
                  className="w-full text-left p-2.5 rounded-xl border border-parchment-300 bg-white hover:bg-parchment-100 hover:border-terracotta/40 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-himalaya-950 group-hover:text-terracotta">
                      {season.label}
                    </span>
                    <span className="text-[11px] font-semibold text-terracotta">{selectedYear}</span>
                  </div>
                  <p className="text-[10px] text-himalaya-600 mt-0.5">{season.desc}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
