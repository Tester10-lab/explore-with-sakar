import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  Check,
  ArrowRight,
  User,
  Users,
  Heart,
  Calendar,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import InquiryForm from '@/components/booking/InquiryForm';
import { PageContent } from '@/types/cms';
import { getPageHeroOverrides, isSectionVisible } from '@/lib/pageContentHelper';

import { EventOption } from '@/components/booking/InquiryForm';

interface CustomJourneysExperienceProps {
  pageContent?: PageContent | null;
  availableEvents?: EventOption[];
}

export default function CustomJourneysExperience({ pageContent, availableEvents }: CustomJourneysExperienceProps) {
  const hero = getPageHeroOverrides(pageContent, {
    badge: 'Independent Experience Package',
    title: 'Custom Private Journeys',
    subtitle: 'Every traveler is unique. We craft 100% private, customized itineraries shaped around your personal rhythm, travel dates, and cultural curiosity with Sakar.',
  });

  const steps = [
    {
      num: '01',
      title: 'Personal Discovery',
      nepali: 'पहिलो चरण: परामर्श',
      desc: 'We start with a direct conversation via our inquiry form or WhatsApp. Tell Sakar about your travel dates, preferred pace, physical comfort, cultural interests, and who you are traveling with.',
    },
    {
      num: '02',
      title: 'Bespoke Route Design',
      nepali: 'दोस्रो चरण: मार्ग योजना',
      desc: 'Sakar crafts a tailor-made day-by-day draft itinerary combining private vehicle transfers, verified homestays, boutique heritage hotels, and authentic cultural encounters.',
    },
    {
      num: '03',
      title: 'Collaborative Fine-Tuning',
      nepali: 'तेस्रो चरण: परिमार्जन',
      desc: 'We review the proposal together, adjusting pacing, adding rest days, or swapping activities until the route feels 100% aligned with your dream journey.',
    },
    {
      num: '04',
      title: 'Seamless Host Execution',
      nepali: 'चौथो चरण: सहज यात्रा',
      desc: 'From personal airport greetings in Kathmandu to permits, private chauffeur logistics, host briefings, and farewell blessings, Sakar handles every detail with complete care.',
    },
  ];

  const travelStyles = [
    {
      icon: User,
      title: 'Solo Travelers',
      desc: 'Safe, deeply accompanied journeys with Sakar serving as your personal host and cultural bridge across Nepal.',
    },
    {
      icon: Heart,
      title: 'Couples & Honeymoons',
      desc: 'Intimate boutique heritage suites, quiet mountain ridge sunrises, private lakeside dinners, and peaceful retreat pacing.',
    },
    {
      icon: Users,
      title: 'Families & Multi-Generational',
      desc: 'Gentle pacing, comfortable private vehicles, kid-friendly cultural activities, safe homestays, and inspiring moments for all ages.',
    },
    {
      icon: Compass,
      title: 'Specialized Interest Travel',
      desc: 'Tailored specifically for photographers, birdwatchers, yoga practitioners, anthropologists, or culinary enthusiasts.',
    },
  ];

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      {hero.visible && (
        <PageHero
          badge={hero.badge}
          nepaliTitle="निजी तथा व्यक्तिगत यात्रा योजना"
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage="/explore-with-sakar/images/mountains/sunrise-himalayas.jpg"
          breadcrumbs={[
            { label: 'Experiences', href: '/experiences' },
            { label: 'Custom Private Journeys' },
          ]}
        />
      )}

      {/* 2. Bespoke Philosophy */}
      {isSectionVisible(pageContent, 'sec-cj-philosophy', 'philosophy') && (
        <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" />
                  <span>One-on-One Curation</span>
                </span>

                <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                  No Pre-Packaged Templates. Just Your Journey, Thoughtfully Crafted.
                </h2>

                <p className="text-base sm:text-lg text-himalaya-800 font-normal leading-relaxed">
                  Whether you wish to spend three days in a quiet pottery courtyard in Bhaktapur, meditate at dawn inside a hillside monastery, or take a week-long unhurried walk through Gurung stone villages, we build your trip around what matters most to you.
                </p>

                <p className="text-sm sm:text-base text-himalaya-800 font-normal leading-relaxed">
                  You travel with complete flexibility—meaning if we find a fascinating village festival or simply wish to spend an extra afternoon sipping tea on a sunlit balcony, your schedule adapts smoothly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-parchment-200">
                  {[
                    '100% private travel for your party only',
                    'Flexible start dates and customizable durations',
                    'Handpicked boutique lodgings & verified homestays',
                    'Direct communication with Sakar from day one',
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
                    src="/explore-with-sakar/images/homestays/morning-tea-homestay.jpg"
                    alt="Morning tea in mountain homestay in Nepal"
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                    <p className="font-display-serif italic text-lg">
                      &ldquo;We don’t sell packaged tours off a shelf; we co-create a personal chapter of your life in Nepal.&rdquo;
                    </p>
                    <p className="text-xs text-saffron-light mt-1 font-semibold uppercase tracking-wider">
                      — Explore With Sakar
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. The 4-Step Journey Curation Process */}
      {isSectionVisible(pageContent, 'process', 'steps') && (
        <section className="py-20 sm:py-32 bg-sand border-b border-parchment-300">
          <div className="editorial-container">
            <SectionHeading
              tag="How It Works"
              nepaliTag="यात्रा निर्माण प्रक्रिया"
              title="Our Four-Step Customization Process"
              description="From your first thought to your farewell blessing in Kathmandu, we make trip planning seamless and personal."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white rounded-3xl p-8 border border-parchment-300 shadow-subtle flex flex-col justify-between relative group hover:shadow-editorial transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-editorial-serif text-3xl font-bold text-terracotta">
                        {step.num}
                      </span>
                      <span className="text-xs font-serif text-himalaya-700 font-medium">
                        {step.nepali}
                      </span>
                    </div>

                    <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-sm text-himalaya-800 font-normal leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-parchment-200 flex items-center text-xs font-bold text-terracotta">
                    <span>Step {step.num}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Travel Styles We Accommodate */}
      {isSectionVisible(pageContent, 'sec-cj-features', 'features-grid') && (
        <section className="py-20 sm:py-28 bg-parchment-100 border-b border-parchment-300">
          <div className="editorial-container">
            <SectionHeading
              tag="Tailored For You"
              nepaliTag="हरेक प्रकारका यात्रुहरूका लागि"
              title="Who We Design Journeys For"
              description="Every travel companion dynamic requires thoughtful pacing and personalized logistics."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {travelStyles.map((style, idx) => {
                const Icon = style.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-6 sm:p-8 rounded-3xl border border-parchment-300 shadow-subtle space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-editorial-serif text-lg font-bold text-himalaya-950">
                      {style.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-himalaya-800 font-normal leading-relaxed">
                      {style.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. Direct Consultation Form */}
      {isSectionVisible(pageContent, 'sec-cj-cta', 'cta', 'inquiry-form') && (
        <section id="consultation" className="py-12 bg-sand">
          <InquiryForm availableEvents={availableEvents} />
        </section>
      )}
    </div>
  );
}
