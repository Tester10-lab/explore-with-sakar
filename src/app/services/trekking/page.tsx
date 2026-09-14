import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Mountain,
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Footprints,
  Compass,
  TreePine,
  Heart,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import CTASection from '@/components/common/CTASection';
import { EXPERIENCES } from '@/data/experiences';
import ExperienceCard from '@/components/common/ExperienceCard';

import { getLiveServiceBySlug } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Mountain Treks & Hidden Trails | Explore With Sakar',
  description: 'Slow-paced, contemplative mountain walking along uncrowded Himalayan ridge trails in Langtang, Helambu, Annapurna foothills, and Mustang.',
};

export default async function TrekkingServicePage() {
  const liveService = await getLiveServiceBySlug('trekking');
  const trekkingExperiences = EXPERIENCES.filter(
    (e) => e.category === 'adventure' || e.slug.includes('trail') || e.slug.includes('mustang')
  );

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge={liveService?.category || 'Slow Mountain Travel'}
        nepaliTitle={liveService?.nepaliTitle || 'शान्त हिमाली पदयात्रा'}
        title={liveService?.title || 'Mountain Treks & Hidden Trails'}
        subtitle={liveService?.subtitle || liveService?.description || 'Walk peaceful trails through virgin rhododendron forests, suspension bridges, and panoramic alpine passes away from commercial tourist highways.'}
        backgroundImage={liveService?.image || '/explore-with-sakar/images/trails/suspension-bridge.jpg'}
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: liveService?.title || 'Mountain Treks & Trails' },
        ]}
      />

      {/* 2. Slow Trekking Philosophy */}
      <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                <Footprints className="w-3.5 h-3.5" />
                <span>The Slow Walking Ethos</span>
              </span>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                Walking at the Natural Rhythm of the Mountains
              </h2>

              <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed">
                Too many trekking agencies treat the Himalayas as a race against the clock—rushing past villages to hit crowded lodges before sunset. We believe the true magic of mountain travel lives in the unhurried moments.
              </p>

              <p className="text-sm sm:text-base text-himalaya-600 font-light leading-relaxed">
                If we meet a village elder weaving bamboo baskets, or the morning clouds part over a 7,000-meter peak, we stop, brew fresh tea, and savor the moment. Our walking days are gentle, safe, and tailored to your physical pace with generous acclimatization built in.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-parchment-200">
                {[
                  'Handpicked quiet trails avoiding mass crowds',
                  'Unhurried, conversational walking pace',
                  'Fair ethical wages & insurance for all porters',
                  'Strict Leave No Trace wilderness stewardship',
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
                  src="/explore-with-sakar/images/mountains/mountain-ridge.jpg"
                  alt="Scenic Himalayan ridge in Nepal"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                  <p className="font-display-serif italic text-lg">
                    &ldquo;In the mountains, the joy is not in reaching the pass; it is in every breath along the trail.&rdquo;
                  </p>
                  <p className="text-xs text-saffron-light mt-1 font-semibold uppercase tracking-wider">
                    — Sakar, Trek Director
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Porter Welfare & Ethical Standards */}
      <section className="py-20 sm:py-28 bg-sand border-b border-parchment-300">
        <div className="editorial-container">
          <SectionHeading
            tag="Ethical Mountain Operations"
            nepaliTag="भरिया कल्याण र सुरक्षा"
            title="Our Commitment to Mountain Guides & Porters"
            description="We ensure dignity, safety, and fair compensation for the dedicated mountain crew who make our journeys possible."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-parchment-300 shadow-subtle space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                Fair Living Wages
              </h3>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                All guides and porters receive compensation above industry standards, plus fair meals, comfortable lodging allowances, and prompt payment.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-parchment-300 shadow-subtle space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-saffron/15 text-saffron-dark flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                Full Medical Insurance & Gear
              </h3>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                We equip our mountain team with quality alpine clothing, boots, and comprehensive emergency medical and evacuation insurance.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-parchment-300 shadow-subtle space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-moss/10 text-moss-light flex items-center justify-center">
                <TreePine className="w-6 h-6" />
              </div>
              <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950">
                Strict Weight Limits
              </h3>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                We enforce strict porter weight limits (maximum 15kg per porter) and practice Leave No Trace principles to keep trails pristine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Trekking Itineraries */}
      <section className="py-20 sm:py-28 bg-parchment-100 border-b border-parchment-300">
        <div className="editorial-container">
          <SectionHeading
            tag="Curated Routes"
            nepaliTag="पदयात्रा कार्यक्रमहरू"
            title="Handcrafted Mountain Itineraries"
            description="Browse our gentle, scenic walking routes through the Himalayas."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {trekkingExperiences.slice(0, 2).map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <CTASection
        title="Ready to Walk Quiet Himalayan Trails?"
        subtitle="Connect with Sakar to discuss your fitness level, travel dates, and ideal trekking route."
        primaryButtonText="Inquire About Mountain Treks"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore All Packages"
        secondaryButtonHref="/packages"
      />
    </div>
  );
}
