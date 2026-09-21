import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Compass,
  Sparkles,
  Home,
  Heart,
  ShieldCheck,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import CTASection from '@/components/common/CTASection';
import ExperienceCatalogClient from './ExperienceCatalogClient';
import { getPublicExperiences } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Experiences & Curated Journeys | Explore With Sakar',
  description:
    'Discover our signature travel experiences in Nepal: Go Beyond the Map, Go Spiritual, Feel Closer homestays, Leave a Mark conservation, and bespoke private journeys.',
  alternates: {
    canonical: 'https://explorewithsakar.com/experience',
  },
};

const CORE_PILLARS = [
  {
    title: 'Go Beyond the Map',
    subtitle: 'Living Courtyards & Artisan Guilds',
    description: 'Guided exploration into medieval Bahals, ancient Silk Road trade corridors, and master workshops.',
    href: '/experience/go-beyond',
    badge: 'Exploration',
    icon: Compass,
    image: '/images/beyond-the-map/living-courtyards.jpg',
  },
  {
    title: 'Go Spiritual',
    subtitle: 'Himalayan Sound & Mountain Silence',
    description: '7-metal singing bowl resonance, dawn monastery chanting, and sacred Padmasambhava meditation caves.',
    href: '/experience/go-spiritual',
    badge: 'Spiritual',
    icon: Sparkles,
    image: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
  },
  {
    title: 'Feel Closer',
    subtitle: 'Village Homestays & Living Hearths',
    description: 'Authentic family hospitality, woodstove cooking, and lifelong human bonds with Gurung & Tamang hosts.',
    href: '/experience/feel-closer',
    badge: 'Homestays',
    icon: Home,
    image: '/explore-with-sakar/images/homestays/village-meal.jpg',
  },
  {
    title: 'Leave a Mark',
    subtitle: 'Strategic Volunteer Tourism',
    description: 'Matching your actual professional skills with local communities in Nepal that need structural and administrative empowerment.',
    href: '/experience/leave-a-mark',
    badge: 'Strategic Impact',
    icon: Sparkles,
    image: '/explore-with-sakar/images/trails/river-gorge.jpg',
  },
  {
    title: 'Custom Private Journeys',
    subtitle: 'Bespoke Itinerary Curation',
    description: '100% private, tailor-made routes designed around your exact dates, passions, and personal rhythm with Sakar.',
    href: '/experience/custom-private-journeys',
    badge: 'Bespoke',
    icon: ShieldCheck,
    image: '/explore-with-sakar/images/mountains/mountain-ridge.jpg',
  },
];

export default async function ExperienceLandingPage() {
  const experiences = await getPublicExperiences();
  const catalogExperiences = experiences.map((exp) => ({
    id: exp.id,
    slug: exp.slug,
    title: exp.title,
    category: exp.category,
    categoryLabel: exp.categoryLabel,
    featured: exp.featured,
    duration: exp.duration,
    location: exp.location,
    shortDescription: exp.shortDescription,
    groupSize: exp.groupSize,
    heroImage: exp.heroImage ? { src: exp.heroImage.src, alt: exp.heroImage.alt } : undefined,
  }));

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge="Independent Experience Packages"
        nepaliTitle="हाम्रा विशेष यात्राहरू"
        title="Experiences Designed for Connection"
        subtitle="Every experience is an independent journey into the living soul of Nepal. Choose a core pillar below or explore our curated day-by-day departures."
        backgroundImage="/explore-with-sakar/images/mountains/sunrise-himalayas.jpg"
        breadcrumbs={[{ label: 'Experiences' }]}
      />

      {/* 2. Core Experience Pillars Showcase */}
      <section className="py-16 sm:py-24 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-terracotta">
              Core Pillars of Travel
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-himalaya-950 mt-1">
              Five Distinct Ways to Experience Nepal
            </h2>
            <p className="text-sm sm:text-base text-himalaya-600 font-light mt-2 leading-relaxed">
              We do not believe in one-size-fits-all sightseeing. Each package has its own dedicated philosophy, host relationships, and sensory character.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.href}
                  className="group bg-parchment-50 border border-parchment-300 rounded-3xl overflow-hidden shadow-subtle hover:shadow-editorial transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-himalaya-900">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-himalaya-950 text-[10px] font-bold uppercase tracking-wider">
                        {pillar.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 text-terracotta mb-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase font-bold tracking-wider">
                          {pillar.subtitle}
                        </span>
                      </div>
                      <h3 className="font-editorial-serif text-2xl font-bold text-himalaya-950 group-hover:text-terracotta transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-himalaya-600 font-light mt-2 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-parchment-200">
                      <Link
                        href={pillar.href}
                        className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-himalaya-950 group-hover:text-terracotta transition-colors"
                      >
                        <span>Explore Experience</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Catalog (Paginated: 4 per page) */}
      <Suspense fallback={<div className="py-20 text-center text-terracotta">Loading catalog...</div>}>
        <ExperienceCatalogClient initialExperiences={catalogExperiences} />
      </Suspense>

      {/* 4. Final CTA */}
      <CTASection
        title="Want to Blend Elements from Multiple Experiences?"
        subtitle="All our journeys are 100% customizable. Connect directly with Sakar to weave your dream route."
        primaryButtonText="Plan a Custom Route"
        primaryButtonHref="/experience/custom-private-journeys"
        secondaryButtonText="Contact Sakar"
        secondaryButtonHref="/contact"
      />
    </div>
  );
}
