'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Upload,
  Search,
  Filter,
  Trash2,
  Edit3,
  Star,
  Copy,
  Check,
  Sparkles,
  MapPin,
  ExternalLink,
  X,
  Loader2,
  Crop,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import ImageUploader from '@/components/admin/ImageUploader';
import ImageCropModal from '@/components/admin/ImageCropModal';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { ExtendedGalleryPhoto } from '@/types/cms';

const CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'mountains', label: 'Himalayan Vistas' },
  { id: 'heritage', label: 'Living Heritage' },
  { id: 'spiritual', label: 'Spiritual Sanctuaries' },
  { id: 'homestay', label: 'Village Homestays' },
  { id: 'trails', label: 'Hidden Trails' },
];

export default function AdminPhotosPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<ExtendedGalleryPhoto[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Multi-upload state
  const [isUploadingMultiple, setIsUploadingMultiple] = useState(false);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  // Edit / Add Photo Modal
  const [editingPhoto, setEditingPhoto] = useState<Partial<ExtendedGalleryPhoto> | null>(null);
  const [isNewPhoto, setIsNewPhoto] = useState(false);
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);

  // Deletion modal
  const [deleteTarget, setDeleteTarget] = useState<ExtendedGalleryPhoto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Direct Crop & Rotate modal state
  const [cropPhotoTarget, setCropPhotoTarget] = useState<ExtendedGalleryPhoto | null>(null);

  // Copied URL state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/photos', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const data = await res.json();
        setPhotos(data.photos || []);
      }
    } catch (err) {
      showToast('error', 'Failed to fetch photos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCroppedPhoto = async (newUrl: string) => {
    if (!cropPhotoTarget) return;
    try {
      const updated = { ...cropPhotoTarget, image: newUrl };
      const res = await fetch(`/api/admin/photos/${cropPhotoTarget.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error('Failed to update photo');
      setPhotos((prev) => prev.map((p) => (p.id === cropPhotoTarget.id ? updated : p)));
      showToast('success', 'Photo cropped, rotated & updated!');
      router.refresh();
    } catch (err: any) {
      showToast('error', err?.message || 'Error saving cropped photo');
    } finally {
      setCropPhotoTarget(null);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleMultipleUpload = async (files: FileList) => {
    setIsUploadingMultiple(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const formData = new FormData();
        formData.append('file', file);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (uploadRes.ok && uploadData.url) {
          const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          const title = rawName.charAt(0).toUpperCase() + rawName.slice(1);

          await fetch('/api/admin/photos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title,
              category: activeCategory === 'all' ? 'mountains' : activeCategory,
              categoryLabel:
                CATEGORIES.find((c) => c.id === (activeCategory === 'all' ? 'mountains' : activeCategory))
                  ?.label || 'Himalayan Vistas',
              location: 'Nepal',
              image: uploadData.url,
              alt: title,
              orientation: 'landscape',
              caption: `Capturing moments from our journey through ${title}.`,
              featured: false,
            }),
          });

          successCount++;
        }
      } catch (err) {
        console.error('Error in multi-upload:', err);
      }
    }

    setIsUploadingMultiple(false);
    showToast('success', `Successfully uploaded ${successCount} photographs!`);
    fetchPhotos();
    router.refresh();
  };

  const handleToggleFeatured = async (photo: ExtendedGalleryPhoto) => {
    try {
      const res = await fetch(`/api/admin/photos/${photo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !photo.featured }),
      });

      if (!res.ok) throw new Error('Failed to update photo');

      showToast(
        'success',
        photo.featured
          ? `Removed "${photo.title}" from featured rotation`
          : `Set "${photo.title}" as featured in Hero & Gallery!`
      );
      fetchPhotos();
      router.refresh();
    } catch (err: any) {
      showToast('error', err?.message || 'Error updating photo');
    }
  };

  const handleSavePhotoModal = async () => {
    if (!editingPhoto?.image) {
      showToast('error', 'Image is required');
      return;
    }

    setIsSavingPhoto(true);

    try {
      const url = isNewPhoto
        ? '/api/admin/photos'
        : `/api/admin/photos/${editingPhoto.id}`;
      const method = isNewPhoto ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPhoto),
      });

      if (!res.ok) throw new Error('Failed to save photo');

      showToast(
        'success',
        isNewPhoto ? 'Photo added to gallery!' : 'Photo details updated!'
      );
      setEditingPhoto(null);
      fetchPhotos();
      router.refresh();
    } catch (err: any) {
      showToast('error', err?.message || 'Error saving photo');
    } finally {
      setIsSavingPhoto(false);
    }
  };

  const handleDeletePhotoConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/photos/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete photo');

      showToast('success', `Deleted "${deleteTarget.title}"`);
      setDeleteTarget(null);
      fetchPhotos();
      router.refresh();
    } catch (err: any) {
      showToast('error', err?.message || 'Error deleting photo');
    } finally {
      setIsDeleting(false);
    }
  };

  const copyImageUrl = (photo: ExtendedGalleryPhoto) => {
    navigator.clipboard.writeText(photo.image);
    setCopiedId(photo.id);
    showToast('info', 'Image URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPhotos = photos.filter((photo) => {
    const matchesCategory =
      activeCategory === 'all' || photo.category === activeCategory;
    const matchesSearch =
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.caption?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />

      <AdminHeader
        title="Photo & Gallery Management"
        subtitle={`Total of ${photos.length} photographs in high-resolution database`}
        actionButton={{
          label: 'Upload New Photo',
          onClick: () => {
            setIsNewPhoto(true);
            setEditingPhoto({
              title: '',
              nepaliTitle: '',
              category: 'mountains',
              categoryLabel: 'Himalayan Vistas',
              location: 'Kathmandu / Himalayas, Nepal',
              image: '',
              alt: '',
              orientation: 'landscape',
              caption: '',
              featured: false,
            });
          },
          icon: <Plus className="w-4 h-4" />,
        }}
      />

      <div className="px-4 sm:px-8 space-y-6 max-w-7xl mx-auto">
        {/* Multi Upload Dropzone Area */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 shadow-floating">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-editorial-serif text-lg font-bold text-white">
                Multi-Photo Batch Uploader
              </h3>
              <p className="text-xs text-parchment-400 font-light mt-0.5">
                Select or drag multiple image files (JPG, PNG, WebP) to upload instantly into the gallery
              </p>
            </div>

            <button
              onClick={() => multiFileInputRef.current?.click()}
              disabled={isUploadingMultiple}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-light hover:to-terracotta text-white text-xs font-bold uppercase tracking-wider shadow-warm transition-all disabled:opacity-50"
            >
              {isUploadingMultiple ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading Files...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Select Multiple Photos</span>
                </>
              )}
            </button>
          </div>

          <input
            ref={multiFileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleMultipleUpload(e.target.files);
              }
            }}
          />
        </div>

        {/* Filter Tabs & Search */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-4 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-terracotta text-white font-semibold shadow-warm'
                      : 'bg-himalaya-950 text-parchment-300 hover:text-white hover:bg-himalaya-800'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-himalaya-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title or location..."
              className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl pl-10 pr-4 py-1.5 text-xs text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta"
            />
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-sm text-parchment-400 font-light">
              Loading photograph archive...
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="col-span-full py-16 text-center text-sm text-parchment-400 font-light">
              No photos found in this category.
            </div>
          ) : (
            filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative bg-himalaya-900 border border-himalaya-800 rounded-2xl overflow-hidden shadow-subtle hover:shadow-floating transition-all flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-himalaya-950 overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-saffron-light">
                      {photo.categoryLabel || photo.category}
                    </span>

                    {photo.featured && (
                      <span className="px-2 py-0.5 rounded-md bg-terracotta/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-white shadow-sm flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Hero Featured</span>
                      </span>
                    )}
                  </div>

                  {/* Action overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(photo)}
                        className={`p-2 rounded-lg backdrop-blur-md text-xs font-semibold transition-all ${
                          photo.featured
                            ? 'bg-saffron text-himalaya-950'
                            : 'bg-white/20 hover:bg-white text-white hover:text-himalaya-950'
                        }`}
                        title={photo.featured ? 'Remove Featured' : 'Mark as Featured (Hero/Gallery)'}
                      >
                        <Star className={`w-3.5 h-3.5 ${photo.featured ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={() => copyImageUrl(photo)}
                        className="p-2 rounded-lg bg-white/20 hover:bg-white text-white hover:text-himalaya-950 backdrop-blur-md transition-all"
                        title="Copy Image URL"
                      >
                        {copiedId === photo.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCropPhotoTarget(photo)}
                        className="p-2 rounded-lg bg-terracotta text-white text-xs font-semibold shadow-floating hover:bg-terracotta-light transition-all"
                        title="Crop & Rotate photo"
                      >
                        <Crop className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsNewPhoto(false);
                          setEditingPhoto(photo);
                        }}
                        className="p-2 rounded-lg bg-white text-himalaya-950 text-xs font-semibold shadow-floating hover:bg-parchment-200 transition-all"
                        title="Edit photo details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(photo)}
                        className="p-2 rounded-lg bg-rose-600 text-white text-xs font-semibold shadow-floating hover:bg-rose-500 transition-all"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-3.5 space-y-1 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-editorial-serif text-sm font-bold text-white leading-snug line-clamp-1">
                      {photo.title}
                    </h4>
                    {photo.location && (
                      <p className="text-[11px] text-parchment-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-terracotta-light shrink-0" />
                        <span className="truncate">{photo.location}</span>
                      </p>
                    )}
                  </div>
                  {photo.caption && (
                    <p className="text-[11px] text-himalaya-400 italic font-light line-clamp-2 mt-1">
                      &ldquo;{photo.caption}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit / New Photo Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-himalaya-950 border border-himalaya-800 rounded-2xl shadow-floating max-w-xl w-full p-6 text-parchment-100 my-8 space-y-4 max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="flex items-center justify-between pb-4 border-b border-himalaya-800">
              <h3 className="font-editorial-serif text-lg font-bold text-white">
                {isNewPhoto ? 'Add Photograph to Gallery' : 'Edit Photograph Details'}
              </h3>
              <button
                onClick={() => setEditingPhoto(null)}
                className="text-parchment-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ImageUploader
              value={editingPhoto.image || ''}
              onChange={(url) => setEditingPhoto({ ...editingPhoto, image: url })}
              label="Photograph Image *"
              aspectRatio={editingPhoto.orientation || 'landscape'}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1">
                  Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={editingPhoto.title || ''}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                  placeholder="e.g. Sunrise Over Annapurna"
                  className="w-full bg-himalaya-900 border border-himalaya-700 rounded-xl px-3 py-2 text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1">
                  Nepali Title (Optional)
                </label>
                <input
                  type="text"
                  value={editingPhoto.nepaliTitle || ''}
                  onChange={(e) =>
                    setEditingPhoto({ ...editingPhoto, nepaliTitle: e.target.value })
                  }
                  placeholder="e.g. सूर्योदय र हिमाल"
                  className="w-full bg-himalaya-900 border border-himalaya-700 rounded-xl px-3 py-2 text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1">
                  Category
                </label>
                <select
                  value={editingPhoto.category || 'mountains'}
                  onChange={(e) => {
                    const catId = e.target.value;
                    const catLabel =
                      CATEGORIES.find((c) => c.id === catId)?.label || 'Himalayan Vistas';
                    setEditingPhoto({
                      ...editingPhoto,
                      category: catId as any,
                      categoryLabel: catLabel,
                    });
                  }}
                  className="w-full bg-himalaya-900 border border-himalaya-700 rounded-xl px-3 py-2 text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                >
                  <option value="mountains">Himalayan Vistas</option>
                  <option value="heritage">Living Heritage</option>
                  <option value="spiritual">Spiritual Sanctuaries</option>
                  <option value="homestay">Village Homestays</option>
                  <option value="trails">Hidden Trails</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1">
                  Orientation
                </label>
                <select
                  value={editingPhoto.orientation || 'landscape'}
                  onChange={(e) =>
                    setEditingPhoto({
                      ...editingPhoto,
                      orientation: e.target.value as 'landscape' | 'portrait' | 'square',
                    })
                  }
                  className="w-full bg-himalaya-900 border border-himalaya-700 rounded-xl px-3 py-2 text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                >
                  <option value="landscape">Landscape (Wide)</option>
                  <option value="portrait">Portrait (Tall)</option>
                  <option value="square">Square</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editingPhoto.location || ''}
                  onChange={(e) =>
                    setEditingPhoto({ ...editingPhoto, location: e.target.value })
                  }
                  placeholder="e.g. Sarangkot Ridge"
                  className="w-full bg-himalaya-900 border border-himalaya-700 rounded-xl px-3 py-2 text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1">
                Editorial Caption
              </label>
              <textarea
                rows={2}
                value={editingPhoto.caption || ''}
                onChange={(e) =>
                  setEditingPhoto({ ...editingPhoto, caption: e.target.value })
                }
                placeholder="Narrative caption displayed in lightbox and photo story..."
                className="w-full bg-himalaya-900 border border-himalaya-700 rounded-xl p-2.5 text-xs text-parchment-100 focus:outline-none focus:border-terracotta leading-relaxed"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="featuredCheckbox"
                checked={Boolean(editingPhoto.featured)}
                onChange={(e) =>
                  setEditingPhoto({ ...editingPhoto, featured: e.target.checked })
                }
                className="w-4 h-4 rounded text-terracotta focus:ring-terracotta bg-himalaya-900 border-himalaya-700"
              />
              <label
                htmlFor="featuredCheckbox"
                className="text-xs font-semibold text-parchment-200 cursor-pointer flex items-center gap-1.5"
              >
                <Star className="w-3.5 h-3.5 text-saffron-light fill-current" />
                <span>Feature in Hero Slideshow & Featured Gallery Reel</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-himalaya-800">
              <button
                type="button"
                onClick={() => setEditingPhoto(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-parchment-300 hover:text-white border border-himalaya-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePhotoModal}
                disabled={isSavingPhoto}
                className="px-5 py-2 rounded-xl bg-terracotta hover:bg-terracotta-light text-white text-xs font-bold uppercase tracking-wider shadow-warm disabled:opacity-50 flex items-center gap-1.5"
              >
                {isSavingPhoto ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Photograph</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Photograph"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? This will remove it from the gallery.`}
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete Photograph'}
        onConfirm={handleDeletePhotoConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Direct Crop & Rotate Modal for Gallery Photos */}
      {cropPhotoTarget && (
        <ImageCropModal
          isOpen={Boolean(cropPhotoTarget)}
          imageUrl={cropPhotoTarget.image}
          aspectRatioPreset={cropPhotoTarget.orientation === 'portrait' ? 'portrait' : 'landscape'}
          onClose={() => setCropPhotoTarget(null)}
          onSave={handleSaveCroppedPhoto}
        />
      )}
    </div>
  );
}
