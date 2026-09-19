'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Eye,
  Save,
  Send,
  History,
  Globe,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  EyeOff,
  Edit2,
  Smartphone,
  Tablet,
  Monitor,
  ExternalLink,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight,
  X,
  Check,
  AlertCircle,
  RefreshCw,
  Code,
  Image as ImageIcon,
  HelpCircle,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { PageContent, PageSection, PageSeo, PageRevision } from '@/types/cms';

export default function AdminPageEditor() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || 'home';

  const [page, setPage] = useState<PageContent | null>(null);
  const [revisions, setRevisions] = useState<PageRevision[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // View state
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showPreviewPane, setShowPreviewPane] = useState(false);
  const [activeTab, setActiveTab] = useState<'sections' | 'seo' | 'history'>('sections');
  const [previewKey, setPreviewKey] = useState(0);

  // Section Editing Modal
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);

  // Revisions Modal / Drawer
  const [restoringRevisionId, setRestoringRevisionId] = useState<string | null>(null);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => {
      // Avoid exact duplicate consecutive message stacking
      const filtered = prev.filter((t) => t.message !== message);
      return [...filtered, { id, type, message }];
    });
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchPage = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/pages/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setPage(data.page);
      } else {
        addToast('error', 'Failed to load page content');
      }
    } catch {
      addToast('error', 'Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRevisions = async () => {
    try {
      const res = await fetch(`/api/admin/pages/${slug}/revisions`);
      if (res.ok) {
        const data = await res.json();
        setRevisions(data.revisions || []);
      }
    } catch (err) {
      console.error('Error loading revisions:', err);
    }
  };

  useEffect(() => {
    fetchPage();
    fetchRevisions();
  }, [slug]);

  // Section Handlers
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if (!page) return;
    const sections = [...page.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const temp = sections[index];
    sections[index] = sections[targetIndex];
    sections[targetIndex] = temp;

    // re-assign order numbers
    const updated = sections.map((s, idx) => ({ ...s, order: idx }));
    setPage({ ...page, sections: updated });
    addToast('info', 'Section order adjusted (unsaved)');
  };

  const handleToggleVisibility = (index: number) => {
    if (!page) return;
    const sections = [...page.sections];
    sections[index] = { ...sections[index], visible: !sections[index].visible };
    setPage({ ...page, sections });
    addToast('info', `Section ${sections[index].visible ? 'enabled' : 'hidden'} (unsaved)`);
  };

  const handleDeleteSection = (index: number) => {
    if (!page) return;
    if (!confirm('Are you sure you want to remove this section from the page?')) return;
    const sections = page.sections.filter((_, idx) => idx !== index).map((s, idx) => ({ ...s, order: idx }));
    setPage({ ...page, sections });
    addToast('info', 'Section removed (unsaved)');
  };

  const handleSaveSectionEdits = (updatedSection: PageSection) => {
    if (!page) return;
    const sections = page.sections.map((s) => (s.id === updatedSection.id ? updatedSection : s));
    setPage({ ...page, sections });
    setEditingSection(null);
    addToast('success', 'Section details updated (unsaved)');
  };

  const handleAddSection = (type: string, label: string) => {
    if (!page) return;
    const newSection: PageSection = {
      id: `sec-${Date.now()}`,
      type,
      label,
      visible: true,
      order: page.sections.length,
      content: {
        title: label,
        subtitle: '',
        body: '',
      },
    };
    setPage({ ...page, sections: [...page.sections, newSection] });
    setShowAddSectionModal(false);
    addToast('success', `Added "${label}" section (unsaved)`);
  };

  // SEO Update
  const handleSeoChange = (key: keyof PageSeo, value: any) => {
    if (!page) return;
    setPage({
      ...page,
      seo: {
        ...page.seo,
        [key]: value,
      },
    });
  };

  // Save / Publish
  const handleSaveDraft = async () => {
    if (!page) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...page,
          status: 'draft',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPage(data.page);
        addToast('success', 'Draft saved successfully');
        fetchRevisions();
        setPreviewKey((k) => k + 1);
      } else {
        addToast('error', 'Failed to save draft');
      }
    } catch {
      addToast('error', 'Error saving draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!page) return;
    setIsPublishing(true);
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...page,
          action: 'publish',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPage(data.page);
        addToast('success', 'Page published live to main website!');
        fetchRevisions();
        setPreviewKey((k) => k + 1);
      } else {
        addToast('error', 'Failed to publish page');
      }
    } catch {
      addToast('error', 'Error publishing page');
    } finally {
      setIsPublishing(false);
    }
  };

  // Restore revision
  const handleRestoreRevision = async (revId: string) => {
    if (!confirm('Restore this revision? Current state will be saved as a revision.')) return;
    setRestoringRevisionId(revId);
    try {
      const res = await fetch(`/api/admin/pages/${slug}/revisions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'restore',
          revisionId: revId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPage(data.page);
        addToast('success', 'Revision restored to draft!');
        fetchRevisions();
        setPreviewKey((k) => k + 1);
      } else {
        addToast('error', 'Failed to restore revision');
      }
    } catch {
      addToast('error', 'Error restoring revision');
    } finally {
      setRestoringRevisionId(null);
    }
  };

  if (isLoading || !page) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center">
        <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mb-4" />
        <p className="text-slate-400 text-sm">Loading page structure & sections...</p>
      </div>
    );
  }

  const deviceWidthMap = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <AdminHeader
        title={`Edit: ${page.name}`}
        subtitle={`Path: ${page.url} • Slug: ${page.slug}`}
      />

      {/* Sticky Action Sub-header */}
      <div className="sticky top-16 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-100 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Pages</span>
          </Link>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              page.status === 'published'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}
          >
            {page.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
            {page.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('sections')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'sections'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sections ({page.sections.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'seo'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>SEO & Meta</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'history'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Revisions ({revisions.length})</span>
          </button>
        </div>

        {/* Actions (Preview Toggle, Save Draft, Publish) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowPreviewPane(!showPreviewPane)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
              showPreviewPane
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{showPreviewPane ? 'Hide Preview' : 'Live Preview'}</span>
          </button>

          <a
            href={page.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
          </button>

          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-500/20 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isPublishing ? 'Publishing...' : 'Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className={`grid grid-cols-1 ${showPreviewPane ? 'lg:grid-cols-2 gap-8' : 'gap-6'}`}>
          {/* Left / Main Editor Column */}
          <div>
            {/* SECTIONS TAB */}
            {activeTab === 'sections' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      Page Sections ({page.sections.length})
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Visual sections in order of appearance. Reorder, hide, or edit content.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddSectionModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded-xl text-xs font-medium transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Section</span>
                  </button>
                </div>

                {/* Section List */}
                <div className="space-y-2.5">
                  {page.sections.map((section, idx) => (
                    <div
                      key={section.id}
                      className={`bg-slate-900/80 border rounded-2xl p-4 transition-all ${
                        section.visible
                          ? 'border-slate-800/90 hover:border-slate-700'
                          : 'border-slate-800/40 opacity-60 bg-slate-950/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {/* Order index */}
                          <span className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-mono font-semibold text-slate-400 shrink-0">
                            {idx + 1}
                          </span>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-semibold text-sm text-slate-100 truncate">
                                {section.label}
                              </h4>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-400 border border-slate-700/50">
                                {section.type}
                              </span>
                              {!section.visible && (
                                <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-400 border border-red-500/20">
                                  Hidden
                                </span>
                              )}
                            </div>
                            {section.content?.title && (
                              <p className="text-xs text-slate-400 truncate mt-0.5">
                                Title: &ldquo;{section.content.title}&rdquo;
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleMoveSection(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1.5 text-slate-400 hover:text-slate-100 disabled:opacity-30 rounded-lg hover:bg-slate-800"
                            title="Move Up"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleMoveSection(idx, 'down')}
                            disabled={idx === page.sections.length - 1}
                            className="p-1.5 text-slate-400 hover:text-slate-100 disabled:opacity-30 rounded-lg hover:bg-slate-800"
                            title="Move Down"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleVisibility(idx)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              section.visible
                                ? 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
                                : 'text-amber-400 bg-amber-500/10'
                            }`}
                            title={section.visible ? 'Hide section' : 'Show section'}
                          >
                            {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditingSection(section)}
                            className="p-1.5 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Edit section content"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteSection(idx)}
                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Remove section"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SEO TAB */}
            {activeTab === 'seo' && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-amber-400" />
                    Search Engine Optimization (SEO) & Social Sharing
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Control how this page displays on Google, Bing, WhatsApp, Facebook, and Twitter.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Meta Title */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300">
                        Meta Title
                      </label>
                      <span className="text-[11px] font-mono text-slate-500">
                        {(page.seo?.title || '').length} / 60 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      value={page.seo?.title || ''}
                      onChange={(e) => handleSeoChange('title', e.target.value)}
                      placeholder="Page title for search engines..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>

                  {/* Meta Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300">
                        Meta Description
                      </label>
                      <span className="text-[11px] font-mono text-slate-500">
                        {(page.seo?.metaDescription || '').length} / 160 chars
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={page.seo?.metaDescription || ''}
                      onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                      placeholder="A compelling, natural 1-2 sentence summary for search result snippets..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>

                  {/* Canonical URL */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Canonical URL
                    </label>
                    <input
                      type="text"
                      value={page.seo?.canonicalUrl || ''}
                      onChange={(e) => handleSeoChange('canonicalUrl', e.target.value)}
                      placeholder="https://explorewithsakar.com/..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>

                  {/* OG Image */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      OpenGraph Social Share Image (OG Image)
                    </label>
                    <input
                      type="text"
                      value={page.seo?.ogImage || ''}
                      onChange={(e) => handleSeoChange('ogImage', e.target.value)}
                      placeholder="/explore-with-sakar/images/..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>

                  {/* Google Search Result Preview Card */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mt-4">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-2">
                      Google Search Result Snippet Preview
                    </p>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-mono">
                        {page.seo?.canonicalUrl || `https://explorewithsakar.com${page.url}`}
                      </p>
                      <h5 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
                        {page.seo?.title || page.name}
                      </h5>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {page.seo?.metaDescription ||
                          'Meaningful Nepal travel experiences beyond ordinary tourism. Intimate human connections, village homestays, and sacred heritage.'}
                      </p>
                    </div>
                  </div>

                  {/* Indexing Checkboxes */}
                  <div className="pt-3 border-t border-slate-800 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!page.seo?.noIndex}
                        onChange={(e) => handleSeoChange('noIndex', !e.target.checked)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                      />
                      <div>
                        <span className="text-xs font-semibold text-slate-200">
                          Allow Search Engines to Index this Page
                        </span>
                        <p className="text-[11px] text-slate-500">
                          When checked, search bots (Google, Bing) will index this page.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={page.seo?.sitemapVisible !== false}
                        onChange={(e) => handleSeoChange('sitemapVisible', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                      />
                      <div>
                        <span className="text-xs font-semibold text-slate-200">
                          Include in Public XML Sitemap
                        </span>
                        <p className="text-[11px] text-slate-500">
                          Adds this URL to the automated sitemap feed.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* REVISIONS TAB */}
            {activeTab === 'history' && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <History className="w-4 h-4 text-amber-400" />
                    Page Revision History ({revisions.length})
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Every published update and draft save records a timestamped snapshot. Restore any previous version safely.
                  </p>
                </div>

                {revisions.length === 0 ? (
                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-8 text-center">
                    <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">No revisions recorded for this page yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {revisions.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold rounded">
                              v{rev.version}
                            </span>
                            <span
                              className={`px-2 py-0.5 text-[11px] rounded font-medium ${
                                rev.status === 'published'
                                  ? 'bg-emerald-500/10 text-emerald-400'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {rev.status}
                            </span>
                            <span className="text-xs text-slate-400">
                              by <strong className="text-slate-200">{rev.editedBy}</strong>
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">
                            {new Date(rev.createdAt).toLocaleString()} • {rev.sections?.length || 0} sections
                          </p>
                        </div>

                        <button
                          onClick={() => handleRestoreRevision(rev.id)}
                          disabled={restoringRevisionId === rev.id}
                          className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
                        >
                          <RotateCcw className={`w-3.5 h-3.5 ${restoringRevisionId === rev.id ? 'animate-spin' : ''}`} />
                          <span>Restore</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Live Preview Column (if active) */}
          {showPreviewPane && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[820px] sticky top-36">
              {/* Device switcher bar */}
              <div className="bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`p-1.5 rounded transition-all ${
                      deviceView === 'desktop' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="Desktop (100%)"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeviceView('tablet')}
                    className={`p-1.5 rounded transition-all ${
                      deviceView === 'tablet' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="Tablet (768px)"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`p-1.5 rounded transition-all ${
                      deviceView === 'mobile' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="Mobile (375px)"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs text-slate-400 font-mono">
                  {page.url} ({deviceView})
                </span>

                <button
                  onClick={() => setPreviewKey((k) => k + 1)}
                  className="p-1.5 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800"
                  title="Reload preview"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Iframe wrapper */}
              <div className="flex-1 bg-slate-950 overflow-auto flex justify-center p-2">
                <div className={`h-full transition-all duration-300 ${deviceWidthMap[deviceView]} bg-white rounded-lg shadow-inner overflow-hidden`}>
                  <iframe
                    key={previewKey}
                    src={page.url}
                    className="w-full h-full border-0"
                    title={`Live preview of ${page.name}`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* EDIT SECTION MODAL */}
      {editingSection && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Edit2 className="w-4 h-4 text-amber-400" />
                  Customize Section: {editingSection.label}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Type: {editingSection.type} • ID: {editingSection.id}
                </p>
              </div>
              <button
                onClick={() => setEditingSection(null)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Section Label (Admin Display Name)
                </label>
                <input
                  type="text"
                  value={editingSection.label}
                  onChange={(e) => setEditingSection({ ...editingSection, label: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Heading / Title
                </label>
                <input
                  type="text"
                  value={editingSection.content?.title || editingSection.content?.heading || ''}
                  onChange={(e) =>
                    setEditingSection({
                      ...editingSection,
                      content: { ...editingSection.content, title: e.target.value, heading: e.target.value },
                    })
                  }
                  placeholder="Section main heading..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subtitle / Badge Text
                </label>
                <input
                  type="text"
                  value={editingSection.content?.subtitle || editingSection.content?.badge || ''}
                  onChange={(e) =>
                    setEditingSection({
                      ...editingSection,
                      content: { ...editingSection.content, subtitle: e.target.value, badge: e.target.value },
                    })
                  }
                  placeholder="Optional badge or subtitle..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description / Body Text
                </label>
                <textarea
                  rows={4}
                  value={editingSection.content?.body || editingSection.content?.description || ''}
                  onChange={(e) =>
                    setEditingSection({
                      ...editingSection,
                      content: { ...editingSection.content, body: e.target.value, description: e.target.value },
                    })
                  }
                  placeholder="Section body narrative..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Button CTA Text
                </label>
                <input
                  type="text"
                  value={editingSection.content?.ctaText || ''}
                  onChange={(e) =>
                    setEditingSection({
                      ...editingSection,
                      content: { ...editingSection.content, ctaText: e.target.value },
                    })
                  }
                  placeholder="e.g. Plan Your Custom Journey"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Button CTA Link
                </label>
                <input
                  type="text"
                  value={editingSection.content?.ctaLink || ''}
                  onChange={(e) =>
                    setEditingSection({
                      ...editingSection,
                      content: { ...editingSection.content, ctaLink: e.target.value },
                    })
                  }
                  placeholder="e.g. /contact or #inquire"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-100"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveSectionEdits(editingSection)}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-500/20"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD SECTION MODAL */}
      {showAddSectionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                Add Section to {page.name}
              </h3>
              <button
                onClick={() => setShowAddSectionModal(false)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {[
                { type: 'hero', label: 'Hero Header Banner', desc: 'Top title banner with subtitle and background image' },
                { type: 'rich-text', label: 'Rich Narrative Text', desc: 'Narrative storytelling block, headings, and quotes' },
                { type: 'features-grid', label: 'Highlights & Feature Cards', desc: 'Multi-column grid showcasing features or pillars' },
                { type: 'gallery-strip', label: 'Photo Gallery Strip', desc: 'Visual media showcase with captions' },
                { type: 'cta', label: 'Call to Action Banner', desc: 'High-conversion button, headline, and link' },
                { type: 'quote-banner', label: 'Sakar Quote & Philosophy', desc: 'Prominent quote with Sakar attribution' },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleAddSection(item.type, item.label)}
                  className="text-left p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                      {item.label}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
