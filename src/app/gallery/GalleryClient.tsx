'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import GalleryCard from '@/components/common/GalleryCard';
import CTASection from '@/components/common/CTASection';
import { GalleryPhoto } from '@/types';
import { ExtendedGalleryPhoto } from '@/types/cms';

const CATEGORIES = [
  { key: 'all', label: 'All Photos' },
  { key: 'mountains', label: 'Himalayan Vistas' },
  { key: 'heritage', label: 'Living Heritage' },
  { key: 'homestay', label: 'Village Homestays' },
  { key: 'spiritual', label: 'Spiritual Sanctuaries' },
  { key: 'trails', label: 'Quiet Trails' },
];

interface GalleryClientProps {
  initialPhotos: (GalleryPhoto | ExtendedGalleryPhoto)[];
}

export default function GalleryClient({ initialPhotos }: GalleryClientProps) {
  const [photos] = useState<(GalleryPhoto | ExtendedGalleryPhoto)[]>(initialPhotos);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [activeCategory, photos]);

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  // Handle keyboard events for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge="Visual Journal"
        nepaliTitle="नेपालको दृश्य यात्रा"
        title="Nepal Through The Lens"
        subtitle="An editorial visual portfolio capturing the sacred quietude, ancient stone courtyards, and warm hearthside hospitality across our journeys."
        backgroundImage="/explore-with-sakar/images/mountains/sunrise-himalayas.jpg"
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      {/* 2. Interactive Filter Tabs */}
      <section className="py-12 bg-white border-b border-parchment-300 sticky top-16 z-30 shadow-subtle">
        <div className="editorial-container">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              const count =
                cat.key === 'all'
                  ? photos.length
                  : photos.filter((p) => p.category === cat.key).length;

              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    setLightboxIndex(null);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-terracotta text-white shadow-warm'
                      : 'bg-parchment-100 text-himalaya-700 hover:bg-parchment-200 border border-parchment-300'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-parchment-300 text-himalaya-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Photo Grid */}
      <section className="py-20 sm:py-28 bg-sand">
        <div className="editorial-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPhotos.map((photo, index) => (
              <GalleryCard
                key={photo.id}
                photo={photo}
                onClick={() => setLightboxIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Fullscreen Lightbox Modal */}
      {activePhoto && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-himalaya-950/95 backdrop-blur-md p-4 sm:p-8">
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={() =>
              setLightboxIndex(
                (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
              )
            }
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={() =>
              setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length)
            }
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption content */}
          <div className="max-w-5xl w-full flex flex-col items-center justify-center text-white space-y-4">
            <div className="relative w-full max-h-[70vh] aspect-[16/10] overflow-hidden rounded-2xl bg-black">
              <Image
                src={activePhoto.image}
                alt={activePhoto.alt || activePhoto.title}
                fill
                priority
                sizes="90vw"
                className="object-contain"
              />
            </div>

            <div className="text-center max-w-2xl space-y-2 pt-2">
              <div className="flex items-center justify-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-saffron-light">
                  {activePhoto.categoryLabel}
                </span>
                {activePhoto.nepaliTitle && (
                  <span className="text-xs font-serif text-parchment-300">
                    {activePhoto.nepaliTitle}
                  </span>
                )}
              </div>

              <h3 className="font-editorial-serif text-2xl font-bold">
                {activePhoto.title}
              </h3>

              <div className="flex items-center justify-center text-xs text-parchment-300">
                <MapPin className="w-3.5 h-3.5 text-terracotta mr-1" />
                <span>{activePhoto.location}</span>
              </div>

              <p className="text-xs sm:text-sm text-parchment-200 font-light leading-relaxed">
                {activePhoto.caption}
              </p>

              <div className="text-[11px] text-white/50 pt-1 font-mono">
                {lightboxIndex + 1} of {filteredPhotos.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. CTA Section */}
      <CTASection
        title="Experience These Moments in Person"
        subtitle="Join Sakar on a slow-paced journey to photograph, witness, and immerse in authentic Nepal."
        primaryButtonText="Inquire About Journeys"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Experiences"
        secondaryButtonHref="/experience"
      />
    </div>
  );
}
