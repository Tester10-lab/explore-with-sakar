'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { ServicePillar } from '@/data/services';

interface ServiceCardProps {
  service: ServicePillar;
  layout?: 'grid' | 'detailed' | 'featured';
}

export default function ServiceCard({ service, layout = 'grid' }: ServiceCardProps) {
  const getExpUrl = (slug: string) => {
    return `/experiences/${slug}`;
  };

  if (layout === 'featured') {
    return (
      <div className="bg-white rounded-3xl overflow-hidden border border-parchment-300 shadow-warm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Image Side */}
          <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] bg-himalaya-900 overflow-hidden group">
            <Image
              src={service.heroImage.src}
              alt={service.heroImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/70 via-transparent to-transparent" />

            <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-himalaya-950">
              {service.badge}
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="font-serif text-sm text-saffron-light tracking-widest block mb-1">
                {service.nepaliTitle}
              </span>
              <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold leading-tight">
                {service.title}
              </h3>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-terracotta mb-3">
                {service.tagline}
              </p>
              <p className="text-base text-himalaya-700 font-light leading-relaxed mb-8">
                {service.shortDescription}
              </p>

              {/* Key Features */}
              <div className="space-y-4 pt-6 border-t border-parchment-200">
                <h4 className="text-xs uppercase font-bold tracking-widest text-himalaya-900">
                  What Makes It Sacred & Rare
                </h4>
                {(service.keyFeatures || []).slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-parchment-200 flex items-center justify-center shrink-0 mt-0.5 text-terracotta">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-himalaya-900 block">
                        {feat.title}
                      </span>
                      <span className="text-xs text-himalaya-600 font-light">
                        {feat.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={getExpUrl(service.slug)}
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
        href={getExpUrl(service.slug)}
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
          href={getExpUrl(service.slug)}
          className="flex items-center justify-center w-full py-3 rounded-xl bg-parchment-100 hover:bg-himalaya-950 text-himalaya-900 hover:text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 border border-parchment-300 hover:border-himalaya-950"
        >
          <span>Explore Experience</span>
          <ArrowRight className="w-3.5 h-3.5 ml-2" />
        </Link>
      </div>
    </div>
  );
}
