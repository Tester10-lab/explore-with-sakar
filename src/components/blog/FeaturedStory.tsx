'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';

interface FeaturedStoryProps {
  post: BlogPost;
}

export default function FeaturedStory({ post }: FeaturedStoryProps) {
  return (
    <div className="mb-14 group rounded-3xl overflow-hidden bg-sand border border-parchment-300 shadow-editorial hover:shadow-floating transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
        {/* Large Visual */}
        <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-himalaya-900">
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-himalaya-950/80 backdrop-blur-md text-saffron-light text-xs uppercase font-bold tracking-wider">
            FEATURED STORY • {post.category}
          </div>
        </div>

        {/* Story Narrative */}
        <div className="lg:col-span-5 p-6 sm:p-10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-xs text-himalaya-600 font-light">
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-terracotta-light" />
                {post.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-terracotta-light" />
                {post.readingTime}
              </span>
            </div>

            <h2 className="font-editorial-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-himalaya-950 group-hover:text-terracotta transition-colors leading-tight">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            <p className="text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-parchment-300 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden relative border border-parchment-300">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="text-xs">
                <span className="font-bold text-himalaya-950 block">{post.author.name}</span>
                <span className="text-himalaya-600 text-[10px]">{post.author.role}</span>
              </div>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-xs sm:text-sm font-bold text-terracotta hover:text-terracotta-dark transition-colors"
            >
              <span>Read Full Story</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
