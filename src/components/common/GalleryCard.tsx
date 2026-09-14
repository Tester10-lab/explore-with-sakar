'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Maximize2 } from 'lucide-react';
import { GalleryPhoto } from '@/types';

interface GalleryCardProps {
  photo: GalleryPhoto;
  onClick?: () => void;
}

export default function GalleryCard({ photo, onClick }: GalleryCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-himalaya-900 border border-parchment-300 shadow-subtle hover:shadow-floating transition-all duration-500"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={photo.image}
          alt={photo.alt || photo.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/90 via-himalaya-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Category tag */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-himalaya-950 opacity-90 group-hover:opacity-100 transition-opacity">
          {photo.categoryLabel}
        </div>

        {/* Fullscreen icon */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>

        {/* Caption & Location on Hover/Bottom */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          {photo.nepaliTitle && (
            <span className="font-serif text-[11px] text-saffron-light tracking-widest block mb-0.5">
              {photo.nepaliTitle}
            </span>
          )}

          <h3 className="font-editorial-serif text-base sm:text-lg font-bold leading-tight mb-1">
            {photo.title}
          </h3>

          <div className="flex items-center text-xs text-parchment-200 font-light">
            <MapPin className="w-3 h-3 text-terracotta mr-1 shrink-0" />
            <span className="truncate">{photo.location}</span>
          </div>

          <p className="text-xs text-parchment-300/90 font-light mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
