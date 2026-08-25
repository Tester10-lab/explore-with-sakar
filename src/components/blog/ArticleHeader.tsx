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
    <header className="pt-10 pb-8 sm:pb-12 bg-parchment-100 border-b border-parchment-300">
      <div className="editorial-container max-w-4xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-himalaya-600 hover:text-terracotta transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Sakar&apos;s Journal</span>
        </Link>

        {/* Category & Meta */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{post.category}</span>
          </div>

          <h1 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-[1.2]">
            {post.title}
          </h1>

          <p className="text-base sm:text-xl text-himalaya-700 font-light font-display-serif italic leading-relaxed max-w-3xl">
            {post.subtitle}
          </p>
        </div>

        {/* Author pill and reading info */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-parchment-300">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-parchment-300 shadow-sm">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-sm font-bold text-himalaya-950 block">
                By {post.author.name}
              </span>
              <span className="text-xs text-himalaya-600 font-light">
                {post.author.role}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-himalaya-600 font-light">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-terracotta" />
              {post.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-terracotta" />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Full-width Hero Featured Image */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-editorial mt-6 bg-himalaya-900">
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          {post.featuredImage.caption && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-himalaya-950/80 to-transparent p-4 sm:p-6 text-white text-xs sm:text-sm font-light">
              {post.featuredImage.caption}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
