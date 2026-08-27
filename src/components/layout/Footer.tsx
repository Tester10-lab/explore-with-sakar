import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  Heart,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-parchment-50 text-himalaya-900 pt-24 pb-12 border-t border-parchment-300 relative overflow-hidden film-grain">
      <div className="editorial-container relative z-10">
        {/* Top Call to Action Banner */}
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-10 border-b border-parchment-300 pb-16">
          <div className="max-w-2xl">
            <h3 className="font-editorial-serif text-4xl sm:text-5xl font-light text-himalaya-950 tracking-tight leading-tight mb-4">
              Let&apos;s craft your meaningful journey through Nepal.
            </h3>
            <p className="text-himalaya-600 text-sm font-light max-w-md">
              Connect directly with Sakar to discuss your travel dates, personal interests, and cultural curiosity.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              href="/#booking"
              className="inline-flex items-center justify-center px-8 py-4 rounded-none bg-himalaya-950 text-white text-xs tracking-widest uppercase font-medium hover:bg-terracotta transition-all duration-300"
            >
              <span>Inquire Now</span>
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-parchment-300">
          {/* Brand & Host Column */}
          <div className="lg:col-span-2 space-y-6 pr-8">
            <Link href="/" className="inline-block group">
              <img 
                src="/explore-with-sakar/images/logo.png" 
                alt="Explore With Sakar Logo" 
                className="h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-himalaya-700 font-light leading-relaxed max-w-sm">
              Meaningful Nepal travel experiences beyond ordinary tourism. We curate intimate human connections, village homestays, living Buddhist & Hindu heritage, and responsible slow travel.
            </p>
          </div>

          {/* Column 1: Explore */}
          <div className="space-y-6">
            <h4 className="font-editorial-serif text-lg font-medium text-himalaya-950">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-himalaya-600">
              <li>
                <Link href="/#experiences" className="hover:text-terracotta transition-colors">
                  Curated Journeys
                </Link>
              </li>
              <li>
                <Link href="/#cultural" className="hover:text-terracotta transition-colors">
                  Living Heritage Walks
                </Link>
              </li>
              <li>
                <Link href="/#spiritual" className="hover:text-terracotta transition-colors">
                  Spiritual & Sound Healing
                </Link>
              </li>
              <li>
                <Link href="/#homestays" className="hover:text-terracotta transition-colors">
                  Village Homestays
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Discover & Journal */}
          <div className="space-y-6">
            <h4 className="font-editorial-serif text-lg font-medium text-himalaya-950">
              Journal
            </h4>
            <ul className="space-y-3 text-sm text-himalaya-600">
              <li>
                <Link href="/blog" className="hover:text-terracotta transition-colors">
                  All Stories & Reflections
                </Link>
              </li>
              <li>
                <Link href="/blog/the-morning-i-learned-to-slow-down" className="hover:text-terracotta transition-colors">
                  Sakar&apos;s Personal Notes
                </Link>
              </li>
              <li>
                <Link href="/blog/silence-in-a-himalayan-monastery" className="hover:text-terracotta transition-colors">
                  Spiritual Nepal Stories
                </Link>
              </li>
              <li>
                <Link href="/blog/buddhist-monastery-etiquette-nepal" className="hover:text-terracotta transition-colors">
                  Practical Travel Etiquette
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-6">
            <h4 className="font-editorial-serif text-lg font-medium text-himalaya-950">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-himalaya-600">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-terracotta" />
                <span>Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-terracotta" />
                <span>Explorewithsakar@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-terracotta" />
                <span>+977 984-0482692</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Philosophy Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs tracking-wider uppercase text-himalaya-500 gap-4">
          <div>
            © {new Date().getFullYear()} Explore With Sakar.
          </div>
          <div className="flex items-center space-x-1">
            <span>Designed for the conscious traveler.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
