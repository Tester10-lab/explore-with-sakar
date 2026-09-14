'use client';

import React, { useState, useEffect } from 'react';
import {
  Globe,
  Sparkles,
  Save,
  Loader2,
  Plus,
  Trash2,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Eye,
  Megaphone,
  TrendingUp,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ImageUploader from '@/components/admin/ImageUploader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { WebsiteSettings, HomepageStat } from '@/types/cms';

export default function AdminHomepagePage() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [newSlideUrl, setNewSlideUrl] = useState('');

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
      } else {
        addToast('error', 'Failed to load homepage settings');
      }
    } catch {
      addToast('error', 'Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update homepage settings');
      }

      setSettings(data.settings);
      addToast('success', 'Homepage content updated successfully!');
    } catch (err: any) {
      addToast('error', err?.message || 'Error updating homepage');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSlide = (url: string) => {
    if (!url || !settings) return;
    const current = settings.hero?.backgroundSlideshowImages || [];
    setSettings({
      ...settings,
      hero: {
        ...settings.hero,
        backgroundSlideshowImages: [...current, url],
      },
    });
    setNewSlideUrl('');
  };

  const handleRemoveSlide = (index: number) => {
    if (!settings) return;
    const current = settings.hero?.backgroundSlideshowImages || [];
    setSettings({
      ...settings,
      hero: {
        ...settings.hero,
        backgroundSlideshowImages: current.filter((_, i) => i !== index),
      },
    });
  };

  const handleUpdateStat = (
    index: number,
    field: keyof HomepageStat,
    value: string
  ) => {
    if (!settings) return;
    const stats = [...(settings.stats || [])];
    if (stats[index]) {
      stats[index] = { ...stats[index], [field]: value };
      setSettings({ ...settings, stats });
    }
  };

  const handleAddStat = () => {
    if (!settings) return;
    const newStat: HomepageStat = {
      id: `stat-${Date.now()}`,
      value: '100%',
      label: 'New Statistic',
      sublabel: 'Supporting description',
    };
    setSettings({
      ...settings,
      stats: [...(settings.stats || []), newStat],
    });
  };

  const handleRemoveStat = (index: number) => {
    if (!settings) return;
    const stats = (settings.stats || []).filter((_, i) => i !== index);
    setSettings({ ...settings, stats });
  };

  if (isLoading || !settings) {
    return (
      <div className="p-8 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[50vh] text-himalaya-400">
        <Loader2 className="w-8 h-8 animate-spin text-terracotta mb-2" />
        <p className="text-sm">Loading Homepage CMS Settings...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      <AdminHeader
        title="Homepage Content Management"
        subtitle="Control hero headlines, CTA buttons, impact statistics, and background slideshows."
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <form onSubmit={handleSave} className="space-y-8">
        {/* Save Bar */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-4 flex items-center justify-between sticky top-4 z-30 shadow-floating backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-terracotta-light" />
            <span className="text-xs font-bold uppercase tracking-wider text-parchment-200">
              Homepage Configuration
            </span>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2.5 bg-terracotta hover:bg-terracotta-light text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-warm transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save All Changes</span>
          </button>
        </div>

        {/* 1. Hero Section Management */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-himalaya-800 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta">
              Hero Experience
            </span>
            <h3 className="font-editorial-serif text-xl font-bold text-white mt-0.5">
              Hero Headline & Narrative
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-himalaya-300 font-semibold mb-1">
                Badge Tag Text (Above Headline)
              </label>
              <input
                type="text"
                value={settings.hero?.badgeText || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    hero: { ...settings.hero, badgeText: e.target.value },
                  })
                }
                placeholder="A Journey Beyond The Surface"
                className="w-full px-3.5 py-2.5 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-himalaya-300 font-semibold mb-1">
                  Headline Text Part 1
                </label>
                <input
                  type="text"
                  value={settings.hero?.headlinePart1 || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hero: { ...settings.hero, headlinePart1: e.target.value },
                    })
                  }
                  placeholder="Discover Nepal Through"
                  className="w-full px-3.5 py-2.5 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-terracotta-light font-semibold mb-1">
                  Headline Highlight 1 (Serif Accent)
                </label>
                <input
                  type="text"
                  value={settings.hero?.headlineHighlight1 || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hero: { ...settings.hero, headlineHighlight1: e.target.value },
                    })
                  }
                  placeholder="Culture"
                  className="w-full px-3.5 py-2.5 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-himalaya-300 font-semibold mb-1">
                  Headline Text Part 2
                </label>
                <input
                  type="text"
                  value={settings.hero?.headlinePart2 || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hero: { ...settings.hero, headlinePart2: e.target.value },
                    })
                  }
                  placeholder=", Spirituality &"
                  className="w-full px-3.5 py-2.5 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-terracotta-light font-semibold mb-1">
                  Headline Highlight 2 (Serif Accent)
                </label>
                <input
                  type="text"
                  value={settings.hero?.headlineHighlight2 || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hero: { ...settings.hero, headlineHighlight2: e.target.value },
                    })
                  }
                  placeholder="Meaningful"
                  className="w-full px-3.5 py-2.5 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-himalaya-300 font-semibold mb-1">
                Supporting Sub-Description
              </label>
              <textarea
                rows={3}
                value={settings.hero?.description || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    hero: { ...settings.hero, description: e.target.value },
                  })
                }
                placeholder="Welcome to Explore With Sakar..."
                className="w-full px-3.5 py-2.5 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
              />
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2 p-4 bg-himalaya-950 rounded-2xl border border-himalaya-850">
                <span className="text-[11px] font-bold uppercase tracking-wider text-parchment-300">
                  Primary Action Button
                </span>
                <div>
                  <label className="block text-himalaya-400 text-[11px] mb-1">Button Label</label>
                  <input
                    type="text"
                    value={settings.hero?.ctaText || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hero: { ...settings.hero, ctaText: e.target.value },
                      })
                    }
                    placeholder="Begin The Journey"
                    className="w-full px-3 py-1.5 bg-himalaya-900 border border-himalaya-800 rounded-lg text-parchment-100 focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-himalaya-400 text-[11px] mb-1">Target Link</label>
                  <input
                    type="text"
                    value={settings.hero?.ctaLink || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hero: { ...settings.hero, ctaLink: e.target.value },
                      })
                    }
                    placeholder="#experiences or /experiences"
                    className="w-full px-3 py-1.5 bg-himalaya-900 border border-himalaya-800 rounded-lg font-mono text-parchment-100 focus:border-terracotta"
                  />
                </div>
              </div>

              <div className="space-y-2 p-4 bg-himalaya-950 rounded-2xl border border-himalaya-850">
                <span className="text-[11px] font-bold uppercase tracking-wider text-parchment-300">
                  Secondary Action Button
                </span>
                <div>
                  <label className="block text-himalaya-400 text-[11px] mb-1">Button Label</label>
                  <input
                    type="text"
                    value={settings.hero?.secondaryCtaText || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hero: { ...settings.hero, secondaryCtaText: e.target.value },
                      })
                    }
                    placeholder="Chat with Sakar on WhatsApp"
                    className="w-full px-3 py-1.5 bg-himalaya-900 border border-himalaya-800 rounded-lg text-parchment-100 focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-himalaya-400 text-[11px] mb-1">Target Link</label>
                  <input
                    type="text"
                    value={settings.hero?.secondaryCtaLink || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hero: { ...settings.hero, secondaryCtaLink: e.target.value },
                      })
                    }
                    placeholder="/contact or https://wa.me/..."
                    className="w-full px-3 py-1.5 bg-himalaya-900 border border-himalaya-800 rounded-lg font-mono text-parchment-100 focus:border-terracotta"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Trust & Impact Statistics Management */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-himalaya-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-saffron">
                Trust & Credentials
              </span>
              <h3 className="font-editorial-serif text-xl font-bold text-white mt-0.5">
                Impact Numbers & Statistics Strip
              </h3>
              <p className="text-xs text-himalaya-400">
                These credentials display directly under the hero section to establish immediate credibility.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddStat}
              className="px-3 py-1.5 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-xs font-semibold text-parchment-200 flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Stat</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {(settings.stats || []).map((stat, idx) => (
              <div
                key={stat.id || idx}
                className="p-4 bg-himalaya-950 border border-himalaya-850 rounded-2xl space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-himalaya-400">
                    Stat #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStat(idx)}
                    className="text-himalaya-500 hover:text-rose-400 p-1 transition-colors"
                    title="Remove Stat"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-himalaya-400 text-[11px] mb-1">
                    Value / Metric (e.g. 10+ Years, 1,200+, 100%)
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleUpdateStat(idx, 'value', e.target.value)}
                    className="w-full px-3 py-1.5 bg-himalaya-900 border border-himalaya-800 rounded-lg font-bold text-parchment-100 focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-himalaya-400 text-[11px] mb-1">
                    Primary Title Label
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleUpdateStat(idx, 'label', e.target.value)}
                    className="w-full px-3 py-1.5 bg-himalaya-900 border border-himalaya-800 rounded-lg text-parchment-100 focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-himalaya-400 text-[11px] mb-1">
                    Sublabel / Supporting Note
                  </label>
                  <input
                    type="text"
                    value={stat.sublabel || ''}
                    onChange={(e) => handleUpdateStat(idx, 'sublabel', e.target.value)}
                    className="w-full px-3 py-1.5 bg-himalaya-900 border border-himalaya-800 rounded-lg text-himalaya-400 focus:border-terracotta"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Hero Slideshow Backgrounds */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-himalaya-800 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Visual Backgrounds
            </span>
            <h3 className="font-editorial-serif text-xl font-bold text-white mt-0.5">
              Hero Background Slideshow
            </h3>
            <p className="text-xs text-himalaya-400">
              High-resolution imagery that gently transitions behind the hero narrative.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Existing Slides Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(settings.hero?.backgroundSlideshowImages || []).map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden border border-himalaya-800 bg-himalaya-950 aspect-[16/9]"
                >
                  <img
                    src={imgUrl}
                    alt={`Slide ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveSlide(idx)}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1 shadow-floating"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
                    #{idx + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Slide via Upload */}
            <div className="p-4 bg-himalaya-950 rounded-2xl border border-himalaya-850 space-y-3">
              <label className="block text-parchment-200 font-semibold text-xs">
                Add Slide Image to Carousel
              </label>
              <ImageUploader
                value={newSlideUrl}
                onChange={(url) => {
                  if (url) {
                    handleAddSlide(url);
                  }
                }}
                label=""
                helperText="Upload a new landscape scenic photo to add to the hero rotation"
                aspectRatio="landscape"
              />
            </div>
          </div>
        </div>

        {/* 4. Announcement Bar */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-himalaya-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-saffron">
                Top Announcement
              </span>
              <h3 className="font-editorial-serif text-xl font-bold text-white mt-0.5">
                Seasonal Consultation Notice
              </h3>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.announcement?.isActive ?? true}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcement: {
                      ...settings.announcement,
                      isActive: e.target.checked,
                    },
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-himalaya-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-terracotta"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-himalaya-300 font-semibold mb-1">
                Badge / Tag Text
              </label>
              <input
                type="text"
                value={settings.announcement?.badgeText || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcement: {
                      ...settings.announcement,
                      badgeText: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-himalaya-300 font-semibold mb-1">
                CTA Action Button Text
              </label>
              <input
                type="text"
                value={settings.announcement?.ctaText || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcement: {
                      ...settings.announcement,
                      ctaText: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-himalaya-950 border border-himalaya-800 rounded-xl text-parchment-100 focus:border-terracotta focus:outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
