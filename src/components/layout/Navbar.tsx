'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  X,
  Compass,
  Heart,
  Sparkles,
  MapPin,
  BookOpen,
  Calendar,
  Phone,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import MobileNav from './MobileNav';

export interface NavChildItem {
  title: string;
  description?: string;
  href: string;
  badge?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  subtitle?: string;
  columns?: number;
  children?: NavChildItem[];
}

export const MAIN_NAV_STRUCTURE: NavItem[] = [
  {
    label: 'Explore Nepal',
    subtitle: 'Discover destinations and experiences',
    columns: 2,
    children: [
      {
        title: 'Kathmandu Heritage Experience',
        description: 'Living shrines, secret monastic courtyards & Malla art.',
        href: '/#destinations',
      },
      {
        title: 'Pokhara & Himalayan Escape',
        description: 'Phewa Lake tranquility & Annapurna panoramic ridges.',
        href: '/#destinations',
      },
      {
        title: 'Chitwan Wildlife Experience',
        description: 'Silent canoe floats, rhinos & indigenous forest culture.',
        href: '/#destinations',
      },
      {
        title: 'Buddhism Journey',
        description: 'Sacred stupas, Lumbini, and ancient monastic shrines.',
        href: '/#spiritual',
      },
      {
        title: 'Muktinath Spiritual Trail',
        description: 'Deep Kali Gandaki gorge & holy 108 water springs.',
        href: '/#destinations',
      },
      {
        title: 'Hidden Villages of Nepal',
        description: 'Off-the-beaten-path Tamang and Gurung trails.',
        href: '/#experiences',
      },
      {
        title: 'Indigenous Culture Experiences',
        description: 'Newari, Tharu, and Tamang ancestral customs.',
        href: '/#cultural',
      },
      {
        title: 'Off-the-Beaten-Path Nepal',
        description: 'Quiet trails and pristine wilderness away from crowds.',
        href: '/#experiences',
      },
    ],
  },
  {
    label: 'Meaningful Experiences',
    columns: 2,
    children: [
      {
        title: 'Community-Based Tourism',
        description: 'Direct economic empowerment for rural mountain families.',
        href: '/#responsible',
      },
      {
        title: 'Social Impact Visits',
        description: 'Engaging with grassroots community initiatives.',
        href: '/#responsible',
      },
      {
        title: 'Volunteer & Learning Experiences',
        description: 'Cultural exchange and educational community visits.',
        href: '/#responsible',
      },
      {
        title: 'Meet Local Communities',
        description: 'Heartfelt conversations with village elders and farmers.',
        href: '/#homestays',
      },
      {
        title: 'Traditional Lifestyle Experience',
        description: 'Farm-to-hearth cooking and mountain living rhythms.',
        href: '/#homestays',
        badge: 'Signature',
      },
      {
        title: 'Local Artisan & Craft Experience',
        description: 'Hands-on Newari woodcarving, bronze & pottery studios.',
        href: '/#cultural',
      },
      {
        title: 'Sustainable Tourism Journey',
        description: 'Leave No Trace ethics and eco-friendly slow travel.',
        href: '/#responsible',
      },
      {
        title: 'Responsible Travel Opportunities',
        description: 'Positive footprint and transparent local benefit.',
        href: '/#responsible',
      },
    ],
  },
  {
    label: 'Spiritual & Wellness Journeys',
    columns: 2,
    children: [
      {
        title: 'Himalayan Spiritual Experiences',
        description: 'Sacred mountain energy, stillness, and contemplation.',
        href: '/#spiritual',
      },
      {
        title: 'Singing Bowl Healing Sessions',
        description: '7-metal hand-hammered singing bowl sound therapy.',
        href: '/#spiritual',
        badge: 'Popular',
      },
      {
        title: 'Meditation & Mindfulness Retreats',
        description: 'Guided quiet retreats in sacred Himalayan valley caves.',
        href: '/#spiritual',
      },
      {
        title: 'Buddhist Monastery Visits',
        description: 'Witnessing dawn chanting, horn resonance, and butter lamps.',
        href: '/#spiritual',
      },
      {
        title: 'Hindu Pilgrimage Tours',
        description: 'Sacred shrines across Pashupatinath, Muktinath & Janakpur.',
        href: '/#spiritual',
      },
      {
        title: 'Sacred Sites of Nepal',
        description: 'Centuries-old pilgrimage trails and power places.',
        href: '/#spiritual',
      },
      {
        title: 'Shamanic Cultural Experiences',
        description: 'Ancient Himalayan healing and nature-based traditions.',
        href: '/#spiritual',
      },
      {
        title: 'Yoga & Inner Wellness Journey',
        description: 'Gentle breathwork, restorative yoga, and herbal nutrition.',
        href: '/#spiritual',
      },
    ],
  },
  {
    label: 'Cultural Immersion',
    columns: 2,
    children: [
      {
        title: 'Festivals of Nepal',
        description: 'Dashain, Tihar, Holi, and vibrant mountain masked dances.',
        href: '/#cultural',
      },
      {
        title: 'Nepali Food Experience',
        description: 'Authentic Dal Bhat, Newari banquets & tea masterclasses.',
        href: '/#cultural',
      },
      {
        title: 'Traditional Music & Dance',
        description: 'Sarangi folk music, madal beats, and classical ragas.',
        href: '/#cultural',
      },
      {
        title: 'Heritage Walks',
        description: 'Exploring hidden courtyards (Bahals) with local context.',
        href: '/#cultural',
      },
      {
        title: 'Local Family Experience',
        description: 'Shared hearth meals and welcoming Nepali hospitality.',
        href: '/#homestays',
      },
      {
        title: 'Storytelling Tours',
        description: 'Oral folklore, mythological tales, and historic epics.',
        href: '/#cultural',
      },
      {
        title: 'Architecture & History Tours',
        description: 'Pagoda engineering, stone carving & terracotta monuments.',
        href: '/#cultural',
      },
    ],
  },
  {
    label: 'Plan Your Journey',
    columns: 2,
    children: [
      {
        title: 'Customized Nepal Itinerary',
        description: 'Bespoke routes designed around your personal dates and pace.',
        href: '/#booking',
        badge: 'Recommended',
      },
      {
        title: 'Private Tours',
        description: 'Exclusive private guiding with Sakar for 1 to 8 travelers.',
        href: '/#booking',
      },
      {
        title: 'Luxury Nepal Experiences',
        description: 'Boutique heritage suites, private flights, and refined comfort.',
        href: '/#booking',
      },
      {
        title: 'Family Travel',
        description: 'Gentle pacing, safe homestays, and inspiring youth activities.',
        href: '/#booking',
      },
      {
        title: 'Solo Traveler Support',
        description: 'Safe, deeply accompanied journeys for independent travelers.',
        href: '/#booking',
      },
      {
        title: 'Senior-Friendly Travel',
        description: 'Accessible routes, comfortable transport, and slow cadence.',
        href: '/#booking',
      },
      {
        title: 'Corporate & Embassy Tours',
        description: 'Curated high-level cultural protocols and executive retreats.',
        href: '/#booking',
      },
      {
        title: 'Travel Consultation',
        description: '1-on-1 itinerary video/chat consultation with Sakar.',
        href: '/#booking',
      },
    ],
  },
  {
    label: 'About Sakar',
    columns: 1,
    children: [
      {
        title: 'My Story',
        description: 'Sakar’s roots, upbringing, and lifelong bond with Nepal.',
        href: '/#about',
      },
      {
        title: 'Why Explore With Sakar',
        description: 'Personal human connection vs generic mass-agency tourism.',
        href: '/#about',
      },
      {
        title: 'My Approach to Responsible Tourism',
        description: 'Transparent 100% direct village and artisan benefit.',
        href: '/#responsible',
      },
      {
        title: 'Community Work',
        description: 'Supporting mountain schools, solar energy, and host mothers.',
        href: '/#responsible',
      },
      {
        title: 'Travel Philosophy',
        description: 'Presence, slow travel, and Atithi Devo Bhava.',
        href: '/#about',
      },
      {
        title: 'Testimonials',
        description: 'Stories and reviews from international travelers.',
        href: '/#testimonials',
      },
      {
        title: 'Media & Stories',
        description: 'Dispatches, interviews, and journal accounts.',
        href: '/blog',
      },
    ],
  },
  {
    label: 'Journal',
    href: '/blog',
  },
  {
    label: 'Resources',
    columns: 2,
    children: [
      {
        title: 'Nepal Travel Guide',
        description: 'Comprehensive overview of regions, seasons, and logistics.',
        href: '/blog/the-morning-i-learned-to-slow-down',
      },
      {
        title: 'Best Time to Visit Nepal',
        description: 'Spring flora vs autumn crystal mountain skies.',
        href: '/blog/the-morning-i-learned-to-slow-down',
      },
      {
        title: 'Cultural Etiquette',
        description: 'Customs, greetings, temple protocol, and respect.',
        href: '/blog/buddhist-monastery-etiquette-nepal',
      },
      {
        title: 'Spiritual Guide to Nepal',
        description: 'Understanding stupas, mandalas, and monastery life.',
        href: '/blog/silence-in-a-himalayan-monastery',
      },
      {
        title: 'Trek Preparation',
        description: 'Fitness, altitude pacing, packing list, and gear advice.',
        href: '/blog/walking-the-quiet-side-of-nepal',
      },
      {
        title: 'Nepal Travel Tips',
        description: 'SIM cards, currency, local transport, and hygiene.',
        href: '/blog/buddhist-monastery-etiquette-nepal',
      },
      {
        title: 'Blog / Sakar’s Journal',
        description: 'Quiet reflections, essays, and stories from the road.',
        href: '/blog',
        badge: 'New',
      },
      {
        title: 'Frequently Asked Questions',
        description: 'Visas, safety, food safety, water, and guide credentials.',
        href: '/contact',
      },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileNavOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      {/* Top Cultural Announcement Strip */}
      <div className="bg-himalaya-950 text-parchment-200 text-xs py-2 px-4 border-b border-white/10 relative z-50">
        <div className="editorial-container flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-[11px] sm:text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-saffron-light font-medium tracking-wide">
              AUTUMN & SPRING TRAVEL CONSULTATIONS OPEN
            </span>
            <span className="hidden md:inline text-parchment-400">|</span>
            <span className="hidden md:inline text-parchment-300 font-light">
              Sakar • Responsible Tour Director
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <a
              href="https://wa.me/9779800000000?text=Namaste%20Sakar,%20I%20am%20interested%20in%20planning%20an%20authentic%20Nepal%20journey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-parchment-200 hover:text-saffron-light transition-colors group"
            >
              <Phone className="w-3 h-3 mr-1.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>WhatsApp Sakar Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-editorial py-2.5'
            : 'bg-parchment-100/95 backdrop-blur-md py-3.5 border-b border-parchment-300'
        }`}
      >
        <div className="editorial-container flex items-center justify-between">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-terracotta/40 rounded-md p-1 shrink-0"
          >
            <img 
              src="/explore-with-sakar/images/logo.png" 
              alt="Explore With Sakar Logo" 
              className="h-12 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-0.5 2xl:space-x-1">
            {MAIN_NAV_STRUCTURE.map((item) => {
              const hasDropdown = Boolean(item.children && item.children.length > 0);
              const isOpen = activeDropdown === item.label;

              if (!hasDropdown) {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href || '/'}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? 'text-terracotta font-semibold bg-terracotta/10'
                        : 'text-himalaya-900 hover:text-terracotta hover:bg-sand/60'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isOpen
                        ? 'text-terracotta bg-sand'
                        : 'text-himalaya-900 hover:text-terracotta hover:bg-sand/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-terracotta' : 'text-himalaya-700'
                      }`}
                    />
                  </button>

                  {/* Mega Dropdown Panel */}
                  {isOpen && item.children && (
                    <div
                      className={`absolute left-0 mt-1 rounded-2xl bg-parchment-50 border border-parchment-300 shadow-floating p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
                        item.columns === 2 ? 'w-[580px]' : 'w-80'
                      }`}
                    >
                      {item.subtitle && (
                        <div className="text-[11px] font-display-serif italic text-terracotta px-2 pb-2 mb-2 border-b border-parchment-300">
                          {item.subtitle}
                        </div>
                      )}
                      <div
                        className={
                          item.columns === 2 ? 'grid grid-cols-2 gap-1.5' : 'grid gap-1'
                        }
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group p-2 rounded-lg hover:bg-sand transition-all flex flex-col text-left"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-himalaya-950 group-hover:text-terracotta transition-colors">
                                {child.title}
                              </span>
                              {child.badge && (
                                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-terracotta/15 text-terracotta">
                                  {child.badge}
                                </span>
                              )}
                            </div>
                            {child.description && (
                              <p className="text-[11px] text-himalaya-600 font-light mt-0.5 line-clamp-1">
                                {child.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Right Action CTA */}
          <div className="hidden lg:flex items-center space-x-2.5">
            <Link
              href="/#booking"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold tracking-wide bg-terracotta hover:bg-terracotta-dark text-white shadow-warm hover:shadow-editorial transition-all transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
            >
              <span>Contact / Book</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center xl:hidden space-x-2">
            <Link
              href="/#booking"
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-terracotta text-white shadow-sm"
            >
              Book
            </Link>
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="p-2 rounded-lg text-himalaya-900 hover:bg-sand transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              aria-label="Toggle Menu"
            >
              {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        navStructure={MAIN_NAV_STRUCTURE}
      />
    </>
  );
}
