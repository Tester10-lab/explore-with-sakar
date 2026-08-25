'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { GalleryPhoto } from '@/types';

interface LightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < photos.length;
  const currentPhoto = isOpen ? photos[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const prev = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    onNavigate(prev);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const next = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    onNavigate(next);
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-himalaya-950/95 backdrop-blur-xl flex flex-col justify-between animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="w-full px-4 sm:px-8 py-4 flex items-center justify-between z-20 text-white border-b border-white/10 bg-himalaya-950/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3">
          <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-terracotta text-white">
            {currentPhoto.categoryLabel}
          </span>
          <span className="text-xs text-parchment-300 font-mono">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all transform hover:rotate-90"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative flex-1 flex items-center justify-center p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-30 p-3 rounded-full bg-himalaya-900/80 hover:bg-terracotta text-white border border-white/10 transition-all shadow-xl hover:scale-110 focus:outline-none"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* The Photo */}
        <div className="relative max-w-5xl max-h-[72vh] w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full max-h-[70vh]">
            <Image
              src={currentPhoto.image}
              alt={currentPhoto.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
              className="object-contain drop-shadow-2xl rounded-sm transition-all duration-300"
            />
          </div>
        </div>

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-30 p-3 rounded-full bg-himalaya-900/80 hover:bg-terracotta text-white border border-white/10 transition-all shadow-xl hover:scale-110 focus:outline-none"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Editorial Caption Bar */}
      <div
        className="w-full px-4 sm:px-8 py-5 border-t border-white/10 bg-himalaya-950/80 text-parchment-200 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-editorial-serif text-base sm:text-lg font-bold text-white">
                {currentPhoto.title}
              </h3>
              {currentPhoto.nepaliTitle && (
                <span className="text-xs text-saffron font-light hidden md:inline">
                  • {currentPhoto.nepaliTitle}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-parchment-300 font-light mt-1 max-w-2xl">
              {currentPhoto.caption}
            </p>
          </div>

          <div className="flex items-center text-xs text-parchment-400 shrink-0 mt-1 sm:mt-0">
            <MapPin className="w-3.5 h-3.5 mr-1 text-terracotta-light" />
            <span>{currentPhoto.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
