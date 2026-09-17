'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Heart,
  Compass,
} from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();

  const whatsappUrl = `https://wa.me/${settings.contact?.whatsappNumber || '9779840482692'}?text=${encodeURIComponent(
    'Namaste Sakar, I would like to consult with you about planning a trip in Nepal.'
  )}`;

  return (
    <footer className="bg-sand-light text-himalaya-900 pt-20 sm:pt-24 pb-12 border-t border-parchment-300 relative overflow-hidden">
      <div className="editorial-container relative z-10">
        {/* Top Call to Action Banner */}
        <div className="mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b border-parchment-300 pb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-terracotta mb-2">
              <Compass className="w-3.5 h-3.5 mr-1.5" />
              <span>Begin Your Chapter in Nepal</span>
            </span>
            <h3 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight mb-4">
              {settings.footer?.headline || "Let's craft your meaningful journey through Nepal."}
            </h3>
            <p className="text-himalaya-600 text-sm sm:text-base font-light max-w-xl leading-relaxed">
              {settings.footer?.subheadline ||
                'Connect directly with Sakar to discuss your travel dates, preferred pace, and cultural curiosities.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-himalaya-950 text-white text-xs tracking-widest uppercase font-semibold hover:bg-terracotta transition-all duration-300 shadow-subtle hover:shadow-warm"
            >
              <span>Plan Your Journey</span>
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white hover:bg-parchment-100 text-himalaya-900 border border-parchment-300 text-xs tracking-widest uppercase font-semibold transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 5-Column Footer Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-parchment-300">
          {/* Brand & Host Column */}
          <div className="sm:col-span-2 space-y-6 pr-4">
            <Link href="/" className="inline-block group">
              <img
                src={settings.branding?.logoUrl || '/explore-with-sakar/images/logo.png'}
                alt={settings.branding?.siteName || 'Explore With Sakar Logo'}
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-himalaya-700 font-light leading-relaxed max-w-sm">
              {settings.footer?.brandDescription ||
                'Meaningful Nepal travel experiences beyond ordinary tourism. We curate intimate human connections, authentic village homestays, living Buddhist & Hindu heritage, and responsible slow travel.'}
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-terracotta hover:underline"
              >
                <span>Read Sakar’s Story & Philosophy</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* Column 1: Experiences */}
          <div className="space-y-4">
            <h4 className="font-editorial-serif text-sm font-bold uppercase tracking-wider text-himalaya-950">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-xs text-himalaya-700 font-light">
              <li>
                <Link href="/services/trekking" className="hover:text-terracotta transition-colors">
                  Go Beyond the Map
                </Link>
              </li>
              <li>
                <Link href="/services/spiritual-wellness" className="hover:text-terracotta transition-colors">
                  Go Within
                </Link>
              </li>
              <li>
                <Link href="/services/homestays" className="hover:text-terracotta transition-colors">
                  Feel Closer
                </Link>
              </li>
              <li>
                <Link href="/experiences?category=responsible" className="hover:text-terracotta transition-colors">
                  Leave a Mark
                </Link>
              </li>
              <li>
                <Link href="/services/custom-journeys" className="hover:text-terracotta transition-colors">
                  Custom Private Journeys
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="font-medium text-terracotta hover:underline pt-1 inline-block">
                  All Experiences Hub →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-4">
            <h4 className="font-editorial-serif text-sm font-bold uppercase tracking-wider text-himalaya-950">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-himalaya-700 font-light">
              <li>
                <Link href="/destinations" className="hover:text-terracotta transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-terracotta transition-colors">
                  Curated Itineraries
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-terracotta transition-colors">
                  Packages & Pricing
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-terracotta transition-colors">
                  Visual Journey Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-terracotta transition-colors">
                  Sakar’s Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Travel Guide & Contact */}
          <div className="space-y-4">
            <h4 className="font-editorial-serif text-sm font-bold uppercase tracking-wider text-himalaya-950">
              Travel Guide
            </h4>
            <ul className="space-y-2.5 text-xs text-himalaya-700 font-light">
              <li>
                <Link href="/resources" className="hover:text-terracotta transition-colors">
                  Travel Resources & Visas
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-terracotta transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-terracotta transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>

            <div className="pt-4 border-t border-parchment-200 space-y-2 text-xs text-himalaya-600 font-light">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0" />
                <span>{settings.contact?.address || 'Kathmandu, Nepal'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-terracotta shrink-0" />
                <span className="truncate">{settings.contact?.email || 'Explorewithsakar@gmail.com'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-terracotta shrink-0" />
                <span>{settings.contact?.phoneDisplay || '+977 984-0482692'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Philosophy Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs tracking-wider text-himalaya-500 gap-4">
          <div>
            © {new Date().getFullYear()} {settings.branding?.siteName || 'Explore With Sakar'}. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-terracotta transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-terracotta transition-colors">
              Terms of Service & Booking Conditions
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-terracotta transition-colors opacity-75 hover:opacity-100">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
