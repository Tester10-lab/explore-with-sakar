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
    <footer className="bg-himalaya-950 text-parchment-200 pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Subtle Background Himalayan Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron/5 rounded-full blur-3xl pointer-events-none" />

      <div className="editorial-container relative z-10">
        {/* Top Call to Action Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-terracotta-dark/90 via-terracotta/80 to-terracotta-dark/90 p-8 sm:p-10 border border-terracotta/30 shadow-2xl mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-saffron-light flex items-center justify-center md:justify-start gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Nepal Travel</span>
            </span>
            <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Let&apos;s Create Your Meaningful Nepal Journey
            </h3>
            <p className="text-parchment-200 text-sm mt-2 font-light">
              Connect directly with Sakar to discuss your travel dates, personal interests, homestay preferences, and spiritual or cultural curiosity.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/#booking"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold bg-white text-himalaya-950 hover:bg-parchment-100 shadow-xl transition-all hover:scale-[1.02]"
            >
              <span>Consult With Sakar</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </Link>
            <a
              href="https://wa.me/9779800000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Host Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center group">
              <img 
                src="/explore-with-sakar/images/logo.png" 
                alt="Explore With Sakar Logo" 
                className="h-20 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-xs sm:text-sm text-parchment-300 font-light leading-relaxed max-w-sm">
              Meaningful Nepal travel experiences beyond ordinary tourism. We curate intimate human connections, village homestays, living Buddhist & Hindu heritage, and responsible slow travel.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs text-parchment-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Local Community Impact • Verified Ethical Guiding</span>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div className="space-y-3">
            <h4 className="font-editorial-serif text-xs tracking-widest uppercase font-bold text-saffron">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-parchment-300">
              <li>
                <Link href="/#experiences" className="hover:text-white transition-colors">
                  Curated Journeys
                </Link>
              </li>
              <li>
                <Link href="/#cultural" className="hover:text-white transition-colors">
                  Living Heritage Walks
                </Link>
              </li>
              <li>
                <Link href="/#spiritual" className="hover:text-white transition-colors">
                  Spiritual & Sound Healing
                </Link>
              </li>
              <li>
                <Link href="/#homestays" className="hover:text-white transition-colors">
                  Village Homestays
                </Link>
              </li>
              <li>
                <Link href="/#responsible" className="hover:text-white transition-colors">
                  Responsible Tourism
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Discover & Journal */}
          <div className="space-y-3">
            <h4 className="font-editorial-serif text-xs tracking-widest uppercase font-bold text-saffron">
              Sakar&apos;s Journal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-parchment-300">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  All Stories & Reflections
                </Link>
              </li>
              <li>
                <Link href="/blog/the-morning-i-learned-to-slow-down" className="hover:text-white transition-colors">
                  Sakar&apos;s Personal Notes
                </Link>
              </li>
              <li>
                <Link href="/blog/silence-in-a-himalayan-monastery" className="hover:text-white transition-colors">
                  Spiritual Nepal Stories
                </Link>
              </li>
              <li>
                <Link href="/blog/staying-with-a-family-changes-travel" className="hover:text-white transition-colors">
                  Village Homestay Essays
                </Link>
              </li>
              <li>
                <Link href="/blog/buddhist-monastery-etiquette-nepal" className="hover:text-white transition-colors">
                  Practical Travel Etiquette
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-editorial-serif text-xs tracking-widest uppercase font-bold text-saffron">
              Contact Sakar
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-parchment-300">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-terracotta-light shrink-0 mt-0.5" />
                <span>Thamel & Patan Heritage Quarter, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-terracotta-light shrink-0" />
                <span>namaste@explorewithsakar.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+977 980-000-0000 (WhatsApp)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Philosophy Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-parchment-400 gap-4">
          <div>
            © {new Date().getFullYear()} Explore With Sakar. Authentic Nepal Travel & Cultural Experiences. All rights reserved.
          </div>
          <div className="flex items-center space-x-2 text-parchment-300">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-terracotta fill-current" />
            <span>for conscious global travelers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
