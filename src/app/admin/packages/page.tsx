'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Package as PackageIcon,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  DollarSign,
  Clock,
  Sparkles,
  Loader2,
  X,
  Layers,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { ExtendedPackage } from '@/types/cms';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<ExtendedPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit / New Modal
  const [editingPkg, setEditingPkg] = useState<Partial<ExtendedPackage> | null>(null);
  const [isNewPkg, setIsNewPkg] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Helper string states for array inputs
  const [highlightsText, setHighlightsText] = useState('');
  const [inclusionsText, setInclusionsText] = useState('');
  const [exclusionsText, setExclusionsText] = useState('');

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState<ExtendedPackage | null>(null);
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

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/packages');
      if (res.ok) {
        const data = await res.json();
        setPackages(data.packages || []);
      } else {
        showToast('error', `Failed to load packages (Status: ${res.status})`);
      }
    } catch (err) {
      showToast('error', 'Failed to fetch packages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleOpenNew = () => {
    setIsNewPkg(true);
    setHighlightsText('');
    setInclusionsText('');
    setExclusionsText('');
    setEditingPkg({
      name: '',
      slug: '',
      summary: '',
      price: undefined,
      currency: 'USD',
      priceNote: 'per person / private group of 2+',
      duration: '7 Days / 6 Nights',
      accommodationStyle: 'Curated Boutique Heritage & Stays',
      heroImage: {
        src: '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
        alt: 'Package hero image',
      },
      gallery: [],
      highlights: [],
      inclusions: [
        'All private transfers & airport pick-ups',
        'Handpicked heritage lodgings and premium boutique homestays',
        'Personal local guiding & hosting with Sakar',
        'Official conservation and monument entry permits',
      ],
      exclusions: [
        'International flights to/from Kathmandu',
        'Personal travel & evacuation insurance',
        'Personal bar bills and discretionary gratuities',
      ],
      featured: true,
      status: 'published',
    });
    setInclusionsText(
      [
        'All private transfers & airport pick-ups',
        'Handpicked heritage lodgings and premium boutique homestays',
        'Personal local guiding & hosting with Sakar',
        'Official conservation and monument entry permits',
      ].join('\n')
    );
    setExclusionsText(
      [
        'International flights to/from Kathmandu',
        'Personal travel & evacuation insurance',
        'Personal bar bills and discretionary gratuities',
      ].join('\n')
    );
  };

  const handleOpenEdit = (pkg: ExtendedPackage) => {
    setIsNewPkg(false);
    setEditingPkg({
      ...pkg,
      name: pkg.name || (pkg as any).title || '',
      summary: pkg.summary || (pkg as any).overview || '',
      heroImage: pkg.heroImage || (pkg as any).image || { src: '', alt: '' },
    });
    setHighlightsText((pkg.highlights || []).join('\n'));
    setInclusionsText((pkg.inclusions || []).join('\n'));
    setExclusionsText((pkg.exclusions || []).join('\n'));
  };

  const handleSave = async () => {
    if (!editingPkg?.name || !editingPkg?.slug) {
      showToast('error', 'Package Name and Slug are required');
      return;
    }

    setIsSaving(true);

    try {
      const payload: Partial<ExtendedPackage> = {
        ...editingPkg,
        highlights: highlightsText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        inclusions: inclusionsText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        exclusions: exclusionsText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const url = isNewPkg ? '/api/admin/packages' : `/api/admin/packages/${editingPkg.id}`;
      const method = isNewPkg ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save package');
      }

      showToast('success', isNewPkg ? 'New package created successfully!' : 'Package updated!');
      setEditingPkg(null);
      fetchPackages();
    } catch (err: any) {
      showToast('error', err?.message || 'Failed to save package');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/packages/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete package');

      showToast('success', `Deleted "${deleteTarget.name}"`);
      setDeleteTarget(null);
      fetchPackages();
    } catch (err: any) {
      showToast('error', err?.message || 'Error deleting package');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async (pkg: ExtendedPackage) => {
    const newStatus = pkg.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/admin/packages/${pkg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to toggle status');

      showToast(
        'success',
        newStatus === 'published'
          ? `"${pkg.name}" is now published on the public site`
          : `"${pkg.name}" moved to drafts`
      );
      fetchPackages();
    } catch (err: any) {
      showToast('error', err?.message || 'Error updating status');
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        onToggleMobileSidebar={() => {}}
        title="Packages & Pricing"
        subtitle="Manage signature packages, transparent pricing, highlights, and inclusions"
        actionButton={{
          label: 'New Package',
          onClick: handleOpenNew,
          icon: <Plus className="w-4 h-4" />,
        }}
      />

      <div className="px-4 sm:px-8 space-y-6 max-w-7xl mx-auto">
        {/* Top Info Banner */}
        <div className="bg-himalaya-900/80 border border-himalaya-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-terracotta/20 text-terracotta flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-base font-bold text-white">
                Live Pricing & Itinerary Packages
              </h3>
              <p className="text-xs text-parchment-400 font-light mt-0.5">
                Packages created or edited here immediately update the public <code>/packages</code> page.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-light text-white text-xs font-semibold shadow-warm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Package</span>
            </button>
          </div>
        </div>

        {/* Packages List */}
        {isLoading ? (
          <div className="p-16 text-center">
            <Loader2 className="w-8 h-8 text-terracotta animate-spin mx-auto mb-3" />
            <p className="text-xs font-mono uppercase tracking-widest text-parchment-400">
              Loading packages...
            </p>
          </div>
        ) : packages.length === 0 ? (
          <div className="bg-himalaya-900/40 border border-himalaya-800/80 rounded-2xl p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-himalaya-800 text-parchment-300 flex items-center justify-center mx-auto">
              <PackageIcon className="w-7 h-7" />
            </div>
            <div className="max-w-md mx-auto">
              <h4 className="font-editorial-serif text-lg font-bold text-parchment-100">
                No Packages Found
              </h4>
              <p className="text-xs text-parchment-400 font-light mt-1">
                Create your first curated travel package to showcase on the packages page.
              </p>
            </div>
            <button
              onClick={handleOpenNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-terracotta text-white text-xs font-semibold shadow-warm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create First Package</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-himalaya-900/60 border border-himalaya-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-himalaya-700 transition-all shadow-subtle group"
              >
                <div>
                  {/* Image Preview & Badges */}
                  <div className="relative h-44 w-full overflow-hidden bg-himalaya-950">
                    {pkg.heroImage?.src || (pkg as any).image?.src ? (
                      <img
                        src={pkg.heroImage?.src || (pkg as any).image?.src}
                        alt={pkg.name || (pkg as any).title || 'Nepal Package'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-parchment-500">
                        <PackageIcon className="w-8 h-8 opacity-40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950 via-himalaya-950/20 to-transparent" />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold ${
                          pkg.status === 'published'
                            ? 'bg-emerald-500/90 text-white'
                            : 'bg-amber-500/90 text-white'
                        }`}
                      >
                        {pkg.status}
                      </span>
                      {pkg.featured && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-terracotta/90 text-white flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-white">
                      <div>
                        {pkg.price ? (
                          <span className="font-editorial-serif text-xl font-bold text-white">
                            ${pkg.price.toLocaleString()} <span className="text-xs font-normal text-parchment-300">USD</span>
                          </span>
                        ) : (
                          <span className="text-xs font-bold uppercase tracking-wider text-saffron-light">
                            Custom Quote
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-parchment-300 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-terracotta-light" /> {pkg.duration}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="font-editorial-serif text-lg font-bold text-parchment-100 group-hover:text-terracotta-light transition-colors line-clamp-1">
                        {pkg.name || (pkg as any).title || 'Curated Package'}
                      </h4>
                      <p className="text-xs text-parchment-400 font-light line-clamp-2 mt-1">
                        {pkg.summary || (pkg as any).overview || ''}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-himalaya-800/80 space-y-1 text-xs text-parchment-300 font-light">
                      <p className="flex items-center gap-1.5 truncate">
                        <span className="font-mono text-[10px] text-himalaya-400">STYLE:</span>
                        <span className="truncate">{pkg.accommodationStyle || 'Boutique Heritage'}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-himalaya-400">INCLUSIONS:</span>
                        <span>{pkg.inclusions?.length || 0} items listed</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 bg-himalaya-950/60 border-t border-himalaya-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleStatus(pkg)}
                      className={`p-2 rounded-lg text-xs font-mono transition-colors ${
                        pkg.status === 'published'
                          ? 'text-emerald-400 hover:bg-emerald-950/50'
                          : 'text-parchment-400 hover:bg-himalaya-800'
                      }`}
                      title={pkg.status === 'published' ? 'Unpublish to draft' : 'Publish to live site'}
                    >
                      {pkg.status === 'published' ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href={`/packages#${pkg.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-parchment-400 hover:text-white hover:bg-himalaya-800 transition-colors"
                      title="View live page"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(pkg)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-himalaya-800 hover:bg-himalaya-700 text-parchment-100 text-xs font-semibold border border-himalaya-700 transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-saffron-light" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteTarget(pkg)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/50 hover:text-rose-300 transition-colors"
                      title="Delete package"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Package Edit/Create Drawer/Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center items-start p-4 sm:p-6 lg:p-8">
          <div className="relative w-full max-w-3xl bg-himalaya-900 border border-himalaya-700 rounded-3xl shadow-2xl overflow-hidden my-6">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-himalaya-800 flex items-center justify-between bg-himalaya-950/60 sticky top-0 z-20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-terracotta/20 text-terracotta flex items-center justify-center">
                  <PackageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-editorial-serif text-lg font-bold text-white">
                    {isNewPkg ? 'Create Curated Package' : `Edit: ${editingPkg.name}`}
                  </h3>
                  <p className="text-xs text-parchment-400 font-light">
                    Update pricing, highlights, itinerary length, and transparent inclusions.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingPkg(null)}
                className="p-2 rounded-xl text-parchment-400 hover:text-white hover:bg-himalaya-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1.5">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    value={editingPkg.name || ''}
                    onChange={(e) => {
                      const name = e.target.value;
                      setEditingPkg((prev) => ({
                        ...prev,
                        name,
                        slug: isNewPkg
                          ? name
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/(^-|-$)+/g, '')
                          : prev?.slug || '',
                      }));
                    }}
                    placeholder="e.g. Living Heritage & Sacred Valleys"
                    className="w-full px-4 py-2.5 rounded-xl bg-himalaya-950 border border-himalaya-700 text-parchment-100 text-sm focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1.5">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={editingPkg.slug || ''}
                    onChange={(e) =>
                      setEditingPkg((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="e.g. living-heritage-kathmandu-valley"
                    className="w-full px-4 py-2.5 rounded-xl bg-himalaya-950 border border-himalaya-700 text-parchment-100 text-sm font-mono focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1.5">
                  Short Overview / Summary *
                </label>
                <textarea
                  rows={2}
                  value={editingPkg.summary || ''}
                  onChange={(e) =>
                    setEditingPkg((prev) => ({ ...prev, summary: e.target.value }))
                  }
                  placeholder="Summary of this curated journey..."
                  className="w-full px-4 py-2.5 rounded-xl bg-himalaya-950 border border-himalaya-700 text-parchment-100 text-sm focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Pricing & Duration Grid */}
              <div className="p-4 rounded-2xl bg-himalaya-950/60 border border-himalaya-800 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-terracotta-light font-bold flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" /> Pricing & Duration Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-parchment-400 mb-1">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      value={editingPkg.price !== undefined ? editingPkg.price : ''}
                      onChange={(e) =>
                        setEditingPkg((prev) => ({
                          ...prev,
                          price: e.target.value ? Number(e.target.value) : undefined,
                        }))
                      }
                      placeholder="e.g. 1850"
                      className="w-full px-3.5 py-2 rounded-xl bg-himalaya-900 border border-himalaya-700 text-parchment-100 text-sm focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-parchment-400 mb-1">
                      Price Note / Basis
                    </label>
                    <input
                      type="text"
                      value={editingPkg.priceNote || ''}
                      onChange={(e) =>
                        setEditingPkg((prev) => ({ ...prev, priceNote: e.target.value }))
                      }
                      placeholder="per person / private group of 2+"
                      className="w-full px-3.5 py-2 rounded-xl bg-himalaya-900 border border-himalaya-700 text-parchment-100 text-sm focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-parchment-400 mb-1">
                      Duration String
                    </label>
                    <input
                      type="text"
                      value={editingPkg.duration || ''}
                      onChange={(e) =>
                        setEditingPkg((prev) => ({ ...prev, duration: e.target.value }))
                      }
                      placeholder="e.g. 7 Days / 6 Nights"
                      className="w-full px-3.5 py-2 rounded-xl bg-himalaya-900 border border-himalaya-700 text-parchment-100 text-sm focus:outline-none focus:border-terracotta"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-parchment-400 mb-1">
                    Accommodation Standard
                  </label>
                  <input
                    type="text"
                    value={editingPkg.accommodationStyle || ''}
                    onChange={(e) =>
                      setEditingPkg((prev) => ({ ...prev, accommodationStyle: e.target.value }))
                    }
                    placeholder="e.g. Handpicked Boutique Heritage & Eco Stays"
                    className="w-full px-3.5 py-2 rounded-xl bg-himalaya-900 border border-himalaya-700 text-parchment-100 text-sm focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Hero Image */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-2">
                  Hero Image
                </label>
                <ImageUploader
                  value={editingPkg.heroImage?.src || ''}
                  onChange={(url) =>
                    setEditingPkg((prev) => ({
                      ...prev,
                      heroImage: { src: url, alt: prev?.name || 'Package Hero' },
                    }))
                  }
                />
              </div>

              {/* Highlights & Inclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1.5">
                    Highlights (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={highlightsText}
                    onChange={(e) => setHighlightsText(e.target.value)}
                    placeholder="Morning meditation with monastery monks&#10;Private pottery masterclass in Bhaktapur&#10;Sunrise tea overlooking Langtang range"
                    className="w-full px-4 py-2.5 rounded-xl bg-himalaya-950 border border-himalaya-700 text-parchment-100 text-xs font-mono focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1.5">
                    Inclusions (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={inclusionsText}
                    onChange={(e) => setInclusionsText(e.target.value)}
                    placeholder="Private Scorpio 4WD vehicle&#10;Dedicated hosting by Sakar&#10;All heritage & national park permits"
                    className="w-full px-4 py-2.5 rounded-xl bg-himalaya-950 border border-himalaya-700 text-parchment-100 text-xs font-mono focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1.5">
                  Exclusions (One per line)
                </label>
                <textarea
                  rows={3}
                  value={exclusionsText}
                  onChange={(e) => setExclusionsText(e.target.value)}
                  placeholder="International airfare&#10;Travel insurance&#10;Discretionary tips"
                  className="w-full px-4 py-2.5 rounded-xl bg-himalaya-950 border border-himalaya-700 text-parchment-100 text-xs font-mono focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Status & Featured */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-himalaya-950/60 border border-himalaya-800">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="pkg-featured"
                    checked={editingPkg.featured || false}
                    onChange={(e) =>
                      setEditingPkg((prev) => ({ ...prev, featured: e.target.checked }))
                    }
                    className="w-4 h-4 rounded border-himalaya-700 text-terracotta focus:ring-terracotta"
                  />
                  <label htmlFor="pkg-featured" className="text-xs text-parchment-200 cursor-pointer">
                    Feature on homepage and highlight in package lists
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-parchment-400">Status:</span>
                  <select
                    value={editingPkg.status || 'published'}
                    onChange={(e) =>
                      setEditingPkg((prev) => ({
                        ...prev,
                        status: e.target.value as 'draft' | 'published',
                      }))
                    }
                    className="px-3 py-1.5 rounded-xl bg-himalaya-900 border border-himalaya-700 text-parchment-100 text-xs font-mono focus:outline-none focus:border-terracotta"
                  >
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-himalaya-800 bg-himalaya-950/80 flex items-center justify-end gap-3 sticky bottom-0 z-20 backdrop-blur-md">
              <button
                onClick={() => setEditingPkg(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-parchment-300 hover:text-white hover:bg-himalaya-800 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-terracotta hover:bg-terracotta-light text-white text-xs font-semibold shadow-warm transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Save Package</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Package"
        message={`Are you sure you want to permanently delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete Package"
      />

      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
