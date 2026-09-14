import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Heart,
  Home,
  Mountain,
  ShieldCheck,
  Check,
  Globe,
  Users,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import ServiceCard from '@/components/common/ServiceCard';
import CTASection from '@/components/common/CTASection';
import { getLiveServices } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Our Travel Pillars & Services | Explore With Sakar',
  description: 'Discover our core travel offerings in Nepal: Village Homestays, Living Culture, Himalayan Spiritual Retreats, Quiet Mountain Treks, and Bespoke Private Journeys.',
};

export default function ServicesPage() {
  const services = getLiveServices(false);
  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge="Our Offerings"
        nepaliTitle="हाम्रा सेवा तथा यात्राहरू"
        title="Five Pillars of Meaningful Travel"
        subtitle="We design slow-paced, private journeys across Nepal. Each pillar is shaped to bring you into deep, respectful connection with local life, culture, and nature."
        backgroundImage="/explore-with-sakar/images/mountains/himalayan-peaks.jpg"
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* 2. Slow Travel & Host Philosophy */}
      <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Our Philosophy</span>
              </span>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                Travel as Connection, Not Consumption
              </h2>

              <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed">
                Mass tourism reduces ancient sacred lands to superficial photo-stops. At Explore With Sakar, we believe true travel is an exchange of human warmth, shared meals, cultural understanding, and quiet contemplation.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: 'Slow, Unhurried Pacing',
                    desc: 'Ample time to savor conversations, morning light, and impromptu village invitations without rigid countdowns.',
                  },
                  {
                    title: '100% Local & Community Direct',
                    desc: 'Your travel funds go directly to village mothers, local guides, small farmers, and traditional master artisans.',
                  },
                  {
                    title: 'Bespoke Private Guidance',
                    desc: 'Every itinerary is customized around your personal dates, physical comfort, and passions with Sakar’s personal accompaniment.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3.5">
                    <div className="w-6 h-6 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-himalaya-950">{item.title}</h4>
                      <p className="text-xs text-himalaya-600 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-floating border border-parchment-300 aspect-[4/3] bg-himalaya-900">
                <Image
                  src="/explore-with-sakar/images/homestays/village-storyteller.jpg"
                  alt="Sakar and village elders sharing stories"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-display-serif italic text-base sm:text-lg">
                    &ldquo;When we step into a village with humility and curiosity, strangers become family within hours.&rdquo;
                  </p>
                  <p className="text-xs text-saffron-light mt-1 font-semibold uppercase tracking-wider">
                    — Sakar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 5 Service Pillars (Detailed Layout) */}
      <section className="py-20 sm:py-32 bg-sand">
        <div className="editorial-container">
          <SectionHeading
            tag="Explore Dedicated Pages"
            nepaliTag="विस्तृत सेवाहरू"
            title="Explore Our Core Services in Detail"
            description="Click into any pillar to explore host stories, daily rhythms, key features, and sample itineraries."
          />

          <div className="space-y-12">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} layout="detailed" />
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <CTASection
        title="Ready to Design Your Personalized Nepal Experience?"
        subtitle="Contact Sakar directly to discuss your preferred dates, physical comfort, and unique interests."
        primaryButtonText="Start Planning With Sakar"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Packages"
        secondaryButtonHref="/packages"
      />
    </div>
  );
}
