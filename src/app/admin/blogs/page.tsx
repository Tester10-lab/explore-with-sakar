'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Clock,
  Calendar,
  Filter,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { ExtendedBlogPost } from '@/types/cms';
import { BlogCategory } from '@/types';

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<ExtendedBlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState<ExtendedBlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/blogs', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || []);
      } else {
        showToast('error', 'Failed to fetch blogs');
      }
    } catch (err) {
      showToast('error', 'Failed to fetch blogs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleToggleStatus = async (blog: ExtendedBlogPost) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/admin/blogs/${blog.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      showToast(
        'success',
        `Article "${blog.title || blog.slug}" marked as ${newStatus}`
      );
      router.refresh();
      fetchBlogs();
    } catch (err: any) {
      showToast('error', err?.message || 'Error updating status');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const targetKey = deleteTarget.id || deleteTarget.slug;
      const res = await fetch(`/api/admin/blogs/${encodeURIComponent(targetKey)}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete blog post');

      showToast('success', `Deleted "${deleteTarget.title || deleteTarget.slug}"`);
      setDeleteTarget(null);
      router.refresh();
      fetchBlogs();
    } catch (err: any) {
      showToast('error', err?.message || 'Error deleting blog');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const title = (blog.title || '').toLowerCase();
    const slug = (blog.slug || '').toLowerCase();
    const excerpt = (blog.excerpt || '').toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      title.includes(q) ||
      slug.includes(q) ||
      excerpt.includes(q);

    const matchesCategory =
      selectedCategory === 'all' || blog.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'all' || blog.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />

      <AdminHeader
        title="Stories: Sakar’s Journal & Blogs"
        subtitle={`Total of ${blogs.length} stories & field notes published in the Himalayan Journal`}
        actionButton={{
          label: 'Write New Story',
          href: '/admin/blogs/new',
          icon: <Plus className="w-4 h-4" />,
        }}
      />

      <div className="px-4 sm:px-8 space-y-6 max-w-7xl mx-auto">
        {/* Filter & Search Bar */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-4 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-himalaya-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, excerpt or slug..."
              className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl pl-10 pr-4 py-2 text-xs text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-himalaya-950 border border-himalaya-700 rounded-xl px-3 py-2 text-xs text-parchment-200 focus:outline-none focus:border-terracotta"
            >
              <option value="all">All Categories</option>
              <option value="Sakar's Journal">Sakar&apos;s Journal</option>
              <option value="Spiritual Nepal">Spiritual Nepal</option>
              <option value="Living Culture">Living Culture</option>
              <option value="People & Places">People & Places</option>
              <option value="Travel With Meaning">Travel With Meaning</option>
              <option value="Walking Nepal">Walking Nepal</option>
              <option value="Practical Nepal">Practical Nepal</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-himalaya-950 border border-himalaya-700 rounded-xl px-3 py-2 text-xs text-parchment-200 focus:outline-none focus:border-terracotta"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>

        {/* Blogs Table / Cards */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl overflow-hidden shadow-floating">
          {isLoading ? (
            <div className="py-20 text-center text-sm text-parchment-400 font-light">
              Loading articles...
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <p className="text-parchment-300 text-sm">No articles match your search criteria.</p>
              <Link
                href="/admin/blogs/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta text-white rounded-xl text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Write a new blog</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-himalaya-800">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id || blog.slug}
                  className="p-5 hover:bg-himalaya-850/50 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  {/* Left info */}
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-himalaya-950 shrink-0 relative border border-himalaya-700">
                      <img
                        src={blog.featuredImage?.src || '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg'}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-terracotta/15 text-terracotta-light">
                          {blog.category}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                            blog.status === 'published'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}
                        >
                          {blog.status}
                        </span>
                        <span className="text-[11px] text-himalaya-400 font-mono">
                          {blog.publishedAt}
                        </span>
                      </div>

                      <h3 className="text-base font-editorial-serif font-bold text-white leading-snug">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-parchment-400 font-light line-clamp-1 max-w-xl">
                        {blog.excerpt || 'No excerpt provided.'}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(blog)}
                      title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        blog.status === 'published'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-800/80 hover:bg-amber-900'
                      }`}
                    >
                      {blog.status === 'published' ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg bg-himalaya-800 hover:bg-himalaya-750 text-parchment-300 hover:text-white transition-colors"
                      title="View live public post"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <Link
                      href={`/admin/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-himalaya-800 hover:bg-himalaya-750 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => setDeleteTarget(blog)}
                      className="p-2 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-950/50 transition-colors"
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Blog Article"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? This will remove it from your CMS and public website.`}
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete Article'}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
