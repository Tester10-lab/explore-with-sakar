'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blog';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ExtendedBlogPost } from '@/types/cms';

const GuestBook = dynamic(() => import('@/components/reviews/GuestBook'), { 
  ssr: false,
  loading: () => <div className="h-[600px] w-full flex items-center justify-center bg-sand animate-pulse text-himalaya-500 font-editorial-serif text-lg">Opening Journal...</div>
});

export default function HomeJournalSection() {
  const [blogs, setBlogs] = useState<ExtendedBlogPost[]>(
    BLOG_POSTS.map((p, i) => ({
      ...p,
      id: `blog-${i + 1}-${p.slug}`,
      status: p.isDraftSample ? 'draft' : 'published',
      createdAt: new Date(p.publishedAt || Date.now()).toISOString(),
      updatedAt: new Date().toISOString(),
    }))
  );

  useEffect(() => {
    async function loadLiveBlogs() {
      try {
        const res = await fetch('/api/public/content');
        if (res.ok) {
          const data = await res.json();
          if (data.blogs && data.blogs.length > 0) {
            setBlogs(data.blogs);
          }
        }
      } catch (err) {
        // Fallback already in state
      }
    }
    loadLiveBlogs();
  }, []);

  const publishedBlogs = blogs.filter((b) => b.status === 'published');
  const featuredPost = publishedBlogs[0] || blogs[0];
  const supportingPosts = publishedBlogs.slice(1, 3);

  return (
    <section id="journal" className="py-24 sm:py-32 bg-parchment-100 relative">
      <div className="editorial-container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-terracotta mb-4 block">
              Sakar&apos;s Personal Journal
            </span>
            <h2 className="font-editorial-serif text-editorial-title font-light text-himalaya-950 tracking-tight leading-[1.1]">
              From the <span className="italic text-himalaya-700">Journal.</span>
            </h2>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm sm:text-base text-himalaya-700 font-light max-w-sm mb-4">
              Stories, reflections and quiet discoveries from the roads, villages, temples and mountains of Nepal.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-0 py-2 border-b border-himalaya-900 text-xs tracking-widest uppercase font-medium text-himalaya-950 hover:text-terracotta hover:border-terracotta transition-all"
            >
              <span>Explore All Stories</span>
              <ArrowRight className="w-4 h-4 ml-3" />
            </Link>
          </motion.div>
        </div>

        {/* 1 Large Dominant Feature Story + 2 Supporting Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Large Feature Article */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="lg:col-span-8 group"
          >
            <Link href={`/blog/${featuredPost.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden bg-himalaya-100 mb-8">
                <Image
                  src={featuredPost.featuredImage.src}
                  alt={featuredPost.featuredImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              </div>

              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center space-x-4 text-xs tracking-widest uppercase text-terracotta font-medium">
                  <span>{featuredPost.category}</span>
                  <span className="text-himalaya-300">|</span>
                  <span className="flex items-center text-himalaya-500">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    {featuredPost.readingTime}
                  </span>
                </div>

                <h3 className="font-editorial-serif text-3xl sm:text-4xl font-light text-himalaya-950 group-hover:text-terracotta transition-colors leading-[1.2]">
                  {featuredPost.title}
                </h3>

                <p className="text-sm text-himalaya-700 font-light leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* 2 Supporting Stories */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            {supportingPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-himalaya-100 mb-6">
                    <Image
                      src={post.featuredImage.src}
                      alt={post.featuredImage.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs uppercase font-medium tracking-widest text-terracotta">
                      {post.category}
                    </span>
                    <h4 className="font-editorial-serif text-2xl font-light text-himalaya-950 group-hover:text-terracotta transition-colors leading-[1.2]">
                      {post.title}
                    </h4>
                    <p className="text-sm text-himalaya-600 font-light line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Guest Book */}
        <div className="mt-32 border-t border-himalaya-200 pt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-terracotta mb-4 block">
              Traveler Memories
            </span>
            <h3 className="font-editorial-serif text-editorial-title font-light text-himalaya-950 tracking-tight leading-[1.1] mb-6">
              Sakar's Handwritten <span className="italic text-himalaya-700">Guest Journal</span>
            </h3>
            <p className="text-himalaya-700 text-sm font-light max-w-lg mx-auto">
              Flip through the pages of our physical guestbook, filled with handwritten stories, drawings, and gratitude from travelers across the world.
            </p>
          </motion.div>
          <GuestBook />
        </div>
      </div>
    </section>
  );
}
