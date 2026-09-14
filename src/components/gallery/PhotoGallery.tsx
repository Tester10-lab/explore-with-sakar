'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GALLERY_PHOTOS } from '@/data/gallery';
import { GalleryPhoto } from '@/types';
import { Maximize2, MapPin, Sparkles } from 'lucide-react';
import Lightbox from './Lightbox';
import { ExtendedGalleryPhoto } from '@/types/cms';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Photographs' },
  { id: 'mountains', label: 'Himalayan Vistas' },
  { id: 'heritage', label: 'Living Heritage' },
  { id: 'spiritual', label: 'Spiritual Sanctuaries' },
  { id: 'homestay', label: 'Village Homestays' },
  { id: 'trails', label: 'Hidden Trails' },
];

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<ExtendedGalleryPhoto[]>(
    GALLERY_PHOTOS.map((p, i) => ({
      ...p,
      order: i,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
  );
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadLivePhotos() {
      try {
        const res = await fetch('/api/public/content');
        if (res.ok) {
          const data = await res.json();
          if (data.photos && data.photos.length > 0) {
            setPhotos(data.photos);
          }
        }
      } catch (err) {
        // Fallback already in state
      }
    }
    loadLivePhotos();
  }, []);

  const filteredPhotos =
    activeCategory === 'all'
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-parchment-200/60 border-y border-parchment-300 relative">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Nepal Journal</span>
          </div>
          <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight">
            Nepal Through the Lens
          </h2>
          <p className="text-himalaya-700 text-sm sm:text-base font-light mt-3">
            High-altitude mountain sunrises, ancient Newari courtyards, quiet monastery halls, and warm village hearths captured during our journeys.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-terracotta text-white shadow-warm font-semibold'
                    : 'bg-sand hover:bg-parchment-300 text-himalaya-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Editorial Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo, index) => {
            const isSpan2 = photo.orientation === 'landscape' && index % 5 === 0;
            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(index)}
                className={`group relative rounded-xl overflow-hidden cursor-pointer bg-sand shadow-subtle hover:shadow-floating transition-all duration-300 transform hover:-translate-y-1 ${
                  isSpan2 ? 'sm:col-span-2' : ''
                }`}
              >
                <div
                  className={`relative w-full ${
                    photo.orientation === 'portrait'
                      ? 'aspect-[3/4]'
                      : isSpan2
                      ? 'aspect-[16/9]'
                      : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-himalaya-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                    <div className="flex justify-end">
                      <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-saffron-light">
                        {photo.categoryLabel}
                      </span>
                      <h4 className="font-editorial-serif text-sm sm:text-base font-bold text-white leading-snug mt-0.5">
                        {photo.title}
                      </h4>
                      <p className="text-[11px] text-parchment-300 font-light flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1 text-terracotta-light shrink-0" />
                        <span>{photo.location}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Hint */}
        <div className="text-center mt-8 text-xs text-himalaya-600 font-light">
          Click any photograph to view in full resolution with cultural notes.
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        photos={filteredPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </section>
  );
}
