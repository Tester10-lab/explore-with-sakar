'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Phone, MapPin, ArrowRight, X, Compass, Mail, Sparkles } from 'lucide-react';
import { NavItem } from './Navbar';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navStructure: NavItem[];
}

export default function MobileNav({ isOpen, onClose, navStructure }: MobileNavProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-himalaya-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Menu Panel */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-parchment-100 shadow-2xl border-l border-parchment-300 flex flex-col z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-parchment-300 flex items-center justify-between bg-parchment-200">
          <div className="flex items-center">
            <img 
              src="/explore-with-sakar/images/logo.png" 
              alt="Explore With Sakar Logo" 
              className="h-10 w-auto object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-himalaya-700 hover:text-terracotta hover:bg-sand transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Accordion Items */}
        <div className="p-4 flex-1 space-y-1">
          {navStructure.map((item) => {
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const isExpanded = Boolean(expandedSections[item.label]);

            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  href={item.href || '/'}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-himalaya-900 hover:bg-sand hover:text-terracotta transition-colors"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-himalaya-400" />
                </Link>
              );
            }

            return (
              <div key={item.label} className="border-b border-parchment-300/60 pb-1">
                <button
                  onClick={() => toggleSection(item.label)}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-himalaya-900 hover:bg-sand transition-colors text-left"
                >
                  <div>
                    <span>{item.label}</span>
                    {item.subtitle && (
                      <span className="block text-[11px] text-terracotta font-normal font-display-serif italic">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-himalaya-500 transition-transform duration-200 shrink-0 ${
                      isExpanded ? 'rotate-180 text-terracotta' : ''
                    }`}
                  />
                </button>

                {isExpanded && item.children && (
                  <div className="pl-3 pr-2 pb-2 space-y-1 animate-in fade-in duration-150">
                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        onClick={onClose}
                        className="block p-2.5 rounded-lg hover:bg-sand text-left transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-himalaya-950">
                            {child.title}
                          </span>
                          {child.badge && (
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-terracotta/10 text-terracotta">
                              {child.badge}
                            </span>
                          )}
                        </div>
                        {child.description && (
                          <p className="text-[11px] text-himalaya-600 mt-0.5 line-clamp-1">
                            {child.description}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Drawer Bottom CTA & Contact */}
        <div className="p-5 border-t border-parchment-300 bg-sand/60 space-y-3">
          <Link
            href="/#booking"
            onClick={onClose}
            className="w-full py-3 rounded-xl text-center text-sm font-bold bg-terracotta text-white shadow-warm hover:bg-terracotta-dark transition-colors flex items-center justify-center space-x-2"
          >
            <span>Plan / Book Your Experience</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="https://wa.me/9779800000000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl text-center text-xs font-semibold border border-emerald-600/30 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center justify-center space-x-2"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Chat on WhatsApp Directly</span>
          </a>

          <div className="text-[11px] text-himalaya-600 text-center pt-1 font-light">
            Sakar • Responsible Tour Director • Nepal
          </div>
        </div>
      </div>
    </div>
  );
}
