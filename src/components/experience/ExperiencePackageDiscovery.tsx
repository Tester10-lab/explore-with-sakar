import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import CTASection from '@/components/common/CTASection';

export interface PackageCard {
  slug: string;
  title: string;
  shortDescription: string;
  heroImage?: {
    src: string;
    alt: string;
  };
}

export interface ExperiencePackageDiscoveryProps {
  experienceName: string;
  nepaliTitle?: string;
  introText: string;
  overviewText?: string[];
  highlights?: string[];
  heroImage: string;
  packages: PackageCard[];
  featuredCount?: number;
  experienceSlug: string;
}

export default function ExperiencePackageDiscovery({
  experienceName,
  nepaliTitle,
  introText,
  overviewText = [],
  highlights = [],
  heroImage,
  packages,
  featuredCount = 4,
  experienceSlug,
}: ExperiencePackageDiscoveryProps) {
  const featuredPackages = packages.slice(0, featuredCount);
  const hasMore = packages.length > featuredCount;

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Hero */}
      <PageHero
        badge={experienceName}
        nepaliTitle={nepaliTitle}
        title={experienceName}
        subtitle={introText}
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: 'Experiences', href: '/experiences' },
          { label: experienceName },
        ]}
      />

      {/* 2. Experience Overview Section */}
      {overviewText.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-b border-parchment-200">
          <div className="editorial-container max-w-4xl mx-auto">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest font-bold text-terracotta">
                Experience Overview
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-himalaya-950">
                The Essence of {experienceName}
              </h2>
              <div className="prose prose-lg prose-himalaya max-w-none font-normal leading-relaxed space-y-4 text-himalaya-800 pt-2 text-base sm:text-lg">
                {overviewText.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Curated Exploration Highlights Section */}
      {highlights.length > 0 && (
        <section className="py-16 sm:py-20 bg-parchment-50 border-b border-parchment-200">
          <div className="editorial-container max-w-4xl mx-auto">
            <div className="mb-10">
              <span className="text-xs font-mono uppercase tracking-widest font-bold text-terracotta">
                Curated Exploration Highlights
              </span>
              <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950 mt-1">
                Signature Dimensions of {experienceName}
              </h2>
              <p className="text-sm sm:text-base text-himalaya-700 font-normal mt-1">
                The core experiential threads that weave through every topic in this collection.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-parchment-300 shadow-subtle flex items-start space-x-3.5"
                >
                  <div className="w-6 h-6 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm text-himalaya-900 font-medium leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Exactly 4 Featured Topic Cards Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="editorial-container">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-terracotta">
              Featured Topics
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-himalaya-950 mt-1">
              Curated Topics in {experienceName}
            </h2>
            <p className="text-sm sm:text-base text-himalaya-700 font-normal mt-2 leading-relaxed">
              Each topic below is an unhurried, standalone itinerary. Select any topic to view its detailed schedule, host notes, and reservation details.
            </p>
          </div>

          {featuredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPackages.map((pkg) => {
                const topicUrl = `/experiences/${experienceSlug}/${pkg.slug}`;
                return (
                  <Link
                    key={pkg.slug}
                    href={topicUrl}
                    className="group bg-white border border-parchment-300 rounded-3xl overflow-hidden shadow-subtle hover:shadow-editorial hover:border-terracotta/40 transition-all duration-300 flex flex-col"
                  >
                    {/* Topic Image - clicking opens topic detail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-himalaya-900">
                      {pkg.heroImage?.src ? (
                        <Image
                          src={pkg.heroImage.src}
                          alt={pkg.heroImage.alt || pkg.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-himalaya-800">
                          <span className="text-parchment-300 text-sm font-mono font-medium">No Image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-himalaya-950/25 group-hover:bg-himalaya-950/15 transition-colors" />
                    </div>

                    {/* Topic Content - simple discovery only */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950 group-hover:text-terracotta transition-colors leading-snug">
                          {pkg.title}
                        </h3>
                        <p className="text-sm text-himalaya-800 font-normal mt-2.5 leading-relaxed line-clamp-3">
                          {pkg.shortDescription}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-parchment-200">
                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-himalaya-950 group-hover:text-terracotta transition-colors">
                          <span>Explore Topic</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="bg-parchment-50 border border-parchment-300 rounded-3xl p-12 text-center">
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                Topics Coming Soon
              </h3>
              <p className="text-sm text-himalaya-600 font-light mt-2">
                We are currently curating topics for {experienceName}. Contact Sakar to design a private custom journey.
              </p>
            </div>
          )}

          {/* Explore All Topics Link if more than 4 topics */}
          {hasMore && (
            <div className="mt-12 text-center">
              <Link
                href={`/experiences?category=${experienceSlug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-himalaya-950 text-white text-sm font-semibold hover:bg-terracotta transition-colors shadow-warm"
              >
                <span>Explore All Topics</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 5. CTA Section */}
      <CTASection
        title={`Interested in ${experienceName}?`}
        subtitle="Connect directly with Sakar to plan your personalized, unhurried journey."
        primaryButtonText="Inquire About This Experience"
        primaryButtonHref={`/contact?subject=${encodeURIComponent(`Inquiry for ${experienceName}`)}`}
        secondaryButtonText="All Experiences"
        secondaryButtonHref="/experiences"
      />
    </div>
  );
}

