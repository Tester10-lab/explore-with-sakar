'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
    image: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
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
    image: '/explore-with-sakar/images/spiritual/monastery-interior.jpg',
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
    image: '/explore-with-sakar/images/spiritual/meditation-session.jpg',
    alt: 'Seven-metal singing bowls arranged for sound healing and deep relaxation',
    orientation: 'landscape',
    caption: 'Harmonic bronze resonance restoring deep physical and emotional calm.',
  },
];

export default function SpiritualWellness() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="spiritual" className="py-24 sm:py-32 bg-himalaya-900 film-grain text-white relative">
      <div className="editorial-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-saffron-light mb-4 block">
              Sacred Sanctuaries
            </span>
            <h2 className="font-editorial-serif text-editorial-title font-light tracking-tight leading-[1.1] mb-6">
              Stillness in the Shadow <br className="hidden sm:inline" />
              <span className="italic font-display-serif text-parchment-300">
                of the Himalayas
              </span>
            </h2>
            <p className="text-parchment-200 text-sm font-light max-w-xl mx-auto">
              For thousands of years, these high valleys have served as a haven for mindfulness, sound meditation, and contemplation. We guide you into peaceful spaces with humility, quiet presence, and cultural respect.
            </p>
          </motion.div>
        </div>

        {/* 3 Visual Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-24">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setLightboxIndex(0)}
            className="group cursor-pointer flex flex-col"
          >
            <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-himalaya-950">
              <Image
                src={SPIRITUAL_PHOTOS[0].image}
                alt={SPIRITUAL_PHOTOS[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-himalaya-950/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="space-y-3 flex-1">
              <span className="text-xs uppercase font-medium tracking-widest text-saffron-light">
                Sacred Stupas
              </span>
              <h3 className="font-editorial-serif text-2xl font-light text-white group-hover:text-parchment-200 transition-colors">
                Dawn Kora & Prayer Wheels
              </h3>
              <p className="text-sm text-parchment-300 font-light leading-relaxed">
                Join local devotees circumambulating ancient stupas at sunrise, listening to soft mantras carried on the morning breeze.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setLightboxIndex(1)}
            className="group cursor-pointer flex flex-col pt-12"
          >
            <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-himalaya-950">
              <Image
                src={SPIRITUAL_PHOTOS[1].image}
                alt={SPIRITUAL_PHOTOS[1].alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
               <div className="absolute inset-0 bg-himalaya-950/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="space-y-3 flex-1">
              <span className="text-xs uppercase font-medium tracking-widest text-saffron-light">
                Monastic Life
              </span>
              <h3 className="font-editorial-serif text-2xl font-light text-white group-hover:text-parchment-200 transition-colors">
                Monastery Puja & Butter Lamps
              </h3>
              <p className="text-sm text-parchment-300 font-light leading-relaxed">
                Sit in the quiet gallery of cliffside gompas during morning chant sessions, enveloped in the aroma of juniper and clarified butter.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setLightboxIndex(2)}
            className="group cursor-pointer flex flex-col"
          >
            <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-himalaya-950">
              <Image
                src={SPIRITUAL_PHOTOS[2].image}
                alt={SPIRITUAL_PHOTOS[2].alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
               <div className="absolute inset-0 bg-himalaya-950/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="space-y-3 flex-1">
              <span className="text-xs uppercase font-medium tracking-widest text-saffron-light">
                Sound Healing
              </span>
              <h3 className="font-editorial-serif text-2xl font-light text-white group-hover:text-parchment-200 transition-colors">
                Tibetan Singing Bowl Therapy
              </h3>
              <p className="text-sm text-parchment-300 font-light leading-relaxed">
                Experience restorative sound immersion with 7-metal hand-hammered bowls, scientifically balancing the nervous system.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href="/experiences/spiritual-immersion-singing-bowls"
            className="inline-flex items-center justify-center px-0 py-2 border-b border-white/30 text-xs tracking-widest uppercase font-medium text-white hover:text-saffron-light hover:border-saffron-light transition-all"
          >
            <span>Discover Spiritual & Sound Journeys</span>
            <ArrowRight className="w-4 h-4 ml-3" />
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
