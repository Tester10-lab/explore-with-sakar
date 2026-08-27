'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TRAVELER_PERSONAS } from '@/data/personas';
import { EXPERIENCES } from '@/data/experiences';
import { TravelerPersona } from '@/types';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExperienceFinder() {
  const [selectedPersona, setSelectedPersona] = useState<TravelerPersona>(TRAVELER_PERSONAS[0]);

  // Find matching experiences for the selected persona
  const matchingExperiences = EXPERIENCES.filter((exp) =>
    selectedPersona.recommendedSlugs.includes(exp.slug)
  );

  return (
    <section id="experiences-finder" className="py-24 sm:py-32 bg-white relative">
      <div className="editorial-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-terracotta mb-4 block">
              Find Your Path
            </span>
            <h2 className="font-editorial-serif text-editorial-title font-light text-himalaya-950 tracking-tight leading-[1.1] mb-6">
              Find Your <span className="italic text-himalaya-700">Nepal Experience</span>
            </h2>
            <p className="text-himalaya-700 text-sm font-light max-w-lg mx-auto">
              Travel is deeply personal. Choose the way you love to explore, and let Sakar reveal the side of Nepal that speaks to your soul.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Persona List */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-1"
          >
             {TRAVELER_PERSONAS.map((persona) => {
              const isSelected = selectedPersona.id === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => setSelectedPersona(persona)}
                  className={`w-full text-left py-4 px-6 border-l-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-terracotta bg-himalaya-50'
                      : 'border-transparent hover:border-himalaya-200 hover:bg-himalaya-50/50'
                  }`}
                >
                  <h3 className={`font-editorial-serif text-lg ${isSelected ? 'text-terracotta font-medium' : 'text-himalaya-900 font-light'}`}>
                    {persona.title}
                  </h3>
                  <p className={`text-xs mt-1 font-light ${isSelected ? 'text-himalaya-800' : 'text-himalaya-500'}`}>
                    {persona.tagline}
                  </p>
                </button>
              );
            })}
          </motion.div>

          {/* Right: Dynamic Showcase */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedPersona.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-himalaya-100">
                  <Image
                    src={selectedPersona.image.src}
                    alt={selectedPersona.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-himalaya-950/80 to-transparent">
                    <p className="text-white text-xs font-light italic">
                      &ldquo;{selectedPersona.image.caption}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center">
                  <div className="mb-10">
                    <h3 className="font-editorial-serif text-2xl text-himalaya-950 font-light mb-4">
                      {selectedPersona.tagline}
                    </h3>
                    <p className="text-sm text-himalaya-700 font-light leading-relaxed">
                      {selectedPersona.description}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-himalaya-500 mb-4 block border-b border-himalaya-200 pb-2">
                      Tailored Journeys
                    </span>
                    <div className="space-y-4">
                      {matchingExperiences.map((exp) => (
                        <Link
                          key={exp.id}
                          href={`/experiences/${exp.slug}`}
                          className="group block"
                        >
                          <h5 className="font-editorial-serif text-lg font-light text-himalaya-900 group-hover:text-terracotta transition-colors">
                            {exp.title}
                          </h5>
                          <div className="flex items-center space-x-3 text-xs text-himalaya-500 font-light mt-1">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {exp.duration}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {exp.location.split(',')[0]}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12">
                     <Link
                        href="#booking"
                        className="inline-flex items-center justify-center px-0 py-2 border-b border-himalaya-900 text-xs tracking-widest uppercase font-medium text-himalaya-950 hover:text-terracotta hover:border-terracotta transition-all"
                      >
                        <span>Talk with Sakar</span>
                        <ArrowRight className="w-4 h-4 ml-3" />
                      </Link>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
