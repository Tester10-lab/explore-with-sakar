'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  Check,
  X,
  Sparkles,
  AlertCircle,
  Loader2,
  RefreshCw,
  Search,
  CheckCircle2,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ImageUploader from '@/components/admin/ImageUploader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { ExtendedServicePillar } from '@/types/cms';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ExtendedServicePillar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingService, setEditingService] = useState<Partial<ExtendedServicePillar> | null>(null);
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

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data.services || []);
      } else {
        addToast('error', 'Failed to load services');
      }
    } catch {
      addToast('error', 'Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreateNew = () => {
    setEditingService({
      title: '',
      nepaliTitle: '',
      slug: '',
      tagline: '',
      shortDescription: '',
      fullPhilosophy: [''],
      heroImage: { src: '/explore-with-sakar/images/homestays/village-meal.jpg', alt: '' },
      keyFeatures: [
        { title: 'Personal Direct Guidance', description: 'Curated and hosted by Sakar with heartfelt local care.' },
      ],
      quote: '',
      quoteAuthor: '',
      badge: 'Core Pillar',
      status: 'published',
    });
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.slug) {
      addToast('error', 'Title and Slug are required');
      return;
    }

    setIsSaving(true);
    const isEdit = Boolean(editingService.id);
    const url = isEdit ? `/api/admin/services/${editingService.id}` : '/api/admin/services';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save service');
      }

      if (isEdit) {
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? data.service : s))
        );
        addToast('success', 'Service updated successfully');
      } else {
        setServices((prev) => [...prev, data.service]);
        addToast('success', 'Service created successfully');
      }

      setEditingService(null);
    } catch (err: any) {
      addToast('error', err?.message || 'Error saving service');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/services/${deleteTargetId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== deleteTargetId));
        addToast('success', 'Service deleted successfully');
      } else {
        addToast('error', 'Failed to delete service');
      }
    } catch {
      addToast('error', 'Error deleting service');
    } finally {
      setIsDeleting(false);
      setDeleteTargetId(null);
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const newServices = [...services];
    const [moved] = newServices.splice(index, 1);
    newServices.splice(targetIndex, 0, moved);

    setServices(newServices);

    try {
      const serviceIds = newServices.map((s) => s.id);
      await fetch('/api/admin/services/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceIds }),
      });
      addToast('success', 'Service order updated');
    } catch {
      addToast('error', 'Failed to save reordered list');
    }
  };

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    const q = searchQuery.toLowerCase();
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        (s.nepaliTitle && s.nepaliTitle.includes(q)) ||
        (s.tagline && s.tagline.toLowerCase().includes(q))
    );
  }, [services, searchQuery]);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      <AdminHeader
        title="Experiences: Travel Pillars & Curation"
        subtitle="Manage the 4 core experience pillars (Go Beyond the Map, Go Within, Feel Closer, Leave a Mark) and offerings displayed on the public website."
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Action Header */}
      <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-himalaya-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pillars and experiences..."
            className="w-full pl-9 pr-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 placeholder:text-himalaya-500 focus:outline-none focus:border-terracotta"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={fetchServices}
            className="p-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 hover:text-white transition-colors"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleCreateNew}
            className="w-full sm:w-auto px-4 py-2 bg-terracotta hover:bg-terracotta-light text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-warm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Experience Pillar</span>
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl overflow-hidden shadow-floating">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-himalaya-800 bg-himalaya-950/60 text-[11px] font-bold uppercase tracking-wider text-himalaya-400">
                <th className="py-3.5 px-4 w-16 text-center">Order</th>
                <th className="py-3.5 px-4">Service / Pillar</th>
                <th className="py-3.5 px-4">Slug / Badge</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-himalaya-850 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-himalaya-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-terracotta" />
                    <span>Loading travel pillars...</span>
                  </td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-himalaya-400">
                    <Layers className="w-8 h-8 mx-auto mb-2 opacity-40 text-himalaya-500" />
                    <p className="font-semibold text-parchment-200">No services found</p>
                  </td>
                </tr>
              ) : (
                filteredServices.map((service, idx) => (
                  <tr key={service.id} className="hover:bg-himalaya-850/60 transition-colors">
                    {/* Order Controls */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => handleMoveOrder(idx, 'up')}
                          className="p-1 rounded bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 disabled:opacity-30"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          disabled={idx === filteredServices.length - 1}
                          onClick={() => handleMoveOrder(idx, 'down')}
                          className="p-1 rounded bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 disabled:opacity-30"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Service Info */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-parchment-100 flex items-center gap-2">
                        <span>{service.title}</span>
                        {service.nepaliTitle && (
                          <span className="text-[11px] font-normal text-himalaya-400 font-serif">
                            ({service.nepaliTitle})
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-himalaya-400 line-clamp-1 mt-0.5 max-w-md font-light">
                        {service.tagline || service.shortDescription}
                      </p>
                    </td>

                    {/* Slug & Badge */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-terracotta-light text-[11px]">
                        /{service.slug}
                      </div>
                      {service.badge && (
                        <span className="inline-block mt-0.5 px-2 py-0.2 rounded-full text-[10px] font-semibold bg-terracotta/15 text-terracotta border border-terracotta/30">
                          {service.badge}
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          service.status === 'published'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                            : 'bg-himalaya-800 text-himalaya-400 border border-himalaya-700'
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingService(service)}
                          className="p-1.5 rounded-lg bg-himalaya-800 hover:bg-terracotta text-parchment-200 hover:text-white transition-all"
                          title="Edit Service"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(service.id)}
                          className="p-1.5 rounded-lg bg-himalaya-800 hover:bg-rose-900/60 text-himalaya-400 hover:text-rose-200 transition-all"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Service Modal Form */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-himalaya-900 border border-himalaya-800 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-floating">
            <div className="flex items-start justify-between border-b border-himalaya-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta">
                  {editingService.id ? 'Edit Service Pillar' : 'Create Travel Pillar'}
                </span>
                <h3 className="font-editorial-serif text-2xl font-bold text-white mt-0.5">
                  {editingService.title || 'New Service Offering'}
                </h3>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="p-1.5 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-himalaya-300 font-semibold mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = !editingService.id
                        ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                        : editingService.slug;
                      setEditingService({ ...editingService, title, slug });
                    }}
                    placeholder="e.g. Village Homestays"
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-himalaya-300 font-semibold mb-1">
                    Nepali Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingService.nepaliTitle || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, nepaliTitle: e.target.value })
                    }
                    placeholder="e.g. गाउँले होमस्टे र आतिथ्य"
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-himalaya-300 font-semibold mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.slug || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, slug: e.target.value })
                    }
                    placeholder="e.g. homestays"
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl font-mono text-parchment-100 focus:border-terracotta focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-himalaya-300 font-semibold mb-1">
                    Badge Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingService.badge || ''}
                    onChange={(e) =>
                      setEditingService({ ...editingService, badge: e.target.value })
                    }
                    placeholder="e.g. Signature Pillar, Popular"
                    className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-himalaya-300 font-semibold mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={editingService.tagline || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, tagline: e.target.value })
                  }
                  placeholder="Living hearth hospitality, organic farming & lifelong bonds"
                  className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-himalaya-300 font-semibold mb-1">
                  Short Overview Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingService.shortDescription || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, shortDescription: e.target.value })
                  }
                  placeholder="A compelling 2-3 sentence summary of this travel pillar..."
                  className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
                />
              </div>

              {/* Hero Image */}
              <div>
                <ImageUploader
                  label="Hero Showcase Image"
                  value={editingService.heroImage?.src || ''}
                  onChange={(url) =>
                    setEditingService({
                      ...editingService,
                      heroImage: { src: url, alt: editingService.title || 'Service Image' },
                    })
                  }
                  aspectRatio="landscape"
                />
              </div>

              {/* Status */}
              <div className="flex items-center gap-4 pt-2">
                <label className="text-himalaya-300 font-semibold">Publishing Status:</label>
                <select
                  value={editingService.status || 'published'}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      status: e.target.value as 'published' | 'draft',
                    })
                  }
                  className="px-3 py-1.5 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
                >
                  <option value="published">Published (Visible Publicly)</option>
                  <option value="draft">Draft (Admin Only)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-himalaya-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2.5 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-light text-white font-bold shadow-warm flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingService.id ? 'Save Changes' : 'Create Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-himalaya-900 border border-himalaya-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-floating text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/80 text-rose-400 border border-rose-800/60 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-editorial-serif text-xl font-bold text-white">
              Delete Service Offering?
            </h3>
            <p className="text-xs text-himalaya-400 leading-relaxed">
              Are you sure you want to delete this travel pillar? It will be removed from the public services overview.
            </p>
            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-xs font-semibold text-parchment-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-warm transition-all flex items-center gap-1.5"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Service</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
