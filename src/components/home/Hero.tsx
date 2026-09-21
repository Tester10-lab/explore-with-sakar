'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';

const DEFAULT_SLIDESHOW = [
  '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
  '/explore-with-sakar/images/homestays/village-meal.jpg',
  '/explore-with-sakar/images/trails/suspension-bridge.jpg',
  '/explore-with-sakar/images/mountains/alpine-valley.jpg',
];

export default function Hero() {
  const { settings } = useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const slideshowImages =
    settings.hero?.backgroundSlideshowImages && settings.hero.backgroundSlideshowImages.length > 0
      ? settings.hero.backgroundSlideshowImages
      : DEFAULT_SLIDESHOW;

  useEffect(() => {
    setIsMounted(true);
    if (slideshowImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  // On initial SSR, render only the first hero image with high priority to keep the critical path lean
  const renderedSlides = isMounted ? slideshowImages : slideshowImages.slice(0, 1);

  return (
    <section className="relative min-h-[95svh] w-full flex items-center justify-center overflow-hidden bg-himalaya-950 film-grain pt-24 pb-16">
      {/* Background Slideshow Layer — pure CSS transitions, no framer-motion */}
      <div className="absolute inset-0 z-0">
        {renderedSlides.map((src, idx) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: idx === currentSlide ? 0.6 : 0 }}
            aria-hidden={idx !== currentSlide}
          >
            <Image
              src={src}
              alt="Background scenery of Nepal"
              fill
              priority={idx === 0}
              loading={idx === 0 ? undefined : 'lazy'}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Cinematic gradient overlays for maximum text clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950 via-himalaya-950/60 to-himalaya-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-himalaya-950 via-himalaya-950/70 to-transparent" />
      </div>


      {/* Foreground Sakar Cutout */}
      <div className="absolute bottom-0 right-0 lg:right-[8%] w-full max-w-[550px] h-[70vh] z-10 pointer-events-none flex items-end justify-end opacity-85 sm:opacity-100">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src={settings.hero?.cutoutImage || '/explore-with-sakar/images/sakar-nobg.png'}
            alt="Your Host, Sakar"
            fill
            className="object-contain object-bottom drop-shadow-2xl"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="w-full relative z-20 px-6 sm:px-12 lg:px-24 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl relative z-30"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Compass className="w-4 h-4 text-terracotta" />
              <span className="text-xs uppercase tracking-widest font-bold text-parchment-300 drop-shadow-md">
                {settings.hero?.badgeText || 'A Journey Beyond The Surface'}
              </span>
            </div>

            <h1 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight leading-[1.1] mb-6 drop-shadow-xl">
              {settings.hero?.headlinePart1 || 'Discover Nepal Through'} <br />
              <span className="italic font-display-serif text-parchment-200">
                {settings.hero?.headlineHighlight1 || 'Culture'}
              </span>
              {settings.hero?.headlinePart2 || ', Spirituality &'} <br className="hidden sm:block" />
              <span className="text-terracotta">{settings.hero?.headlineHighlight2 || 'Meaningful'}</span> Connection.
            </h1>

            <p
              style={settings.hero?.descriptionColor ? { color: settings.hero.descriptionColor } : undefined}
              className={`text-base sm:text-lg font-light leading-relaxed max-w-lg mb-8 drop-shadow-lg ${
                settings.hero?.descriptionColor ? '' : 'text-parchment-300'
              }`}
            >
              {settings.hero?.description ||
                'Meaningful private travel experiences in Nepal with local host Sakar. Slow-paced exploration through living culture, village homestays, and quiet Himalayan sanctuaries.'}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/experience"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-warm hover:shadow-floating"
              >
                <span>Explore Experiences</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-widest uppercase transition-colors duration-300 border border-white/20 backdrop-blur-md"
              >
                <span>Plan Your Journey</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
