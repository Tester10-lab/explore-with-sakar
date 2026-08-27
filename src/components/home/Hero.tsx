'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_PHOTOS } from '@/data/gallery';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get a curated list of featured landscape/mountain photos for the background slideshow
  const slideshowImages = GALLERY_PHOTOS
    .filter(photo => photo.featured && (photo.category === 'mountains' || photo.orientation === 'landscape'))
    .map(photo => photo.image);

  useEffect(() => {
    if (slideshowImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-himalaya-950 film-grain pt-24 pb-12">
      
      {/* Background Slideshow Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          {slideshowImages.length > 0 && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={slideshowImages[currentSlide]}
                alt="Background scenery"
                fill
                priority={currentSlide === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Layered cinematic gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950 via-himalaya-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-himalaya-950 via-himalaya-950/60 to-transparent sm:via-himalaya-950/40" />
      </div>

      {/* Foreground Sakar Cutout */}
      <div className="absolute bottom-0 right-0 lg:right-[10%] w-full max-w-[600px] h-[70vh] z-10 pointer-events-none flex items-end justify-end opacity-90 sm:opacity-100">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src="/explore-with-sakar/images/sakar-nobg.png"
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
              <span className="text-xs uppercase tracking-widest font-bold text-parchment-300 shadow-black/50 drop-shadow-md">
                A Journey Beyond The Surface
              </span>
            </div>
            
            <h1 className="font-editorial-serif text-5xl sm:text-6xl md:text-7xl lg:text-editorial-headline text-white font-light tracking-tighter leading-[1.1] mb-8 drop-shadow-xl">
              Discover Nepal Through <br />
              <span className="italic font-display-serif text-parchment-200">
                Culture
              </span>
              , Spirituality & <br className="hidden sm:block" />
              <span className="text-terracotta">Meaningful</span> Connection.
            </h1>

            <p className="text-base md:text-lg text-parchment-300 font-light leading-relaxed max-w-md mb-10 drop-shadow-lg">
              Welcome to Explore With Sakar — where travel becomes more than a journey. It is a heartfelt opportunity to experience the true soul of Nepal.
            </p>

            <Link
              href="#experiences"
              className="inline-flex items-center justify-center px-0 py-3 border-b-2 border-white/30 text-xs tracking-widest uppercase font-bold text-white hover:text-terracotta hover:border-terracotta transition-all group"
            >
              <span>Begin The Journey</span>
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

