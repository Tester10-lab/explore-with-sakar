'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BlogPost, BlogBlock, GalleryPhoto } from '@/types';
import Lightbox from '@/components/gallery/Lightbox';
import { Maximize2, CheckCircle, Info } from 'lucide-react';

interface ArticleContentProps {
  post: BlogPost;
}

export default function ArticleContent({ post }: ArticleContentProps) {
  // Extract all inline images for Lightbox integration
  const inlineImages: GalleryPhoto[] = [];
  post.content.forEach((block, idx) => {
    if (block.type === 'image') {
      inlineImages.push({
        id: `block-img-${idx}`,
        title: post.title,
        category: 'heritage',
        categoryLabel: post.category,
        location: 'Nepal',
        image: block.image.src,
        alt: block.image.alt,
        orientation: 'landscape',
        caption: block.caption || block.image.caption || '',
      });
    } else if (block.type === 'twoImages') {
      inlineImages.push({
        id: `block-two-left-${idx}`,
        title: post.title,
        category: 'heritage',
        categoryLabel: post.category,
        location: 'Nepal',
        image: block.left.src,
        alt: block.left.alt,
        orientation: 'landscape',
        caption: block.left.caption || '',
      });
      inlineImages.push({
        id: `block-two-right-${idx}`,
        title: post.title,
        category: 'heritage',
        categoryLabel: post.category,
        location: 'Nepal',
        image: block.right.src,
        alt: block.right.alt,
        orientation: 'landscape',
        caption: block.right.caption || '',
      });
    } else if (block.type === 'storyImageText') {
      inlineImages.push({
        id: `block-story-${idx}`,
        title: post.title,
        category: 'heritage',
        categoryLabel: post.category,
        location: 'Nepal',
        image: block.image.src,
        alt: block.image.alt,
        orientation: 'portrait',
        caption: block.image.caption || '',
      });
    }
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightboxBySrc = (src: string) => {
    const idx = inlineImages.findIndex((img) => img.image === src);
    if (idx !== -1) setLightboxIndex(idx);
  };

  return (
    <div className="py-12 bg-parchment-100">
      <div className="editorial-container max-w-3xl mx-auto px-4 sm:px-6">
        {/* Sample / Draft Notice Banner */}
        {post.isDraftSample && (
          <div className="mb-8 p-4 rounded-xl bg-sand border border-parchment-300 flex items-start space-x-3 text-xs text-himalaya-700">
            <Info className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-himalaya-950 block mb-0.5">
                Editorial Note:
              </strong>
              <span>
                This story represents the experiential tone and narrative philosophy of Sakar&apos;s Journal. Factual personal anecdotes are curated with Sakar&apos;s guidance.
              </span>
            </div>
          </div>
        )}

        {/* Story Content Blocks */}
        <div className="space-y-8 text-himalaya-900 leading-relaxed font-light text-base sm:text-lg">
          {post.content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p key={index} className="text-himalaya-800 leading-[1.8]">
                    {block.content}
                  </p>
                );

              case 'heading':
                if (block.level === 2) {
                  return (
                    <h2
                      key={index}
                      className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950 tracking-tight mt-10 pt-4 pb-2 border-b border-parchment-300"
                    >
                      {block.content}
                    </h2>
                  );
                }
                return (
                  <h3
                    key={index}
                    className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950 mt-6"
                  >
                    {block.content}
                  </h3>
                );

              case 'quote':
                return (
                  <blockquote
                    key={index}
                    className="my-8 p-6 sm:p-8 rounded-2xl bg-sand border-l-4 border-terracotta shadow-subtle space-y-2"
                  >
                    <p className="font-display-serif italic text-lg sm:text-xl text-himalaya-950 font-normal leading-relaxed">
                      &ldquo;{block.content}&rdquo;
                    </p>
                    {block.attribution && (
                      <cite className="text-xs uppercase tracking-wider font-bold text-terracotta block not-italic">
                        — {block.attribution}
                      </cite>
                    )}
                  </blockquote>
                );

              case 'image':
                return (
                  <figure
                    key={index}
                    className="my-8 cursor-pointer group"
                    onClick={() => openLightboxBySrc(block.image.src)}
                  >
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-editorial bg-sand">
                      <Image
                        src={block.image.src}
                        alt={block.image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-himalaya-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Maximize2 className="w-5 h-5 drop-shadow" />
                      </div>
                    </div>
                    {block.caption && (
                      <figcaption className="text-xs text-himalaya-600 font-light mt-2 text-center italic">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );

              case 'twoImages':
                return (
                  <div key={index} className="my-8 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-subtle bg-sand"
                        onClick={() => openLightboxBySrc(block.left.src)}
                      >
                        <Image
                          src={block.left.src}
                          alt={block.left.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 400px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-himalaya-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>

                      <div
                        className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-subtle bg-sand"
                        onClick={() => openLightboxBySrc(block.right.src)}
                      >
                        <Image
                          src={block.right.src}
                          alt={block.right.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 400px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-himalaya-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    {block.caption && (
                      <p className="text-xs text-himalaya-600 font-light text-center italic pt-1">
                        {block.caption}
                      </p>
                    )}
                  </div>
                );

              case 'storyImageText':
                return (
                  <div
                    key={index}
                    className="my-8 p-6 rounded-2xl bg-sand border border-parchment-300 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center shadow-subtle"
                  >
                    <div
                      className={`sm:col-span-5 relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer group ${
                        block.imagePosition === 'right' ? 'sm:order-2' : 'sm:order-1'
                      }`}
                      onClick={() => openLightboxBySrc(block.image.src)}
                    >
                      <Image
                        src={block.image.src}
                        alt={block.image.alt}
                        fill
                        sizes="300px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div
                      className={`sm:col-span-7 space-y-2 ${
                        block.imagePosition === 'right' ? 'sm:order-1' : 'sm:order-2'
                      }`}
                    >
                      <p className="text-sm sm:text-base text-himalaya-800 font-light leading-relaxed">
                        {block.text}
                      </p>
                    </div>
                  </div>
                );

              case 'practicalTips':
                return (
                  <div
                    key={index}
                    className="my-8 rounded-2xl bg-parchment-50 border border-terracotta/30 p-6 sm:p-8 shadow-subtle space-y-4"
                  >
                    <h3 className="font-editorial-serif text-xl font-bold text-himalaya-950 flex items-center text-terracotta">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>{block.title}</span>
                    </h3>

                    <div className="space-y-3 pt-2">
                      {block.items.map((item, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-white border border-parchment-300 space-y-1"
                        >
                          <h4 className="text-sm font-bold text-himalaya-950 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-terracotta mr-2" />
                            {item.point}
                          </h4>
                          <p className="text-xs text-himalaya-700 font-light pl-4 leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>

      <Lightbox
        photos={inlineImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
