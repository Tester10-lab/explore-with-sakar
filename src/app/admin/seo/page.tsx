'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Globe,
  Search,
  ExternalLink,
  Edit3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Eye,
  Check,
  X,
  RefreshCw,
  Save,
  Loader2,
  FileText,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { PageContent, PageSeo } from '@/types/cms';
import SeoGeoAeoAuditor from '@/components/admin/SeoGeoAeoAuditor';
import { SITE_ORIGIN } from '@/lib/config';

export default function AdminSeoPage() {
  const router = useRouter();
  const [pages, setPages] = useState<PageContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'needs-review' | 'no-index' | 'excluded-sitemap'>('all');

  const [activeMainTab, setActiveMainTab] = useState<'metadata' | 'auditor'>('metadata');
  const [auditorTargetSlug, setAuditorTargetSlug] = useState<string>('home');

  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [formData, setFormData] = useState<PageSeo>({});
  const [isSaving, setIsSaving] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleApplyFix = async (pageSlug: string, updates: { title?: string; metaDescription?: string }) => {
    const page = pages.find((p) => p.slug === pageSlug);
    if (!page) return;

    try {
      const updatedSeo = {
        ...(page.seo || {}),
        ...updates,
      };

      const res = await fetch(`/api/admin/pages/${pageSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seo: updatedSeo }),
      });

      if (res.ok) {
        addToast('success', `Applied recommendations to ${page.name}`);
        setPages((prev) =>
          prev.map((p) => (p.slug === pageSlug ? { ...p, seo: updatedSeo } : p))
        );
      } else {
        addToast('error', 'Failed to save recommendations');
      }
    } catch {
      addToast('error', 'Network error applying recommendation');
    }
  };

  const fetchPages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/pages');
      if (res.ok) {
        const data = await res.json();
        setPages(data.pages || []);
      } else {
        addToast('error', 'Failed to load pages');
      }
    } catch {
      addToast('error', 'Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const openEditModal = (page: PageContent) => {
    setEditingPage(page);
    setFormData({
      title: page.seo?.title || page.name,
      metaDescription: page.seo?.metaDescription || '',
      canonicalUrl: page.seo?.canonicalUrl || `${SITE_ORIGIN}${page.url === '/' ? '' : page.url}`,
      ogTitle: page.seo?.ogTitle || page.seo?.title || page.name,
      ogDescription: page.seo?.ogDescription || page.seo?.metaDescription || '',
      ogImage: page.seo?.ogImage || '',
      noIndex: page.seo?.noIndex || false,
      sitemapVisible: page.seo?.sitemapVisible !== false,
      keywords: page.seo?.keywords || '',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage || isSaving) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/pages/${editingPage.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seo: formData,
        }),
      });

      if (res.ok) {
        setPages((prev) =>
          prev.map((p) =>
            p.slug === editingPage.slug ? { ...p, seo: formData, updatedAt: new Date().toISOString() } : p
          )
        );
        addToast('success', `Saved SEO settings for "${editingPage.name}"`);
        setEditingPage(null);
        router.refresh();
      } else {
        const err = await res.json().catch(() => ({}));
        addToast('error', err.error || 'Failed to update SEO');
      }
    } catch {
      addToast('error', 'Network error while saving SEO');
    } finally {
      setIsSaving(false);
    }
  };

  // Metrics
  const stats = useMemo(() => {
    const total = pages.length;
    const indexed = pages.filter((p) => !p.seo?.noIndex).length;
    const inSitemap = pages.filter((p) => p.seo?.sitemapVisible !== false).length;
    const completeDesc = pages.filter(
      (p) => (p.seo?.metaDescription || '').length >= 100
    ).length;
    return { total, indexed, inSitemap, completeDesc };
  }, [pages]);

  // Filtered pages
  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      // Filter mode
      if (filterMode === 'no-index' && !page.seo?.noIndex) return false;
      if (filterMode === 'excluded-sitemap' && page.seo?.sitemapVisible !== false) return false;
      if (filterMode === 'needs-review') {
        const descLen = (page.seo?.metaDescription || '').length;
        const titleLen = (page.seo?.title || '').length;
        if (descLen >= 120 && titleLen >= 40) return false;
      }

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        page.name.toLowerCase().includes(q) ||
        page.slug.toLowerCase().includes(q) ||
        page.url.toLowerCase().includes(q) ||
        (page.seo?.title && page.seo.title.toLowerCase().includes(q)) ||
        (page.seo?.keywords && page.seo.keywords.toLowerCase().includes(q))
      );
    });
  }, [pages, filterMode, searchQuery]);

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <AdminHeader
        title="SEO & Metadata Manager"
        subtitle="Manage page titles, meta descriptions, OpenGraph tags, indexing, and run automated SEO/GEO/AEO audits across all pages."
      />

      {/* Top Level Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-himalaya-900 border border-himalaya-800 rounded-2xl">
        <button
          onClick={() => setActiveMainTab('metadata')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
            activeMainTab === 'metadata'
              ? 'bg-terracotta text-white shadow-subtle'
              : 'text-parchment-300 hover:text-white hover:bg-himalaya-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Page Metadata & Indexing</span>
        </button>

        <button
          onClick={() => setActiveMainTab('auditor')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
            activeMainTab === 'auditor'
              ? 'bg-terracotta text-white shadow-subtle'
              : 'text-parchment-300 hover:text-white hover:bg-himalaya-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Automated SEO / GEO / AEO Auditor</span>
          <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
            Perplexity & ChatGPT Ready
          </span>
        </button>
      </div>

      {activeMainTab === 'auditor' ? (
        <SeoGeoAeoAuditor
          pages={pages}
          initialSlug={auditorTargetSlug}
          onApplyFix={handleApplyFix}
          onRefresh={fetchPages}
        />
      ) : (
        <>
          {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-himalaya-400 font-semibold">Total Pages</p>
            <p className="font-editorial-serif text-3xl font-bold text-parchment-100 mt-1">{stats.total}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-himalaya-800 text-parchment-200 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Indexed Pages</p>
            <p className="font-editorial-serif text-3xl font-bold text-emerald-400 mt-1">{stats.indexed}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-saffron font-semibold">Sitemap Visible</p>
            <p className="font-editorial-serif text-3xl font-bold text-saffron mt-1">{stats.inSitemap}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-saffron/15 text-saffron flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-terracotta-light font-semibold">Rich Descriptions</p>
            <p className="font-editorial-serif text-3xl font-bold text-terracotta-light mt-1">{stats.completeDesc}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-terracotta/20 text-terracotta-light flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-himalaya-950 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'all', label: 'All Pages' },
            { id: 'needs-review', label: 'Needs Review' },
            { id: 'no-index', label: 'No-Index' },
            { id: 'excluded-sitemap', label: 'Excluded Sitemap' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterMode(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                filterMode === tab.id
                  ? 'bg-terracotta text-white shadow-subtle'
                  : 'text-parchment-300 hover:text-white hover:bg-himalaya-850'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Refresh */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-himalaya-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by page name, slug, keywords..."
              className="w-full pl-9 pr-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 placeholder:text-himalaya-500 focus:outline-none focus:border-terracotta"
            />
          </div>

          <button
            onClick={fetchPages}
            className="p-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 hover:text-white transition-colors"
            title="Refresh Pages"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Pages Table */}
      <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl overflow-hidden shadow-floating">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-himalaya-800 bg-himalaya-950/60 text-[11px] font-bold uppercase tracking-wider text-himalaya-400">
                <th className="py-3.5 px-4">Page & URL</th>
                <th className="py-3.5 px-4">SEO Title</th>
                <th className="py-3.5 px-4">Meta Description</th>
                <th className="py-3.5 px-4">Indexing</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-himalaya-850 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-himalaya-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-terracotta" />
                    <span>Loading pages SEO data...</span>
                  </td>
                </tr>
              ) : filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-himalaya-400">
                    <Globe className="w-8 h-8 mx-auto mb-2 opacity-40 text-himalaya-500" />
                    <p className="font-semibold text-parchment-200">No pages found</p>
                    <p className="text-[11px] text-himalaya-500 mt-0.5">Try clearing search filters.</p>
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => {
                  const title = page.seo?.title || page.name;
                  const desc = page.seo?.metaDescription || '';
                  const isNoIndex = page.seo?.noIndex === true;
                  const isSitemap = page.seo?.sitemapVisible !== false;

                  return (
                    <tr key={page.slug} className="hover:bg-himalaya-850/60 transition-colors">
                      {/* Page info */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-parchment-100 flex items-center gap-1.5">
                          <span>{page.name}</span>
                        </div>
                        <div className="text-[11px] text-himalaya-400 mt-0.5 flex items-center gap-2">
                          <code className="text-terracotta-light font-mono text-[10px]">{page.url}</code>
                          <a
                            href={page.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-himalaya-500 hover:text-parchment-200"
                            title="View public page"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        {page.seo?.keywords && (
                          <div className="mt-1 text-[10px] text-himalaya-500 truncate max-w-[200px]">
                            <span className="font-semibold text-himalaya-400">Notes: </span>
                            {page.seo.keywords}
                          </div>
                        )}
                      </td>

                      {/* SEO Title */}
                      <td className="py-3.5 px-4 max-w-[240px]">
                        <p className="text-parchment-200 font-medium truncate" title={title}>
                          {title}
                        </p>
                        <span
                          className={`text-[10px] font-mono ${
                            title.length >= 40 && title.length <= 65
                              ? 'text-emerald-400'
                              : 'text-saffron'
                          }`}
                        >
                          {title.length} chars
                        </span>
                      </td>

                      {/* Meta Description */}
                      <td className="py-3.5 px-4 max-w-[300px]">
                        <p className="text-himalaya-300 truncate font-light" title={desc}>
                          {desc || <span className="text-rose-400 italic">No description set</span>}
                        </p>
                        <span
                          className={`text-[10px] font-mono ${
                            desc.length >= 120 && desc.length <= 165
                              ? 'text-emerald-400'
                              : desc.length === 0
                              ? 'text-rose-400'
                              : 'text-saffron'
                          }`}
                        >
                          {desc.length} chars
                        </span>
                      </td>

                      {/* Indexing Badges */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1 items-start">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isNoIndex
                                ? 'bg-rose-950/60 text-rose-400 border border-rose-800/50'
                                : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                            }`}
                          >
                            {isNoIndex ? 'No-Index' : 'Indexable'}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isSitemap
                                ? 'bg-saffron/15 text-saffron border border-saffron/30'
                                : 'bg-himalaya-800 text-himalaya-500 border border-himalaya-700'
                            }`}
                          >
                            {isSitemap ? 'Sitemap Yes' : 'Sitemap No'}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setAuditorTargetSlug(page.slug);
                              setActiveMainTab('auditor');
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 text-xs font-semibold transition-all border border-amber-500/30 shadow-xs"
                            title="Run automated 3-pillar audit (SEO / GEO / AEO) for this page"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:text-slate-950" />
                            <span>Audit</span>
                          </button>
                          <button
                            onClick={() => openEditModal(page)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-himalaya-800 hover:bg-terracotta text-parchment-200 hover:text-white text-xs font-semibold transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit SEO</span>
                          </button>
                          <a
                            href={page.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-200 hover:text-white text-xs font-semibold transition-colors border border-himalaya-700/60"
                            title={`Open ${page.name} (${page.url}) in new tab`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Open Page</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}

      {/* Edit SEO Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-himalaya-900 border border-himalaya-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-himalaya-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-terracotta font-bold">
                  Editing Page SEO & Metadata
                </span>
                <h3 className="font-editorial-serif text-2xl font-bold text-parchment-100">
                  {editingPage.name}
                </h3>
                <code className="text-xs text-himalaya-400 font-mono">{editingPage.url}</code>
              </div>
              <button
                onClick={() => setEditingPage(null)}
                className="p-1.5 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Google SERP Snippet Preview */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-himalaya-400 block">
                Google Search Result Preview
              </label>
              <div className="p-4 rounded-2xl bg-[#202124] border border-himalaya-800 font-sans space-y-1">
                <div className="text-[12px] text-[#bdc1c6] truncate flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-himalaya-700 inline-flex items-center justify-center text-[9px] text-white">
                    S
                  </span>
                  <span>{SITE_ORIGIN} › {editingPage.slug}</span>
                </div>
                <h4 className="text-[18px] text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-snug truncate">
                  {formData.title || editingPage.name}
                </h4>
                <p className="text-[13px] text-[#bdc1c6] leading-relaxed line-clamp-2">
                  {formData.metaDescription || 'No meta description configured for this page.'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Title Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-himalaya-300">
                    SEO Meta Title *
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      (formData.title || '').length >= 45 && (formData.title || '').length <= 65
                        ? 'text-emerald-400 font-bold'
                        : 'text-himalaya-400'
                    }`}
                  >
                    {(formData.title || '').length} / 60 recommended
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Go Beyond the Map | Authentic Exploration with Sakar"
                  className="w-full px-4 py-2.5 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 placeholder:text-himalaya-500 focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-himalaya-300">
                    SEO Meta Description *
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      (formData.metaDescription || '').length >= 130 &&
                      (formData.metaDescription || '').length <= 165
                        ? 'text-emerald-400 font-bold'
                        : 'text-himalaya-400'
                    }`}
                  >
                    {(formData.metaDescription || '').length} / 155 recommended
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={formData.metaDescription || ''}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Compelling description summarizing this page for search results (approx 150-160 characters)..."
                  className="w-full px-4 py-2.5 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 placeholder:text-himalaya-500 focus:outline-none focus:border-terracotta leading-relaxed"
                />
              </div>

              {/* Canonical URL & Keywords Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-himalaya-300 mb-1.5">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={formData.canonicalUrl || ''}
                    onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                    placeholder="https://explorewithsakar.com/..."
                    className="w-full px-4 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 placeholder:text-himalaya-500 focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-himalaya-300 mb-1.5">
                    Internal Keywords / Strategy Notes
                  </label>
                  <input
                    type="text"
                    value={formData.keywords || ''}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="e.g. nepal homestays, gurung culture, slow travel"
                    className="w-full px-4 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 placeholder:text-himalaya-500 focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Social / OpenGraph Group */}
              <div className="p-4 rounded-2xl bg-himalaya-950/80 border border-himalaya-800 space-y-4">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-terracotta flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>OpenGraph & Social Sharing Cards</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-himalaya-300 mb-1">OG Title (Optional)</label>
                    <input
                      type="text"
                      value={formData.ogTitle || ''}
                      onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                      placeholder="Defaults to SEO title if blank"
                      className="w-full px-3 py-2 bg-himalaya-900 border border-himalaya-800 rounded-xl text-xs text-parchment-100 placeholder:text-himalaya-600 focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-himalaya-300 mb-1">OG Image URL (Optional)</label>
                    <input
                      type="text"
                      value={formData.ogImage || ''}
                      onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                      placeholder="/explore-with-sakar/images/..."
                      className="w-full px-3 py-2 bg-himalaya-900 border border-himalaya-800 rounded-xl text-xs text-parchment-100 placeholder:text-himalaya-600 focus:outline-none focus:border-terracotta"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-himalaya-300 mb-1">OG Description (Optional)</label>
                  <input
                    type="text"
                    value={formData.ogDescription || ''}
                    onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                    placeholder="Defaults to meta description if blank"
                    className="w-full px-3 py-2 bg-himalaya-900 border border-himalaya-800 rounded-xl text-xs text-parchment-100 placeholder:text-himalaya-600 focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Indexing & Sitemap Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-himalaya-950 border border-himalaya-800 cursor-pointer hover:bg-himalaya-850/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.noIndex === true}
                    onChange={(e) => setFormData({ ...formData, noIndex: e.target.checked })}
                    className="mt-0.5 rounded text-terracotta focus:ring-terracotta"
                  />
                  <div>
                    <span className="text-xs font-bold text-parchment-200 block">Robots No-Index</span>
                    <span className="text-[11px] text-himalaya-400 leading-tight block mt-0.5">
                      Instruct search engines not to index this page (e.g. private or duplicate pages).
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-himalaya-950 border border-himalaya-800 cursor-pointer hover:bg-himalaya-850/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.sitemapVisible !== false}
                    onChange={(e) => setFormData({ ...formData, sitemapVisible: e.target.checked })}
                    className="mt-0.5 rounded text-terracotta focus:ring-terracotta"
                  />
                  <div>
                    <span className="text-xs font-bold text-parchment-200 block">Include in XML Sitemap</span>
                    <span className="text-[11px] text-himalaya-400 leading-tight block mt-0.5">
                      Publish this URL in the public sitemap.xml feed.
                    </span>
                  </div>
                </label>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-himalaya-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-5 py-2.5 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-xs font-bold transition-all shadow-warm flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save SEO Settings</span>
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
