'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Sun, Volume2, Wind, Shield } from 'lucide-react';
import Lightbox from '@/components/gallery/Lightbox';
import { GalleryPhoto } from '@/types';

const SPIRITUAL_PHOTOS: GalleryPhoto[] = [
  {
    id: 'sp-1',
    title: 'Sacred Swayambhunath Prayer Flags at Dawn',
    nepaliTitle: 'स्वयम्भूनाथ र लुङ्दार',
    category: 'spiritual',
    categoryLabel: 'Spiritual Sanctuaries',
    location: 'Kathmandu Valley',
    image: '/images/spiritual/buddhist-stupa.jpg',
    alt: 'Buddhist stupa with fluttering prayer flags in early morning mist',
    orientation: 'portrait',
    caption: 'Fluttering prayer flags carrying mantras of compassion into the valley air.',
  },
  {
    id: 'sp-2',
    title: 'Butter Lamp Offerings in Hillside Gompa',
    nepaliTitle: 'गुम्बा र दियो',
    category: 'spiritual',
    categoryLabel: 'Spiritual Sanctuaries',
    location: 'Helambu / Pharping Monastery',
    image: '/images/spiritual/monastery-interior.jpg',
    alt: 'Golden butter lamps glowing before ancient Buddhist wall frescoes',
    orientation: 'portrait',
    caption: 'Hundred flickering butter lamps offered during morning monastery puja.',
  },
  {
    id: 'sp-3',
    title: 'Tibetan Singing Bowl Sound Therapy & Meditation',
    nepaliTitle: 'ध्वनि ध्यान र गायन कचौरा',
    category: 'spiritual',
    categoryLabel: 'Spiritual Sanctuaries',
    location: 'Boudhanath Sanctuary',
    image: '/images/spiritual/meditation-session.jpg',
    alt: 'Seven-metal singing bowls arranged for sound healing and deep relaxation',
    orientation: 'landscape',
    caption: 'Harmonic bronze resonance restoring deep physical and emotional calm.',
  },
];

export default function SpiritualWellness() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="spiritual" className="py-24 sm:py-32 bg-himalaya-950 text-white relative overflow-hidden">
      {/* Gentle ambient glows */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />

      <div className="editorial-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 text-saffron-light text-xs font-semibold uppercase tracking-wider mb-4 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Sanctuaries & Inner Calm</span>
          </div>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Stillness in the Shadow <br className="hidden sm:inline" />
            <span className="italic font-display-serif font-normal text-saffron-light">
              of the Himalayas
            </span>
          </h2>
          <p className="text-sm sm:text-base text-parchment-300 font-light mt-4 leading-relaxed">
            For thousands of years, these high valleys have served as a haven for mindfulness, sound meditation, and contemplation. We guide you into peaceful spaces with humility, quiet presence, and cultural respect.
          </p>
        </div>

        {/* 3 Visual Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Card 1 */}
          <div
            onClick={() => setLightboxIndex(0)}
            className="group rounded-2xl overflow-hidden glass-card-dark border border-white/15 p-4 cursor-pointer hover:border-saffron/40 transition-all transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-himalaya-900">
              <Image
                src={SPIRITUAL_PHOTOS[0].image}
                alt={SPIRITUAL_PHOTOS[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-saffron-light">
                Sacred Stupas
              </span>
              <h3 className="font-editorial-serif text-lg font-bold text-white">
                Dawn Kora & Prayer Wheels
              </h3>
              <p className="text-xs text-parchment-300 font-light leading-relaxed">
                Join local devotees circumambulating ancient stupas at sunrise, listening to soft mantras carried on the morning breeze.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => setLightboxIndex(1)}
            className="group rounded-2xl overflow-hidden glass-card-dark border border-white/15 p-4 cursor-pointer hover:border-saffron/40 transition-all transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-himalaya-900">
              <Image
                src={SPIRITUAL_PHOTOS[1].image}
                alt={SPIRITUAL_PHOTOS[1].alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-saffron-light">
                Monastic Life
              </span>
              <h3 className="font-editorial-serif text-lg font-bold text-white">
                Monastery Puja & Butter Lamps
              </h3>
              <p className="text-xs text-parchment-300 font-light leading-relaxed">
                Sit in the quiet gallery of cliffside gompas during morning chant sessions, enveloped in the aroma of juniper and clarified butter.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => setLightboxIndex(2)}
            className="group rounded-2xl overflow-hidden glass-card-dark border border-white/15 p-4 cursor-pointer hover:border-saffron/40 transition-all transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-himalaya-900">
              <Image
                src={SPIRITUAL_PHOTOS[2].image}
                alt={SPIRITUAL_PHOTOS[2].alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-saffron-light">
                Sound Healing
              </span>
              <h3 className="font-editorial-serif text-lg font-bold text-white">
                Tibetan Singing Bowl Therapy
              </h3>
              <p className="text-xs text-parchment-300 font-light leading-relaxed">
                Experience restorative sound immersion with 7-metal hand-hammered bowls, scientifically balancing the nervous system.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href="/experiences/spiritual-immersion-singing-bowls"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-saffron hover:bg-saffron-dark text-himalaya-950 font-bold text-sm shadow-warm transition-all"
          >
            <span>Discover Spiritual & Sound Journeys</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Lightbox
        photos={SPIRITUAL_PHOTOS}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </section>
  );
}
