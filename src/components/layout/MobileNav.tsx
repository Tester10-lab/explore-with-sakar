'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  ChevronDown,
  Phone,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Camera,
  FileText,
  HelpCircle,
  BookOpen,
  Home,
  ShieldCheck,
  Compass,
  Mountain,
  Heart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { settings } = useSettings();
  const [openSection, setOpenSection] = useState<string | null>('services');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const isLinkActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-himalaya-950/60 backdrop-blur-sm"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-sm bg-parchment-100 h-full shadow-floating flex flex-col justify-between overflow-y-auto border-l border-parchment-300 touch-pan-y"
          >
            {/* Top Bar */}
            <div className="p-5 flex items-center justify-between border-b border-parchment-300 bg-white">
              <Link href="/" onClick={onClose} className="inline-block touch-manipulation">
                <img
                  src={settings.branding?.logoUrl || '/explore-with-sakar/images/logo.png'}
                  alt={settings.branding?.siteName || 'Explore With Sakar'}
                  className="h-9 w-auto object-contain"
                />
              </Link>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-parchment-100 text-himalaya-800 hover:text-terracotta min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation active:scale-95 transition-transform"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Accordions */}
            <div className="p-5 space-y-3 flex-1">
              {/* 1. Services Group */}
              <div className="rounded-xl border border-parchment-300 bg-white overflow-hidden">
                <button
                  onClick={() => toggleSection('services')}
                  className="w-full p-4 flex items-center justify-between font-editorial-serif text-sm font-bold text-himalaya-950"
                >
                  <span className="flex items-center space-x-2">
                    <Compass className="w-4 h-4 text-terracotta" />
                    <span>Our Services</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openSection === 'services' ? 'rotate-180 text-terracotta' : ''
                    }`}
                  />
                </button>

                {openSection === 'services' && (
                  <div className="px-4 pb-4 pt-1 space-y-2 border-t border-parchment-200">
                    <Link
                      href="/services"
                      onClick={onClose}
                      className="block text-xs font-semibold uppercase tracking-wider text-terracotta py-1.5"
                    >
                      • Services Overview
                    </Link>
                    <Link
                      href="/services/homestays"
                      onClick={onClose}
                      className="block text-xs text-himalaya-800 hover:text-terracotta py-1.5 pl-2"
                    >
                      Village Homestays
                    </Link>
                    <Link
                      href="/services/culture"
                      onClick={onClose}
                      className="block text-xs text-himalaya-800 hover:text-terracotta py-1.5 pl-2"
                    >
                      Living Culture & Heritage
                    </Link>
                    <Link
                      href="/services/spiritual-wellness"
                      onClick={onClose}
                      className="block text-xs text-himalaya-800 hover:text-terracotta py-1.5 pl-2"
                    >
                      Spiritual & Sound Sanctuary
                    </Link>
                    <Link
                      href="/services/trekking"
                      onClick={onClose}
                      className="block text-xs text-himalaya-800 hover:text-terracotta py-1.5 pl-2"
                    >
                      Mountain Treks & Trails
                    </Link>
                    <Link
                      href="/services/custom-journeys"
                      onClick={onClose}
                      className="block text-xs text-himalaya-800 hover:text-terracotta py-1.5 pl-2"
                    >
                      Custom Private Journeys
                    </Link>
                  </div>
                )}
              </div>

              {/* 2. Explore Group */}
              <div className="rounded-xl border border-parchment-300 bg-white overflow-hidden">
                <button
                  onClick={() => toggleSection('explore')}
                  className="w-full p-4 flex items-center justify-between font-editorial-serif text-sm font-bold text-himalaya-950"
                >
                  <span className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-terracotta" />
                    <span>Explore Nepal</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openSection === 'explore' ? 'rotate-180 text-terracotta' : ''
                    }`}
                  />
                </button>

                {openSection === 'explore' && (
                  <div className="px-4 pb-4 pt-1 space-y-2 border-t border-parchment-200">
                    <Link
                      href="/destinations"
                      onClick={onClose}
                      className="block text-xs text-himalaya-800 hover:text-terracotta py-1.5"
                    >
                      All Curated Destinations
                    </Link>
                    <Link
                      href="/experiences"
                      onClick={onClose}
                      className="block text-xs text-himalaya-800 hover:text-terracotta py-1.5"
                    >
                      Curated Experiences Catalog
                    </Link>
                    <Link
                      href="/packages"
                      onClick={onClose}
                      className="block text-xs text-himalaya-800 hover:text-terracotta py-1.5"
                    >
                      Signature Packages & Pricing
                    </Link>
                    <Link
                      href="/gallery"
                      onClick={onClose}
                      className="block text-xs text-himalaya-800 hover:text-terracotta py-1.5"
                    >
                      Visual Journey Gallery
                    </Link>
                  </div>
                )}
              </div>

              {/* 3. Travel Guide */}
              <div className="rounded-xl border border-parchment-300 bg-white overflow-hidden">
                <button
                  onClick={() => toggleSection('guide')}
                  className="w-full p-4 flex items-center justify-between font-editorial-serif text-sm font-bold text-himalaya-950"
                >
                  <span className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-terracotta" />
                    <span>Travel Guide</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openSection === 'guide' ? 'rotate-180 text-terracotta' : ''
                    }`}
                  />
                </button>

                {openSection === 'guide' && (
                  <div className="px-4 pb-4 pt-1 space-y-2 border-t border-parchment-200">
                    <Link
                      href="/resources"
                      onClick={onClose}
                      className="block text-xs text-himalaya-800 hover:text-terracotta py-1.5"
                    >
                      Travel Resources (Seasons, Visas, Packing)
                    </Link>
                    <Link
                      href="/faq"
                      onClick={onClose}
                      className="block text-xs text-himalaya-800 hover:text-terracotta py-1.5"
                    >
                      Frequently Asked Questions
                    </Link>
                    <Link
                      href="/blog"
                      onClick={onClose}
                      className="block text-xs text-himalaya-800 hover:text-terracotta py-1.5"
                    >
                      Sakar’s Journal / Blog
                    </Link>
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <Link
                href="/about"
                onClick={onClose}
                className="block p-4 rounded-xl border border-parchment-300 bg-white font-editorial-serif text-sm font-bold text-himalaya-950 hover:text-terracotta"
              >
                About Sakar
              </Link>

              <Link
                href="/contact"
                onClick={onClose}
                className="block p-4 rounded-xl border border-parchment-300 bg-white font-editorial-serif text-sm font-bold text-himalaya-950 hover:text-terracotta"
              >
                Contact Host
              </Link>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 border-t border-parchment-300 bg-white space-y-3">
              <a
                href={`https://wa.me/${settings.contact?.whatsappNumber || '9779840482692'}?text=${encodeURIComponent(
                  'Namaste Sakar, I would like to consult with you about planning a trip in Nepal.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                href="/contact"
                onClick={onClose}
                className="w-full flex items-center justify-center py-3.5 rounded-xl bg-himalaya-950 hover:bg-terracotta text-white text-xs font-bold uppercase tracking-widest transition-colors"
              >
                <span>Plan Your Journey</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
