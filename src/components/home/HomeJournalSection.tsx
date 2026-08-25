'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blog';
import { Sparkles, ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import dynamic from 'next/dynamic';

const GuestBook = dynamic(() => import('@/components/reviews/GuestBook'), { 
  ssr: false,
  loading: () => <div className="h-[600px] w-full flex items-center justify-center bg-sand rounded-3xl animate-pulse text-himalaya-500 font-editorial-serif text-lg">Opening Journal...</div>
});

export default function HomeJournalSection() {
  const featuredPost = BLOG_POSTS[0];
  const supportingPosts = BLOG_POSTS.slice(1, 3);

  return (
    <section id="journal" className="py-20 sm:py-28 bg-parchment-200/80 border-t border-parchment-300 relative">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sakar&apos;s Personal Journal</span>
            </div>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
              From Sakar&apos;s Journal
            </h2>
            <p className="text-sm sm:text-base text-himalaya-700 font-light mt-2 font-display-serif italic">
              Stories, reflections and quiet discoveries from the roads, villages, temples and mountains of Nepal.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-sm font-bold text-terracotta hover:text-terracotta-dark transition-colors group"
          >
            <span>Explore All Stories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 1 Large Dominant Feature Story + 2 Supporting Stories */}
        <div className="space-y-8">
          {/* Main Large Feature Article */}
          <div className="group rounded-3xl overflow-hidden bg-sand border border-parchment-300 shadow-editorial hover:shadow-floating transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              {/* Feature Image */}
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-himalaya-900">
                <Image
                  src={featuredPost.featuredImage.src}
                  alt={featuredPost.featuredImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-himalaya-950/80 backdrop-blur-md text-saffron-light text-xs uppercase font-bold tracking-wider">
                  {featuredPost.category}
                </div>
              </div>

              {/* Feature Content Narrative */}
              <div className="lg:col-span-5 p-6 sm:p-10 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-xs text-himalaya-600 font-light">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-terracotta-light" />
                      {featuredPost.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-terracotta-light" />
                      {featuredPost.readingTime}
                    </span>
                  </div>

                  <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950 group-hover:text-terracotta transition-colors leading-tight">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-himalaya-700 font-light leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-parchment-300">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center text-sm font-bold text-terracotta group-hover:text-terracotta-dark transition-colors"
                  >
                    <span>Read Complete Story</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 2 Supporting Stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportingPosts.map((post) => (
              <div
                key={post.slug}
                className="group rounded-2xl overflow-hidden bg-sand border border-parchment-300 shadow-subtle hover:shadow-editorial transition-all p-5 flex flex-col sm:flex-row gap-5"
              >
                <div className="relative w-full sm:w-48 aspect-[4/3] rounded-xl overflow-hidden bg-himalaya-900 shrink-0">
                  <Image
                    src={post.featuredImage.src}
                    alt={post.featuredImage.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-terracotta">
                      {post.category}
                    </span>
                    <h4 className="font-editorial-serif text-base sm:text-lg font-bold text-himalaya-950 group-hover:text-terracotta transition-colors mt-0.5 leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <p className="text-xs text-himalaya-600 font-light mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-parchment-300/80 text-xs">
                    <span className="text-himalaya-500 text-[11px]">{post.readingTime}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-bold text-terracotta flex items-center group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center CTA Button */}
        <div className="text-center mt-12 mb-20">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-bold text-sm shadow-warm transition-all transform hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore All Journal Stories & Reflections</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Interactive Guest Book */}
        <div className="mt-20 border-t border-parchment-300 pt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-himalaya-900 text-parchment-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <span>Traveler Memories</span>
            </div>
            <h3 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
              Sakar's Handwritten Guest Journal
            </h3>
            <p className="text-sm sm:text-base text-himalaya-700 font-light mt-4 font-display-serif italic">
              Flip through the pages of our physical guestbook, filled with handwritten stories, drawings, and gratitude from travelers across the world.
            </p>
          </div>
          <GuestBook />
        </div>
      </div>
    </section>
  );
}
