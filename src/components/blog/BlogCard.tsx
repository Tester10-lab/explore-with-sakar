import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { ExtendedBlogPost } from '@/types/cms';
import { PublicBlogListItem } from '@/lib/content';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost | ExtendedBlogPost | PublicBlogListItem;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article className="group rounded-2xl overflow-hidden bg-sand border border-parchment-300 shadow-subtle hover:shadow-editorial transition-all flex flex-col justify-between transform hover:-translate-y-1">
      {/* Featured Photo */}
      <div className="relative aspect-[16/10] overflow-hidden bg-himalaya-900">
        <Image
          src={post.featuredImage.src}
          alt={post.featuredImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-himalaya-950/80 backdrop-blur-md text-saffron-light text-[10px] uppercase font-bold tracking-wider">
          {post.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[11px] text-himalaya-600 font-light">
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1 text-terracotta-light" />
              {post.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1 text-terracotta-light" />
              {post.readingTime}
            </span>
          </div>

          <h3 className="font-editorial-serif text-lg sm:text-xl font-bold text-himalaya-950 group-hover:text-terracotta transition-colors leading-snug">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="text-xs sm:text-sm text-himalaya-700 font-light line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Tags and Read link */}
        <div className="pt-4 border-t border-parchment-300/80 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 overflow-hidden">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded bg-parchment-50 text-himalaya-700 border border-parchment-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-bold text-terracotta flex items-center group-hover:translate-x-1 transition-transform shrink-0 ml-2"
          >
            <span>Read Story</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
