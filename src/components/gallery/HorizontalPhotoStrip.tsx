'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { GalleryPhoto } from '@/types';
import { ChevronLeft, ChevronRight, Maximize2, MapPin } from 'lucide-react';
import Lightbox from './Lightbox';

interface HorizontalPhotoStripProps {
  photos: GalleryPhoto[];
  title?: string;
  subtitle?: string;
}

export default function HorizontalPhotoStrip({
  photos,
  title,
  subtitle,
}: HorizontalPhotoStripProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-8">
      {/* Header with Navigation Controls */}
      {(title || subtitle) && (
        <div className="editorial-container flex items-end justify-between mb-6">
          <div>
            {title && (
              <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-himalaya-700 font-light mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full bg-sand hover:bg-terracotta hover:text-white transition-all text-himalaya-900 border border-parchment-300 shadow-sm focus:outline-none"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full bg-sand hover:bg-terracotta hover:text-white transition-all text-himalaya-900 border border-parchment-300 shadow-sm focus:outline-none"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Horizontal Scroll Strip */}
      <div
        ref={scrollContainerRef}
        className="horizontal-snap flex gap-4 px-4 sm:px-8 overflow-x-auto pb-4 pt-1 select-none"
      >
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setLightboxIndex(index)}
            className="snap-item relative w-72 sm:w-80 md:w-96 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-subtle hover:shadow-editorial transition-all shrink-0 bg-sand"
          >
            <Image
              src={photo.image}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 300px, 400px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-widest text-saffron-light font-bold">
                {photo.categoryLabel}
              </span>
              <h4 className="font-editorial-serif text-sm font-bold leading-tight mt-0.5">
                {photo.title}
              </h4>
              <p className="text-[11px] text-parchment-300 font-light flex items-center mt-1">
                <MapPin className="w-3 h-3 mr-1 text-terracotta-light" />
                <span>{photo.location}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        photos={photos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
