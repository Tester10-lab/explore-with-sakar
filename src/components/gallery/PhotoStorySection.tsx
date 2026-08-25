'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GalleryPhoto } from '@/types';
import { ArrowRight, Sparkles, MapPin, Maximize2 } from 'lucide-react';
import Lightbox from './Lightbox';

interface PhotoStorySectionProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  quote?: string;
  mainImage: GalleryPhoto;
  supportingImages: GalleryPhoto[];
  ctaText?: string;
  ctaHref?: string;
  reversed?: boolean;
}

export default function PhotoStorySection({
  eyebrow,
  title,
  subtitle,
  paragraphs,
  quote,
  mainImage,
  supportingImages,
  ctaText,
  ctaHref,
  reversed = false,
}: PhotoStorySectionProps) {
  const allImages = [mainImage, ...supportingImages];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="py-16 sm:py-24">
      <div className="editorial-container">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
            reversed ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text Narrative Column */}
          <div
            className={`lg:col-span-5 space-y-6 ${
              reversed ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{eyebrow}</span>
            </div>

            <h3 className="font-editorial-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-himalaya-950 tracking-tight leading-tight">
              {title}
            </h3>

            {subtitle && (
              <p className="text-base text-himalaya-800 font-medium italic font-display-serif">
                &ldquo;{subtitle}&rdquo;
              </p>
            )}

            <div className="space-y-4 text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {quote && (
              <blockquote className="border-l-2 border-terracotta pl-4 py-1 text-sm italic text-himalaya-900 font-serif">
                {quote}
              </blockquote>
            )}

            {ctaText && ctaHref && (
              <div className="pt-2">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-terracotta hover:bg-terracotta-dark text-white text-sm font-semibold shadow-warm transition-all transform hover:-translate-y-0.5"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Photo Collage Column */}
          <div
            className={`lg:col-span-7 ${
              reversed ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Featured Large Image */}
              <div
                onClick={() => setLightboxIndex(0)}
                className="col-span-2 relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer group shadow-editorial bg-sand"
              >
                <Image
                  src={mainImage.image}
                  alt={mainImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 sm:p-6 flex flex-col justify-end text-white">
                  <span className="text-xs uppercase font-bold text-saffron-light">
                    {mainImage.categoryLabel}
                  </span>
                  <h4 className="font-editorial-serif text-base sm:text-lg font-bold">
                    {mainImage.title}
                  </h4>
                  <p className="text-xs text-parchment-300 font-light mt-1 flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-terracotta-light" />
                    <span>{mainImage.location}</span>
                  </p>
                </div>
              </div>

              {/* Supporting Images */}
              {supportingImages.slice(0, 2).map((img, idx) => (
                <div
                  key={img.id}
                  onClick={() => setLightboxIndex(idx + 1)}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-subtle bg-sand"
                >
                  <Image
                    src={img.image}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-himalaya-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Maximize2 className="w-5 h-5 drop-shadow" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        photos={allImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
