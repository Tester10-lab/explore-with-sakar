import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  Sparkles,
  Check,
  ArrowRight,
  Sun,
  Flame,
  Wind,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import CTASection from '@/components/common/CTASection';
import { EXPERIENCES } from '@/data/experiences';
import ExperienceCard from '@/components/common/ExperienceCard';

import { getLiveServiceBySlug } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Himalayan Spiritual & Sound Sanctuary | Explore With Sakar',
  description: 'Experience Tibetan singing bowl sound therapy, dawn monastery chanting, sacred meditation caves, and restorative mindfulness in the Himalayas.',
};

export default async function SpiritualWellnessServicePage() {
  const liveService = await getLiveServiceBySlug('spiritual-wellness');
  const spiritualExp = EXPERIENCES.find((e) => e.slug === 'spiritual-immersion-singing-bowls');

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge={liveService?.category || 'Spiritual & Wellness'}
        nepaliTitle={liveService?.nepaliTitle || 'आध्यात्मिक शान्ति र ध्वनि ध्यान'}
        title={liveService?.title || 'Himalayan Spiritual & Sound Sanctuary'}
        subtitle={liveService?.subtitle || liveService?.description || 'Immerse in ancient Tibetan singing bowl sound therapy, dawn monastery chant pujas, and the tranquil stillness of sacred mountain power places.'}
        backgroundImage={liveService?.image || '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg'}
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: liveService?.title || 'Spiritual & Wellness' },
        ]}
      />

      {/* 2. Philosophy & Sanctuary Overview */}
      <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5" />
                <span>Sanctuary for the Mind</span>
              </span>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                Reconnecting with Stillness in the Sacred Himalayas
              </h2>

              <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed">
                For thousands of years, the high ridges, pine valleys, and sacred caves of Nepal have served as the world’s most potent sanctuary for yogis, meditators, and those seeking mental clarity.
              </p>

              <p className="text-sm sm:text-base text-himalaya-600 font-light leading-relaxed">
                We craft gentle, contemplative journeys focused on acoustic sound resonance, dawn monastery prayers, mindful walking, and pure presence. Rather than dogmatic practice, our approach is experiential, peaceful, and restorative.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-parchment-200">
                {[
                  'Private 7-metal Tibetan singing bowl sound sessions',
                  'Dawn monastery pujas and butter lamp offerings',
                  'Pilgrimages to Guru Padmasambhava sacred caves in Pharping',
                  'Mindful ridge walks and gentle restorative breathwork',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-himalaya-800">
                    <div className="w-5 h-5 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-floating border border-parchment-300 aspect-[4/5] bg-himalaya-900">
                <Image
                  src="/explore-with-sakar/images/spiritual/monastery-interior.jpg"
                  alt="Monastery prayer hall with butter lamps in Nepal"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                  <p className="font-display-serif italic text-lg">
                    &ldquo;The singing bowl does not force silence; its pure harmonic vibration gently invites the mind home.&rdquo;
                  </p>
                  <p className="text-xs text-saffron-light mt-1 font-semibold uppercase tracking-wider">
                    — Himalayan Sound Master
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Elements of the Sanctuary */}
      <section className="py-20 sm:py-32 bg-sand border-b border-parchment-300">
        <div className="editorial-container">
          <SectionHeading
            tag="Core Experiences"
            nepaliTag="आध्यात्मिक अनुभवहरू"
            title="Practices for Inner Renewal"
            description="Explore the sacred elements woven into our spiritual and wellness journeys."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-parchment-300 shadow-subtle space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                7-Metal Singing Bowl Sound Therapy
              </h3>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                Hand-hammered using an ancient alloy of seven cosmic metals. The acoustic harmonics and gentle physical vibrations encourage deep somatic relaxation and mental quietude.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-parchment-300 shadow-subtle space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-saffron/15 text-saffron-dark flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                Dawn Monastery Pujas & Butter Lamps
              </h3>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                Sit quietly at dawn inside mountain gompas while monks chant sacred Buddhist sutras, blow deep copper horns, and light lamps dedicated to universal compassion.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-parchment-300 shadow-subtle space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-moss/10 text-moss-light flex items-center justify-center">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                Sacred Caves & Silent Ridge Walks
              </h3>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                Walk peaceful forest trails to ancient meditation caves in Pharping and high ridges above the clouds, practicing quiet walking meditation and gentle breathwork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Spiritual Itinerary */}
      {spiritualExp && (
        <section className="py-20 sm:py-28 bg-parchment-100 border-b border-parchment-300">
          <div className="editorial-container max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
                Featured Itinerary
              </span>
              <h3 className="font-editorial-serif text-3xl font-bold text-himalaya-950 mt-1">
                Explore Our Signature Spiritual Journey
              </h3>
            </div>
            <ExperienceCard experience={spiritualExp} />
          </div>
        </section>
      )}

      {/* 5. CTA Section */}
      <CTASection
        title="Begin Your Himalayan Spiritual Retreat"
        subtitle="Connect with Sakar to discuss personal wellness preferences, dates, and quiet mountain retreat options."
        primaryButtonText="Inquire About Spiritual Retreats"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Packages"
        secondaryButtonHref="/packages"
      />
    </div>
  );
}
