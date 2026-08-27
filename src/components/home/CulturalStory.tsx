'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
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
    image: '/explore-with-sakar/images/heritage/newari-architecture.jpg',
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
    image: '/explore-with-sakar/images/heritage/temple-courtyard.jpg',
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
    image: '/explore-with-sakar/images/heritage/ancient-alleyways.jpg',
    alt: 'Narrow atmospheric brick alleyway with spice vendors and hidden courtyards',
    orientation: 'landscape',
    caption: 'Step through low wooden archways into tranquil residential courtyards.',
  },
];

export default function CulturalStory() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="cultural" className="py-32 bg-himalaya-950 film-grain text-white relative">
      <div className="editorial-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Asymmetrical Collage */}
          <div className="lg:col-span-7 relative min-h-[600px] order-2 lg:order-1">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 w-[70%] z-10 cursor-pointer shadow-editorial"
              onClick={() => setLightboxIndex(0)}
            >
              <div className="relative aspect-[3/4] bg-himalaya-900 border border-white/10">
                <Image
                  src={CULTURAL_PHOTOS[0].image}
                  alt={CULTURAL_PHOTOS[0].alt}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Overlapping Landscape */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 bottom-12 w-[60%] z-20 cursor-pointer shadow-2xl"
              onClick={() => setLightboxIndex(1)}
            >
               <div className="relative aspect-[4/3] bg-himalaya-900 border border-white/10">
                  <Image
                    src={CULTURAL_PHOTOS[1].image}
                    alt={CULTURAL_PHOTOS[1].alt}
                    fill
                    className="object-cover"
                  />
                </div>
            </motion.div>
          </div>

          {/* Right Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-12 order-1 lg:order-2"
          >
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-terracotta mb-4 block">
                Living Traditions
              </span>
              <h2 className="font-editorial-serif text-editorial-title font-light tracking-tight leading-[1.1]">
                Living Heritage, <br />
                <span className="italic font-display-serif text-parchment-300">
                  Sacred Rhythms & Feasts
                </span>
              </h2>
            </div>
            
            <div className="space-y-6 text-sm text-parchment-200 font-light leading-relaxed max-w-md">
              <p>
                Nepal’s cultural heritage is not confined to glass cases in museums; it is an active, vibrant way of being. In the ancient medieval towns of Kathmandu, Patan, and Bhaktapur, eighth-century stone shrines receive fresh marigold petals every sunrise.
              </p>
              <p>
                Guided by Sakar, you will step beyond the usual tourist selfie spots into private artisan workshops, taste authentic multi-course Newari banquets (Samay Baji), and understand the sacred mythology behind every festival mask, bronze bell, and carved wooden window.
              </p>
            </div>

            <Link
              href="/experiences/kathmandu-heritage-living-culture"
              className="inline-flex items-center justify-center px-0 py-2 border-b border-white/30 text-xs tracking-widest uppercase font-medium text-white hover:text-terracotta hover:border-terracotta transition-all"
            >
              <span>Explore Heritage Journeys</span>
              <ArrowRight className="w-4 h-4 ml-3" />
            </Link>
          </motion.div>

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
