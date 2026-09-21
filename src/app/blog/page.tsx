import React from 'react';
import { Metadata } from 'next';
import { getPublicBlogs, getPublicTopFeaturedExperiences } from '@/lib/content';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Sakar’s Journal & Essays | Explore With Sakar',
  description: 'Personal essays, cultural reflections, and field dispatches from Sakar on slow travel, Himalayan spirituality, and Nepal community heritage.',
};

export default async function BlogPage() {
  const [blogs, topExperiences] = await Promise.all([
    getPublicBlogs(),
    getPublicTopFeaturedExperiences(3),
  ]);

  const lightweightExperiences = topExperiences.map((e) => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    location: e.location,
    duration: e.duration,
    shortDescription: e.shortDescription,
    heroImage: e.heroImage ? { src: e.heroImage.src, alt: e.heroImage.alt } : undefined,
    status: 'published' as const,
    featured: true,
  }));

  return <BlogClient initialBlogs={blogs} initialExperiences={lightweightExperiences as any} />;
}
