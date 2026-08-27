import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { EXPERIENCES } from '@/data/experiences';
import { Sparkles, MapPin, Clock, ArrowRight } from 'lucide-react';
import InquiryForm from '@/components/booking/InquiryForm';

export const metadata: Metadata = {
  title: 'Experiences & Journeys | Explore With Sakar',
  description: 'Curated, immersive experiences in Nepal that connect you deeply with local culture, spiritual heritage, and untouched nature.',
};

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-parchment-100">
      {/* Hero Header */}
      <div className="py-20 sm:py-32 bg-parchment-200/90 border-b border-parchment-300 relative">
        <div className="absolute inset-0 opacity-40 film-grain pointer-events-none"></div>
        <div className="editorial-container max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Itineraries</span>
          </div>
          <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-himalaya-950 tracking-tight">
            Immersive Journeys
          </h1>
          <p className="text-base sm:text-xl text-himalaya-700 font-light font-display-serif italic max-w-2xl mx-auto">
            &ldquo;Travel should change you. We design private, slow-paced journeys meant to spark genuine connection.&rdquo;
          </p>
        </div>
      </div>

      <div className="editorial-container py-20 sm:py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 mb-24">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="group flex flex-col bg-sand rounded-3xl overflow-hidden shadow-subtle hover:shadow-floating transition-shadow duration-300 border border-parchment-300">
              <Link href={`/experiences/${exp.slug}`} className="block relative aspect-[4/3] overflow-hidden">
                <Image
                  src={exp.heroImage.src}
                  alt={exp.heroImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-himalaya-950/20 group-hover:bg-transparent transition-colors duration-500" />
                
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-md text-himalaya-950 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                  {exp.categoryLabel}
                </div>
              </Link>

              {/* Card Body */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial-serif text-2xl font-bold text-himalaya-950 mb-3 group-hover:text-terracotta transition-colors leading-snug">
                    <Link href={`/experiences/${exp.slug}`}>{exp.title}</Link>
                  </h3>
                  <p className="text-sm text-himalaya-700 font-light leading-relaxed line-clamp-3">
                    {exp.shortDescription}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-parchment-300">
                  <div className="flex items-center justify-between text-xs text-himalaya-700 font-medium mb-6">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-terracotta" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-terracotta" />
                      <span className="truncate max-w-[120px]">{exp.location.split(',')[0]}</span>
                    </span>
                  </div>
                  
                  <Link 
                    href={`/experiences/${exp.slug}`}
                    className="flex items-center justify-center w-full py-3.5 rounded-xl bg-himalaya-950 hover:bg-terracotta text-white font-bold text-sm tracking-wide transition-colors"
                  >
                    View Itinerary <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
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
