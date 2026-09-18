'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';
import { ExtendedBlogPost } from '@/types/cms';
import { Loader2 } from 'lucide-react';

export default function EditBlogPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [blog, setBlog] = useState<ExtendedBlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlog() {
      if (!slug) return;
      try {
        setIsLoading(true);
        const res = await fetch(`/api/admin/blogs/${slug}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        });
        if (!res.ok) throw new Error('Blog post not found');
        const data = await res.json();
        setBlog(data.blog);
      } catch (err: any) {
        setError(err?.message || 'Error loading post');
      } finally {
        setIsLoading(false);
      }
    }
    loadBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-parchment-300">
        <Loader2 className="w-8 h-8 text-terracotta animate-spin" />
        <p className="text-xs uppercase tracking-wider font-semibold">Loading article content...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-center px-4">
        <p className="text-rose-400 font-semibold">{error || 'Article not found'}</p>
      </div>
    );
  }

  return <BlogEditor initialBlog={blog} isNew={false} />;
}
