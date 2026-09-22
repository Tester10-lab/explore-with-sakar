import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Heart,
  Check,
  ArrowRight,
  Flame,
  Wind,
  Sun,
  ShieldCheck,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import CTASection from '@/components/common/CTASection';
import ExperienceCard from '@/components/common/ExperienceCard';
import { getPublicExperiences } from '@/lib/content';
import { PageContent } from '@/types/cms';
import { getPageHeroOverrides, isSectionVisible } from '@/lib/pageContentHelper';

interface GoSpiritualExperienceProps {
  pageContent?: PageContent | null;
}

export default async function GoSpiritualExperience({ pageContent }: GoSpiritualExperienceProps) {
  const allExperiences = await getPublicExperiences();
  const spiritualItineraries = allExperiences.filter(
    (e) =>
      e.category === 'spiritual' ||
      e.slug.includes('spiritual') ||
      e.slug.includes('meditation') ||
      e.slug.includes('monastery') ||
      e.slug.includes('cave')
  ).slice(0, 3);

  const hero = getPageHeroOverrides(pageContent, {
    badge: 'Independent Experience Package',
    title: 'Go Spiritual',
    subtitle: 'Immerse in ancient Tibetan singing bowl sound therapy, dawn monastery chant pujas, and the tranquil stillness of sacred Himalayan power places.',
  });

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      {hero.visible && (
        <PageHero
          badge={hero.badge}
          nepaliTitle="आध्यात्मिक शान्ति र ध्वनि ध्यान"
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage="/explore-with-sakar/images/spiritual/buddhist-stupa.jpg"
          breadcrumbs={[
            { label: 'Experiences', href: '/experiences' },
            { label: 'Go Within' },
          ]}
        />
      )}

      {/* 2. Philosophy & Sanctuary Overview */}
      {isSectionVisible(pageContent, 'sec-sw-philosophy', 'philosophy') && (
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

                <p className="text-base sm:text-lg text-himalaya-800 font-normal leading-relaxed">
                  For thousands of years, the high ridges, pine valleys, and sacred caves of Nepal have served as the world’s most potent sanctuary for yogis, meditators, and those seeking mental clarity.
                </p>

                <p className="text-sm sm:text-base text-himalaya-800 font-normal leading-relaxed">
                  We craft gentle, contemplative journeys focused on acoustic sound resonance, dawn monastery prayers, mindful walking, and pure presence. Rather than dogmatic practice, our approach is experiential, peaceful, and restorative.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-parchment-200">
                  {[
                    'Private 7-metal Tibetan singing bowl sound sessions',
                    'Dawn monastery pujas and butter lamp offerings',
                    'Pilgrimages to Guru Padmasambhava sacred caves in Pharping',
                    'Mindful ridge walks and gentle restorative breathwork',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-himalaya-900 font-medium">
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
      )}

      {/* 3. Core Elements of the Sanctuary */}
      {isSectionVisible(pageContent, 'sec-sw-features', 'features-grid') && (
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
                <p className="text-xs sm:text-sm text-himalaya-800 font-normal leading-relaxed">
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
                <p className="text-xs sm:text-sm text-himalaya-800 font-normal leading-relaxed">
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
                <p className="text-xs sm:text-sm text-himalaya-800 font-normal leading-relaxed">
                  Walk peaceful forest trails to ancient meditation caves in Pharping and high ridges above the clouds, practicing quiet walking meditation and gentle breathwork.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Curated Spiritual Itineraries */}
      {isSectionVisible(pageContent, 'sec-sw-moments', 'itinerary-teaser') && spiritualItineraries.length > 0 && (
        <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
          <div className="editorial-container">
            <SectionHeading
              tag="Curated Departures"
              nepaliTag="विशेष आध्यात्मिक यात्राहरू"
              title="Specific Spiritual Journeys You Can Take"
              description="Explore individual day-by-day itineraries under the Go Spiritual pillar."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {spiritualItineraries.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/experiences"
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-terracotta hover:text-terracotta-dark transition-colors"
              >
                <span>View All Experience Packages</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 5. CTA Section */}
      {isSectionVisible(pageContent, 'sec-sw-cta', 'cta') && (
        <CTASection
          title="Begin Your Himalayan Spiritual Journey"
          subtitle="Connect with Sakar to discuss personal wellness preferences, dates, and quiet mountain retreat options."
          primaryButtonText="Inquire About Go Within"
          primaryButtonHref="/contact?subject=Go%20Within%20Journey%20Inquiry"
          secondaryButtonText="Explore All Experiences"
          secondaryButtonHref="/experiences"
        />
      )}
    </div>
  );
}
