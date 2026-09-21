'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  ExternalLink,
  Edit3,
  CheckCircle2,
  Clock,
  Globe,
  Layers,
  Plus,
  RefreshCw,
  Sparkles,
  ChevronRight,
  Eye,
  AlertCircle,
  Check,
  X,
  Compass,
  Heart,
  Calendar,
  BookOpen,
  Star,
  Users,
  MapPin,
  Package as PackageIcon,
  HelpCircle,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { PageContent } from '@/types/cms';

type PublicHierarchyCategory =
  | 'all'
  | 'EXPERIENCES'
  | 'EVENTS'
  | 'STORIES'
  | 'ABOUT SAKAR'
  | 'HOMEPAGE'
  | 'EXPLORE & GUIDES'
  | 'INQUIRIES & LEGAL';

function getPageHierarchy(slug: string): string {
  if (
    [
      'beyond-the-map',
      'spiritual-wellness',
      'homestays',
      'leave-a-mark',
      'experiences',
      'custom-journeys',
      'services',
    ].includes(slug)
  ) {
    return 'EXPERIENCES';
  }
  if (slug === 'events') {
    return 'EVENTS';
  }
  if (['blog', 'reviews'].includes(slug)) {
    return 'STORIES';
  }
  if (slug === 'about') {
    return 'ABOUT SAKAR';
  }
  if (slug === 'home') {
    return 'HOMEPAGE';
  }
  if (['destinations', 'packages', 'gallery', 'faq', 'resources'].includes(slug)) {
    return 'EXPLORE & GUIDES';
  }
  return 'INQUIRIES & LEGAL';
}

export default function AdminPagesManagerPage() {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [hierarchyFilter, setHierarchyFilter] = useState<PublicHierarchyCategory>('all');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPage, setNewPage] = useState({ name: '', slug: '', url: '' });
  const [isCreating, setIsCreating] = useState(false);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchPages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/pages');
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPages(data.pages || []);
      } else {
        addToast('error', 'Failed to load pages');
      }
    } catch (err) {
      addToast('error', 'Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      const name = (page.name || '').toLowerCase();
      const slug = (page.slug || '').toLowerCase();
      const url = (page.url || '').toLowerCase();
      const q = searchQuery.toLowerCase();

      const matchesSearch =
        name.includes(q) ||
        slug.includes(q) ||
        url.includes(q);

      const matchesStatus =
        statusFilter === 'all' || page.status === statusFilter;

      const pageCat = getPageHierarchy(page.slug || '');
      const matchesHierarchy =
        hierarchyFilter === 'all' || pageCat === hierarchyFilter;

      return matchesSearch && matchesStatus && matchesHierarchy;
    });
  }, [pages, searchQuery, statusFilter, hierarchyFilter]);

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPage.name || !newPage.slug) {
      addToast('error', 'Page name and slug are required');
      return;
    }

    setIsCreating(true);
    try {
      const cleanSlug = newPage.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newPage.name.trim(),
          slug: cleanSlug,
          url: newPage.url.trim() || `/${cleanSlug}`,
          sections: [
            {
              id: `sec-${Date.now()}-hero`,
              type: 'hero',
              label: 'Hero Header Section',
              visible: true,
              order: 0,
              content: { title: newPage.name.trim() },
            },
          ],
        }),
      });

      if (res.ok) {
        addToast('success', `Created page "${newPage.name}"`);
        setShowCreateModal(false);
        setNewPage({ name: '', slug: '', url: '' });
        fetchPages();
      } else {
        const err = await res.json();
        addToast('error', err.error || 'Failed to create page');
      }
    } catch {
      addToast('error', 'Server error while creating page');
    } finally {
      setIsCreating(false);
    }
  };

  const HIERARCHY_TABS: { label: string; value: PublicHierarchyCategory }[] = [
    { label: 'All Pages', value: 'all' },
    { label: 'EXPERIENCES', value: 'EXPERIENCES' },
    { label: 'EVENTS', value: 'EVENTS' },
    { label: 'STORIES', value: 'STORIES' },
    { label: 'ABOUT SAKAR', value: 'ABOUT SAKAR' },
    { label: 'HOMEPAGE', value: 'HOMEPAGE' },
    { label: 'EXPLORE & GUIDES', value: 'EXPLORE & GUIDES' },
    { label: 'INQUIRIES & LEGAL', value: 'INQUIRIES & LEGAL' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <AdminHeader
        title="All Website Pages"
        subtitle="Manage and visually edit every public website page, section structure, and SEO metadata."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Public Hierarchy Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {HIERARCHY_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setHierarchyFilter(tab.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide uppercase whitespace-nowrap transition-all ${
                hierarchyFilter === tab.value
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Top Control Bar */}
        <div className="bg-slate-900/80 border border-slate-800 backdrop-blur rounded-2xl p-4 sm:p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl shadow-black/20">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by page name, slug, or path..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 bg-slate-950/50 p-1 rounded-xl border border-slate-800">
              {(['all', 'published', 'draft'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                    statusFilter === filter
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchPages}
              className="p-2.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all"
              title="Refresh pages list"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Page</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-medium">Total Public Pages</p>
            <p className="text-2xl font-bold text-slate-100 mt-1">{pages.length}</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-medium">Live & Published</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">
              {pages.filter((p) => p.status === 'published').length}
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-medium">Draft Modifications</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">
              {pages.filter((p) => p.status === 'draft').length}
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
            <p className="text-xs text-slate-400 font-medium">Configured Sections</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">
              {pages.reduce((acc, p) => acc + (p.sections?.length || 0), 0)}
            </p>
          </div>
        </div>

        {/* Pages Grid / Table */}
        {isLoading ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
            <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mb-4" />
            <p className="text-slate-400 text-sm">Loading public pages inventory...</p>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-16 text-center">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-200 mb-1">No pages found</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
              {searchQuery
                ? `No pages match "${searchQuery}"`
                : 'No pages found in this category filter.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPages.map((page) => {
              const hierarchy = getPageHierarchy(page.slug);

              return (
                <div
                  key={page.slug}
                  className="bg-slate-900/80 hover:bg-slate-850 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-sm hover:shadow-md hover:shadow-black/30"
                >
                  {/* Left info */}
                  <div className="flex items-start sm:items-center gap-4 flex-1">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="font-semibold text-slate-100 text-base group-hover:text-amber-300 transition-colors">
                          {page.name}
                        </h4>

                        {/* Public Hierarchy Pill */}
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-amber-400 border border-slate-700">
                          {hierarchy}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            page.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {page.status === 'published' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              Live
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3" />
                              Draft
                            </>
                          )}
                        </span>

                        {page.seo?.title && (
                          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                            <Globe className="w-3 h-3 text-slate-400" />
                            SEO Ready
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                        <span className="font-mono text-slate-400">{page.url}</span>
                        <span className="text-slate-600">•</span>
                        <span className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-slate-500" />
                          {page.sections?.length || 0} Sections
                        </span>
                        {page.updatedAt && (
                          <>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-400">
                              Updated {new Date(page.updatedAt).toLocaleDateString()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
                      title="View public page in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Live</span>
                    </a>

                    <Link
                      href={`/admin/preview?slug=${page.slug}`}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-amber-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
                      title="Open Live Preview with Device Switcher"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </Link>

                    <Link
                      href={`/admin/pages/${page.slug}`}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-all shadow-md shadow-amber-500/10 hover:scale-[1.02]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Sections</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                Add New Public Page
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePage} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Page Display Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Village Homestays & Living Culture"
                  value={newPage.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '');
                    setNewPage({
                      name,
                      slug: newPage.slug ? newPage.slug : slug,
                      url: newPage.url ? newPage.url : `/${slug}`,
                    });
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  URL Slug identifier
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. homestays-culture"
                  value={newPage.slug}
                  onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Public Website Route Path
                </label>
                <input
                  type="text"
                  placeholder="e.g. /experiences/homestays"
                  value={newPage.url}
                  onChange={(e) => setNewPage({ ...newPage, url: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isCreating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Create Page
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
