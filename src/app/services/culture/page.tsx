import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Check,
  Heart,
  ArrowRight,
  Eye,
  MapPin,
  Calendar,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import CTASection from '@/components/common/CTASection';
import { EXPERIENCES } from '@/data/experiences';
import ExperienceCard from '@/components/common/ExperienceCard';

import { getLiveServiceBySlug } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Living Culture & Sacred Heritage | Explore With Sakar',
  description: 'Explore ancient Kathmandu Valley bahals, meet multi-generational master artisans (woodcarving, bronze casting, thangka), and experience sacred feasts.',
};

export default async function CultureServicePage() {
  const [liveService] = await Promise.all([
    getLiveServiceBySlug('culture'),
  ]);
  const heritageExp = EXPERIENCES.find((e) => e.slug === 'kathmandu-heritage-living-culture');

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge={liveService?.category || 'Cultural Immersion'}
        nepaliTitle={liveService?.nepaliTitle || 'जीवन्त संस्कृति र कला'}
        title={liveService?.title || 'Living Culture & Sacred Heritage'}
        subtitle={liveService?.subtitle || liveService?.description || 'Step through secret archways into medieval Newari monastic courtyards (Bahals), meet master bronze and wood sculptors, and experience authentic festive feasts.'}
        backgroundImage={liveService?.image || '/explore-with-sakar/images/heritage/durbar-square.jpg'}
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: liveService?.title || 'Living Culture & Heritage' },
        ]}
      />

      {/* 2. Living Heritage Narrative */}
      <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Living Mandala</span>
              </span>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                Not a Museum Behind Glass, but a Breathing Sacred City
              </h2>

              <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed">
                In Kathmandu, Patan, and Bhaktapur, centuries-old stone statues receive fresh marigold garlands every sunrise. Master metalsmiths continue eight-hundred-year-old lost-wax bronze traditions in sunlit brick courtyards, and monks blow conch horns from rooftop shrines.
              </p>

              <p className="text-sm sm:text-base text-himalaya-600 font-light leading-relaxed">
                With Sakar as your guide, you bypass tourist bottlenecks to enter private family ateliers, historic guthi dining chambers, and sacred courtyards where foreign travelers rarely step.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-parchment-200">
                {[
                  'Hidden Patan & Bhaktapur Bahal walks',
                  '1-on-1 sessions with master wood & bronze artisans',
                  'Sacred Newari Samay Baji culinary banquets',
                  'Dawn circumambulations (Kora) at Buddhist stupas',
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
                  src="/explore-with-sakar/images/heritage/newari-architecture.jpg"
                  alt="Ancient Newari woodcarving in Nepal temple"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                  <p className="font-display-serif italic text-lg">
                    &ldquo;Every carved window frames five centuries of living devotion.&rdquo;
                  </p>
                  <p className="text-xs text-saffron-light mt-1 font-semibold uppercase tracking-wider">
                    — Sakar, Heritage Host
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Artisan Guilds & Sacred Encounters */}
      <section className="py-20 sm:py-32 bg-sand border-b border-parchment-300">
        <div className="editorial-container">
          <SectionHeading
            tag="Artisan Masterclasses"
            nepaliTag="परम्परागत शिल्पकारहरू"
            title="Centuries of Living Craftsmanship"
            description="Meet the master guilds preserving the sacred arts of the Himalayas."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-parchment-300 shadow-subtle space-y-4">
              <div className="text-3xl">🪵</div>
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                Newari Master Woodcarvers
              </h3>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                Visit seventh-generation woodcarvers in historic Bhaktapur. Observe how sacred peacock windows, temple struts, and deity frames are carved entirely by hand using ancestral chisels.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-parchment-300 shadow-subtle space-y-4">
              <div className="text-3xl">✨</div>
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                Lost-Wax Bronze Casting
              </h3>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                Step into quiet Patan foundry courtyards where molten bronze, beeswax molds, and hand-gilding produce world-renowned sacred Buddhist and Hindu statuary.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-parchment-300 shadow-subtle space-y-4">
              <div className="text-3xl">🎨</div>
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                Sacred Thangka Painting
              </h3>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                Engage with master thangka artists using mineral pigments and pure gold dust to render complex meditation mandalas and cosmological wisdom maps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Cultural Itinerary */}
      {heritageExp && (
        <section className="py-20 sm:py-28 bg-parchment-100 border-b border-parchment-300">
          <div className="editorial-container max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
                Featured Itinerary
              </span>
              <h3 className="font-editorial-serif text-3xl font-bold text-himalaya-950 mt-1">
                Explore Our Signature Heritage Itinerary
              </h3>
            </div>
            <ExperienceCard experience={heritageExp} />
          </div>
        </section>
      )}

      {/* 5. CTA Section */}
      <CTASection
        title="Ready to Experience the Living Soul of Kathmandu Valley?"
        subtitle="Let Sakar design a private cultural journey matching your curiosity, dates, and pace."
        primaryButtonText="Inquire About Cultural Journeys"
        primaryButtonHref="/contact"
        secondaryButtonText="View All Experiences"
        secondaryButtonHref="/experiences"
      />
    </div>
  );
}
