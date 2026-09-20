'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Sparkles,
  MapPin,
  RefreshCw,
  Search,
  X,
  Check,
  CheckCircle2,
  AlertCircle,
  Clock,
  Heart,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import ImageUploader from '@/components/admin/ImageUploader';
import { CmsEvent } from '@/types/cms';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<CmsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingEvent, setEditingEvent] = useState<Partial<CmsEvent> | null>(null);
  const [newHighlight, setNewHighlight] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events || []);
      } else {
        addToast('error', 'Failed to load events');
      }
    } catch {
      addToast('error', 'Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.nepaliName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        categoryFilter === 'all' || e.category === categoryFilter;

      return matchesSearch && matchesCat;
    });
  }, [events, searchQuery, categoryFilter]);

  const handleCreateNew = () => {
    setEditingEvent({
      title: '',
      nepaliName: '',
      category: 'festival',
      categoryLabel: 'Sacred Festival',
      date: '',
      location: '',
      season: 'Autumn',
      image: '/explore-with-sakar/images/heritage/temple-courtyard.jpg',
      shortDesc: '',
      highlights: [],
      sakarNote: '',
      isVisible: true,
    });
    setNewHighlight('');
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent?.title) {
      addToast('error', 'Event title is required');
      return;
    }

    setIsSaving(true);
    const isEdit = Boolean(editingEvent.id);
    const url = isEdit ? `/api/admin/events/${editingEvent.id}` : '/api/admin/events';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingEvent),
      });

      if (res.ok) {
        addToast('success', isEdit ? 'Event updated' : 'Event created');
        setEditingEvent(null);
        fetchEvents();
      } else {
        const errorData = await res.json();
        addToast('error', errorData.error || 'Failed to save event');
      }
    } catch {
      addToast('error', 'Error saving event');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        addToast('success', 'Event deleted');
        fetchEvents();
      } else {
        const errorData = await res.json().catch(() => ({}));
        addToast('error', errorData.error || 'Failed to delete event');
      }
    } catch {
      addToast('error', 'Error deleting event');
    }
  };

  const handleToggleVisibility = async (event: CmsEvent) => {
    try {
      const res = await fetch(`/api/admin/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: !event.isVisible }),
      });
      if (res.ok) {
        addToast('success', `Event ${!event.isVisible ? 'published' : 'hidden'}`);
        fetchEvents();
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
    if (targetIndex < 0 || targetIndex >= events.length) return;

    const reordered = [...events];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    setEvents(reordered);

    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reorder',
          ids: reordered.map((e) => e.id),
        }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save order');
      }
      addToast('success', 'Events reordered');
    } catch (err: any) {
      addToast('error', err?.message || 'Failed to save order');
      fetchEvents();
    }
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim() || !editingEvent) return;
    setEditingEvent({
      ...editingEvent,
      highlights: [...(editingEvent.highlights || []), newHighlight.trim()],
    });
    setNewHighlight('');
  };

  const handleRemoveHighlight = (idx: number) => {
    if (!editingEvent) return;
    setEditingEvent({
      ...editingEvent,
      highlights: (editingEvent.highlights || []).filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <AdminHeader
        title="Events: Festivals & Sacred Gatherings"
        subtitle="Manage cultural festivals, spiritual gatherings, and seasonal conservation events displayed under /events on the public website."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Control Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl shadow-black/20">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events by title, location..."
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

            <div className="flex items-center gap-2 bg-slate-950/50 p-1 rounded-xl border border-slate-800">
              {[
                { key: 'all', label: 'All' },
                { key: 'festival', label: 'Festivals' },
                { key: 'spiritual', label: 'Spiritual' },
                { key: 'community', label: 'Community' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setCategoryFilter(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                    categoryFilter === tab.key
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchEvents}
              className="p-2.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all"
              title="Refresh events"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Event</span>
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
            <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mb-4" />
            <p className="text-slate-400 text-sm">Loading events catalogue...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-16 text-center">
            <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-200 mb-1">No events found</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
              {searchQuery ? `No events match "${searchQuery}"` : 'Get started by creating your first festival or event.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((evt, idx) => (
              <div
                key={evt.id}
                className={`bg-slate-900/80 border rounded-2xl p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  evt.isVisible ? 'border-slate-800/80' : 'border-slate-800/40 opacity-60 bg-slate-950/60'
                }`}
              >
                <div className="flex items-start md:items-center gap-4 flex-1">
                  {/* Image thumbnail */}
                  <div className="w-20 h-16 rounded-xl bg-slate-800 overflow-hidden shrink-0 relative border border-slate-700/50">
                    {evt.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                    ) : (
                      <Calendar className="w-6 h-6 text-slate-500 m-auto" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-slate-100 text-base">
                        {evt.title}
                      </h4>
                      {evt.nepaliName && (
                        <span className="text-xs text-amber-400/80 font-editorial-serif">
                          {evt.nepaliName}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700">
                        {evt.categoryLabel || evt.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {evt.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {evt.location}
                      </span>
                      <span>•</span>
                      <span>{evt.season}</span>
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
                    disabled={idx === events.length - 1}
                    className="p-2 text-slate-400 hover:text-slate-100 disabled:opacity-30 rounded-xl hover:bg-slate-800 border border-slate-800"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleToggleVisibility(evt)}
                    className={`p-2 rounded-xl border transition-all ${
                      evt.isVisible
                        ? 'text-slate-400 hover:text-amber-300 border-slate-800 hover:bg-slate-800'
                        : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                    }`}
                    title={evt.isVisible ? 'Hide event' : 'Publish event'}
                  >
                    {evt.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      setEditingEvent(evt);
                      setNewHighlight('');
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-amber-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteEvent(evt.id)}
                    className="p-2 text-slate-500 hover:text-red-400 rounded-xl hover:bg-red-500/10 border border-slate-800 transition-all"
                    title="Delete event"
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
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                {editingEvent.id ? 'Edit Event / Gathering' : 'Create New Event'}
              </h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEvent.title || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    placeholder="e.g. Indra Jatra & Sacred Kumari Festival"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nepali Name (Devanagari)
                  </label>
                  <input
                    type="text"
                    value={editingEvent.nepaliName || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, nepaliName: e.target.value })}
                    placeholder="e.g. इन्द्रजात्रा"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 font-editorial-serif"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={editingEvent.category || 'festival'}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      const labels: Record<string, string> = {
                        festival: 'Sacred Festival',
                        spiritual: 'Spiritual Retreat',
                        community: 'Community & Impact',
                      };
                      setEditingEvent({
                        ...editingEvent,
                        category: cat,
                        categoryLabel: labels[cat] || 'Event',
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                  >
                    <option value="festival">Festival</option>
                    <option value="spiritual">Spiritual Retreat</option>
                    <option value="community">Community & Impact</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category Display Label
                  </label>
                  <input
                    type="text"
                    value={editingEvent.categoryLabel || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, categoryLabel: e.target.value })}
                    placeholder="e.g. Sacred Festival"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Season
                  </label>
                  <input
                    type="text"
                    value={editingEvent.season || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, season: e.target.value })}
                    placeholder="e.g. Autumn / Spring"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date Description
                  </label>
                  <input
                    type="text"
                    value={editingEvent.date || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    placeholder="e.g. September (Bhadra Full Moon)"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingEvent.location || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    placeholder="e.g. Kathmandu & Patan Durbar Squares"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Event Feature Image URL
                </label>
                <input
                  type="text"
                  value={editingEvent.image || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, image: e.target.value })}
                  placeholder="/explore-with-sakar/images/..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={editingEvent.shortDesc || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, shortDesc: e.target.value })}
                  placeholder="Summary of the celebration and rituals..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                />
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Experience Highlights
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
                    placeholder="Add a key event moment..."
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
                  {(editingEvent.highlights || []).map((hl, i) => (
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Sakar’s Local Note / Insider Tip
                </label>
                <textarea
                  rows={2}
                  value={editingEvent.sakarNote || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, sakarNote: e.target.value })}
                  placeholder="Personal hosting perspective..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="event-visible"
                  checked={editingEvent.isVisible !== false}
                  onChange={(e) => setEditingEvent({ ...editingEvent, isVisible: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="event-visible" className="text-xs font-semibold text-slate-200 cursor-pointer">
                  Visible on Public Website
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
