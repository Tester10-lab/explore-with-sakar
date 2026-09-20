'use client';

import React from 'react';
import { BlogPost } from '@/types';
import { ExtendedBlogPost } from '@/types/cms';
import { PublicBlogListItem } from '@/lib/content';
import BlogCard from './BlogCard';
import { BookOpen } from 'lucide-react';

interface RelatedStoriesProps {
  posts: (BlogPost | ExtendedBlogPost | PublicBlogListItem)[];
}

export default function RelatedStories({ posts }: RelatedStoriesProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-16 bg-parchment-200/60 border-t border-parchment-300">
      <div className="editorial-container max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Continue Exploring</span>
          </div>
          <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950">
            More Stories From Sakar&apos;s Journal
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
