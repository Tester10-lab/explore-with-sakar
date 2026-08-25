'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, MapPin, Maximize2 } from 'lucide-react';
import Lightbox from '@/components/gallery/Lightbox';
import { GalleryPhoto } from '@/types';

const CULTURAL_PHOTOS: GalleryPhoto[] = [
  {
    id: 'cult-1',
    title: 'Centuries-Old Newari Carved Architecture',
    nepaliTitle: 'नेवारी काष्ठकला',
    category: 'heritage',
    categoryLabel: 'Living Heritage',
    location: 'Patan Historical Quarter',
    image: '/images/heritage/newari-architecture.jpg',
    alt: 'Masterfully carved wooden struts and peacock windows in Patan',
    orientation: 'portrait',
    caption: 'Sacred Newari woodworking preserved across eight centuries of Malla craftsmanship.',
  },
  {
    id: 'cult-2',
    title: 'Morning Prayer Wheels in Ancient Courtyard',
    nepaliTitle: 'मन्दिर र माने',
    category: 'heritage',
    categoryLabel: 'Living Heritage',
    location: 'Pashupatinath & Kathmandu',
    image: '/images/heritage/temple-courtyard.jpg',
    alt: 'Devotees spinning brass prayer wheels in temple corridor',
    orientation: 'landscape',
    caption: 'Spinning prayer wheels at dawn, sending mantras of universal peace.',
  },
  {
    id: 'cult-3',
    title: 'Labyrinth of Historic Kathmandu Alleys',
    nepaliTitle: 'पुराना गल्लीहरू',
    category: 'heritage',
    categoryLabel: 'Living Heritage',
    location: 'Asan Bazaar & Bahals',
    image: '/images/heritage/ancient-alleyways.jpg',
    alt: 'Narrow atmospheric brick alleyway with spice vendors and hidden courtyards',
    orientation: 'landscape',
    caption: 'Step through low wooden archways into tranquil residential courtyards.',
  },
  {
    id: 'cult-4',
    title: 'Historical Pagoda Shrines of Durbar Square',
    nepaliTitle: 'दरबार क्षेत्र',
    category: 'heritage',
    categoryLabel: 'Living Heritage',
    location: 'Kathmandu Durbar Square',
    image: '/images/heritage/durbar-square.jpg',
    alt: 'Terracotta brick temples and historical stone shrines',
    orientation: 'landscape',
    caption: 'UNESCO living heritage where daily rituals and vibrant street life converge.',
  },
];

export default function CulturalStory() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="cultural" className="py-20 sm:py-28 bg-parchment-100 relative">
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-saffron/15 text-saffron-dark text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Living Traditions</span>
            </div>

            <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
              Living Heritage, <br />
              <span className="italic font-display-serif font-normal text-terracotta">
                Sacred Rhythms & Feasts
              </span>
            </h2>

            <p className="text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
              Nepal’s cultural heritage is not confined to glass cases in museums; it is an active, vibrant way of being. In the ancient medieval towns of Kathmandu, Patan, and Bhaktapur, eighth-century stone shrines receive fresh marigold petals every sunrise.
            </p>

            <p className="text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
              Guided by Sakar, you will step beyond the usual tourist selfie spots into private artisan workshops, taste authentic multi-course Newari banquets (Samay Baji), and understand the sacred mythology behind every festival mask, bronze bell, and carved wooden window.
            </p>

            <div className="pt-2">
              <Link
                href="/experiences/kathmandu-heritage-living-culture"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-sm font-bold shadow-warm transition-all"
              >
                <span>Explore Heritage Journeys</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Photo Mosaic Column */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {/* Top Tall Image */}
              <div
                onClick={() => setLightboxIndex(0)}
                className="row-span-2 relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group shadow-editorial bg-sand"
              >
                <Image
                  src={CULTURAL_PHOTOS[0].image}
                  alt={CULTURAL_PHOTOS[0].alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-saffron-light">
                    Malla Architecture
                  </span>
                  <h4 className="font-editorial-serif text-sm font-bold">
                    {CULTURAL_PHOTOS[0].title}
                  </h4>
                </div>
              </div>

              {/* Top Right Landscape */}
              <div
                onClick={() => setLightboxIndex(1)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-subtle bg-sand"
              >
                <Image
                  src={CULTURAL_PHOTOS[1].image}
                  alt={CULTURAL_PHOTOS[1].alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-himalaya-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Right Landscape */}
              <div
                onClick={() => setLightboxIndex(2)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-subtle bg-sand"
              >
                <Image
                  src={CULTURAL_PHOTOS[2].image}
                  alt={CULTURAL_PHOTOS[2].alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-himalaya-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        photos={CULTURAL_PHOTOS}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </section>
  );
}
