import React from 'react';
import { Metadata } from 'next';
import { getPublicBlogs, getPublicExperiences } from '@/lib/content';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Sakar’s Journal & Essays | Explore With Sakar',
  description: 'Personal essays, cultural reflections, and field dispatches from Sakar on slow travel, Himalayan spirituality, and Nepal community heritage.',
};

export default async function BlogPage() {
  const [blogs, experiences] = await Promise.all([
    getPublicBlogs(),
    getPublicExperiences(),
  ]);

  return <BlogClient initialBlogs={blogs} initialExperiences={experiences} />;
}
