import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DESTINATIONS } from '@/data/destinations';
import { Sparkles, Mountain, ArrowRight } from 'lucide-react';
import InquiryForm from '@/components/booking/InquiryForm';

export const metadata: Metadata = {
  title: 'Destinations | Explore With Sakar',
  description: 'Curated destinations in Nepal from the medieval courtyards of the Kathmandu Valley to the sacred rainshadow gorges of Mustang.',
};

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-parchment-100">
      {/* Hero Header */}
      <div className="py-20 sm:py-32 bg-himalaya-950 border-b border-himalaya-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 film-grain pointer-events-none"></div>
        <div className="editorial-container max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta/20 text-terracotta-light text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Lands</span>
          </div>
          <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
            Curated Destinations
          </h1>
          <p className="text-base sm:text-xl text-himalaya-300 font-light font-display-serif italic max-w-2xl mx-auto">
            &ldquo;Every valley holds a different story. Every trail leads to a new discovery.&rdquo;
          </p>
        </div>
      </div>

      <div className="editorial-container py-20 sm:py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 mb-24">
          {DESTINATIONS.map((dest) => (
            <div key={dest.id} className="group flex flex-col">
              <Link href={`/destinations/${dest.id}`} className="block overflow-hidden bg-himalaya-100 relative aspect-[3/4] mb-6 rounded-xl shadow-subtle hover:shadow-floating transition-shadow duration-300">
                <Image
                  src={dest.image.src}
                  alt={dest.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/70 via-himalaya-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Elevation Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-mono flex items-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 rounded-full border border-white/20">
                  <Mountain className="w-3.5 h-3.5 text-saffron-light" />
                  <span>{dest.elevation}</span>
                </div>

                <div className="absolute bottom-6 left-6 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-saffron-light mb-1">
                    {dest.nepaliName}
                  </span>
                  <span className="inline-flex items-center text-xs tracking-widest uppercase font-medium border-b border-white/50 pb-0.5 hover:border-white transition-colors">
                    Explore Region <ArrowRight className="w-3 h-3 ml-2" />
                  </span>
                </div>
              </Link>

              {/* Card Body */}
              <div className="flex-1 flex flex-col justify-between pr-4">
                <div>
                  <h3 className="font-editorial-serif text-2xl font-bold text-himalaya-950 group-hover:text-terracotta transition-colors">
                    <Link href={`/destinations/${dest.id}`}>{dest.name}</Link>
                  </h3>
                  <p className="text-sm text-himalaya-600 font-display-serif italic mt-2">
                    {dest.tagline}
                  </p>
                  <p className="text-sm text-himalaya-700 font-light mt-4 leading-relaxed line-clamp-3">
                    {dest.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-parchment-300">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-himalaya-900 mb-3">Highlights</h4>
                  <ul className="space-y-2">
                    {dest.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx} className="flex items-start text-xs text-himalaya-700 font-light">
                        <span className="text-terracotta mr-2 leading-none">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Inquiry Form */}
      <InquiryForm />
    </div>
  );
}
