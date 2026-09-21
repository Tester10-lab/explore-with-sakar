'use client';

import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Plus,
  ArrowUp,
  ArrowDown,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Save,
  X,
  Loader2,
  RefreshCw,
  ExternalLink,
  BookOpen,
  Image as ImageIcon,
  Quote,
  Sparkles,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { CmsBeyondChapter } from '@/types/cms';

export default function AdminBeyondChaptersPage() {
  const router = useRouter();
  const [chapters, setChapters] = useState<CmsBeyondChapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingChapter, setEditingChapter] = useState<Partial<CmsBeyondChapter> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchChapters = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/beyond-chapters');
      if (res.ok) {
        const data = await res.json();
        setChapters(data.chapters || []);
      } else {
        addToast('error', 'Failed to load chapters');
      }
    } catch {
      addToast('error', 'Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  const handleTogglePublish = async (chapter: CmsBeyondChapter) => {
    const newPublished = !chapter.isPublished;
    try {
      const res = await fetch(`/api/admin/beyond-chapters/${chapter.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: newPublished }),
      });

      if (res.ok) {
        setChapters((prev) =>
          prev.map((c) => (c.id === chapter.id ? { ...c, isPublished: newPublished } : c))
        );
        addToast('success', `Chapter ${newPublished ? 'published' : 'moved to draft'}`);
      } else {
        addToast('error', 'Failed to update publish state');
      }
    } catch {
      addToast('error', 'Network error');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= chapters.length) return;

    const newChapters = [...chapters];
    const [moved] = newChapters.splice(index, 1);
    newChapters.splice(targetIndex, 0, moved);

    setChapters(newChapters);

    try {
      const orderedIds = newChapters.map((c) => c.id);
      const res = await fetch('/api/admin/beyond-chapters/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds }),
      });
      if (res.ok) {
        addToast('success', 'Reordered chapters successfully');
      } else {
        addToast('error', 'Failed to save new order');
        fetchChapters();
      }
    } catch {
      addToast('error', 'Network error saving order');
      fetchChapters();
    }
  };

  const handleSaveChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChapter || isSaving) return;

    setIsSaving(true);
    const isNew = !chapters.some((c) => c.id === editingChapter.id);

    try {
      const url = isNew
        ? '/api/admin/beyond-chapters'
        : `/api/admin/beyond-chapters/${editingChapter.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingChapter),
      });

      if (res.ok) {
        addToast('success', `Saved chapter "${editingChapter.title}"`);
        setEditingChapter(null);
        fetchChapters();
        router.refresh();
      } else {
        const err = await res.json().catch(() => ({}));
        addToast('error', err.error || 'Failed to save chapter');
      }
    } catch {
      addToast('error', 'Network error saving chapter');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteChapter = async () => {
    if (!deleteTargetId || isDeleting) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/beyond-chapters/${deleteTargetId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setChapters((prev) => prev.filter((c) => c.id !== deleteTargetId));
        addToast('success', 'Chapter deleted');
        setDeleteTargetId(null);
        router.refresh();
      } else {
        addToast('error', 'Failed to delete chapter');
      }
    } catch {
      addToast('error', 'Network error');
    } finally {
      setIsDeleting(false);
    }
  };

  const publishedCount = chapters.filter((c) => c.isPublished !== false).length;

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <AdminHeader
        title="Beyond the Map — Chapters"
        subtitle="Manage the 4 sequenced narrative chapters of the 'Go Beyond the Map' experience."
        action={
          <div className="flex items-center gap-2">
            <Link
              href="/experience/go-beyond"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>View Public Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() =>
                setEditingChapter({
                  pageNumber: `Page 0${chapters.length + 1}`,
                  title: '',
                  subtitle: '',
                  location: 'Kathmandu Valley',
                  duration: 'Full Day',
                  groupSize: 'Private / 1–6 Travelers',
                  image: '/images/beyond-the-map/living-courtyards.jpg',
                  imageAlt: '',
                  promise: '',
                  experienceOverview: '',
                  keyQuote: { quote: '', attribution: '' },
                  highlights: [''],
                  storySections: [{ heading: '', paragraphs: [''] }],
                  ctaSubject: 'Go Beyond the Map Inquiry',
                  isPublished: true,
                })
              }
              className="px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-warm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Chapter</span>
            </button>
          </div>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-himalaya-400 font-semibold">Total Chapters</p>
            <p className="font-editorial-serif text-3xl font-bold text-parchment-100 mt-1">{chapters.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-himalaya-800 text-parchment-200 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Published Chapters</p>
            <p className="font-editorial-serif text-3xl font-bold text-emerald-400 mt-1">{publishedCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-saffron font-semibold">Drafts / Hidden</p>
            <p className="font-editorial-serif text-3xl font-bold text-saffron mt-1">{chapters.length - publishedCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-saffron/15 text-saffron flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl overflow-hidden shadow-floating">
        <div className="p-4 border-b border-himalaya-800 flex items-center justify-between">
          <h3 className="font-editorial-serif text-lg font-bold text-parchment-100">
            Sequenced Narrative Chapters
          </h3>
          <button
            onClick={fetchChapters}
            className="p-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="divide-y divide-himalaya-850">
          {isLoading ? (
            <div className="py-12 text-center text-himalaya-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-terracotta" />
              <span>Loading chapters...</span>
            </div>
          ) : chapters.length === 0 ? (
            <div className="py-12 text-center text-himalaya-400">
              <Compass className="w-8 h-8 mx-auto mb-2 opacity-40 text-himalaya-500" />
              <p className="font-semibold text-parchment-200">No chapters found</p>
            </div>
          ) : (
            chapters.map((chapter, index) => {
              const isPublished = chapter.isPublished !== false;

              return (
                <div
                  key={chapter.id}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-himalaya-850/50 transition-colors"
                >
                  {/* Left: Reorder & Info */}
                  <div className="flex items-center gap-4 flex-1">
                    {/* Reorder Buttons */}
                    <div className="flex flex-col gap-1">
                      <button
                        disabled={index === 0}
                        onClick={() => handleMove(index, 'up')}
                        className="p-1 rounded-lg bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        disabled={index === chapters.length - 1}
                        onClick={() => handleMove(index, 'down')}
                        className="p-1 rounded-lg bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Badge & Title */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-terracotta/15 text-terracotta border border-terracotta/30">
                          {chapter.pageNumber || `Page 0${index + 1}`}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isPublished
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                              : 'bg-saffron/15 text-saffron border border-saffron/30'
                          }`}
                        >
                          {isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <h4 className="font-editorial-serif text-lg font-bold text-parchment-100">
                        {chapter.title}
                      </h4>
                      <p className="text-xs text-himalaya-400 max-w-xl truncate">
                        {chapter.subtitle} • {chapter.location}
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleTogglePublish(chapter)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        isPublished
                          ? 'bg-himalaya-800 text-himalaya-300 hover:bg-himalaya-700'
                          : 'bg-emerald-950/80 text-emerald-400 hover:bg-emerald-900 border border-emerald-700/50'
                      }`}
                    >
                      {isPublished ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Unpublish</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Publish</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setEditingChapter(chapter)}
                      className="px-3 py-1.5 rounded-xl bg-himalaya-800 hover:bg-terracotta text-parchment-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setDeleteTargetId(chapter.id)}
                      className="p-1.5 rounded-xl bg-himalaya-800 hover:bg-rose-950/80 text-himalaya-400 hover:text-rose-400 transition-colors"
                      title="Delete Chapter"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Edit / Create Modal */}
      {editingChapter && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-himalaya-900 border border-himalaya-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-himalaya-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-terracotta font-bold">
                  {editingChapter.id ? 'Edit Editorial Chapter' : 'New Chapter'}
                </span>
                <h3 className="font-editorial-serif text-2xl font-bold text-parchment-100">
                  {editingChapter.title || 'Untitled Chapter'}
                </h3>
              </div>
              <button
                onClick={() => setEditingChapter(null)}
                className="p-1.5 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveChapter} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Page Number</label>
                  <input
                    type="text"
                    required
                    value={editingChapter.pageNumber || ''}
                    onChange={(e) => setEditingChapter({ ...editingChapter, pageNumber: e.target.value })}
                    placeholder="e.g. Page 01"
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={editingChapter.title || ''}
                    onChange={(e) => setEditingChapter({ ...editingChapter, title: e.target.value })}
                    placeholder="e.g. Kathmandu Durbar Square"
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={editingChapter.subtitle || ''}
                    onChange={(e) => setEditingChapter({ ...editingChapter, subtitle: e.target.value })}
                    placeholder="e.g. Where Every Stone Holds a Story"
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Nepali Title</label>
                  <input
                    type="text"
                    value={editingChapter.nepaliTitle || ''}
                    onChange={(e) => setEditingChapter({ ...editingChapter, nepaliTitle: e.target.value })}
                    placeholder="e.g. काठमाडौँ दरबार क्षेत्र"
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingChapter.location || ''}
                    onChange={(e) => setEditingChapter({ ...editingChapter, location: e.target.value })}
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingChapter.duration || ''}
                    onChange={(e) => setEditingChapter({ ...editingChapter, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Group Size</label>
                  <input
                    type="text"
                    value={editingChapter.groupSize || ''}
                    onChange={(e) => setEditingChapter({ ...editingChapter, groupSize: e.target.value })}
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingChapter.tagline || ''}
                  onChange={(e) => setEditingChapter({ ...editingChapter, tagline: e.target.value })}
                  placeholder="e.g. Ason Morning Alleys • Ancient Trade Routes • Sustainable Human Settlements"
                  className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingChapter.image || ''}
                    onChange={(e) => setEditingChapter({ ...editingChapter, image: e.target.value })}
                    placeholder="/images/beyond-the-map/..."
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Image Alt</label>
                  <input
                    type="text"
                    value={editingChapter.imageAlt || ''}
                    onChange={(e) => setEditingChapter({ ...editingChapter, imageAlt: e.target.value })}
                    placeholder="Descriptive alt text"
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">The Promise</label>
                <textarea
                  rows={2}
                  value={editingChapter.promise || ''}
                  onChange={(e) => setEditingChapter({ ...editingChapter, promise: e.target.value })}
                  className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Experience Overview</label>
                <textarea
                  rows={3}
                  value={editingChapter.experienceOverview || ''}
                  onChange={(e) => setEditingChapter({ ...editingChapter, experienceOverview: e.target.value })}
                  className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Key Quote</label>
                  <input
                    type="text"
                    value={editingChapter.keyQuote?.quote || ''}
                    onChange={(e) =>
                      setEditingChapter({
                        ...editingChapter,
                        keyQuote: { ...(editingChapter.keyQuote || { quote: '', attribution: '' }), quote: e.target.value },
                      })
                    }
                    placeholder="Memorable quote about this chapter..."
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Quote Attribution</label>
                  <input
                    type="text"
                    value={editingChapter.keyQuote?.attribution || ''}
                    onChange={(e) =>
                      setEditingChapter({
                        ...editingChapter,
                        keyQuote: { ...(editingChapter.keyQuote || { quote: '', attribution: '' }), attribution: e.target.value },
                      })
                    }
                    placeholder="e.g. Heritage Conservationist Anil Chitrakar"
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-parchment-200">
                  <input
                    type="checkbox"
                    checked={editingChapter.isPublished !== false}
                    onChange={(e) => setEditingChapter({ ...editingChapter, isPublished: e.target.checked })}
                    className="rounded text-terracotta focus:ring-terracotta"
                  />
                  <span>Publish this chapter to the public website</span>
                </label>
              </div>

              <div className="pt-4 border-t border-himalaya-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingChapter(null)}
                  className="px-4 py-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-xs font-bold flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Chapter</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-himalaya-900 border border-himalaya-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h4 className="font-editorial-serif text-lg font-bold text-parchment-100">Delete Chapter?</h4>
            <p className="text-xs text-himalaya-400">
              Are you sure you want to delete this chapter? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                disabled={isDeleting}
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={handleDeleteChapter}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
