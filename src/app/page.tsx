export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Heart,
  Check,
  BookOpen,
} from 'lucide-react';
import Hero from '@/components/home/Hero';
import {
  getLiveBlogs,
  getLiveBlogsAsync,
  getLiveServices,
  getLiveSettings,
  getLiveSettingsAsync,
} from '@/lib/cms';
import ServiceCard from '@/components/common/ServiceCard';
import BlogCard from '@/components/blog/BlogCard';
import SectionHeading from '@/components/common/SectionHeading';
import InquiryForm from '@/components/booking/InquiryForm';

export const metadata: Metadata = {
  title: 'Explore With Sakar — Authentic Nepal Travel & Cultural Experiences',
  description: 'Meaningful Nepal travel experiences beyond ordinary tourism. Guided by local host Sakar through living culture, village homestays, Himalayan spirituality, and responsible slow travel.',
};

export default async function HomePage() {
  const settings = await getLiveSettingsAsync();
  const stats = settings.stats || [];

  const services = getLiveServices(false);

  const blogs = await getLiveBlogsAsync(false);
  const latestBlogs = blogs.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-parchment-100">
      {/* 1. Hero Section */}
      <Hero />

      {/* Trust & Impact Stats Strip */}
      {stats.length > 0 && (
        <section className="bg-sand border-b border-parchment-300 py-8 relative z-20">
          <div className="editorial-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-parchment-300">
              {stats.map((stat) => (
                <div key={stat.id} className="px-4 py-2 flex flex-col items-center justify-center">
                  <span className="font-editorial-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-terracotta tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-himalaya-900 mt-1">
                    {stat.label}
                  </span>
                  {stat.sublabel && (
                    <span className="text-[11px] text-himalaya-500 font-light mt-0.5">
                      {stat.sublabel}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. Core Travel Pillars */}
      <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <SectionHeading
            tag="Our Core Pillars"
            nepaliTag="हाम्रा यात्राहरू"
            title="Meaningful Travel, Deeply Curated"
            description="We move away from hurried checklists and mass tourism. Explore our dedicated travel offerings, each crafted to forge genuine human connection."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} layout="grid" />
            ))}
          </div>

          {services.length > 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {services.slice(3, 5).map((service) => (
                <ServiceCard key={service.id} service={service} layout="grid" />
              ))}
            </div>
          )}

          <div className="text-center pt-4">
            <Link
              href="/experiences"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-himalaya-950 hover:bg-terracotta text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-subtle hover:shadow-warm"
            >
              <span>Explore All Experiences</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Meet Sakar: Personal Introduction */}
      <section className="py-20 sm:py-28 bg-parchment-100 border-b border-parchment-300">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none rounded-3xl overflow-hidden shadow-floating border border-parchment-300 bg-white p-3">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-himalaya-900">
                  <Image
                    src="/explore-with-sakar/images/sakar/sakar-portrait.jpg"
                    alt="Sakar — Responsible Tour Director"
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/70 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                    <p className="font-display-serif italic text-lg">Sakar</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-saffron-light">
                      Responsible Tour Director & Local Guide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Narrative Story */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5" />
                <span>The Host Behind Your Journey</span>
              </div>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                &ldquo;Travel should create genuine connection, learning, and meaningful contribution.&rdquo;
              </h2>

              <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed">
                Born and raised amidst the sacred alleyways of the Kathmandu Valley, Sakar spent years working in community development and education with rural mountain villages before opening his doors to travelers.
              </p>

              <p className="text-sm sm:text-base text-himalaya-600 font-light leading-relaxed">
                Rather than standard tourist checklists, Sakar connects you directly with village elders, master artisans, and peaceful mountain trails—ensuring your visit leaves a positive, respectful footprint on local families.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  'Over a decade of community development work',
                  '100% private, customized journey planning',
                  'Direct economic benefit to rural host families',
                  'Deep cultural and spiritual insights',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-himalaya-800">
                    <div className="w-5 h-5 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-himalaya-950 hover:bg-terracotta text-white font-semibold text-xs tracking-widest uppercase transition-colors"
                >
                  <span>Read Sakar’s Full Story</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white hover:bg-parchment-200 text-himalaya-900 border border-parchment-300 font-semibold text-xs tracking-widest uppercase transition-colors"
                >
                  <span>Connect Directly</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. From Sakar's Journal (Blog Teaser) */}
      <section className="py-20 sm:py-28 bg-sand border-b border-parchment-300">
        <div className="editorial-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-terracotta/10 text-terracotta border border-terracotta/20 mb-3">
                <BookOpen className="w-3 h-3" />
                <span>From The Journal</span>
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                Stories & Reflections from the Trail
              </h2>
              <p className="text-base text-himalaya-700 font-light mt-2">
                Personal essays, cultural observations, and quiet wisdom gathered across the valleys of Nepal.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-himalaya-900 hover:text-terracotta transition-colors group self-start md:self-end"
            >
              <span>Explore All Stories</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {latestBlogs.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white hover:bg-himalaya-950 text-himalaya-900 hover:text-white border border-parchment-300 font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-subtle"
            >
              <span>Read More Stories</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Final Consultation & Inquiry Form */}
      <section id="inquiry" className="border-t border-parchment-300">
        <InquiryForm />
      </section>
    </div>
  );
}
