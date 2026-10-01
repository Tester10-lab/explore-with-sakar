'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  ExternalLink,
  Save,
  X,
  Loader2,
  GripVertical,
  Globe,
  Building2,
  Heart,
  Mountain,
  Newspaper,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ImageUploader from '@/components/admin/ImageUploader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { CmsBrandPartner, BrandPartnerCategory } from '@/types/cms';

const CATEGORY_OPTIONS: { value: BrandPartnerCategory; label: string; icon: React.ReactNode }[] = [
  { value: 'travel-agency', label: 'Travel Agency / Tour Operator', icon: <Globe className="w-4 h-4" /> },
  { value: 'ngo', label: 'NGO / Community Organization', icon: <Heart className="w-4 h-4" /> },
  { value: 'tourism-board', label: 'Government Tourism Board', icon: <Building2 className="w-4 h-4" /> },
  { value: 'adventure-gear', label: 'Outdoor / Adventure Gear', icon: <Mountain className="w-4 h-4" /> },
  { value: 'media', label: 'Media / Publication', icon: <Newspaper className="w-4 h-4" /> },
];

const CATEGORY_COLORS: Record<string, string> = {
  'travel-agency': 'bg-orange-100 text-orange-700',
  'ngo': 'bg-emerald-100 text-emerald-700',
  'tourism-board': 'bg-amber-100 text-amber-700',
  'adventure-gear': 'bg-slate-100 text-slate-700',
  'media': 'bg-sky-100 text-sky-700',
};

export default function AdminBrandPartnersPage() {
  const router = useRouter();
  const [partners, setPartners] = useState<CmsBrandPartner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Editor state
  const [showEditor, setShowEditor] = useState(false);
  const [editingPartner, setEditingPartner] = useState<CmsBrandPartner | null>(null);
  const [form, setForm] = useState({
    name: '',
    logoUrl: '',
    websiteUrl: '',
    category: 'travel-agency' as BrandPartnerCategory,
    categoryLabel: 'Travel Agency / Tour Operator',
    description: '',
    isVisible: true,
  });

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const fetchPartners = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/brand-partners');
      if (res.status === 401) {
        router.replace('/admin/login?redirect=/admin/brand-partners');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPartners(data.partners || []);
      }
    } catch {
      showToast('error', 'Failed to load brand partners');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const resetForm = () => {
    setForm({
      name: '',
      logoUrl: '',
      websiteUrl: '',
      category: 'travel-agency',
      categoryLabel: 'Travel Agency / Tour Operator',
      description: '',
      isVisible: true,
    });
    setEditingPartner(null);
  };

  const openEditor = (partner?: CmsBrandPartner) => {
    if (partner) {
      setEditingPartner(partner);
      setForm({
        name: partner.name,
        logoUrl: partner.logoUrl,
        websiteUrl: partner.websiteUrl || '',
        category: partner.category,
        categoryLabel: partner.categoryLabel,
        description: partner.description || '',
        isVisible: partner.isVisible,
      });
    } else {
      resetForm();
    }
    setShowEditor(true);
  };

  const closeEditor = () => {
    setShowEditor(false);
    resetForm();
  };

  const handleCategoryChange = (value: BrandPartnerCategory) => {
    const opt = CATEGORY_OPTIONS.find((o) => o.value === value);
    setForm((prev) => ({
      ...prev,
      category: value,
      categoryLabel: opt?.label || value,
    }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      showToast('error', 'Partner name is required');
      return;
    }
    if (!form.logoUrl) {
      showToast('error', 'Partner logo is required');
      return;
    }

    setIsSaving(true);
    try {
      const url = editingPartner
        ? `/api/admin/brand-partners/${editingPartner.id}`
        : '/api/admin/brand-partners';
      const method = editingPartner ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        showToast('success', editingPartner ? 'Partner updated!' : 'Partner added!');
        closeEditor();
        fetchPartners();
      } else {
        const err = await res.json();
        showToast('error', err.error || 'Failed to save partner');
      }
    } catch {
      showToast('error', 'Failed to save partner');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete partner "${name}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/brand-partners/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('success', `"${name}" deleted`);
        fetchPartners();
      } else {
        showToast('error', 'Failed to delete partner');
      }
    } catch {
      showToast('error', 'Failed to delete partner');
    }
  };

  const handleToggleVisibility = async (partner: CmsBrandPartner) => {
    try {
      const res = await fetch(`/api/admin/brand-partners/${partner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: !partner.isVisible }),
      });
      if (res.ok) {
        showToast('info', partner.isVisible ? 'Partner hidden' : 'Partner visible');
        fetchPartners();
      }
    } catch {
      showToast('error', 'Failed to update visibility');
    }
  };

  return (
    <>
      <AdminHeader
        title="Brand Partners"
        subtitle="Manage trusted partner organizations displayed on the homepage"
      />

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            {partners.length} partner{partners.length !== 1 ? 's' : ''} •{' '}
            {partners.filter((p) => p.isVisible).length} visible
          </p>
          <button
            onClick={() => openEditor()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Partner
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && partners.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No brand partners yet</h3>
            <p className="text-sm text-slate-500 mb-6">
              Add your first partner to showcase trusted organizations on the homepage.
            </p>
            <button
              onClick={() => openEditor()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add First Partner
            </button>
          </div>
        )}

        {/* Partners Grid */}
        {!isLoading && partners.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className={`group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all ${
                  !partner.isVisible ? 'opacity-50' : ''
                }`}
              >
                {/* Logo Area */}
                <div className="relative aspect-[3/2] bg-slate-50 flex items-center justify-center p-6">
                  {partner.logoUrl ? (
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain p-4"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 text-slate-300" />
                  )}

                  {/* Visibility Badge */}
                  {!partner.isVisible && (
                    <span className="absolute top-2 right-2 text-[10px] font-bold uppercase bg-slate-800 text-white px-2 py-0.5 rounded-full">
                      Hidden
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-800 leading-tight">{partner.name}</h3>
                    <span
                      className={`shrink-0 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        CATEGORY_COLORS[partner.category] || 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {partner.categoryLabel}
                    </span>
                  </div>

                  {partner.description && (
                    <p className="text-xs text-slate-500 line-clamp-2">{partner.description}</p>
                  )}

                  {partner.websiteUrl && (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-sky-600 hover:text-sky-700 font-medium"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Website
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex border-t border-slate-100 divide-x divide-slate-100">
                  <button
                    onClick={() => openEditor(partner)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleVisibility(partner)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    {partner.isVisible ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        Show
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(partner.id, partner.name)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">
                {editingPartner ? 'Edit Partner' : 'Add New Partner'}
              </h2>
              <button
                onClick={closeEditor}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-5 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Partner Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Nepal Tourism Board"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => handleCategoryChange(e.target.value as BrandPartnerCategory)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Logo *
                </label>
                <ImageUploader
                  value={form.logoUrl}
                  onChange={(url) => setForm((prev) => ({ ...prev, logoUrl: url }))}
                  label="Upload Partner Logo"
                  helperText="Recommended: transparent PNG, 400×250px"
                />
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Website URL
                </label>
                <input
                  type="url"
                  value={form.websiteUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, websiteUrl: e.target.value }))}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Short Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the partnership..."
                  rows={2}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Visibility Toggle */}
              <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Visible on Homepage</p>
                  <p className="text-xs text-slate-500">Show this partner on the public website</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, isVisible: !prev.isVisible }))}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    form.isVisible ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      form.isVisible ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-200">
              <button
                onClick={closeEditor}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editingPartner ? 'Update Partner' : 'Add Partner'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} />
    </>
  );
}
