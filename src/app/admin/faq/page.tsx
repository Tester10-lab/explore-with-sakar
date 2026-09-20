'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Sparkles,
  RefreshCw,
  Search,
  X,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { CmsFaqItem } from '@/types/cms';
import { FAQ_CATEGORIES } from '@/data/faq';

export default function AdminFaqPage() {
  const router = useRouter();
  const [faqItems, setFaqItems] = useState<CmsFaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingItem, setEditingItem] = useState<Partial<CmsFaqItem> | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchFaq = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/faq');
      if (res.ok) {
        const data = await res.json();
        setFaqItems(data.faq || []);
      } else {
        addToast('error', 'Failed to load FAQ items');
      }
    } catch {
      addToast('error', 'Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  const filteredItems = useMemo(() => {
    return faqItems.filter((f) => {
      const matchesSearch =
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        categoryFilter === 'all' || f.category === categoryFilter;

      return matchesSearch && matchesCat;
    });
  }, [faqItems, searchQuery, categoryFilter]);

  const handleCreateNew = () => {
    setEditingItem({
      category: 'planning',
      question: '',
      answer: '',
      isVisible: true,
    });
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.question || !editingItem?.answer) {
      addToast('error', 'Question and Answer are required');
      return;
    }

    setIsSaving(true);
    const isEdit = Boolean(editingItem.id);
    const url = isEdit ? `/api/admin/faq/${editingItem.id}` : '/api/admin/faq';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      if (res.ok) {
        addToast('success', isEdit ? 'FAQ item updated' : 'FAQ item created');
        setEditingItem(null);
        router.refresh();
        fetchFaq();
      } else {
        const errorData = await res.json();
        addToast('error', errorData.error || 'Failed to save FAQ');
      }
    } catch {
      addToast('error', 'Error saving FAQ');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ item?')) return;
    try {
      const res = await fetch(`/api/admin/faq/${id}`, { method: 'DELETE' });
      if (res.ok) {
        addToast('success', 'FAQ item deleted');
        router.refresh();
        fetchFaq();
      } else {
        const errorData = await res.json().catch(() => ({}));
        addToast('error', errorData.error || 'Failed to delete item');
      }
    } catch {
      addToast('error', 'Error deleting item');
    }
  };

  const handleToggleVisibility = async (item: CmsFaqItem) => {
    try {
      const res = await fetch(`/api/admin/faq/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: !item.isVisible }),
      });
      if (res.ok) {
        addToast('success', `FAQ ${!item.isVisible ? 'published' : 'hidden'}`);
        router.refresh();
        fetchFaq();
      } else {
        const errorData = await res.json().catch(() => ({}));
        addToast('error', errorData.error || 'Error updating visibility');
      }
    } catch {
      addToast('error', 'Error updating visibility');
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= faqItems.length) return;

    const reordered = [...faqItems];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    setFaqItems(reordered);

    try {
      const res = await fetch('/api/admin/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reorder',
          ids: reordered.map((f) => f.id),
        }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save order');
      }
      addToast('success', 'FAQ order saved');
      router.refresh();
    } catch (err: any) {
      addToast('error', err?.message || 'Failed to save order');
      fetchFaq();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <AdminHeader
        title="Frequently Asked Questions (FAQ)"
        subtitle="Manage traveler questions, category tabs, and detailed guidance responses."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Control Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl shadow-black/20">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search FAQ by question, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
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

            <div className="flex items-center gap-1.5 bg-slate-950/50 p-1 rounded-xl border border-slate-800 overflow-x-auto scrollbar-none">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategoryFilter(cat.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    categoryFilter === cat.key
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchFaq}
              className="p-2.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all"
              title="Refresh FAQ items"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ</span>
            </button>
          </div>
        </div>

        {/* FAQ Items List */}
        {isLoading ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
            <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mb-4" />
            <p className="text-slate-400 text-sm">Loading FAQ questions...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-16 text-center">
            <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-200 mb-1">No FAQ items found</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
              {searchQuery ? `No questions match "${searchQuery}"` : 'Get started by creating your first FAQ question.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className={`bg-slate-900/80 border rounded-2xl p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  item.isVisible ? 'border-slate-800/80' : 'border-slate-800/40 opacity-60 bg-slate-950/60'
                }`}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700">
                        {item.category}
                      </span>
                    </div>

                    <h4 className="font-semibold text-slate-100 text-base leading-snug">
                      {item.question}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => handleMoveOrder(idx, 'up')}
                    disabled={idx === 0}
                    className="p-2 text-slate-400 hover:text-slate-100 disabled:opacity-30 rounded-xl hover:bg-slate-800 border border-slate-800"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleMoveOrder(idx, 'down')}
                    disabled={idx === faqItems.length - 1}
                    className="p-2 text-slate-400 hover:text-slate-100 disabled:opacity-30 rounded-xl hover:bg-slate-800 border border-slate-800"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleToggleVisibility(item)}
                    className={`p-2 rounded-xl border transition-all ${
                      item.isVisible
                        ? 'text-slate-400 hover:text-amber-300 border-slate-800 hover:bg-slate-800'
                        : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                    }`}
                    title={item.isVisible ? 'Hide FAQ' : 'Publish FAQ'}
                  >
                    {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setEditingItem(item)}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-amber-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 text-slate-500 hover:text-red-400 rounded-xl hover:bg-red-500/10 border border-slate-800 transition-all"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                {editingItem.id ? 'Edit FAQ Item' : 'Create New FAQ Item'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={editingItem.category || 'planning'}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                >
                  <option value="planning">Trip Planning</option>
                  <option value="customization">Bespoke Customization</option>
                  <option value="homestays">Homestay Living</option>
                  <option value="health">Health & Altitude</option>
                  <option value="booking">Booking & Policies</option>
                  <option value="responsible">Responsible Tourism</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.question || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                  placeholder="e.g. What is the best time of year to visit Nepal?"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Answer *
                </label>
                <textarea
                  rows={6}
                  required
                  value={editingItem.answer || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })}
                  placeholder="Clear, helpful, authentic response..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="faq-visible"
                  checked={editingItem.isVisible !== false}
                  onChange={(e) => setEditingItem({ ...editingItem, isVisible: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="faq-visible" className="text-xs font-semibold text-slate-200 cursor-pointer">
                  Visible on Public FAQ Page
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
