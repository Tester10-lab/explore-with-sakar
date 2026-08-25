'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Heart, Utensils, Home, Users, Maximize2 } from 'lucide-react';
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
    image: '/images/homestays/village-meal.jpg',
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
    image: '/images/homestays/stone-village-house.jpg',
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
    image: '/images/homestays/morning-tea-homestay.jpg',
    alt: 'Hot cups of tea on a wooden balcony overlooking foggy terraced hills',
    orientation: 'landscape',
    caption: 'Freshly harvested ginger tea as the sunrise mist clears from the valley.',
  },
  {
    id: 'hs-4',
    title: 'Village Elder & Oral Folklore Keeper',
    nepaliTitle: 'गाउँका ज्येष्ठ नागरिक',
    category: 'homestay',
    categoryLabel: 'Village Homestay',
    location: 'Tamang Ridge',
    image: '/images/homestays/village-storyteller.jpg',
    alt: 'Portrait of Nepali village elder in traditional clothes',
    orientation: 'portrait',
    caption: 'Listening to centuries of oral legends told around the evening fire.',
  },
];

export default function HomestayStory() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="homestays" className="py-20 sm:py-28 bg-sand/80 border-t border-parchment-300 relative overflow-hidden">
      <div className="editorial-container">
        {/* Section Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-900/10 text-moss-dark text-xs font-semibold uppercase tracking-wider mb-3">
              <Heart className="w-3.5 h-3.5 text-terracotta" />
              <span>Living Village Hospitality</span>
            </div>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
              Stay With Nepal. <br className="hidden sm:inline" />
              <span className="italic font-display-serif font-normal text-terracotta">
                Not Just In Nepal.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-himalaya-700 font-light max-w-md">
            Step away from generic hotels. Step through wooden doorways into real homes, where conversations over woodfire tea become the heart of your journey.
          </p>
        </div>

        {/* Editorial Layout: Large Immersive Photo + Narrative + Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Large Visual */}
          <div className="lg:col-span-7 space-y-4">
            <div
              onClick={() => setLightboxIndex(0)}
              className="relative aspect-[16/11] rounded-3xl overflow-hidden cursor-pointer group shadow-editorial bg-himalaya-900"
            >
              <Image
                src={HOMESTAY_GALLERY[0].image}
                alt={HOMESTAY_GALLERY[0].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-transparent to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-saffron-light">
                  Signature Living Experience
                </span>
                <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  The Warmth of the Village Hearth
                </h3>
                <p className="text-xs sm:text-sm text-parchment-200 font-light mt-1 max-w-xl">
                  &ldquo;When you sit by our wood fire and share our rice, you are no longer a guest. You are family.&rdquo;
                </p>
              </div>
            </div>

            {/* Sub-grid of 3 Supporting Photos */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {HOMESTAY_GALLERY.slice(1, 4).map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx + 1)}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-subtle bg-sand"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-himalaya-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Narrative & Pillars Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
              <p>
                In our mountain communities, hospitality is not an industry — it is an ancient sacred trust known as <strong className="font-medium text-himalaya-950">Atithi Devo Bhava</strong>.
              </p>
              <p>
                When you stay in a traditional homestay with Sakar, you are welcomed into private slate-roof homes. You wake to birdsong across the terraces, learn how to grind fresh mountain spices on stone, share home-cooked meals by the hearth, and listen to elders recount oral folklore.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-parchment-50 border border-parchment-300 flex items-start space-x-3">
                <Utensils className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-himalaya-950">Farm-to-Hearth Cooking</h4>
                  <p className="text-xs text-himalaya-600 font-light mt-0.5">
                    Zero-kilometer organic greens plucked from the terrace minutes before dinner.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-parchment-50 border border-parchment-300 flex items-start space-x-3">
                <Users className="w-5 h-5 text-moss-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-himalaya-950">Genuine Human Conversations</h4>
                  <p className="text-xs text-himalaya-600 font-light mt-0.5">
                    Sakar acts as your cultural bridge, translating nuances, laughter, and wisdom.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-parchment-50 border border-parchment-300 flex items-start space-x-3">
                <Home className="w-5 h-5 text-saffron-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-himalaya-950">100% Direct Family Income</h4>
                  <p className="text-xs text-himalaya-600 font-light mt-0.5">
                    Your lodging directly empowers village mothers, children&apos;s education, and solar water.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/experiences/village-homestay-community-immersion"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-sm font-bold shadow-warm transition-all"
              >
                <span>Experience Local Village Life</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
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
