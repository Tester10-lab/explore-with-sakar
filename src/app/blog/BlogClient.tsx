'use client';

import React, { useState, useMemo } from 'react';
import { BlogCategory } from '@/types';
import JournalHero from '@/components/blog/JournalHero';
import BlogCategoryFilter from '@/components/blog/BlogCategoryFilter';
import FeaturedStory from '@/components/blog/FeaturedStory';
import BlogCard from '@/components/blog/BlogCard';
import BlogFeaturedExperiences from '@/components/blog/BlogFeaturedExperiences';
import { ExtendedExperience } from '@/types/cms';
import { PublicBlogListItem } from '@/lib/content';

interface BlogClientProps {
  initialBlogs: PublicBlogListItem[];
  initialExperiences: ExtendedExperience[];
}

export default function BlogClient({ initialBlogs, initialExperiences }: BlogClientProps) {
  const [blogs] = useState<PublicBlogListItem[]>(initialBlogs);
  const [experiences] = useState<ExtendedExperience[]>(initialExperiences);
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'All'>('All');

  const topExperiences = useMemo(() => {
    const candidates = experiences.filter(
      (e) =>
        e.status === 'published' &&
        (e.featured || (e.featuredOrder !== undefined && e.featuredOrder > 0) || e.blogVisible !== false)
    );
    const pool = candidates.length >= 3 ? candidates : experiences;
    return [...pool]
      .sort((a, b) => {
        const orderA = a.featuredOrder !== undefined && a.featuredOrder > 0 ? a.featuredOrder : (a.featured ? 10 : 99);
        const orderB = b.featuredOrder !== undefined && b.featuredOrder > 0 ? b.featuredOrder : (b.featured ? 10 : 99);
        return orderA - orderB;
      })
      .slice(0, 3);
  }, [experiences]);

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
        {featuredPost && <FeaturedStory post={featuredPost as any} />}

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
                <BlogCard key={post.slug} post={post as any} />
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

      {/* 5. Top 3 Experiences Linked from Stories */}
      {topExperiences.length > 0 && (
        <BlogFeaturedExperiences experiences={topExperiences} />
      )}
    </div>
  );
}
