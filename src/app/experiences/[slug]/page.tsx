import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EXPERIENCES, getExperienceBySlug } from '@/data/experiences';
import {
  Clock,
  MapPin,
  Mountain,
  Users,
  Calendar,
  Sparkles,
  CheckCircle2,
  Heart,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import InquiryForm from '@/components/booking/InquiryForm';

interface ExperiencePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return EXPERIENCES.map((exp) => ({
    slug: exp.slug,
  }));
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const exp = getExperienceBySlug(params.slug);
  if (!exp) {
    return { title: 'Experience Not Found — Explore With Sakar' };
  }

  return {
    title: `${exp.title} — Explore With Sakar`,
    description: exp.shortDescription,
    openGraph: {
      title: exp.title,
      description: exp.shortDescription,
      images: [{ url: exp.heroImage.src, alt: exp.heroImage.alt }],
    },
  };
}

export default function ExperiencePage({ params }: ExperiencePageProps) {
  const exp = getExperienceBySlug(params.slug);

  if (!exp) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-parchment-100 pb-20">
      {/* 1. Hero Header */}
      <div className="relative pt-12 pb-20 bg-himalaya-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={exp.heroImage.src}
            alt={exp.heroImage.alt}
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950 via-himalaya-950/70 to-transparent" />
        </div>

        <div className="editorial-container relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-saffron-light text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{exp.categoryLabel}</span>
          </div>

          <h1 className="font-editorial-serif text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            {exp.title}
          </h1>

          <p className="text-base sm:text-xl text-parchment-200 font-light font-display-serif italic max-w-2xl">
            {exp.subtitle}
          </p>

          {/* Quick Logistics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/20 max-w-3xl text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-terracotta-light" />
              <span>{exp.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-terracotta-light" />
              <span>{exp.location}</span>
            </div>
            {exp.elevation && (
              <div className="flex items-center space-x-2">
                <Mountain className="w-4 h-4 text-saffron-light" />
                <span>{exp.elevation}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{exp.season}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Narrative & Highlights */}
      <div className="editorial-container py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Itinerary & Narrative */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="space-y-4 text-sm sm:text-base text-himalaya-800 font-light leading-relaxed">
              <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950 pb-2 border-b border-parchment-300">
                Experience Overview
              </h2>
              {exp.fullDescription.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Cultural Highlights */}
            <div className="p-6 sm:p-8 rounded-2xl bg-sand border border-parchment-300 shadow-subtle space-y-4">
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950 flex items-center text-terracotta">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                <span>What Makes This Journey Meaningful</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-himalaya-800 font-light">
                {exp.culturalHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-terracotta shrink-0 mt-1.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary Outline */}
            <div className="space-y-6">
              <h3 className="font-editorial-serif text-2xl font-bold text-himalaya-950 pb-2 border-b border-parchment-300">
                Sample Daily Rhythm & Flow
              </h3>
              <div className="space-y-4">
                {exp.itineraryOutline.map((day, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-sand border border-parchment-300 flex flex-col sm:flex-row gap-4 items-start"
                  >
                    <span className="px-3 py-1 rounded-md bg-terracotta text-white font-mono text-xs font-bold shrink-0">
                      {day.day}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm sm:text-base text-himalaya-950">
                        {day.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-himalaya-700 font-light leading-relaxed">
                        {day.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sakar's Personal Note */}
            <div className="p-6 rounded-2xl bg-parchment-50 border-l-4 border-saffron shadow-subtle space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-saffron-dark font-bold">
                A Note From Sakar
              </span>
              <p className="text-sm font-display-serif italic text-himalaya-900 leading-relaxed">
                &ldquo;{exp.sakarNote}&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Quick Booking Summary Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 p-6 rounded-3xl bg-sand border border-parchment-300 shadow-editorial space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta">
                  Private & Bespoke Tour
                </span>
                <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950 mt-1">
                  Customized For You
                </h3>
                <p className="text-xs text-himalaya-600 font-light mt-1">
                  Available as a private journey for couples, families, or solo travelers. Pacing and dates are tailored to your preferences.
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-himalaya-800 border-t border-b border-parchment-300 py-4 font-light">
                <div className="flex justify-between">
                  <span className="text-himalaya-600">Group Format:</span>
                  <span className="font-medium">{exp.groupSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-himalaya-600">Ideal Timing:</span>
                  <span className="font-medium">{exp.season}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-himalaya-600">Guiding Style:</span>
                  <span className="font-medium">Personal host with Sakar</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-parchment-50 text-[11px] text-himalaya-700 flex items-start space-x-2 border border-parchment-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Community Impact:</strong> {exp.impactFootprint}
                </span>
              </div>

              <Link
                href="#booking"
                className="w-full py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-bold text-sm shadow-warm transition-all flex items-center justify-center space-x-2"
              >
                <span>Plan This Journey With Sakar</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Inquiry Form */}
      <InquiryForm />
    </div>
  );
}
