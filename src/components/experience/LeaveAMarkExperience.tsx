import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  ShieldCheck,
  Trees,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Check,
  Users,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import CTASection from '@/components/common/CTASection';
import { getLiveExperiences } from '@/lib/cms';
import ExperienceCard from '@/components/common/ExperienceCard';

export default function LeaveAMarkExperience() {
  const allExperiences = getLiveExperiences(false);
  const leaveAMarkExperiences = allExperiences.filter(
    (e) =>
      e.category === 'leave-a-mark' ||
      e.category === 'responsible' ||
      e.slug.includes('community') ||
      e.slug.includes('reforestation') ||
      e.slug.includes('tharu')
  ).slice(0, 3);

  const IMPACT_PILLARS = [
    {
      icon: Users,
      title: 'Community Cooperatives & Fair Economy',
      description:
        '100% of village hosting and guiding fees stay directly with local families, women-led weaving guilds, and community development funds without middleman leakage.',
    },
    {
      icon: ShieldCheck,
      title: 'Indigenous Wildlife Stewardship',
      description:
        'We partner directly with Tharu and buffer zone naturalists in Chitwan and Bardia, directly financing community anti-poaching patrols and humane wildlife corridors.',
    },
    {
      icon: GraduationCap,
      title: 'Rural Education & Solar Learning',
      description:
        'Providing books, solar power packs, and learning equipment to isolated mountain primary schools where formal state funding rarely penetrates.',
    },
    {
      icon: Trees,
      title: 'Trail Care & Native Reforestation',
      description:
        'Active participation in native oak and rhododendron reforestation projects along eroded Himalayan ridges, upholding strict Leave No Trace mountain ethics.',
    },
  ];

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Hero Section */}
      <PageHero
        badge="Independent Experience Package"
        nepaliTitle="सकारात्मक प्रभाव र दिगो संरक्षण"
        title="Leave a Mark"
        subtitle="True travel is not just about what you take away in memories and photos—it is about the dignity, nourishment, and regenerative footprint you leave behind in the communities that open their hearts to you."
        backgroundImage="/explore-with-sakar/images/trails/river-gorge.jpg"
        breadcrumbs={[
          { label: 'Experiences', href: '/experience' },
          { label: 'Leave a Mark' },
        ]}
      />

      {/* 2. Philosophy & Mission */}
      <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5" />
                <span>Regenerative Nepal Travel</span>
              </span>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                Not Just Minimizing Harm — Actively Regenerating Communities
              </h2>

              <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed">
                Ordinary sustainable tourism talks about &ldquo;reducing footprint.&rdquo; We believe travel should go further: it must be genuinely regenerative. Every journey under the <em>Leave a Mark</em> pillar directly enriches village livelihoods, protects fragile ecosystems, and supports indigenous cultural survival.
              </p>

              <p className="text-sm sm:text-base text-himalaya-600 font-light leading-relaxed">
                Rather than superficial, performative volunteering, we listen to what village elders and local teachers ask for. We fund ongoing solar projects, sponsor educational supplies, and support women-led cooperatives that allow families to flourish without having to migrate abroad for work.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-parchment-200">
                {[
                  'Direct economic reinvestment in remote mountain villages',
                  'Strict ethical wildlife protocols with zero animal exploitation',
                  'Support for indigenous Tharu, Gurung & Tamang heritage',
                  'Fair living wages and comprehensive insurance for mountain crews',
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
                  src="/explore-with-sakar/images/homestays/village-storyteller.jpg"
                  alt="Community elder and host in Nepal village"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                  <p className="font-display-serif italic text-lg">
                    &ldquo;When a traveler respects our home and supports our children&rsquo;s future, their visit becomes a blessing that outlives the season.&rdquo;
                  </p>
                  <p className="text-xs text-saffron-light mt-2 font-semibold uppercase tracking-wider">
                    — Tharu Community Elder, Buffer Zone Council
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Impact Pillars */}
      <section className="py-20 sm:py-28 bg-sand border-b border-parchment-300">
        <div className="editorial-container">
          <SectionHeading
            tag="Tangible Action"
            nepaliTag="हाम्रो प्रत्यक्ष योगदान"
            title="How Your Journey Creates Real Impact"
            description="Clear, measurable initiatives built into every Leave a Mark experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {IMPACT_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-2xl border border-parchment-300 shadow-warm flex flex-col justify-between hover:shadow-floating transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center group-hover:bg-terracotta group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-editorial-serif text-lg font-bold text-himalaya-950">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-himalaya-600 font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Curated Leave a Mark Itineraries */}
      {leaveAMarkExperiences.length > 0 && (
        <section className="py-20 sm:py-28 bg-white border-b border-parchment-300">
          <div className="editorial-container">
            <SectionHeading
              tag="Signature Itineraries"
              nepaliTag="विशेष यात्राहरू"
              title="Curated Leave a Mark Journeys"
              description="Experiences specifically designed to balance profound personal discovery with community stewardship."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {leaveAMarkExperiences.map((exp) => (
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

      {/* 5. Sakar's Note */}
      <section className="py-20 sm:py-28 bg-himalaya-950 text-white relative overflow-hidden">
        <div className="editorial-container relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-7 h-7" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-saffron">
            Host Reflection from Sakar
          </span>

          <h2 className="font-editorial-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            &ldquo;We don&rsquo;t treat Nepal as a postcard to consume. We treat it as our home to protect, celebrate, and nourish together.&rdquo;
          </h2>

          <p className="text-sm sm:text-base text-parchment-300 font-light max-w-2xl mx-auto leading-relaxed">
            When you travel with me under Leave a Mark, we sit with teachers, talk with park rangers, and listen to the real challenges of mountain life. You will return home knowing that your presence made a genuine, positive difference in the lives of real people.
          </p>

          <div className="pt-4">
            <Link
              href="/contact?subject=Leave%20a%20Mark%20Journey%20Inquiry"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-terracotta hover:bg-terracotta-light text-white text-xs font-bold uppercase tracking-widest transition-all shadow-warm"
            >
              <span>Plan a Meaningful Journey With Sakar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. General CTA */}
      <CTASection
        title="Ready to Leave a Mark in Nepal?"
        subtitle="Let us craft a journey tailored to your interests, schedule, and the causes that matter most to you."
        primaryButtonText="Design Your Private Journey"
        primaryButtonHref="/experience/custom-private-journeys"
        secondaryButtonText="Browse All Experiences"
        secondaryButtonHref="/experience"
      />
    </div>
  );
}
