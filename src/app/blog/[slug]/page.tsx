import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPublicBlogBySlug,
  getPublicRelatedBlogs,
  getPublicTopFeaturedExperiences,
} from '@/lib/content';
import ArticleHeader from '@/components/blog/ArticleHeader';
import ArticleContent from '@/components/blog/ArticleContent';
import AuthorBio from '@/components/blog/AuthorBio';
import JournalCTA from '@/components/blog/JournalCTA';
import RelatedStories from '@/components/blog/RelatedStories';
import BlogFeaturedExperiences from '@/components/blog/BlogFeaturedExperiences';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const post = await getPublicBlogBySlug(params.slug);
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

export default async function ArticlePage({ params }: ArticlePageProps) {
  const post = await getPublicBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const [relatedPosts, featuredExperiences] = await Promise.all([
    getPublicRelatedBlogs(post.slug, 3),
    getPublicTopFeaturedExperiences(3),
  ]);

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
        {post.contextualCta ? (
          <JournalCTA cta={post.contextualCta} />
        ) : (
          <JournalCTA
            cta={{
              title: 'Create Your Own Himalayan Story with Sakar',
              description:
                'Explore the quiet valleys, sacred spaces, and living heritage described in this journal.',
              buttonText: 'Consult Sakar',
            }}
          />
        )}
      </div>

      {/* 4. Top 3 Experiences Linked from Story */}
      <BlogFeaturedExperiences
        experiences={featuredExperiences}
        title="Featured Journeys Connected to Our Stories"
      />

      {/* 5. Related Stories Reel */}
      <RelatedStories posts={relatedPosts} />
    </article>
  );
}
