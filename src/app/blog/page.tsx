'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { BLOG_POSTS } from '@/data/blog';
import { BlogCategory } from '@/types';
import JournalHero from '@/components/blog/JournalHero';
import BlogCategoryFilter from '@/components/blog/BlogCategoryFilter';
import FeaturedStory from '@/components/blog/FeaturedStory';
import BlogCard from '@/components/blog/BlogCard';
import { ExtendedBlogPost } from '@/types/cms';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<ExtendedBlogPost[]>(
    BLOG_POSTS.map((p, i) => ({
      ...p,
      id: `blog-${i + 1}-${p.slug}`,
      status: p.isDraftSample ? 'draft' : 'published',
      createdAt: new Date(p.publishedAt || Date.now()).toISOString(),
      updatedAt: new Date().toISOString(),
    }))
  );
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'All'>('All');

  useEffect(() => {
    async function loadLiveBlogs() {
      try {
        const res = await fetch('/api/public/content', {
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          if (data.blogs && data.blogs.length > 0) {
            setBlogs(data.blogs);
          }
        }
      } catch (err) {
        // Fallback in state
      }
    }
    loadLiveBlogs();
  }, []);

  const publishedPosts = useMemo(() => {
    return blogs.filter((b) => b.status === 'published');
  }, [blogs]);

  // Category counts
  const counts = useMemo(() => {
    const map: Record<string, number> = { total: publishedPosts.length };
    publishedPosts.forEach((post) => {
      map[post.category] = (map[post.category] || 0) + 1;
    });
    return map;
  }, [publishedPosts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return publishedPosts;
    return publishedPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory, publishedPosts]);

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-parchment-100 pb-20">
      {/* 1. Magazine Journal Hero */}
      <JournalHero />

      <div className="editorial-container py-10">
        {/* 2. Category Filter Tabs */}
        <div className="mb-10">
          <BlogCategoryFilter
            activeCategory={activeCategory}
            onSelectCategory={(cat) => setActiveCategory(cat)}
            counts={counts}
          />
        </div>

        {/* 3. Featured Story */}
        {featuredPost && <FeaturedStory post={featuredPost} />}

        {/* 4. Editorial Stories Grid */}
        {gridPosts.length > 0 ? (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold text-himalaya-950">
                {activeCategory === 'All' ? 'Recent Stories & Essays' : `${activeCategory} Stories`}
              </h3>
              <span className="text-xs text-himalaya-600 font-mono">
                Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {gridPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-sand rounded-2xl border border-parchment-300">
            <p className="text-himalaya-700 text-sm">
              More reflections in &ldquo;{activeCategory}&rdquo; are currently being written by Sakar.
            </p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 px-4 py-2 rounded-lg bg-terracotta text-white text-xs font-bold"
            >
              View All Stories
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
