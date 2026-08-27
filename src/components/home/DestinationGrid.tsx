'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DESTINATIONS } from '@/data/destinations';
import { EXPERIENCES } from '@/data/experiences';
import { Sparkles, MapPin, Clock, ArrowRight, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DestinationGrid() {
  return (
    <section id="destinations" className="py-24 sm:py-32 bg-white relative">
      <div className="editorial-container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-terracotta mb-4 block">
              Iconic & Secluded Regions
            </span>
            <h2 className="font-editorial-serif text-editorial-title font-light text-himalaya-950 tracking-tight leading-[1.1]">
              Curated Nepal <br className="hidden sm:inline" />
              <span className="italic text-himalaya-700">Journeys.</span>
            </h2>
          </motion.div>
          
          <motion.p 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="text-sm sm:text-base text-himalaya-700 font-light max-w-sm mb-4"
          >
            From the medieval courtyards of the Kathmandu Valley to the sacred rainshadow gorges of Mustang and quiet alpine ridges of Langtang.
          </motion.p>
        </div>

        {/* 6 Curated Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 mb-24">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col"
            >
              <Link href={`#booking`} className="block overflow-hidden bg-himalaya-100 relative aspect-[3/4] mb-6">
                <Image
                  src={dest.image.src}
                  alt={dest.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Elevation Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-mono flex items-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <Mountain className="w-3.5 h-3.5 text-saffron-light" />
                  <span>{dest.elevation}</span>
                </div>

                <div className="absolute bottom-4 left-4 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="text-white text-[10px] font-bold tracking-widest uppercase mb-1">
                    {dest.nepaliName}
                  </span>
                  <span className="inline-flex items-center text-xs tracking-widest uppercase font-medium text-white border-b border-white/50 pb-0.5">
                    Plan Journey <ArrowRight className="w-3 h-3 ml-2" />
                  </span>
                </div>
              </Link>

              {/* Card Body */}
              <div className="flex-1 flex flex-col justify-between pr-4">
                <div>
                  <h3 className="font-editorial-serif text-2xl font-light text-himalaya-950 group-hover:text-terracotta transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-sm text-himalaya-500 font-display-serif italic mt-1">
                    {dest.tagline}
                  </p>
                  <p className="text-sm text-himalaya-700 font-light mt-4 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Detailed Itineraries Section */}
        <div id="experiences" className="pt-16 border-t border-himalaya-200">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-terracotta block mb-3">
                Sample Itineraries
              </span>
              <h3 className="font-editorial-serif text-3xl sm:text-4xl font-light text-himalaya-950">
                Private & <span className="italic text-himalaya-700">Immersive</span>
              </h3>
            </div>
            <Link
              href="/experiences"
              className="inline-flex items-center justify-center px-0 py-2 border-b border-himalaya-900 text-xs tracking-widest uppercase font-medium text-himalaya-950 hover:text-terracotta hover:border-terracotta transition-all"
            >
              <span>View All Itineraries</span>
              <ArrowRight className="w-4 h-4 ml-3" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXPERIENCES.slice(0, 3).map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-himalaya-100 mb-5">
                  <Image
                    src={exp.heroImage.src}
                    alt={exp.heroImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-himalaya-950 text-[10px] uppercase font-bold tracking-widest">
                    {exp.categoryLabel}
                  </div>
                </div>

                <div>
                  <h4 className="font-editorial-serif text-xl font-light text-himalaya-950 group-hover:text-terracotta transition-colors">
                    {exp.title}
                  </h4>
                  <p className="text-sm text-himalaya-600 font-light mt-2 line-clamp-2">
                    {exp.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-himalaya-700 pt-4 mt-4 border-t border-himalaya-100">
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-terracotta" />
                    {exp.duration}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-terracotta" />
                    {exp.location.split(',')[0]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
