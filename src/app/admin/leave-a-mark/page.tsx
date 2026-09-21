'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  Save,
  Loader2,
  RefreshCw,
  ExternalLink,
  Target,
  FileText,
  Clock,
  PieChart,
  Briefcase,
  Layers,
  Award,
  CheckCircle2,
  Plus,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import { LeaveAMarkData } from '@/data/leave-a-mark';

export default function AdminLeaveAMarkPage() {
  const router = useRouter();
  const [data, setData] = useState<LeaveAMarkData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/leave-a-mark');
      if (res.ok) {
        const json = await res.json();
        setData(json.content);
      } else {
        addToast('error', 'Failed to load Leave a Mark content');
      }
    } catch {
      addToast('error', 'Network error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || isSaving) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/leave-a-mark', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        addToast('success', 'Leave a Mark content updated successfully');
        router.refresh();
      } else {
        addToast('error', 'Failed to save changes');
      }
    } catch {
      addToast('error', 'Network error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <AdminHeader
          title="Leave a Mark — Strategy & Content"
          subtitle="Manage the strategic volunteer framework and manifesto."
        />
        <div className="py-20 text-center text-himalaya-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-terracotta" />
          <span>Loading content...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <AdminHeader
        title="Leave a Mark — Strategy & Content"
        subtitle="Manage the strategic volunteer framework, candidate profiles, and impact manifesto for the Leave a Mark pillar."
        action={
          <div className="flex items-center gap-2">
            <Link
              href="/experiences/leave-a-mark"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-himalaya-800 hover:bg-himalaya-700 text-parchment-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>View Public Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-xs font-bold flex items-center gap-2 transition-all shadow-warm disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save All Changes</span>
                </>
              )}
            </button>
          </div>
        }
      />

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Hero & Titles */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-editorial-serif text-lg font-bold text-parchment-100 border-b border-himalaya-800 pb-3">
            1. Pillar Title & Subtitle
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Pillar Title</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Subtitle</label>
              <input
                type="text"
                value={data.subtitle}
                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Beyond the Map Promise */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-editorial-serif text-lg font-bold text-parchment-100 border-b border-himalaya-800 pb-3">
            2. The &ldquo;Beyond the Map&rdquo; Promise & Narrative
          </h3>
          <div>
            <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Section Heading</label>
            <input
              type="text"
              value={data.beyondTheMapPromise.heading}
              onChange={(e) =>
                setData({
                  ...data,
                  beyondTheMapPromise: { ...data.beyondTheMapPromise, heading: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">
              Paragraphs (one per box)
            </label>
            <div className="space-y-3">
              {data.beyondTheMapPromise.paragraphs.map((p, idx) => (
                <div key={idx} className="flex gap-2">
                  <textarea
                    rows={3}
                    value={p}
                    onChange={(e) => {
                      const newP = [...data.beyondTheMapPromise.paragraphs];
                      newP[idx] = e.target.value;
                      setData({
                        ...data,
                        beyondTheMapPromise: { ...data.beyondTheMapPromise, paragraphs: newP },
                      });
                    }}
                    className="flex-1 px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta leading-relaxed"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newP = data.beyondTheMapPromise.paragraphs.filter((_, i) => i !== idx);
                      setData({
                        ...data,
                        beyondTheMapPromise: { ...data.beyondTheMapPromise, paragraphs: newP },
                      });
                    }}
                    className="p-2 text-himalaya-400 hover:text-rose-400"
                    title="Remove paragraph"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    beyondTheMapPromise: {
                      ...data.beyondTheMapPromise,
                      paragraphs: [...data.beyondTheMapPromise.paragraphs, ''],
                    },
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Paragraph</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Framework (Execution Model) */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-editorial-serif text-lg font-bold text-parchment-100 border-b border-himalaya-800 pb-3">
            3. The Execution Model Framework
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Heading</label>
              <input
                type="text"
                value={data.framework.heading}
                onChange={(e) =>
                  setData({
                    ...data,
                    framework: { ...data.framework, heading: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Intro Narrative</label>
              <input
                type="text"
                value={data.framework.intro}
                onChange={(e) =>
                  setData({
                    ...data,
                    framework: { ...data.framework, intro: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-2">Capacity Focus Items</label>
            <div className="space-y-3">
              {data.framework.focusItems.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-himalaya-950 border border-himalaya-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-terracotta uppercase">Item 0{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const items = data.framework.focusItems.filter((_, i) => i !== idx);
                        setData({ ...data, framework: { ...data.framework, focusItems: items } });
                      }}
                      className="text-himalaya-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const items = [...data.framework.focusItems];
                      items[idx] = { ...items[idx], title: e.target.value };
                      setData({ ...data, framework: { ...data.framework, focusItems: items } });
                    }}
                    placeholder="Focus Title..."
                    className="w-full px-3 py-1.5 bg-himalaya-900 border border-himalaya-800 rounded-lg text-xs text-parchment-100 focus:outline-none focus:border-terracotta font-semibold"
                  />
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const items = [...data.framework.focusItems];
                      items[idx] = { ...items[idx], description: e.target.value };
                      setData({ ...data, framework: { ...data.framework, focusItems: items } });
                    }}
                    placeholder="Focus Description..."
                    className="w-full px-3 py-1.5 bg-himalaya-900 border border-himalaya-800 rounded-lg text-xs text-parchment-100 focus:outline-none focus:border-terracotta leading-relaxed"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    framework: {
                      ...data.framework,
                      focusItems: [...data.framework.focusItems, { title: '', description: '' }],
                    },
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Focus Item</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Who Should Apply */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-editorial-serif text-lg font-bold text-parchment-100 border-b border-himalaya-800 pb-3">
            4. Candidate Profiles & Who Should Apply
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Section Heading</label>
              <input
                type="text"
                value={data.whoShouldApply.heading}
                onChange={(e) =>
                  setData({
                    ...data,
                    whoShouldApply: { ...data.whoShouldApply, heading: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Intro Narrative</label>
              <input
                type="text"
                value={data.whoShouldApply.intro}
                onChange={(e) =>
                  setData({
                    ...data,
                    whoShouldApply: { ...data.whoShouldApply, intro: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>

          <div className="space-y-3">
            {data.whoShouldApply.profiles.map((prof, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-himalaya-950 border border-himalaya-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-terracotta uppercase">Role 0{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const profiles = data.whoShouldApply.profiles.filter((_, i) => i !== idx);
                      setData({ ...data, whoShouldApply: { ...data.whoShouldApply, profiles } });
                    }}
                    className="text-himalaya-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={prof.role}
                  onChange={(e) => {
                    const profiles = [...data.whoShouldApply.profiles];
                    profiles[idx] = { ...profiles[idx], role: e.target.value };
                    setData({ ...data, whoShouldApply: { ...data.whoShouldApply, profiles } });
                  }}
                  placeholder="Role title (e.g. Project Managers & Strategists)..."
                  className="w-full px-3 py-1.5 bg-himalaya-900 border border-himalaya-800 rounded-lg text-xs text-parchment-100 focus:outline-none focus:border-terracotta font-semibold"
                />
                <textarea
                  rows={2}
                  value={prof.description}
                  onChange={(e) => {
                    const profiles = [...data.whoShouldApply.profiles];
                    profiles[idx] = { ...profiles[idx], description: e.target.value };
                    setData({ ...data, whoShouldApply: { ...data.whoShouldApply, profiles } });
                  }}
                  placeholder="Role description..."
                  className="w-full px-3 py-1.5 bg-himalaya-900 border border-himalaya-800 rounded-lg text-xs text-parchment-100 focus:outline-none focus:border-terracotta leading-relaxed"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setData({
                  ...data,
                  whoShouldApply: {
                    ...data.whoShouldApply,
                    profiles: [...data.whoShouldApply.profiles, { role: '', description: '' }],
                  },
                })
              }
              className="px-3 py-1.5 rounded-lg bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Candidate Profile</span>
            </button>
          </div>
        </div>

        {/* Section 5: Ultimate Impact */}
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-editorial-serif text-lg font-bold text-parchment-100 border-b border-himalaya-800 pb-3">
            5. The Ultimate Impact
          </h3>
          <div>
            <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Impact Heading</label>
            <input
              type="text"
              value={data.ultimateImpact.heading}
              onChange={(e) =>
                setData({
                  ...data,
                  ultimateImpact: { ...data.ultimateImpact, heading: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-himalaya-300 mb-1">Impact Paragraphs</label>
            <div className="space-y-3">
              {data.ultimateImpact.paragraphs.map((p, idx) => (
                <div key={idx} className="flex gap-2">
                  <textarea
                    rows={3}
                    value={p}
                    onChange={(e) => {
                      const newP = [...data.ultimateImpact.paragraphs];
                      newP[idx] = e.target.value;
                      setData({
                        ...data,
                        ultimateImpact: { ...data.ultimateImpact, paragraphs: newP },
                      });
                    }}
                    className="flex-1 px-3 py-2 bg-himalaya-950 border border-himalaya-800 rounded-xl text-xs text-parchment-100 focus:outline-none focus:border-terracotta leading-relaxed"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newP = data.ultimateImpact.paragraphs.filter((_, i) => i !== idx);
                      setData({
                        ...data,
                        ultimateImpact: { ...data.ultimateImpact, paragraphs: newP },
                      });
                    }}
                    className="p-2 text-himalaya-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    ultimateImpact: {
                      ...data.ultimateImpact,
                      paragraphs: [...data.ultimateImpact.paragraphs, ''],
                    },
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-himalaya-800 hover:bg-himalaya-700 text-parchment-300 text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Impact Paragraph</span>
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white text-sm font-bold flex items-center gap-2 shadow-warm disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving All Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
