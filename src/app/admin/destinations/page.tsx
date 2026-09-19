'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
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
  Mountain,
  Layers,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { CmsDestination } from '@/types/cms';

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<CmsDestination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingDest, setEditingDest] = useState<Partial<CmsDestination> | null>(null);
  const [newHighlight, setNewHighlight] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchDestinations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/destinations');
      if (res.ok) {
        const data = await res.json();
        setDestinations(data.destinations || []);
      } else {
        addToast('error', 'Failed to load destinations');
      }
    } catch {
      addToast('error', 'Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((d) => {
      return (
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.nepaliName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [destinations, searchQuery]);

  const handleCreateNew = () => {
    setEditingDest({
      name: '',
      slug: '',
      nepaliName: '',
      tagline: '',
      elevation: '',
      description: '',
      image: { src: '/explore-with-sakar/images/mountains/mountain-ridge.jpg', alt: '' },
      highlights: [],
      isVisible: true,
    });
    setNewHighlight('');
  };

  const handleSaveDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest?.name || !editingDest?.slug) {
      addToast('error', 'Name and Slug are required');
      return;
    }

    setIsSaving(true);
    const isEdit = Boolean(editingDest.id);
    const url = isEdit ? `/api/admin/destinations/${editingDest.id}` : '/api/admin/destinations';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDest),
      });

      if (res.ok) {
        addToast('success', isEdit ? 'Destination updated' : 'Destination created');
        setEditingDest(null);
        fetchDestinations();
      } else {
        const errorData = await res.json();
        addToast('error', errorData.error || 'Failed to save destination');
      }
    } catch {
      addToast('error', 'Error saving destination');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDestination = async (id: string) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    try {
      const res = await fetch(`/api/admin/destinations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        addToast('success', 'Destination deleted');
        fetchDestinations();
      } else {
        addToast('error', 'Failed to delete destination');
      }
    } catch {
      addToast('error', 'Error deleting destination');
    }
  };

  const handleToggleVisibility = async (dest: CmsDestination) => {
    try {
      const res = await fetch(`/api/admin/destinations/${dest.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: !dest.isVisible }),
      });
      if (res.ok) {
        addToast('success', `Destination ${!dest.isVisible ? 'published' : 'hidden'}`);
        fetchDestinations();
      }
    } catch {
      addToast('error', 'Error updating visibility');
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= destinations.length) return;

    const reordered = [...destinations];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    setDestinations(reordered);

    try {
      await fetch('/api/admin/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reorder',
          ids: reordered.map((d) => d.id),
        }),
      });
      addToast('success', 'Destinations reordered');
    } catch {
      addToast('error', 'Failed to save order');
      fetchDestinations();
    }
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim() || !editingDest) return;
    setEditingDest({
      ...editingDest,
      highlights: [...(editingDest.highlights || []), newHighlight.trim()],
    });
    setNewHighlight('');
  };

  const handleRemoveHighlight = (idx: number) => {
    if (!editingDest) return;
    setEditingDest({
      ...editingDest,
      highlights: (editingDest.highlights || []).filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <AdminHeader
        title="Destinations & Regions"
        subtitle="Manage regional guide cards, elevations, highlights, and photographic banners."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Control Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl shadow-black/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search destinations by name, tagline..."
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

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDestinations}
              className="p-2.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all"
              title="Refresh destinations"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Destination</span>
            </button>
          </div>
        </div>

        {/* Destinations List */}
        {isLoading ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
            <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mb-4" />
            <p className="text-slate-400 text-sm">Loading destinations...</p>
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-16 text-center">
            <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-200 mb-1">No destinations found</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
              {searchQuery ? `No destinations match "${searchQuery}"` : 'Get started by creating your first regional destination.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDestinations.map((dest, idx) => (
              <div
                key={dest.id}
                className={`bg-slate-900/80 border rounded-2xl p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  dest.isVisible ? 'border-slate-800/80' : 'border-slate-800/40 opacity-60 bg-slate-950/60'
                }`}
              >
                <div className="flex items-start md:items-center gap-4 flex-1">
                  <div className="w-20 h-16 rounded-xl bg-slate-800 overflow-hidden shrink-0 relative border border-slate-700/50">
                    {dest.image?.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={dest.image.src} alt={dest.name} className="w-full h-full object-cover" />
                    ) : (
                      <MapPin className="w-6 h-6 text-slate-500 m-auto" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-slate-100 text-base">
                        {dest.name}
                      </h4>
                      {dest.nepaliName && (
                        <span className="text-xs text-amber-400/80 font-editorial-serif">
                          {dest.nepaliName}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
                        {dest.slug}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                      <span className="text-slate-300 font-medium">{dest.tagline}</span>
                      {dest.elevation && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Mountain className="w-3.5 h-3.5 text-amber-400" />
                            {dest.elevation}
                          </span>
                        </>
                      )}
                      <span>•</span>
                      <span>{dest.highlights?.length || 0} Highlights</span>
                    </div>
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
                    disabled={idx === destinations.length - 1}
                    className="p-2 text-slate-400 hover:text-slate-100 disabled:opacity-30 rounded-xl hover:bg-slate-800 border border-slate-800"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleToggleVisibility(dest)}
                    className={`p-2 rounded-xl border transition-all ${
                      dest.isVisible
                        ? 'text-slate-400 hover:text-amber-300 border-slate-800 hover:bg-slate-800'
                        : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                    }`}
                    title={dest.isVisible ? 'Hide destination' : 'Publish destination'}
                  >
                    {dest.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      setEditingDest(dest);
                      setNewHighlight('');
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-amber-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteDestination(dest.id)}
                    className="p-2 text-slate-500 hover:text-red-400 rounded-xl hover:bg-red-500/10 border border-slate-800 transition-all"
                    title="Delete destination"
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
      {editingDest && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                {editingDest.id ? 'Edit Destination' : 'Create New Destination'}
              </h3>
              <button
                onClick={() => setEditingDest(null)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDestination} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Destination Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingDest.name || ''}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setEditingDest({
                        ...editingDest,
                        name,
                        slug: editingDest.slug ? editingDest.slug : slug,
                      });
                    }}
                    placeholder="e.g. Kathmandu Valley"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nepali Name (Devanagari)
                  </label>
                  <input
                    type="text"
                    value={editingDest.nepaliName || ''}
                    onChange={(e) => setEditingDest({ ...editingDest, nepaliName: e.target.value })}
                    placeholder="e.g. काठमाडौं उपत्यका"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 font-editorial-serif"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingDest.slug || ''}
                    onChange={(e) => setEditingDest({ ...editingDest, slug: e.target.value })}
                    placeholder="e.g. kathmandu-valley"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Elevation Range
                  </label>
                  <input
                    type="text"
                    value={editingDest.elevation || ''}
                    onChange={(e) => setEditingDest({ ...editingDest, elevation: e.target.value })}
                    placeholder="e.g. 1,400 m or 820 m - 2,100 m"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Poetic Tagline
                </label>
                <input
                  type="text"
                  value={editingDest.tagline || ''}
                  onChange={(e) => setEditingDest({ ...editingDest, tagline: e.target.value })}
                  placeholder="e.g. Living Museum of Sacred Shrines & Medieval Bahals"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Card Image URL
                  </label>
                  <input
                    type="text"
                    value={editingDest.image?.src || ''}
                    onChange={(e) =>
                      setEditingDest({
                        ...editingDest,
                        image: { src: e.target.value, alt: editingDest.image?.alt || editingDest.name || '' },
                      })
                    }
                    placeholder="/explore-with-sakar/images/..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Image Alt Description
                  </label>
                  <input
                    type="text"
                    value={editingDest.image?.alt || ''}
                    onChange={(e) =>
                      setEditingDest({
                        ...editingDest,
                        image: { src: editingDest.image?.src || '', alt: e.target.value },
                      })
                    }
                    placeholder="Descriptive text for accessibility..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Narrative Description
                </label>
                <textarea
                  rows={3}
                  value={editingDest.description || ''}
                  onChange={(e) => setEditingDest({ ...editingDest, description: e.target.value })}
                  placeholder="Cultural character, climate, and geography..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                />
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Key Regional Highlights
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddHighlight();
                      }
                    }}
                    placeholder="e.g. Swayambhunath Stupa at Sunrise..."
                    className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5">
                  {(editingDest.highlights || []).map((hl, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 bg-slate-950 rounded-lg text-xs text-slate-300 border border-slate-800/80"
                    >
                      <span>• {hl}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(i)}
                        className="text-slate-500 hover:text-red-400 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="dest-visible"
                  checked={editingDest.isVisible !== false}
                  onChange={(e) => setEditingDest({ ...editingDest, isVisible: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="dest-visible" className="text-xs font-semibold text-slate-200 cursor-pointer">
                  Visible on Public Website
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingDest(null)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Destination'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
