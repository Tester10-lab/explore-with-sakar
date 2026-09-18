'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { ServicePillar } from '@/data/services';

interface ServiceCardProps {
  service: ServicePillar;
  layout?: 'grid' | 'detailed';
}

export default function ServiceCard({ service, layout = 'grid' }: ServiceCardProps) {
  if (layout === 'detailed') {
    return (
      <div className="bg-white rounded-3xl overflow-hidden border border-parchment-300 shadow-editorial transition-all duration-300 hover:shadow-floating">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Image */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[420px] bg-himalaya-900">
            <Image
              src={service.heroImage.src}
              alt={service.heroImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/70 via-transparent to-transparent" />

            <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-himalaya-950">
              {service.badge}
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="font-serif text-xs text-saffron-light tracking-widest block mb-1">
                {service.nepaliTitle}
              </span>
              <p className="font-display-serif italic text-sm text-parchment-200">
                &ldquo;{service.quote}&rdquo;
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950">
                {service.title}
              </h3>

              <p className="text-sm font-medium text-terracotta">
                {service.tagline}
              </p>

              <p className="text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
                {service.shortDescription}
              </p>

              {/* Key Features list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-parchment-200">
                {(service.keyFeatures || []).slice(0, 4).map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <div className="w-5 h-5 rounded-full bg-parchment-200 text-terracotta flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-himalaya-900 block">
                        {feat.title}
                      </span>
                      <span className="text-[11px] text-himalaya-600 font-light line-clamp-2">
                        {feat.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-himalaya-950 hover:bg-terracotta text-white text-xs font-bold uppercase tracking-wider transition-colors duration-300"
              >
                <span>Discover {service.title.split('&')[0]}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid Card
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-parchment-300 shadow-subtle hover:shadow-editorial transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <Link
        href={`/services/${service.slug}`}
        className="block relative aspect-[16/10] overflow-hidden bg-himalaya-900"
      >
        <Image
          src={service.heroImage.src}
          alt={service.heroImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/70 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-himalaya-950">
          {service.badge}
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="font-serif text-[11px] text-saffron-light tracking-widest block mb-0.5">
            {service.nepaliTitle}
          </span>
          <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold leading-tight">
            {service.title}
          </h3>
        </div>
      </Link>

      {/* Body */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <p className="text-xs font-semibold text-terracotta mb-2">
            {service.tagline}
          </p>
          <p className="text-sm text-himalaya-600 font-light leading-relaxed line-clamp-3 mb-6">
            {service.shortDescription}
          </p>

          <div className="space-y-2 pt-4 border-t border-parchment-200 mb-6">
            {(service.keyFeatures || []).slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-himalaya-700">
                <span className="text-terracotta leading-none mt-0.5">•</span>
                <span className="font-medium text-himalaya-900">{feat.title}:</span>
                <span className="font-light text-himalaya-600 truncate">{feat.description}</span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href={`/services/${service.slug}`}
          className="flex items-center justify-center w-full py-3 rounded-xl bg-parchment-100 hover:bg-himalaya-950 text-himalaya-900 hover:text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 border border-parchment-300 hover:border-himalaya-950"
        >
          <span>Explore Offering</span>
          <ArrowRight className="w-3.5 h-3.5 ml-2" />
        </Link>
      </div>
    </div>
  );
}
