export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLiveBlogs, getLiveBlogBySlug, getLiveRelatedBlogs } from '@/lib/cms';
import ArticleHeader from '@/components/blog/ArticleHeader';
import ArticleContent from '@/components/blog/ArticleContent';
import AuthorBio from '@/components/blog/AuthorBio';
import JournalCTA from '@/components/blog/JournalCTA';
import RelatedStories from '@/components/blog/RelatedStories';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const blogs = getLiveBlogs(false);
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const post = getLiveBlogBySlug(params.slug, false);
  if (!post) {
    return {
      title: 'Story Not Found — Sakar’s Journal',
    };
  }

  return {
    title: `${post.title} — Sakar's Journal | Explore With Sakar`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'Sakar'],
      images: [
        {
          url: post.featuredImage?.src || '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
          alt: post.featuredImage?.alt || post.title,
        },
      ],
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const post = getLiveBlogBySlug(params.slug, false);

  if (!post) {
    notFound();
  }

  const relatedPosts = getLiveRelatedBlogs(post.slug, 3);

  return (
    <article className="min-h-screen bg-parchment-100 pb-20">
      {/* 1. Magazine Article Header */}
      <ArticleHeader post={post} />

      {/* 2. Article Content with Rich Blocks & Lightbox */}
      <ArticleContent post={post} />

      {/* 3. Bottom Author & Contextual Action Area */}
      <div className="editorial-container max-w-3xl mx-auto px-4 sm:px-6">
        {/* Author Bio Card */}
        <AuthorBio author={post.author} />

        {/* Contextual Journey Booking CTA */}
        <JournalCTA cta={post.contextualCta} />
      </div>

      {/* 4. Related Stories Reel */}
      <RelatedStories posts={relatedPosts} />
    </article>
  );
}
