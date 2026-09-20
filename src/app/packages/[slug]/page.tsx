import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  ShieldCheck,
  Check,
  X,
  ArrowLeft,
  Home,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';
import { getPublicPackageBySlug, getPublicPackages } from '@/lib/content';
import InquiryForm from '@/components/booking/InquiryForm';

interface PackagePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const pkg = await getPublicPackageBySlug(params.slug);

  if (!pkg) {
    return {
      title: 'Package Not Found | Explore With Sakar',
    };
  }

  return {
    title: `${pkg.name} | Explore With Sakar`,
    description: pkg.summary,
  };
}

export async function generateStaticParams() {
  const packages = await getPublicPackages();
  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export default async function PackageDetailPage({ params }: PackagePageProps) {
  const pkg = await getPublicPackageBySlug(params.slug);

  if (!pkg) {
    notFound();
  }

  const heroImageSrc = pkg.heroImage?.src || '/explore-with-sakar/images/mountains/himalayan-peaks.jpg';
  const heroImageAlt = pkg.heroImage?.alt || pkg.name;

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-16 pt-32 overflow-hidden bg-himalaya-950">
        <Image
          src={heroImageSrc}
          alt={heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950 via-himalaya-950/60 to-transparent" />

        <div className="editorial-container relative z-10 text-white space-y-6">
          <Link
            href="/packages"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-parchment-300 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Packages</span>
          </Link>

          <div className="space-y-3 max-w-4xl">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/20 border border-terracotta/40 text-saffron-light text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Travel Package</span>
            </span>

            <h1 className="font-editorial-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-parchment-50 leading-tight">
              {pkg.name}
            </h1>

            <p className="text-base sm:text-xl text-parchment-200 font-light max-w-2xl leading-relaxed">
              {pkg.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-parchment-200">
            {pkg.duration && (
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                <Clock className="w-4 h-4 text-saffron" />
                <span>Duration: {pkg.duration}</span>
              </div>
            )}
            {pkg.accommodationStyle && (
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                <Home className="w-4 h-4 text-terracotta-light" />
                <span>Lodging: {pkg.accommodationStyle}</span>
              </div>
            )}
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Hosted & Escorted by Sakar</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Booking Form */}
      <section className="py-16 sm:py-24">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left column: Overview & Highlights */}
            <div className="lg:col-span-7 space-y-12">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-parchment-300 shadow-subtle space-y-6">
                <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950">
                  Journey Overview
                </h2>
                <p className="text-base text-himalaya-700 font-light leading-relaxed">
                  {pkg.summary}
                </p>

                {/* Highlights */}
                {pkg.highlights && pkg.highlights.length > 0 && (
                  <div className="pt-6 border-t border-parchment-200 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-himalaya-950">
                      Highlights of This Experience
                    </h3>
                    <div className="space-y-3">
                      {pkg.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start text-sm text-himalaya-700">
                          <span className="text-terracotta font-bold mr-2.5">•</span>
                          <span className="font-light">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Inclusions & Exclusions */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-parchment-300 shadow-subtle space-y-8">
                <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950">
                  What is Included
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {pkg.inclusions && pkg.inclusions.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center">
                        <Check className="w-4 h-4 mr-1.5 text-emerald-600" />
                        Inclusions
                      </h3>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-himalaya-700 font-light">
                        {pkg.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-emerald-600 font-bold mr-2">✓</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {pkg.exclusions && pkg.exclusions.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-himalaya-700 flex items-center">
                        <X className="w-4 h-4 mr-1.5 text-terracotta" />
                        Exclusions
                      </h3>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-himalaya-600 font-light">
                        {pkg.exclusions.map((exc, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-terracotta mr-2">✕</span>
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right column: Sticky Inquiry Box */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-parchment-300 shadow-floating">
                <div className="mb-6 pb-6 border-b border-parchment-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-himalaya-500 block">
                    Starting From
                  </span>
                  <div className="font-editorial-serif text-3xl font-bold text-himalaya-950 mt-1">
                    {pkg.price ? `$${pkg.price} ${pkg.currency}` : 'Bespoke Quote'}
                  </div>
                  <p className="text-xs text-himalaya-500 mt-1">
                    Personalized according to group size and seasonal choices
                  </p>
                </div>

                <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950 mb-2">
                  Inquire About This Package
                </h3>
                <p className="text-xs text-himalaya-600 font-light mb-6">
                  Direct message to Sakar. We respond within 24 hours with custom dates, pricing, and advice.
                </p>

                <InquiryForm defaultPackage={pkg.name} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
