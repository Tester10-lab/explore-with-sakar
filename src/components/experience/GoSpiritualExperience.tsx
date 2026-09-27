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
  ShieldCheck,
  Compass,
  Music,
  BookOpen,
  Feather,
  Mountain,
  MapPin,
  CircleDot,
  Radio,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import CTASection from '@/components/common/CTASection';
import ExperienceCard from '@/components/common/ExperienceCard';
import { getPublicExperiences } from '@/lib/content';
import { PageContent } from '@/types/cms';
import { getPageHeroOverrides, isSectionVisible } from '@/lib/pageContentHelper';
import { GO_WITHIN_CONTENT, GoWithinChapter } from '@/data/go-within';

interface GoSpiritualExperienceProps {
  pageContent?: PageContent | null;
}

export default async function GoSpiritualExperience({ pageContent }: GoSpiritualExperienceProps) {
  const allExperiences = await getPublicExperiences();
  const spiritualItineraries = allExperiences.filter(
    (e) =>
      e.category === 'go-within' ||
      e.category === 'spiritual' ||
      e.category === 'spiritual-wellness' ||
      e.category === 'go-spiritual'
  );

  const hero = getPageHeroOverrides(pageContent, {
    badge: 'Spiritual Sanctuary & Sacred Geometry',
    title: GO_WITHIN_CONTENT.title,
    subtitle: GO_WITHIN_CONTENT.subtitle,
  });

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      {hero.visible && (
        <PageHero
          badge={hero.badge}
          nepaliTitle={GO_WITHIN_CONTENT.nepaliTitle}
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage="/explore-with-sakar/images/spiritual/buddhist-stupa.jpg"
          breadcrumbs={[
            { label: 'Experiences', href: '/experiences' },
            { label: 'Go Within' },
          ]}
        />
      )}

      {/* 2. Overview & Sanctuary Philosophy */}
      {isSectionVisible(pageContent, 'sec-sw-philosophy', 'philosophy') && (
        <section className="py-16 sm:py-24 bg-white border-b border-parchment-300">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Sanctuary for the Mind</span>
                </span>

                <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                  {GO_WITHIN_CONTENT.intro.heading}
                </h2>

                {GO_WITHIN_CONTENT.intro.paragraphs.map((para, i) => (
                  <p key={i} className="text-base sm:text-lg text-himalaya-800 font-normal leading-relaxed">
                    {para}
                  </p>
                ))}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-parchment-200">
                  {[
                    'Sacred Geometry of Kathmandu, Patan & Bhaktapur',
                    'Pashupati ghats & the wisdom of impermanence',
                    'Himalayan Shamanism (Dhami-Jhankri) & nature spirits',
                    'Nada Yoga 7-Metal singing bowls & 7 Chakras Bija Mantras',
                    'Mindful cave meditation in Pharping & Taudaha serpent lake',
                    'Vedic astrology & traditional Janma Kundali birth charts',
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
                  <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/85 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                    <p className="font-editorial-serif italic text-lg sm:text-xl">
                      &ldquo;What if Kathmandu, Patan, and Bhaktapur were not simply built, but sacredly imagined?&rdquo;
                    </p>
                    <p className="text-xs text-saffron-light mt-2 font-semibold uppercase tracking-wider">
                      — Sacred Himalayan Heritage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Navigation Bar for the 8 Chapters */}
      <section className="sticky top-16 z-30 bg-parchment-100/95 backdrop-blur border-b border-parchment-300 py-4">
        <div className="editorial-container">
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-himalaya-900 whitespace-nowrap shrink-0 mr-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-terracotta" />
              <span>Chapters:</span>
            </span>
            {GO_WITHIN_CONTENT.chapters.map((chap, idx) => (
              <a
                key={chap.id}
                href={`#${chap.id}`}
                className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all bg-white hover:bg-terracotta hover:text-white text-himalaya-800 border border-parchment-300 shadow-sm shrink-0"
              >
                {chap.chapterNumber.replace('Chapter ', 'Ch ')}: {chap.title.split(':')[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Detailed 8 Chapters Presentation */}
      <section className="py-16 sm:py-24 space-y-20">
        <div className="editorial-container space-y-24">
          {GO_WITHIN_CONTENT.chapters.map((chap: GoWithinChapter, index: number) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={chap.id}
                id={chap.id}
                className="scroll-mt-32 bg-white rounded-3xl border border-parchment-300 shadow-subtle overflow-hidden p-6 sm:p-10 lg:p-12 space-y-8"
              >
                {/* Chapter Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parchment-200 pb-6">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 rounded-full bg-saffron/15 text-saffron-dark text-xs font-bold tracking-wider uppercase">
                        {chap.chapterNumber}
                      </span>
                      {chap.nepaliTitle && (
                        <span className="text-xs font-medium text-himalaya-800 font-serif">
                          {chap.nepaliTitle}
                        </span>
                      )}
                    </div>
                    <h3 className="font-editorial-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-himalaya-950 tracking-tight pt-1">
                      {chap.title}
                    </h3>
                    <p className="text-sm sm:text-base text-terracotta font-semibold">
                      {chap.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-himalaya-800 shrink-0">
                    <span className="inline-flex items-center space-x-1.5 bg-parchment-200/60 px-3 py-1.5 rounded-full font-medium">
                      <MapPin className="w-3.5 h-3.5 text-terracotta" />
                      <span>{chap.location}</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5 bg-parchment-200/60 px-3 py-1.5 rounded-full font-medium">
                      <Compass className="w-3.5 h-3.5 text-moss-dark" />
                      <span>{chap.duration}</span>
                    </span>
                  </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-base sm:text-lg text-himalaya-950 font-medium leading-relaxed italic border-l-4 border-terracotta pl-4 bg-terracotta/5 py-2 rounded-r-lg">
                      {chap.summary}
                    </p>

                    <div className="space-y-4 pt-2">
                      {chap.paragraphs.map((p, idx) => (
                        <p key={idx} className="text-sm sm:text-base text-himalaya-800 leading-relaxed font-normal">
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Highlights List */}
                    <div className="pt-4 border-t border-parchment-200 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-himalaya-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-saffron-dark" />
                        <span>Key Spiritual Insights & Experiences</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {chap.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start space-x-2 text-xs sm:text-sm text-himalaya-900">
                            <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0 mt-2" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chapter Package Link & Quick Inquiry */}
                    <div className="pt-6 border-t border-parchment-200 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/experiences/go-within/${chap.id}`}
                        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-himalaya-950 text-white hover:bg-terracotta text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm"
                      >
                        <span>View Dedicated Itinerary & Book</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/contact?subject=${encodeURIComponent(`Inquiry: Go Within - ${chap.title}`)}`}
                        className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full border border-parchment-300 bg-white hover:bg-parchment-200 text-himalaya-800 text-xs font-semibold tracking-wider transition-colors"
                      >
                        <span>Inquire About Package</span>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-6">
                    <div className="relative rounded-2xl overflow-hidden shadow-subtle border border-parchment-300 aspect-[4/3] bg-himalaya-900">
                      <Image
                        src={chap.image}
                        alt={chap.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="object-cover"
                      />
                    </div>

                    {/* Key Quote Callout */}
                    {chap.keyQuote && (
                      <div className="bg-sand p-6 rounded-2xl border border-parchment-300 space-y-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-10 text-himalaya-900">
                          <Feather className="w-16 h-16" />
                        </div>
                        <p className="font-editorial-serif text-sm sm:text-base italic text-himalaya-950 leading-relaxed relative z-10">
                          &ldquo;{chap.keyQuote.quote}&rdquo;
                        </p>
                        <p className="text-xs font-bold uppercase tracking-wider text-terracotta relative z-10">
                          — {chap.keyQuote.attribution}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Special Render: 7 Chakras Bija Mantra Table for Chapter 05 */}
                {chap.chakras && chap.chakras.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-parchment-300 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
                          Nada Yoga Sound Frequencies
                        </span>
                        <h4 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
                          The 7 Chakras & Bija Mantras
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron-dark text-xs font-semibold hidden sm:inline-block">
                        Sa Re Ga Ma Pa Dha Ni
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-parchment-300 bg-sand">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-parchment-200/70 border-b border-parchment-300 text-himalaya-950 font-bold uppercase tracking-wider">
                            <th className="p-3.5">Chakra (Sanskrit)</th>
                            <th className="p-3.5">English Name</th>
                            <th className="p-3.5">Bija Mantra</th>
                            <th className="p-3.5">Cosmic Attribute & Resonance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-parchment-300 text-himalaya-900 font-medium">
                          {chap.chakras.map((c, cIdx) => (
                            <tr key={cIdx} className="hover:bg-white/60 transition-colors">
                              <td className="p-3.5 font-semibold text-himalaya-950 flex items-center gap-2">
                                <CircleDot className="w-3.5 h-3.5 text-terracotta shrink-0" />
                                <span>{c.chakra}</span>
                              </td>
                              <td className="p-3.5 text-himalaya-800">{c.english}</td>
                              <td className="p-3.5">
                                <span className="px-2.5 py-1 rounded-md bg-terracotta/10 text-terracotta font-mono font-bold">
                                  {c.mantra}
                                </span>
                              </td>
                              <td className="p-3.5 text-himalaya-800">{c.attribute}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Curated Departures Teaser */}
      {isSectionVisible(pageContent, 'sec-sw-moments', 'itinerary-teaser') && spiritualItineraries.length > 0 && (
        <section className="py-20 sm:py-28 bg-white border-y border-parchment-300">
          <div className="editorial-container">
            <SectionHeading
              tag="Curated Packages"
              nepaliTag="८ विशेष अन्तर्यात्रा प्याकेजहरू"
              title="8 Dedicated Go Within Packages"
              description="Explore each of our 8 sacred and contemplative journeys across Kathmandu Valley and Himalayan sanctuaries."
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

      {/* 6. CTA Section */}
      {isSectionVisible(pageContent, 'sec-sw-cta', 'cta') && (
        <CTASection
          title="Begin Your Himalayan Go Within Journey"
          subtitle="Connect with Sakar to discuss personal wellness preferences, private sound healing sessions, or silent mountain retreat options."
          primaryButtonText="Inquire About Go Within"
          primaryButtonHref="/contact?subject=Go%20Within%20Spiritual%20Journey%20Inquiry"
          secondaryButtonText="Explore All Experiences"
          secondaryButtonHref="/experiences"
        />
      )}
    </div>
  );
}

