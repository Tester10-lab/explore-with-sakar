'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mountain, ArrowRight } from 'lucide-react';
import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-parchment-300 shadow-subtle hover:shadow-editorial transition-all duration-300 hover:-translate-y-1">
      {/* Image container */}
      <Link
        href={`/destinations/${destination.id}`}
        className="block relative aspect-[4/3] overflow-hidden bg-himalaya-900"
      >
        <Image
          src={destination.image.src}
          alt={destination.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/80 via-himalaya-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Nepali Name & Elevation */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-md text-white text-xs font-mono flex items-center space-x-1.5 rounded-full border border-white/20">
          <Mountain className="w-3.5 h-3.5 text-saffron-light" />
          <span>{destination.elevation}</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="text-[11px] font-serif tracking-widest text-saffron-light uppercase mb-1 block">
            {destination.nepaliName}
          </span>
          <h3 className="font-editorial-serif text-2xl font-bold leading-tight">
            {destination.name}
          </h3>
        </div>
      </Link>

      {/* Body */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <p className="text-xs text-terracotta font-medium italic mb-2">
            {destination.tagline}
          </p>
          <p className="text-sm text-himalaya-800 font-normal leading-relaxed line-clamp-3 mb-6">
            {destination.description}
          </p>

          <div className="space-y-1.5 mb-6 pt-4 border-t border-parchment-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-himalaya-900 block mb-2">
              Signature Highlights
            </span>
            {destination.highlights.slice(0, 3).map((h, idx) => (
              <div key={idx} className="flex items-start text-xs text-himalaya-800 font-normal">
                <span className="text-terracotta mr-2 leading-none font-bold">•</span>
                <span className="truncate">{h}</span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href={`/destinations/${destination.id}`}
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-himalaya-900 hover:text-terracotta transition-colors pt-2 group/link"
        >
          <span>Explore Region Guide</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
