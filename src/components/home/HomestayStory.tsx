'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Lightbox from '@/components/gallery/Lightbox';
import { GalleryPhoto } from '@/types';

const HOMESTAY_GALLERY: GalleryPhoto[] = [
  {
    id: 'hs-1',
    title: 'Gathering Around the Kitchen Hearth',
    nepaliTitle: 'गाउँले भान्सा र आतिथ्य',
    category: 'homestay',
    categoryLabel: 'Village Homestay',
    location: 'Ghandruk Heritage Village',
    image: '/explore-with-sakar/images/homestays/village-meal.jpg',
    alt: 'Local family and travelers sharing a meal around traditional woodfire hearth',
    orientation: 'landscape',
    caption: 'Sitting together by the wood stove sharing hot dal bhat and village laughter.',
  },
  {
    id: 'hs-2',
    title: 'Traditional Fieldstone Village House',
    nepaliTitle: 'परम्परागत ढुंगे घर',
    category: 'homestay',
    categoryLabel: 'Village Homestay',
    location: 'Bandipur Foothills',
    image: '/explore-with-sakar/images/homestays/stone-village-house.jpg',
    alt: 'Traditional slate-roof stone farmhouse overlooking green mountain terraces',
    orientation: 'portrait',
    caption: 'Centuries of mountain resilience built from local stone and timber.',
  },
  {
    id: 'hs-3',
    title: 'Morning Mountain Tea on the Balcony',
    nepaliTitle: 'बिहानीको चिया',
    category: 'homestay',
    categoryLabel: 'Village Homestay',
    location: 'Helambu Valley',
    image: '/explore-with-sakar/images/homestays/morning-tea-homestay.jpg',
    alt: 'Hot cups of tea on a wooden balcony overlooking foggy terraced hills',
    orientation: 'landscape',
    caption: 'Freshly harvested ginger tea as the sunrise mist clears from the valley.',
  },
];

export default function HomestayStory() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="homestays" className="py-32 bg-parchment-100 film-grain relative">
      <div className="editorial-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-12"
          >
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-terracotta mb-4 block">
                The Homestay Experience
              </span>
              <h2 className="font-editorial-serif text-editorial-title font-light text-himalaya-950 tracking-tight leading-[1.1]">
                Stay with Nepal.<br/>
                <span className="italic text-himalaya-700">Not just in Nepal.</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-sm text-himalaya-700 font-light leading-relaxed max-w-md">
              <p>
                In our mountain communities, hospitality is not an industry — it is an ancient sacred trust known as <strong>Atithi Devo Bhava</strong>.
              </p>
              <p>
                Step away from generic hotels. Step through wooden doorways into real homes, where conversations over woodfire tea become the heart of your journey. You wake to birdsong across the terraces and share home-cooked meals by the hearth.
              </p>
            </div>

            <Link
              href="/experiences/village-homestay-community-immersion"
              className="inline-flex items-center justify-center px-0 py-2 border-b border-himalaya-900 text-xs tracking-widest uppercase font-medium text-himalaya-950 hover:text-terracotta hover:border-terracotta transition-all"
            >
              <span>Experience Local Village Life</span>
              <ArrowRight className="w-4 h-4 ml-3" />
            </Link>
          </motion.div>

          {/* Right Asymmetrical Collage */}
          <div className="lg:col-span-7 relative min-h-[600px]">
            {/* Main Polaroid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 w-[65%] z-20 cursor-pointer"
              onClick={() => setLightboxIndex(0)}
            >
              <div className="polaroid-frame bg-white">
                <div className="relative aspect-[4/5] bg-himalaya-200">
                  <Image
                    src={HOMESTAY_GALLERY[0].image}
                    alt={HOMESTAY_GALLERY[0].alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <span className="font-editorial-serif text-sm italic text-himalaya-900">
                    Gathering Around the Kitchen Hearth
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Secondary Polaroid */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-24 w-[50%] z-10 cursor-pointer"
              onClick={() => setLightboxIndex(1)}
            >
               <div className="polaroid-frame rotate-right bg-white">
                <div className="relative aspect-square bg-himalaya-200">
                  <Image
                    src={HOMESTAY_GALLERY[1].image}
                    alt={HOMESTAY_GALLERY[1].alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Tertiary Image */}
             <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-12 bottom-[-100px] w-[55%] z-30 cursor-pointer shadow-editorial"
              onClick={() => setLightboxIndex(2)}
            >
               <div className="relative aspect-[16/9] bg-himalaya-200">
                  <Image
                    src={HOMESTAY_GALLERY[2].image}
                    alt={HOMESTAY_GALLERY[2].alt}
                    fill
                    className="object-cover"
                  />
                </div>
            </motion.div>

          </div>
        </div>
      </div>

      <Lightbox
        photos={HOMESTAY_GALLERY}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </section>
  );
}

