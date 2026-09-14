import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Heart,
  Globe,
  Leaf,
  Check,
  ArrowRight,
  ShieldCheck,
  Users,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import CTASection from '@/components/common/CTASection';
import TestimonialCard from '@/components/common/TestimonialCard';
import { getLiveReviews } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'About Sakar & Our Story | Explore With Sakar',
  description: 'Meet Sakar, Responsible Tour Director in Nepal. Learn about his background in community development, local roots in Kathmandu, and philosophy of slow, meaningful travel.',
};

export default function AboutPage() {
  const reviews = getLiveReviews().slice(0, 3);
  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge="Meet Your Local Host"
        nepaliTitle="हाम्रो कथा र साकर"
        title="A Journey Rooted in Connection and Purpose"
        subtitle="Travel beyond sightseeing. We connect conscious travelers with the living heritage, mountain communities, and untold stories of Nepal."
        backgroundImage="/explore-with-sakar/images/mountains/himalayan-peaks.jpg"
        breadcrumbs={[{ label: 'About Sakar' }]}
      />

      {/* 2. Personal Story & Background */}
      <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7 space-y-8">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5" />
                <span>The Story of Sakar</span>
              </span>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 leading-tight">
                Born in Kathmandu, Shaped by Nepal’s Communities
              </h2>

              <div className="prose prose-lg text-himalaya-800 font-light leading-relaxed space-y-6">
                <p>
                  Sakar’s journey into tourism began not as a commercial business, but from a profound desire to share the genuine soul of Nepal with the world. Born and raised amidst the sacred courtyards and ancient alleys of Kathmandu, the mountains and living shrines have always been his home.
                </p>

                <p>
                  Before founding Explore With Sakar, he spent over a decade working directly in education, community health, and grassroots NGO initiatives with rural Himalayan villages. Leading programs focused on children’s welfare, women’s economic empowerment, and rural schools allowed him to see Nepal beyond postcards and monuments—through its real people, daily struggles, and rich oral traditions.
                </p>

                <blockquote className="my-8 p-8 rounded-3xl bg-sand/80 border-l-4 border-terracotta text-himalaya-950 italic font-display-serif text-xl sm:text-2xl leading-snug">
                  &ldquo;Tourism became a natural extension of community work. I believe travel must be more than sightseeing. It should create genuine connection, reciprocal learning, and meaningful local contribution.&rdquo;
                </blockquote>

                <p>
                  Today, Sakar personally directs every journey. He acts as a trusted companion and cultural translator—opening doors to private family workshops, medieval monastic courtyards, and warm village hearths where foreign travelers rarely step.
                </p>
              </div>

              {/* What Travelers Discover */}
              <div className="pt-8 border-t border-parchment-200">
                <h3 className="font-editorial-serif text-2xl font-bold text-himalaya-950 mb-6 flex items-center">
                  <Globe className="w-6 h-6 text-terracotta mr-3" />
                  What You Discover with Sakar
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Authentic Nepalese culture & daily local life',
                    'Quiet mountain trails away from commercial crowds',
                    'Ancient Himalayan singing bowl sound sanctuary',
                    'Living Newari heritage, woodcarving & bronze casting',
                    'Direct economic benefit for rural host mothers',
                    'Unrushed, flexible pacing tailored to your curiosity',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-himalaya-800 font-light leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Host Card & Core Values */}
            <div className="lg:col-span-5 sticky top-28 space-y-8">
              {/* Host Portrait Card */}
              <div className="bg-sand p-6 sm:p-8 rounded-3xl border border-parchment-300 shadow-editorial space-y-6">
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
                    <p className="font-display-serif italic text-xl">Sakar</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-saffron-light">
                      Responsible Tour Director & Founder
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-himalaya-700 font-light leading-relaxed">
                  <div className="flex items-center space-x-2 text-himalaya-900 font-semibold">
                    <MapPin className="w-4 h-4 text-terracotta" />
                    <span>Based in Kathmandu, Nepal</span>
                  </div>
                  <p>
                    Fluent in English and Nepali, with deep cultural relationships across the Kathmandu Valley, Annapurna foothills, and Langtang.
                  </p>
                </div>
              </div>

              {/* The Host Promise */}
              <div className="bg-himalaya-950 text-white p-8 rounded-3xl shadow-editorial space-y-4">
                <div className="flex items-center space-x-2 text-saffron-light text-xs font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The Host Promise</span>
                </div>
                <p className="text-sm font-light text-parchment-200 leading-relaxed">
                  &ldquo;As your private host, I ensure no hurried itineraries, no mass-market tourist traps, and no middlemen. Just honest, deeply personal travel with genuine human care.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Traveler Reflections on Sakar */}
      <section className="py-20 sm:py-28 bg-sand border-b border-parchment-300">
        <div className="editorial-container">
          <SectionHeading
            tag="Traveler Voices"
            nepaliTag="यात्रीहरूको भनाइ"
            title="What Travelers Say About Exploring With Sakar"
            description="Read firsthand reflections from international guests who journeyed across Nepal with Sakar."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((t, idx) => (
              <TestimonialCard key={t.id} testimonial={t} featured={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <CTASection
        title="Ready to Explore Nepal with Sakar?"
        subtitle="Connect directly with Sakar to begin co-creating your personalized, unhurried journey."
        primaryButtonText="Start a Conversation"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Our Services"
        secondaryButtonHref="/services"
      />
    </div>
  );
}
