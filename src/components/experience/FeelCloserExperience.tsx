import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Home,
  Check,
  Heart,
  ArrowRight,
  Utensils,
  Clock,
  ShieldCheck,
  Users,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import CTASection from '@/components/common/CTASection';
import { HOMESTAYS } from '@/data/homestays';
import ExperienceCard from '@/components/common/ExperienceCard';
import { getPublicExperiences } from '@/lib/content';
import { PageContent } from '@/types/cms';
import { getPageHeroOverrides, isSectionVisible } from '@/lib/pageContentHelper';

interface FeelCloserExperienceProps {
  pageContent?: PageContent | null;
}

export default async function FeelCloserExperience({ pageContent }: FeelCloserExperienceProps) {
  const allExperiences = await getPublicExperiences();
  const homestayItineraries = allExperiences.filter(
    (e) =>
      e.category === 'homestays' ||
      e.slug.includes('homestay') ||
      e.slug.includes('village') ||
      e.slug.includes('hearth')
  ).slice(0, 3);

  const hero = getPageHeroOverrides(pageContent, {
    badge: 'Independent Experience Package',
    title: 'Feel Closer',
    subtitle: 'Step beyond hotels to live under the slate roofs of traditional stone homes. Share meals by the wood fire, learn ancestral recipes, and forge lifelong human bonds.',
  });

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Hero Header */}
      {hero.visible && (
        <PageHero
          badge={hero.badge}
          nepaliTitle="गाउँले जीवन र आतिथ्य"
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage="/explore-with-sakar/images/homestays/village-meal.jpg"
          breadcrumbs={[
            { label: 'Experiences', href: '/experience' },
            { label: 'Feel Closer' },
          ]}
        />
      )}

      {/* 2. Philosophy & Introduction */}
      {isSectionVisible(pageContent, 'sec-hm-philosophy', 'philosophy') && (
        <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5" />
                  <span>The Hearthside Philosophy</span>
                </span>

                <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                  Where Guests Arrive as Strangers and Leave as Family
                </h2>

                <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed">
                  True cultural immersion does not occur in five-star hotel lobbies. It happens around a wood-burning hearth (Chulo), where generations gather to share stories, peel garlic, and brew fresh ginger milk tea while mountain mist drifts through the valley outside.
                </p>

                <p className="text-sm sm:text-base text-himalaya-600 font-light leading-relaxed">
                  Our homestay network consists of vetted, clean, multi-generational family homes in authentic mountain villages. Sakar personally accompanies you as a cultural bridge—facilitating natural translation, explaining customs, and ensuring that your hosts receive fair, transparent compensation that directly empowers rural mothers and community funds.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-parchment-200">
                  {[
                    'Private, clean guest rooms with fresh mountain linens',
                    '100% organic farm-to-table home-cooked meals',
                    'Respectful, ethical community economic benefit',
                    'Sakar’s dedicated cultural bridge & translation',
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
                    src="/explore-with-sakar/images/homestays/stone-village-house.jpg"
                    alt="Traditional stone mountain homestay in Nepal"
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                    <p className="font-display-serif italic text-lg">
                      &ldquo;When you sit by our wood fire and eat our rice, you are family.&rdquo;
                    </p>
                    <p className="text-xs text-saffron-light mt-1 font-semibold uppercase tracking-wider">
                      — Aama Gurung, Ghandruk Village Host
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Featured Host Villages & Daily Rhythms */}
      {isSectionVisible(pageContent, 'sec-hm-features', 'features-grid') && (
        <section className="py-20 sm:py-32 bg-sand border-b border-parchment-300">
          <div className="editorial-container">
            <SectionHeading
              tag="Host Families & Villages"
              nepaliTag="हाम्रा गाउँले परिवारहरू"
              title="Living Village Homestay Profiles"
              description="Explore our long-standing host partner communities in the Annapurna, Langtang, and Panauti valleys."
            />

            <div className="space-y-16">
              {HOMESTAYS.map((hs) => (
                <div
                  key={hs.id}
                  className="bg-white rounded-3xl overflow-hidden border border-parchment-300 shadow-editorial p-8 sm:p-10 lg:p-12"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                    {/* Left: Image & Host Quote */}
                    <div className="lg:col-span-5 space-y-6">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-himalaya-900 shadow-subtle">
                        <Image
                          src={hs.image.src}
                          alt={hs.image.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 400px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-terracotta px-2.5 py-1 rounded-full">
                            {hs.region}
                          </span>
                        </div>
                      </div>

                      <blockquote className="p-5 rounded-2xl bg-parchment-100 border border-parchment-300">
                        <p className="font-display-serif italic text-sm text-himalaya-900">
                          &ldquo;{hs.quote}&rdquo;
                        </p>
                        <p className="text-xs font-semibold text-terracotta mt-2">
                          — {hs.hostFamily}
                        </p>
                      </blockquote>
                    </div>

                    {/* Right: Village Details & Daily Rhythms */}
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-himalaya-500">
                          {hs.community}
                        </span>
                        <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950 mt-1">
                          {hs.villageName}
                        </h3>
                        <p className="text-sm sm:text-base text-himalaya-700 font-light leading-relaxed mt-3">
                          {hs.description}
                        </p>
                      </div>

                      {/* Daily Rhythm Timeline */}
                      <div className="space-y-3 pt-2">
                        <h4 className="font-editorial-serif text-sm font-bold uppercase tracking-wider text-himalaya-950 flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-terracotta" />
                          Daily Rhythm with the Family
                        </h4>
                        <div className="space-y-2">
                          {hs.dailyRhythm.map((step, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-parchment-50 border border-parchment-200 text-xs text-himalaya-800 font-light flex items-start space-x-2"
                            >
                              <span className="text-terracotta font-bold">•</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Farm-to-Table Food Experience */}
                      <div className="space-y-3 pt-2">
                        <h4 className="font-editorial-serif text-sm font-bold uppercase tracking-wider text-himalaya-950 flex items-center">
                          <Utensils className="w-4 h-4 mr-2 text-terracotta" />
                          Traditional Hearth Cuisine
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {hs.foodExperience.map((food, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-lg bg-sand/60 border border-parchment-300 text-xs text-himalaya-800 font-medium"
                            >
                              🍽️ {food}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Direct Community Impact */}
      {isSectionVisible(pageContent, 'sec-hm-families', 'community-grid') && (
        <section className="py-20 sm:py-28 bg-parchment-100 border-b border-parchment-300">
          <div className="editorial-container">
            <SectionHeading
              tag="Responsible Slow Tourism"
              nepaliTag="प्रत्यक्ष स्थानीय प्रभाव"
              title="How Your Stay Empowers Rural Nepal"
              description="We practice direct community benefit with full financial transparency."
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-white border border-parchment-300 shadow-subtle space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto text-xl font-bold">
                  100%
                </div>
                <h4 className="font-editorial-serif text-lg font-bold text-himalaya-950">
                  Direct Host Payments
                </h4>
                <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                  All lodging and meal compensation is handed directly to the host mothers, supporting family livelihoods and youth education.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-parchment-300 shadow-subtle space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-saffron/15 text-saffron-dark flex items-center justify-center mx-auto text-xl font-bold">
                  🌱
                </div>
                <h4 className="font-editorial-serif text-lg font-bold text-himalaya-950">
                  Organic & Zero-Waste
                </h4>
                <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                  Ingredients are harvested fresh from family vegetable gardens, cooked on wood stoves, and follow strict Leave No Trace guidelines.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-parchment-300 shadow-subtle space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-moss/10 text-moss-light flex items-center justify-center mx-auto text-xl font-bold">
                  🤝
                </div>
                <h4 className="font-editorial-serif text-lg font-bold text-himalaya-950">
                  Preserving Heritage
                </h4>
                <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                  Sustainable tourism revenue encourages youth to remain in mountain villages, keeping centuries-old architectural and agricultural traditions vibrant.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Curated Homestay Departures */}
      {isSectionVisible(pageContent, 'itineraries', 'itinerary-teaser') && homestayItineraries.length > 0 && (
        <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
          <div className="editorial-container">
            <SectionHeading
              tag="Curated Departures"
              nepaliTag="विशेष होमस्टे यात्राहरू"
              title="Specific Village Itineraries You Can Join"
              description="Explore individual day-by-day itineraries under the Feel Closer pillar."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {homestayItineraries.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/experience"
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
      {isSectionVisible(pageContent, 'sec-hm-cta', 'cta') && (
        <CTASection
          title="Ready to Experience Authentic Mountain Hospitality?"
          subtitle="Connect directly with Sakar to weave a village homestay into your personalized Nepal itinerary."
          primaryButtonText="Inquire About Feel Closer"
          primaryButtonHref="/contact?subject=Feel%20Closer%20Homestay%20Inquiry"
          secondaryButtonText="Explore All Experiences"
          secondaryButtonHref="/experience"
        />
      )}
    </div>
  );
}
