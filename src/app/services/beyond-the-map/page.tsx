import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Sparkles,
  Clock,
  Users,
  Check,
  ArrowRight,
  ShieldCheck,
  Eye,
  Heart,
  Camera,
  Layers,
  Award,
  Calendar,
  Coffee,
  Palette,
  Flame,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import SectionHeading from '@/components/common/SectionHeading';
import CTASection from '@/components/common/CTASection';

export const metadata: Metadata = {
  title: 'Go Beyond the Map | Authentic Exploration with Sakar',
  description:
    'Step past the grand facades into the secret residential bahals of old Kathmandu, untold histories of Patan and Bhaktapur, master artisan guilds, and the sacred geometry of the Valley.',
};

interface BeyondJourney {
  id: string;
  chapter: string;
  title: string;
  tagline: string;
  location: string;
  duration: string;
  groupSize: string;
  image: string;
  imageAlt: string;
  promise: string;
  experience: string;
  highlights: string[];
  ctaSubject: string;
  slug: string;
}

const BEYOND_JOURNEYS: BeyondJourney[] = [
  {
    id: 'living-courtyards',
    chapter: 'Chapter 01',
    title: 'The Living Courtyards: Beyond the Temples of Kathmandu',
    tagline: 'Hidden Bahals • Old Spice Alleys • Morning Community Rhythms',
    location: 'Old Kathmandu (Ason & Indra Chowk)',
    duration: 'Full Day (Unhurried)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/images/beyond-the-map/living-courtyards.jpg',
    imageAlt: 'Hidden Newari residential courtyard bahal with stone stupa, morning chiya tea and warm sunlight in Kathmandu',
    promise:
      'Most visitors stop at the grand facades of Kathmandu Durbar Square. We walk past them, slipping into the hidden bahals (residential courtyards) where the true pulse of the city has beaten for centuries.',
    experience:
      'This is a sensory journey through the labyrinth of old Kathmandu. We navigate the spice-scented alleys of Ason and Indra Chowk, stepping into secret courtyards to discover hidden stupas built by Silk Road merchants. You will sit with locals over a glass of strong, sweet chiya, observe morning community rituals, and witness how ancient heritage is not just preserved in museums, but actively lived in every day by the Kathmandu Valley’s original inhabitants.',
    highlights: [
      'Slipping past tourist crowds through secret low-ceilinged passageways into serene residential bahals',
      'Discovering centuries-old chaityas and private family shrines founded by ancient Silk Road merchants',
      'Sitting with neighborhood elders over freshly poured sweet, cardamom-spiced chiya tea',
      'Witnessing authentic morning devotion: butter lamps, vermilion offerings, and courtyard community life',
    ],
    ctaSubject: 'The Living Courtyards: Beyond the Temples of Kathmandu',
    slug: 'living-courtyards-kathmandu',
  },
  {
    id: 'echoes-in-stone',
    chapter: 'Chapter 02',
    title: 'Echoes in Stone: The Untold Histories of Patan and Bhaktapur',
    tagline: 'Malla Dynasties • Stone Hitis • Architectural Arms Race',
    location: 'Patan (Lalitpur) & Medieval Bhaktapur',
    duration: 'Full Day (Unhurried)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/images/beyond-the-map/echoes-in-stone.jpg',
    imageAlt: 'Ancient stone Makara water spout hiti and soaring medieval pagoda temples in Patan and Bhaktapur',
    promise:
      'History isn\'t just dates and dynasties; it is the rivalry, romance, and tragedy carved into the brick and timber of the Valley\'s greatest medieval kingdoms.',
    experience:
      'We bypass the standard historical summaries to explore the deep narratives of Patan (The City of Fine Arts) and Bhaktapur (The City of Devotees). You will trace the legendary rivalries between the Malla kings that fueled an architectural arms race. We will walk the intricate networks of ancient stone water conduits (hitis), explore the shadowed corners where royal secrets were kept, and decode the subtle mythologies carved into the wooden struts of towering pagoda temples.',
    highlights: [
      'Tracing the intense artistic rivalry between Malla rulers that birthed competing architectural wonders',
      'Exploring subterranean hydraulic engineering: ancient stone hitis with carved dragon/makara spouts',
      'Uncovering shadowed palace corridors, royal romances, political intrigues, and historic tragedies',
      'Decoding esoteric mythologies, deity iconography, and erotic symbolism carved into pagoda roof struts',
    ],
    ctaSubject: 'Echoes in Stone: The Untold Histories of Patan and Bhaktapur',
    slug: 'echoes-in-stone-patan-bhaktapur',
  },
  {
    id: 'artisan-path',
    chapter: 'Chapter 03',
    title: 'The Artisan’s Path: A Heritage Deep-Dive',
    tagline: 'Multi-Generational Guilds • Lost-Wax Casting • Living Meditation',
    location: 'Patan & Bhaktapur Artisan Quarters',
    duration: 'Full Day (Unhurried)',
    groupSize: 'Private / 1–4 Travelers',
    image: '/images/beyond-the-map/artisan-path.jpg',
    imageAlt: 'Master Newari artisan hand-carving sacred wooden deity statue with traditional chisels in Patan atelier',
    promise:
      'We don\'t just look at the art; we sit with the masters whose families have been creating it for generations.',
    experience:
      'This tour goes behind closed doors into the workshops of Patan and Bhaktapur. You will witness the hypnotic, meticulous process of Thangka painting, the intense heat of traditional lost-wax bronze casting, and the precise chiseling of Newari woodcarvers. You will learn how these crafts are not merely decorative, but deeply spiritual acts of meditation. By the end of the day, a statue or a painting will no longer be a souvenir, but a sacred text you know how to read.',
    highlights: [
      'Exclusive behind-closed-doors entry into private family ateliers closed to regular tourists',
      'Witnessing the intense heat, clay molds, and glowing metal of 1,000-year-old lost-wax bronze casting',
      'Observing master Thangka artists grind natural lapis lazuli and gold leaf into meditative cosmic scrolls',
      'Hands-on chisel demonstrations with master Newari woodcarvers transforming raw timber into deities',
      'Learning to read sacred iconography, mudras, and symbolic attributes as living scripture',
    ],
    ctaSubject: 'The Artisan’s Path: A Heritage Deep-Dive',
    slug: 'artisans-path-heritage-deep-dive',
  },
  {
    id: 'sacred-geometry',
    chapter: 'Chapter 04',
    title: 'Sacred Geometry: The Architecture and Spirit of the Valley',
    tagline: 'Cosmic Mandala • Sacred Mathematics • Earth-Resilient Shrines',
    location: 'Kathmandu, Patan, Bhaktapur & Changu Narayan',
    duration: 'Full Day (Unhurried)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/images/beyond-the-map/sacred-geometry.jpg',
    imageAlt: 'Symmetrical sacred pagoda temple complex in Kathmandu Valley aligned with cosmic mandala geometry',
    promise:
      'The Kathmandu Valley was not built by accident. It was designed as a living, breathing mandala.',
    experience:
      'For the analytically and spiritually curious, this tour decodes the blueprint of the Valley. We explore how Hindu and Buddhist cosmologies dictated the placement of every temple, courtyard, and city gate. You will learn the mathematics behind the multi-tiered pagodas, the spiritual engineering required to build shrines that withstand centuries of earthquakes, and how the physical layout of the cities was designed to guide the soul toward enlightenment.',
    highlights: [
      'Decoding the cosmological blueprint: how the valley was mapped as a 3D sacred living mandala',
      'Understanding the sacred mathematics, golden ratios, and proportions of multi-tiered pagodas',
      'Uncovering ancient seismic engineering: interlocking timber joints that survived catastrophic earthquakes',
      'Discovering how city gates, water springs, and cardinal shrines align with celestial cycles',
      'Experiencing how sacred architecture was engineered to guide human consciousness toward stillness',
    ],
    ctaSubject: 'Sacred Geometry: The Architecture and Spirit of the Valley',
    slug: 'sacred-geometry-architecture-valley',
  },
];

export default function BeyondTheMapPage() {
  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge="Pillar 01 • Guided Exploration"
        nepaliTitle="नक्साभन्दा परको यात्रा"
        title="Go Beyond the Map"
        subtitle="Step past the grand facades and crowded tourist corridors into the living courtyards, medieval stone mysteries, master artisan guilds, and sacred geometry of the Kathmandu Valley."
        backgroundImage="/images/beyond-the-map/sacred-geometry.jpg"
        breadcrumbs={[
          { label: 'Experiences', href: '/experiences' },
          { label: 'Go Beyond the Map' },
        ]}
      />

      {/* 2. The Beyond the Map Philosophy & Manifesto */}
      <section className="py-16 sm:py-24 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Our Core Travel Philosophy</span>
              </span>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                Not Just Visiting Places — Stepping Inside the Living Soul of Nepal
              </h2>

              <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed">
                Most visitors see Nepal through the hurried frame of a tour bus window or the crowded ticket gates of main squares. <strong className="font-semibold text-himalaya-900">&ldquo;Go Beyond the Map&rdquo;</strong> is our personal pledge to walk past the superficial facades into the real, beating pulse of our homeland.
              </p>

              <p className="text-sm sm:text-base text-himalaya-600 font-light leading-relaxed">
                Guided by Sakar, you enter quiet residential bahals where life has continued uninterrupted for centuries, sit beside master artisans in private ateliers, discover subterranean water hitis holding medieval royal secrets, and decode the sacred geometry that transformed this whole valley into a living cosmological mandala.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-parchment-200">
                {[
                  'Hidden residential bahals away from mass tourism',
                  'Direct dialogue with multi-generational master guilds',
                  'Unhurried, conversational pacing tailored to your curiosity',
                  'Ethical contribution directly supporting local community heritage',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-himalaya-800">
                    <div className="w-5 h-5 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-floating border border-parchment-300 aspect-[4/5] bg-himalaya-900 group">
                <Image
                  src="/images/beyond-the-map/living-courtyards.jpg"
                  alt="Ancient Kathmandu residential courtyard"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/85 via-himalaya-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                  <p className="font-display-serif italic text-lg sm:text-xl leading-snug">
                    &ldquo;When you leave the noisy main street through a tiny brick doorway, the city suddenly whispers eight centuries of living peace.&rdquo;
                  </p>
                  <p className="text-xs text-saffron-light mt-2 font-semibold uppercase tracking-wider font-mono">
                    — Sakar, Tour Director
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Curated Chapters */}
      <section className="py-20 sm:py-28 bg-parchment-100">
        <div className="editorial-container space-y-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Four Distinct Journeys</span>
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight">
              The Beyond the Map Series
            </h2>
            <p className="text-sm sm:text-base text-himalaya-600 font-light leading-relaxed">
              Four deeply researched, sensorially rich journeys curated for travelers who crave authentic depth, true human connection, and architectural wonder.
            </p>
          </div>

          {/* Journeys List */}
          <div className="space-y-24 sm:space-y-32">
            {BEYOND_JOURNEYS.map((journey, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={journey.id}
                  id={journey.id}
                  className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-parchment-300 shadow-sm hover:shadow-floating transition-shadow"
                >
                  {/* Photo Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] bg-himalaya-900 border border-parchment-200 shadow-warm group">
                      <Image
                        src={journey.image}
                        alt={journey.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/60 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-himalaya-950/80 backdrop-blur-sm text-parchment-100 text-[11px] font-bold tracking-wider uppercase">
                          {journey.chapter}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-xs text-parchment-200 font-mono flex items-center gap-1.5 drop-shadow">
                          <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0" />
                          <span>{journey.location}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-terracotta uppercase tracking-wider">
                          {journey.tagline}
                        </span>
                      </div>
                      <h3 className="font-editorial-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-himalaya-950 leading-tight">
                        {journey.title}
                      </h3>
                    </div>

                    {/* The "Beyond the Map" Promise Card */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-terracotta/5 border border-terracotta/15 space-y-2">
                      <div className="flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-terracotta" />
                        <span>The &ldquo;Beyond the Map&rdquo; Promise</span>
                      </div>
                      <p className="font-editorial-serif italic text-sm sm:text-base text-himalaya-900 leading-relaxed">
                        &ldquo;{journey.promise}&rdquo;
                      </p>
                    </div>

                    {/* The Experience Description */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-himalaya-700">
                        The Experience
                      </h4>
                      <p className="text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
                        {journey.experience}
                      </p>
                    </div>

                    {/* Curated Highlights */}
                    <div className="space-y-2 pt-2 border-t border-parchment-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-himalaya-700">
                        Curated Sensory Moments
                      </h4>
                      <div className="space-y-2">
                        {journey.highlights.map((point, hIdx) => (
                          <div key={hIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-himalaya-800">
                            <div className="w-4 h-4 rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                            <span className="font-light">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/contact?subject=${encodeURIComponent(journey.ctaSubject)}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-light text-white text-xs font-bold uppercase tracking-wider shadow-warm transition-all"
                      >
                        <span>Inquire About This Tour</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/experiences/${journey.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-parchment-200 hover:bg-parchment-300 text-himalaya-900 text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-himalaya-700" />
                        <span>View Itinerary Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Host Note from Sakar */}
      <section className="py-20 sm:py-24 bg-himalaya-950 text-white relative overflow-hidden">
        <div className="editorial-container relative z-10">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-terracotta/40 shadow-2xl">
                <Image
                  src="/explore-with-sakar/images/sakar/sakar-portrait.jpg"
                  alt="Sakar, Tour Director"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-5 text-center md:text-left">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/20 text-terracotta-light text-xs font-semibold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5" />
                <span>Your Host & Cultural Translator</span>
              </span>

              <h3 className="font-editorial-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                &ldquo;Nepal Is Best Experienced Hand-in-Hand, Not Through a Turnstile.&rdquo;
              </h3>

              <p className="text-sm sm:text-base text-parchment-300 font-light leading-relaxed">
                When you explore with me, there are no scripted spiels or rush to catch the next tourist bus. If a bronze caster invites us into his courtyard for freshly made chiya, we sit down, take off our shoes, and listen. That unscripted human warmth is what makes Nepal unforgettable.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link
                  href="https://wa.me/9779840482692?text=Namaste%20Sakar,%20I%20am%20interested%20in%20the%20Go%20Beyond%20the%20Map%20experiences."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Chat Direct on WhatsApp</span>
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-parchment-100 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <span>Read Sakar&apos;s Story</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Comprehensive CTA Section */}
      <CTASection
        title="Ready to Step Beyond the Map?"
        subtitle="Whether you have an afternoon in Kathmandu or wish to spend a week decoding medieval kingdoms and master ateliers, we will tailor the journey completely around your pace and curiosity."
        primaryButtonText="Design Your Beyond the Map Journey"
        primaryButtonHref="/contact?subject=Go%20Beyond%20the%20Map%20Custom%20Journey"
      />
    </div>
  );
}
