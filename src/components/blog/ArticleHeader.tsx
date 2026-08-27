'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { Calendar, Clock, ArrowLeft, Share2, Sparkles } from 'lucide-react';

interface ArticleHeaderProps {
  post: BlogPost;
}

export default function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="relative w-full h-[60vh] sm:h-[75vh] min-h-[500px] flex items-end pb-12 sm:pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={post.featuredImage.src}
          alt={post.featuredImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-himalaya-950/20 via-himalaya-950/40 to-himalaya-950/90" />
      </div>

      <div className="editorial-container relative z-10 w-full max-w-4xl mx-auto space-y-6 text-white">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-parchment-200 hover:text-white transition-colors group mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Journal</span>
        </Link>

        {/* Category & Meta */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-light" />
            <span>{post.category}</span>
          </div>

          <h1 className="font-editorial-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white drop-shadow-md">
            {post.title}
          </h1>

          <p className="text-lg sm:text-2xl text-parchment-200 font-light font-display-serif italic leading-relaxed max-w-3xl drop-shadow-sm border-l-2 border-terracotta pl-4">
            {post.subtitle}
          </p>
        </div>

        {/* Author pill and reading info */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative border border-white/30 shadow-sm">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">
                By {post.author.name}
              </span>
              <span className="text-xs text-parchment-300 font-light">
                {post.author.role}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-parchment-200 font-light">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-terracotta-light" />
              {post.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-terracotta-light" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </div>
      
      {post.featuredImage.caption && (
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-md text-[10px] sm:text-xs text-white/80 font-light max-w-sm text-right">
          {post.featuredImage.caption}
        </div>
      )}
    </header>
  );
}
