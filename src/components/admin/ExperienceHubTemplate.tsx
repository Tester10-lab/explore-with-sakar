'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Edit3,
  Plus,
  Trash2,
  Save,
  Clock,
  Users,
  ExternalLink,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Quote as QuoteIcon,
  Sparkles,
  Check,
  X,
  Loader2,
  Calendar,
  Layers,
  Info,
  MapPin,
  Sun,
  Eye,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ToastContainer, { ToastMessage } from '@/components/admin/Toast';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import { ExtendedExperience, ItineraryDay } from '@/types/cms';
import { EXPERIENCE_PILLARS, ExperiencePillar } from '@/lib/experiencePillars';

const CATEGORY_MAP: Record<string, string[]> = {
  'beyond-the-map': ['beyond-the-map', 'go-beyond', 'heritage'],
  'go-within': ['go-within', 'go-spiritual', 'spiritual-wellness', 'spiritual'],
  'go-deeper': ['go-deeper'],
  'leave-a-mark': ['leave-a-mark', 'responsible'],
};

interface ExperienceHubTemplateProps {
  experienceName: string;
  experienceDescription: string;
  experienceSlug: string;
  publicUrl: string;
  pillarFilterValue: string;
  icon: React.ComponentType<{ className?: string }>;
  colorFrom: string;
  colorTo: string;
  colorBorder: string;
  colorBg: string;
  colorText: string;
  colorHover: string;
}

export default function ExperienceHubTemplate({
  experienceName,
  experienceDescription,
  experienceSlug,
  publicUrl,
  pillarFilterValue,
  icon: Icon,
  colorFrom,
  colorTo,
  colorBorder,
  colorBg,
  colorText,
  colorHover,
}: ExperienceHubTemplateProps) {
  const [activeTab, setActiveTab] = useState<'topics' | 'experience'>('topics');
  const [experiences, setExperiences] = useState<ExtendedExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Deletion modal
  const [deleteTarget, setDeleteTarget] = useState<ExtendedExperience | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Topic Edit Modal
  const [editingTopic, setEditingTopic] = useState<Partial<ExtendedExperience> | null>(null);
  const [isNewTopic, setIsNewTopic] = useState(false);
  const [topicHighlightsText, setTopicHighlightsText] = useState('');
  const [topicDescText, setTopicDescText] = useState('');
  const [quoteText, setQuoteText] = useState('');
  const [quoteAttribution, setQuoteAttribution] = useState('');

  // Experience level editing state
  const pillarDefault: ExperiencePillar = EXPERIENCE_PILLARS[experienceSlug] || {
    name: experienceName,
    introText: experienceDescription,
    overviewText: [],
    highlights: [],
    heroImage: '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
    categoryFilter: CATEGORY_MAP[experienceSlug] || [experienceSlug],
    canonicalSlug: experienceSlug,
  };

  const [expTitle, setExpTitle] = useState(pillarDefault.name);
  const [expIntro, setExpIntro] = useState(pillarDefault.introText);
  const [expOverview, setExpOverview] = useState(pillarDefault.overviewText.join('\n\n'));
  const [expHighlights, setExpHighlights] = useState(pillarDefault.highlights.join('\n'));
  const [expHeroImage, setExpHeroImage] = useState(pillarDefault.heroImage);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const fetchExperiences = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/experiences', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const allList: ExtendedExperience[] = data.experiences || [];
        setExperiences(allList);

        // Check if parent record exists in CMS to initialize form
        const parentExp = allList.find((e) => e.slug === experienceSlug);
        if (parentExp) {
          setExpTitle(parentExp.title || pillarDefault.name);
          setExpIntro(parentExp.shortDescription || pillarDefault.introText);
          if (Array.isArray(parentExp.fullDescription) && parentExp.fullDescription.length > 0) {
            setExpOverview(parentExp.fullDescription.join('\n\n'));
          }
          if (Array.isArray(parentExp.highlights) && parentExp.highlights.length > 0) {
            setExpHighlights(parentExp.highlights.join('\n'));
          }
          if (parentExp.heroImage?.src) {
            setExpHeroImage(parentExp.heroImage.src);
          }
        }
      } else {
        showToast('error', 'Failed to load experiences');
      }
    } catch {
      showToast('error', 'Network error loading experiences');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [experienceSlug]);

  // Filter topics for this experience
  const allowedCategories = CATEGORY_MAP[experienceSlug] || [pillarFilterValue, experienceSlug];
  const topics = useMemo(() => {
    return experiences
      .filter((e) => allowedCategories.includes(e.category) && e.slug !== experienceSlug)
      .sort((a, b) => {
        const orderA = a.featuredOrder ?? 99;
        const orderB = b.featuredOrder ?? 99;
        return orderA - orderB;
      });
  }, [experiences, allowedCategories, experienceSlug]);

  // Handle Save Parent Experience
  const handleSaveExperience = async () => {
    setIsSaving(true);
    try {
      const parentExp = experiences.find((e) => e.slug === experienceSlug);
      const overviewArray = expOverview.split('\n\n').map((p) => p.trim()).filter(Boolean);
      const highlightsArray = expHighlights.split('\n').map((h) => h.trim()).filter(Boolean);

      const payload = {
        title: expTitle,
        slug: experienceSlug,
        category: experienceSlug,
        categoryLabel: expTitle,
        shortDescription: expIntro,
        fullDescription: overviewArray,
        highlights: highlightsArray,
        heroImage: { src: expHeroImage, alt: expTitle },
        status: 'published',
      };

      let res: Response;
      if (parentExp) {
        res = await fetch(`/api/admin/experiences/${encodeURIComponent(parentExp.id || parentExp.slug)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/admin/experiences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        showToast('success', `${experienceName} story & highlights saved!`);
        fetchExperiences();
      } else {
        const err = await res.json();
        showToast('error', err.error || 'Failed to save experience');
      }
    } catch {
      showToast('error', 'Network error saving experience');
    } finally {
      setIsSaving(false);
    }
  };

  // Open Topic Modal for New Topic
  const handleOpenNewTopic = () => {
    setIsNewTopic(true);
    setTopicHighlightsText('');
    setTopicDescText('');
    setQuoteText('');
    setQuoteAttribution('');
    setEditingTopic({
      title: '',
      slug: '',
      category: experienceSlug,
      categoryLabel: experienceName,
      duration: 'Full Day (Unhurried)',
      groupSize: 'Private / 1–6 Travelers',
      location: 'Kathmandu Valley, Nepal',
      season: 'Year Round (Best: Oct–May)',
      heroImage: {
        src: '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
        alt: 'Topic Hero',
      },
      shortDescription: '',
      fullDescription: [],
      highlights: [],
      days: [
        {
          dayNumber: 1,
          title: 'Immersion & Living Heritage Walk',
          description: 'Step into quiet courtyards with Sakar for unhurried conversations with local hosts.',
        },
      ],
      sakarNote: 'Curated for deep cultural connection without rushing.',
      status: 'published',
      featured: true,
      featuredOrder: topics.length + 1,
    });
  };

  // Open Topic Modal for Edit
  const handleOpenEditTopic = (topic: ExtendedExperience) => {
    setIsNewTopic(false);
    setEditingTopic({ ...topic });
    setTopicHighlightsText((topic.highlights || []).join('\n'));
    setTopicDescText(
      Array.isArray(topic.fullDescription)
        ? topic.fullDescription.join('\n\n')
        : topic.shortDescription || ''
    );
    const keyQuote = (topic as any).keyQuote;
    setQuoteText(keyQuote?.quote || '');
    setQuoteAttribution(keyQuote?.attribution || '');
  };

  // Handle Save Topic
  const handleSaveTopic = async () => {
    if (!editingTopic || !editingTopic.title || !editingTopic.slug) {
      showToast('error', 'Title and slug are required');
      return;
    }

    setIsSaving(true);
    try {
      const fullDescArray = topicDescText.split('\n\n').map((p) => p.trim()).filter(Boolean);
      const highlightsArray = topicHighlightsText.split('\n').map((h) => h.trim()).filter(Boolean);

      const payload: any = {
        ...editingTopic,
        category: editingTopic.category || experienceSlug,
        categoryLabel: experienceName,
        fullDescription: fullDescArray,
        highlights: highlightsArray,
        keyQuote: quoteText ? { quote: quoteText, attribution: quoteAttribution } : undefined,
      };

      let res: Response;
      if (isNewTopic) {
        res = await fetch('/api/admin/experiences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        const id = editingTopic.id || editingTopic.slug!;
        res = await fetch(`/api/admin/experiences/${encodeURIComponent(id)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        showToast('success', `Topic "${editingTopic.title}" saved successfully!`);
        setEditingTopic(null);
        fetchExperiences();
      } else {
        const err = await res.json();
        showToast('error', err.error || 'Failed to save topic');
      }
    } catch {
      showToast('error', 'Network error saving topic');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Topic
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const id = deleteTarget.id || deleteTarget.slug;
      const res = await fetch(`/api/admin/experiences/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToast('success', `Deleted "${deleteTarget.title}"`);
        setDeleteTarget(null);
        fetchExperiences();
      } else {
        showToast('error', 'Failed to delete topic');
      }
    } catch {
      showToast('error', 'Network error deleting topic');
    } finally {
      setIsDeleting(false);
    }
  };

  // Reorder Topics (Move Up / Move Down)
  const handleMoveTopic = async (topicIndex: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? topicIndex - 1 : topicIndex + 1;
    if (targetIndex < 0 || targetIndex >= topics.length) return;

    const currentTopic = topics[topicIndex];
    const targetTopic = topics[targetIndex];

    try {
      // Swap featuredOrder
      await Promise.all([
        fetch(`/api/admin/experiences/${encodeURIComponent(currentTopic.id || currentTopic.slug)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ featuredOrder: targetIndex + 1 }),
        }),
        fetch(`/api/admin/experiences/${encodeURIComponent(targetTopic.id || targetTopic.slug)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ featuredOrder: topicIndex + 1 }),
        }),
      ]);
      fetchExperiences();
      showToast('success', 'Order updated');
    } catch {
      showToast('error', 'Failed to update order');
    }
  };

  // Add / Remove Day in Topic
  const handleAddDay = () => {
    if (!editingTopic) return;
    const currentDays = editingTopic.days || [];
    const nextDay = currentDays.length + 1;
    setEditingTopic({
      ...editingTopic,
      days: [
        ...currentDays,
        {
          dayNumber: nextDay,
          title: `Day ${nextDay}: Exploration & Local Immersion`,
          description: 'Engage with village hosts and experience authentic traditional rhythms.',
        },
      ],
    });
  };

  const handleRemoveDay = (idx: number) => {
    if (!editingTopic) return;
    const filtered = (editingTopic.days || [])
      .filter((_, i) => i !== idx)
      .map((d, i) => ({ ...d, dayNumber: i + 1 }));
    setEditingTopic({ ...editingTopic, days: filtered });
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />

      {/* Header */}
      <AdminHeader
        title={experienceName}
        subtitle={`Manage the ${experienceName} discovery page and its individual topics.`}
        actionButton={{
          label: 'Add Topic / Package',
          href: '#',
          icon: <Plus className="w-4 h-4" />,
          onClick: handleOpenNewTopic,
        }}
      />

      <div className="px-4 sm:px-8 max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/admin" className="hover:text-slate-800">
            Dashboard
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/admin/experiences" className="hover:text-slate-800">
            Experiences
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-800 font-medium">{experienceName}</span>
        </div>

        {/* Experience Banner */}
        <div className={`rounded-2xl border p-5 bg-gradient-to-r ${colorFrom} ${colorTo} ${colorBorder}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${colorBg} ${colorText} flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-editorial-serif text-xl font-bold text-slate-900">{experienceName}</h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white font-mono font-medium text-slate-700 border border-slate-200">
                    {topics.length} Topics
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-light mt-1 max-w-2xl leading-relaxed">
                  {experienceDescription}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={publicUrl}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Public Page</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('topics')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'topics'
                ? 'border-terracotta text-terracotta'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Topics / Packages ({topics.length})
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'experience'
                ? 'border-terracotta text-terracotta'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Experience Story & Highlights
          </button>
        </div>

        {/* TAB 1: TOPICS LIST */}
        {activeTab === 'topics' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">
                These topics appear as standalone discovery cards on the public{' '}
                <strong className="text-slate-700">/experiences/{experienceSlug}</strong> page.
              </p>
              <button
                onClick={handleOpenNewTopic}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-terracotta text-white rounded-xl text-xs font-semibold hover:bg-terracotta-dark transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Topic</span>
              </button>
            </div>

            {isLoading ? (
              <div className="py-16 text-center text-sm text-slate-500">Loading topics...</div>
            ) : topics.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
                <p className="text-sm text-slate-600">No topics found under this experience.</p>
                <button
                  onClick={handleOpenNewTopic}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta text-white rounded-xl text-xs font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create First Topic</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {topics.map((topic, index) => {
                  const keyQuote = (topic as any).keyQuote;
                  return (
                    <div
                      key={topic.id || topic.slug}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                    >
                      {/* Left: Thumbnail & Info */}
                      <div className="flex items-start gap-4 min-w-0">
                        {/* Image */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative border border-slate-200">
                          {topic.heroImage?.src ? (
                            <img
                              src={topic.heroImage.src}
                              alt={topic.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                              No image
                            </div>
                          )}
                        </div>

                        {/* Text */}
                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              Topic #{index + 1}
                            </span>
                            <span
                              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                topic.status === 'published'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {topic.status || 'published'}
                            </span>
                            {topic.duration && (
                              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                                <Clock className="w-3 h-3 text-terracotta" />
                                {topic.duration}
                              </span>
                            )}
                            {topic.groupSize && (
                              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                                <Users className="w-3 h-3 text-terracotta" />
                                {topic.groupSize}
                              </span>
                            )}
                          </div>

                          <h3 className="font-editorial-serif text-base font-bold text-slate-900 leading-snug">
                            {topic.title}
                          </h3>

                          <p className="text-xs text-slate-500 font-light line-clamp-1 max-w-xl">
                            {topic.shortDescription || 'No description provided.'}
                          </p>

                          {keyQuote?.quote && (
                            <p className="text-[11px] italic text-slate-600 line-clamp-1 border-l-2 border-terracotta pl-2">
                              &ldquo;{keyQuote.quote}&rdquo; {keyQuote.attribution ? `— ${keyQuote.attribution}` : ''}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions & Order */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        {/* Move Up/Down */}
                        <div className="flex flex-col gap-1 pr-2 border-r border-slate-200">
                          <button
                            onClick={() => handleMoveTopic(index, 'up')}
                            disabled={index === 0}
                            title="Move Up"
                            className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveTopic(index, 'down')}
                            disabled={index === topics.length - 1}
                            title="Move Down"
                            className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* View Public Page */}
                        <Link
                          href={`/experiences/${experienceSlug}/${topic.slug}`}
                          target="_blank"
                          title="View Topic Page"
                          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {/* Edit Button */}
                        <button
                          onClick={() => handleOpenEditTopic(topic)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-terracotta transition-colors shadow-sm"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Topic</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeleteTarget(topic)}
                          title="Delete Topic"
                          className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EXPERIENCE OVERVIEW & HIGHLIGHTS */}
        {activeTab === 'experience' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Experience Discovery Content</h3>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                This content is displayed on the main discovery page (/experiences/{experienceSlug}) before the 4 topic cards.
              </p>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Title</label>
                <input
                  type="text"
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Intro Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Introduction</label>
                <textarea
                  rows={2}
                  value={expIntro}
                  onChange={(e) => setExpIntro(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Hero Image */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Image URL</label>
                <input
                  type="text"
                  value={expHeroImage}
                  onChange={(e) => setExpHeroImage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Overview Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Experience Overview (Paragraphs separated by blank line)
                </label>
                <textarea
                  rows={6}
                  value={expOverview}
                  onChange={(e) => setExpOverview(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Curated Exploration Highlights */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Curated Exploration Highlights (One per line)
                </label>
                <textarea
                  rows={5}
                  value={expHighlights}
                  onChange={(e) => setExpHighlights(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={handleSaveExperience}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Experience Content</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TOPIC EDIT / ADD MODAL */}
      {editingTopic && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="font-editorial-serif text-lg font-bold text-slate-900">
                {isNewTopic ? 'Add New Topic / Package' : `Edit Topic: ${editingTopic.title}`}
              </h3>
              <button
                onClick={() => setEditingTopic(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Topic Title *</label>
                  <input
                    type="text"
                    value={editingTopic.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = isNewTopic
                        ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                        : editingTopic.slug;
                      setEditingTopic({ ...editingTopic, title, slug });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Slug *</label>
                  <input
                    type="text"
                    value={editingTopic.slug || ''}
                    onChange={(e) => setEditingTopic({ ...editingTopic, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Image & Short Desc */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Image URL</label>
                  <input
                    type="text"
                    value={editingTopic.heroImage?.src || ''}
                    onChange={(e) =>
                      setEditingTopic({
                        ...editingTopic,
                        heroImage: { src: e.target.value, alt: editingTopic.title || 'Hero Image' },
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Short Description (For Discovery Card)
                  </label>
                  <textarea
                    rows={3}
                    value={editingTopic.shortDescription || ''}
                    onChange={(e) => setEditingTopic({ ...editingTopic, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Itinerary Details: Duration, Group Size, Location, Season */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingTopic.duration || ''}
                    onChange={(e) => setEditingTopic({ ...editingTopic, duration: e.target.value })}
                    placeholder="Full Day / 2-3 Days"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Group Format</label>
                  <input
                    type="text"
                    value={editingTopic.groupSize || ''}
                    onChange={(e) => setEditingTopic({ ...editingTopic, groupSize: e.target.value })}
                    placeholder="Private / 1–6 Travelers"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingTopic.location || ''}
                    onChange={(e) => setEditingTopic({ ...editingTopic, location: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Best Season</label>
                  <input
                    type="text"
                    value={editingTopic.season || ''}
                    onChange={(e) => setEditingTopic({ ...editingTopic, season: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Quote Block */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <QuoteIcon className="w-3.5 h-3.5 text-terracotta" />
                  Key Itinerary Quote
                </span>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Quote Text</label>
                  <textarea
                    rows={2}
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    placeholder="e.g. In Patan, history is not preserved behind ropes..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Attribution / Subtitle</label>
                  <input
                    type="text"
                    value={quoteAttribution}
                    onChange={(e) => setQuoteAttribution(e.target.value)}
                    placeholder="e.g. Field Note • Patan Heritage Quarter"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Detailed Narrative */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detailed Itinerary Narrative (Paragraphs separated by blank line)
                </label>
                <textarea
                  rows={6}
                  value={topicDescText}
                  onChange={(e) => setTopicDescText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Topic Highlights */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Topic Highlights (One per line)
                </label>
                <textarea
                  rows={4}
                  value={topicHighlightsText}
                  onChange={(e) => setTopicHighlightsText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Chronicle of the Days */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Chronicle of the Days</span>
                  <button
                    type="button"
                    onClick={handleAddDay}
                    className="text-xs font-semibold text-terracotta hover:text-terracotta-dark"
                  >
                    + Add Day
                  </button>
                </div>

                {(editingTopic.days || []).map((day, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Day {day.dayNumber || idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDay(idx)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      value={day.title || ''}
                      onChange={(e) => {
                        const updated = [...(editingTopic.days || [])];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        setEditingTopic({ ...editingTopic, days: updated });
                      }}
                      placeholder="Day Title"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                    <textarea
                      rows={2}
                      value={day.description || ''}
                      onChange={(e) => {
                        const updated = [...(editingTopic.days || [])];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        setEditingTopic({ ...editingTopic, days: updated });
                      }}
                      placeholder="Day Description"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                ))}
              </div>

              {/* Status & Featured */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingTopic.status === 'published'}
                    onChange={(e) =>
                      setEditingTopic({
                        ...editingTopic,
                        status: e.target.checked ? 'published' : 'draft',
                      })
                    }
                    className="rounded text-terracotta focus:ring-terracotta"
                  />
                  <span>Published (Visible to public)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={Boolean(editingTopic.featured)}
                    onChange={(e) =>
                      setEditingTopic({
                        ...editingTopic,
                        featured: e.target.checked,
                      })
                    }
                    className="rounded text-terracotta focus:ring-terracotta"
                  />
                  <span>Featured Topic</span>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-3xl">
              <button
                type="button"
                onClick={() => setEditingTopic(null)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveTopic}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-6 py-2 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl text-xs font-semibold disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Topic</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Topic"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete Topic'}
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
