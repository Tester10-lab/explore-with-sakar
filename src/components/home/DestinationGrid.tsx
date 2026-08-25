'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DESTINATIONS } from '@/data/destinations';
import { EXPERIENCES } from '@/data/experiences';
import { Sparkles, MapPin, Clock, ArrowRight, Mountain } from 'lucide-react';

export default function DestinationGrid() {
  return (
    <section id="destinations" className="py-20 sm:py-28 bg-parchment-100 relative">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Iconic & Secluded Regions</span>
            </div>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight">
              Curated Nepal Journeys
            </h2>
          </div>
          <p className="text-sm sm:text-base text-himalaya-700 font-light max-w-md">
            From the medieval courtyards of the Kathmandu Valley to the sacred rainshadow gorges of Mustang and quiet alpine ridges of Langtang.
          </p>
        </div>

        {/* 6 Curated Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group rounded-2xl overflow-hidden bg-sand border border-parchment-300 shadow-subtle hover:shadow-editorial transition-all flex flex-col justify-between transform hover:-translate-y-1"
            >
              {/* Image with Elevation Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-himalaya-900">
                <Image
                  src={dest.image.src}
                  alt={dest.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-himalaya-950/70 backdrop-blur-md text-white text-[10px] font-mono flex items-center space-x-1">
                  <Mountain className="w-3 h-3 text-saffron-light" />
                  <span>{dest.elevation}</span>
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-terracotta/90 text-white text-[10px] font-bold tracking-widest uppercase">
                  {dest.nepaliName}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950 group-hover:text-terracotta transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-terracotta font-medium mt-0.5 font-display-serif italic">
                    {dest.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-himalaya-700 font-light mt-2 line-clamp-3 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                {/* Key Highlights Bullet points */}
                <div className="pt-2 border-t border-parchment-300/80">
                  <span className="text-[10px] uppercase font-bold text-himalaya-500 tracking-wider">
                    Highlights:
                  </span>
                  <ul className="text-xs text-himalaya-800 space-y-1 mt-1 font-light">
                    {dest.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="px-6 pb-6 pt-0">
                <Link
                  href="#booking"
                  className="w-full py-2.5 rounded-lg bg-parchment-200 hover:bg-terracotta hover:text-white text-himalaya-950 font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Plan Journey to {dest.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Detailed Itineraries Section */}
        <div id="experiences" className="pt-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-terracotta">
              Featured Sample Itineraries
            </span>
            <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950 mt-1">
              Private, Slow-Paced & Immersive
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERIENCES.slice(0, 3).map((exp) => (
              <div
                key={exp.id}
                className="rounded-2xl bg-white border border-parchment-300 shadow-subtle p-5 flex flex-col justify-between space-y-4 hover:shadow-editorial transition-shadow"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-sand">
                    <Image
                      src={exp.heroImage.src}
                      alt={exp.heroImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-himalaya-950/80 text-white text-[10px] uppercase font-bold">
                      {exp.categoryLabel}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-editorial-serif text-base sm:text-lg font-bold text-himalaya-950">
                      {exp.title}
                    </h4>
                    <p className="text-xs text-himalaya-600 font-light mt-1 line-clamp-2">
                      {exp.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-himalaya-700 pt-2 border-t border-parchment-200">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-terracotta" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-terracotta" />
                      {exp.location.split(',')[0]}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/experiences/${exp.slug}`}
                  className="w-full py-2.5 rounded-lg bg-sand hover:bg-terracotta hover:text-white text-himalaya-950 font-bold text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <span>View Complete Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
