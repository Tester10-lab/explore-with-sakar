'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Image as ImageIcon,
  Type,
  Heading,
  Quote,
  CheckCircle2,
  Loader2,
  Sparkles,
  Eye,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import ImageUploader from './ImageUploader';
import { ExtendedBlogPost } from '@/types/cms';
import { BlogBlock, BlogCategory } from '@/types';
import ToastContainer, { ToastMessage } from './Toast';

const BLOG_CATEGORIES: BlogCategory[] = [
  "Sakar's Journal",
  "Spiritual Nepal",
  "Living Culture",
  "People & Places",
  "Travel With Meaning",
  "Walking Nepal",
  "Practical Nepal",
];

interface BlogEditorProps {
  initialBlog?: ExtendedBlogPost;
  isNew?: boolean;
}

export default function BlogEditor({ initialBlog, isNew = false }: BlogEditorProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialBlog?.title || '');
  const [slug, setSlug] = useState(initialBlog?.slug || '');
  const [subtitle, setSubtitle] = useState(initialBlog?.subtitle || '');
  const [excerpt, setExcerpt] = useState(initialBlog?.excerpt || '');
  const [category, setCategory] = useState<BlogCategory>(initialBlog?.category || "Sakar's Journal");
  const [status, setStatus] = useState<'published' | 'draft'>(initialBlog?.status || 'published');
  const [publishedAt, setPublishedAt] = useState(
    initialBlog?.publishedAt || new Date().toISOString().split('T')[0]
  );
  const [readingTime, setReadingTime] = useState(initialBlog?.readingTime || '5 min read');
  const [tags, setTags] = useState((initialBlog?.tags || []).join(', '));

  // Author
  const [authorName, setAuthorName] = useState(initialBlog?.author?.name || 'Sakar');
  const [authorRole, setAuthorRole] = useState(
    initialBlog?.author?.role || 'Responsible Tour Director & Founder'
  );
  const [authorAvatar, setAuthorAvatar] = useState(
    initialBlog?.author?.avatar || '/explore-with-sakar/images/sakar/sakar-portrait.jpg'
  );
  const [authorBio, setAuthorBio] = useState(
    initialBlog?.author?.bio || 'Local host, mindful traveler, and cultural storyteller living in Kathmandu.'
  );

  // Featured Image
  const [featuredImageSrc, setFeaturedImageSrc] = useState(
    initialBlog?.featuredImage?.src || '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg'
  );
  const [featuredImageAlt, setFeaturedImageAlt] = useState(initialBlog?.featuredImage?.alt || '');
  const [featuredImageCaption, setFeaturedImageCaption] = useState(
    initialBlog?.featuredImage?.caption || ''
  );

  // Contextual CTA
  const [ctaTitle, setCtaTitle] = useState(
    initialBlog?.contextualCta?.title || 'Plan a Journey With Sakar'
  );
  const [ctaDescription, setCtaDescription] = useState(
    initialBlog?.contextualCta?.description ||
      'Connect directly with Sakar to craft your mindful, slow travel journey in Nepal.'
  );
  const [ctaButtonText, setCtaButtonText] = useState(
    initialBlog?.contextualCta?.buttonText || 'Inquire About This Journey'
  );

  // Content Blocks
  const [blocks, setBlocks] = useState<BlogBlock[]>(
    initialBlog?.content && initialBlog.content.length > 0
      ? initialBlog.content
      : [
          { type: 'paragraph', content: 'Begin writing your story here...' },
        ]
  );

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'author' | 'cta' | 'preview'>('content');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (isNew && !slug) {
      setSlug(
        newTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  };

  // Block Helpers
  const addBlock = (blockType: 'paragraph' | 'heading' | 'quote' | 'image' | 'practicalTips') => {
    if (blockType === 'paragraph') {
      setBlocks([...blocks, { type: 'paragraph', content: '' }]);
    } else if (blockType === 'heading') {
      setBlocks([...blocks, { type: 'heading', level: 2, content: '' }]);
    } else if (blockType === 'quote') {
      setBlocks([...blocks, { type: 'quote', content: '', attribution: '' }]);
    } else if (blockType === 'image') {
      setBlocks([
        ...blocks,
        {
          type: 'image',
          image: { src: '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg', alt: 'Story image' },
          caption: '',
          layout: 'standard',
        },
      ]);
    } else if (blockType === 'practicalTips') {
      setBlocks([
        ...blocks,
        {
          type: 'practicalTips',
          title: 'Practical Reflections & Advice',
          items: [{ point: 'Key Reflection', explanation: 'Enter detailed guidance or advice here.' }],
        },
      ]);
    }
  };

  const updateBlockContent = (index: number, newContent: Partial<BlogBlock>) => {
    const updated = [...blocks];
    updated[index] = { ...updated[index], ...newContent } as BlogBlock;
    setBlocks(updated);
  };

  const removeBlock = (index: number) => {
    if (blocks.length <= 1) {
      showToast('info', 'A blog post must have at least one content block');
      return;
    }
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === blocks.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setBlocks(updated);
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      showToast('error', 'Title and URL Slug are required');
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        subtitle: subtitle.trim(),
        excerpt: excerpt.trim(),
        category,
        status,
        publishedAt,
        readingTime,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        author: {
          name: authorName.trim(),
          role: authorRole.trim(),
          avatar: authorAvatar,
          bio: authorBio.trim(),
        },
        featuredImage: {
          src: featuredImageSrc,
          alt: featuredImageAlt || title,
          caption: featuredImageCaption,
        },
        contextualCta: {
          title: ctaTitle.trim(),
          description: ctaDescription.trim(),
          buttonText: ctaButtonText.trim(),
        },
        content: blocks,
      };

      const url = isNew ? '/api/admin/blogs' : `/api/admin/blogs/${initialBlog?.slug || slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save blog post');
      }

      showToast('success', isNew ? 'Blog post created successfully!' : 'Blog post updated successfully!');

      if (isNew) {
        setTimeout(() => {
          router.push('/admin/blogs');
        }, 1200);
      }
    } catch (err: any) {
      showToast('error', err?.message || 'Error saving post');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 sm:px-8 py-6">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />

      {/* Top Navigation & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-himalaya-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 rounded-xl bg-himalaya-900 border border-himalaya-800 text-parchment-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-editorial-serif text-2xl font-bold text-white leading-tight">
              {isNew ? 'New Blog Article' : `Edit: ${initialBlog?.title}`}
            </h1>
            <p className="text-xs text-parchment-400 font-mono mt-0.5">
              URL: /blog/{slug || 'your-slug-here'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider focus:outline-none border ${
              status === 'published'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                : 'bg-amber-950 text-amber-300 border-amber-800'
            }`}
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-light text-white text-xs font-bold uppercase tracking-wider shadow-warm transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Post</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-himalaya-850 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
            activeTab === 'content'
              ? 'bg-himalaya-850 text-white font-bold'
              : 'text-parchment-400 hover:text-white'
          }`}
        >
          General & Blocks
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
            activeTab === 'media'
              ? 'bg-himalaya-850 text-white font-bold'
              : 'text-parchment-400 hover:text-white'
          }`}
        >
          Featured Image
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('author')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
            activeTab === 'author'
              ? 'bg-himalaya-850 text-white font-bold'
              : 'text-parchment-400 hover:text-white'
          }`}
        >
          Author Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('cta')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
            activeTab === 'cta'
              ? 'bg-himalaya-850 text-white font-bold'
              : 'text-parchment-400 hover:text-white'
          }`}
        >
          Journey CTA
        </button>
      </div>

      {/* TAB 1: General & Content Blocks */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Main Details Card */}
          <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-editorial-serif text-lg font-bold text-white pb-2 border-b border-himalaya-800">
              Article Meta & Classification
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="e.g. The Morning I Learned to Slow Down"
                  className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-4 py-2.5 text-sm text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="the-morning-i-learned-to-slow-down"
                  className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-4 py-2.5 text-sm font-mono text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BlogCategory)}
                  className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-3 py-2.5 text-sm text-parchment-100 focus:outline-none focus:border-terracotta"
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                  Published Date
                </label>
                <input
                  type="text"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  placeholder="e.g. October 14, 2025"
                  className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-4 py-2.5 text-sm text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                  Reading Time
                </label>
                <input
                  type="text"
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                  placeholder="e.g. 6 min read"
                  className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-4 py-2.5 text-sm text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                Subtitle / Subheading
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="A contemplative journey into the soul of Nepal"
                className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-4 py-2.5 text-sm text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                Excerpt (Short Summary for Cards)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Enter a captivating 2-sentence summary of the story..."
                className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-4 py-2.5 text-sm text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Culture, Monasteries, Slow Travel, Heritage"
                className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-4 py-2.5 text-sm text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>

          {/* Block Builder Section */}
          <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-himalaya-800">
              <div>
                <h3 className="font-editorial-serif text-lg font-bold text-white">
                  Story Content Blocks
                </h3>
                <p className="text-xs text-parchment-400 font-light mt-0.5">
                  Construct your article using paragraphs, headings, quotes, and images
                </p>
              </div>

              {/* Add Block Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => addBlock('paragraph')}
                  className="px-3 py-1.5 bg-himalaya-800 hover:bg-himalaya-700 text-parchment-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-himalaya-700"
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>+ Paragraph</span>
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('heading')}
                  className="px-3 py-1.5 bg-himalaya-800 hover:bg-himalaya-700 text-parchment-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-himalaya-700"
                >
                  <Heading className="w-3.5 h-3.5" />
                  <span>+ Heading</span>
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('quote')}
                  className="px-3 py-1.5 bg-himalaya-800 hover:bg-himalaya-700 text-parchment-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-himalaya-700"
                >
                  <Quote className="w-3.5 h-3.5" />
                  <span>+ Quote</span>
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('image')}
                  className="px-3 py-1.5 bg-himalaya-800 hover:bg-himalaya-700 text-parchment-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-himalaya-700"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>+ Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('practicalTips')}
                  className="px-3 py-1.5 bg-himalaya-800 hover:bg-himalaya-700 text-parchment-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-himalaya-700"
                >
                  <Sparkles className="w-3.5 h-3.5 text-saffron-light" />
                  <span>+ Tips Box</span>
                </button>
              </div>
            </div>

            {/* List of Blocks */}
            <div className="space-y-4">
              {blocks.map((block, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-himalaya-950 border border-himalaya-800 relative group space-y-3"
                >
                  {/* Block Header Toolbar */}
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-himalaya-850">
                    <span className="font-mono text-[11px] font-bold text-terracotta-light uppercase tracking-wider">
                      Block #{index + 1}: {block.type}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveBlock(index, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded text-himalaya-400 hover:text-white disabled:opacity-30"
                        title="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlock(index, 'down')}
                        disabled={index === blocks.length - 1}
                        className="p-1 rounded text-himalaya-400 hover:text-white disabled:opacity-30"
                        title="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBlock(index)}
                        className="p-1 rounded text-rose-400 hover:text-rose-200 ml-2"
                        title="Remove Block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Render based on Block Type */}
                  {block.type === 'paragraph' && (
                    <textarea
                      rows={4}
                      value={block.content}
                      onChange={(e) => updateBlockContent(index, { content: e.target.value })}
                      placeholder="Write paragraph narrative..."
                      className="w-full bg-himalaya-900 border border-himalaya-750 rounded-lg p-3 text-sm text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta leading-relaxed"
                    />
                  )}

                  {block.type === 'heading' && (
                    <div className="flex gap-3">
                      <select
                        value={block.level}
                        onChange={(e) =>
                          updateBlockContent(index, { level: Number(e.target.value) as 2 | 3 })
                        }
                        className="bg-himalaya-900 border border-himalaya-750 rounded-lg px-3 py-2 text-xs font-mono text-parchment-200"
                      >
                        <option value={2}>H2 Heading</option>
                        <option value={3}>H3 Heading</option>
                      </select>
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) => updateBlockContent(index, { content: e.target.value })}
                        placeholder="Section Heading Title..."
                        className="flex-1 bg-himalaya-900 border border-himalaya-750 rounded-lg px-3 py-2 text-sm font-bold text-parchment-100 focus:outline-none focus:border-terracotta"
                      />
                    </div>
                  )}

                  {block.type === 'quote' && (
                    <div className="space-y-2">
                      <textarea
                        rows={2}
                        value={block.content}
                        onChange={(e) => updateBlockContent(index, { content: e.target.value })}
                        placeholder="Quote text..."
                        className="w-full bg-himalaya-900 border border-himalaya-750 rounded-lg p-3 text-sm italic text-parchment-100 focus:outline-none focus:border-terracotta"
                      />
                      <input
                        type="text"
                        value={block.attribution || ''}
                        onChange={(e) => updateBlockContent(index, { attribution: e.target.value })}
                        placeholder="Attribution / Speaker (e.g. Village Elder, Ghandruk)"
                        className="w-full bg-himalaya-900 border border-himalaya-750 rounded-lg px-3 py-2 text-xs text-parchment-300 focus:outline-none focus:border-terracotta"
                      />
                    </div>
                  )}

                  {block.type === 'image' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ImageUploader
                        value={block.image?.src || ''}
                        onChange={(url) =>
                          updateBlockContent(index, {
                            image: { src: url, alt: block.image?.alt || title },
                          })
                        }
                        label="Block Image"
                        aspectRatio="landscape"
                      />
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] text-parchment-400 mb-1">
                            Caption
                          </label>
                          <input
                            type="text"
                            value={block.caption || ''}
                            onChange={(e) => updateBlockContent(index, { caption: e.target.value })}
                            placeholder="Image caption notes..."
                            className="w-full bg-himalaya-900 border border-himalaya-750 rounded-lg px-3 py-2 text-xs text-parchment-200 focus:outline-none focus:border-terracotta"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-parchment-400 mb-1">
                            Layout
                          </label>
                          <select
                            value={block.layout || 'standard'}
                            onChange={(e) =>
                              updateBlockContent(index, {
                                layout: e.target.value as 'full' | 'standard',
                              })
                            }
                            className="w-full bg-himalaya-900 border border-himalaya-750 rounded-lg px-3 py-2 text-xs text-parchment-200"
                          >
                            <option value="standard">Standard Container</option>
                            <option value="full">Full Bleed Width</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {block.type === 'practicalTips' && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={block.title}
                        onChange={(e) => updateBlockContent(index, { title: e.target.value })}
                        placeholder="Tips Box Title (e.g. Monastery Etiquette)"
                        className="w-full bg-himalaya-900 border border-himalaya-750 rounded-lg px-3 py-2 text-sm font-bold text-parchment-100"
                      />
                      <div className="space-y-2">
                        {block.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={item.point}
                              onChange={(e) => {
                                const newItems = [...block.items];
                                newItems[itemIdx].point = e.target.value;
                                updateBlockContent(index, { items: newItems });
                              }}
                              placeholder="Key Point"
                              className="bg-himalaya-900 border border-himalaya-750 rounded-lg px-3 py-1.5 text-xs text-parchment-100 font-semibold"
                            />
                            <input
                              type="text"
                              value={item.explanation}
                              onChange={(e) => {
                                const newItems = [...block.items];
                                newItems[itemIdx].explanation = e.target.value;
                                updateBlockContent(index, { items: newItems });
                              }}
                              placeholder="Explanation"
                              className="bg-himalaya-900 border border-himalaya-750 rounded-lg px-3 py-1.5 text-xs text-parchment-200"
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = [
                              ...block.items,
                              { point: 'New Tip', explanation: 'Enter explanation...' },
                            ];
                            updateBlockContent(index, { items: newItems });
                          }}
                          className="text-xs text-terracotta-light hover:text-terracotta font-semibold"
                        >
                          + Add Item
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Featured Image */}
      {activeTab === 'media' && (
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-6">
          <h3 className="font-editorial-serif text-lg font-bold text-white pb-2 border-b border-himalaya-800">
            Featured Header Photograph
          </h3>

          <ImageUploader
            value={featuredImageSrc}
            onChange={(url) => setFeaturedImageSrc(url)}
            label="Main Featured Image"
            helperText="Appears at the top of the article and on magazine cards (Recommended aspect: 16:9 or 4:3)"
            aspectRatio="landscape"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                Image Alt Text
              </label>
              <input
                type="text"
                value={featuredImageAlt}
                onChange={(e) => setFeaturedImageAlt(e.target.value)}
                placeholder="Descriptive text for accessibility..."
                className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-4 py-2.5 text-sm text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                Image Caption
              </label>
              <input
                type="text"
                value={featuredImageCaption}
                onChange={(e) => setFeaturedImageCaption(e.target.value)}
                placeholder="Editorial caption displayed beneath image..."
                className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-4 py-2.5 text-sm text-parchment-100 placeholder-himalaya-500 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Author Details */}
      {activeTab === 'author' && (
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-6">
          <h3 className="font-editorial-serif text-lg font-bold text-white pb-2 border-b border-himalaya-800">
            Author Biography Card
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader
              value={authorAvatar}
              onChange={(url) => setAuthorAvatar(url)}
              label="Author Portrait / Avatar"
              aspectRatio="square"
            />

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                  Author Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Sakar"
                  className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-4 py-2.5 text-sm text-parchment-100 focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                  Author Role / Title
                </label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="Responsible Tour Director & Founder"
                  className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-4 py-2.5 text-sm text-parchment-100 focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                  Author Biography
                </label>
                <textarea
                  rows={3}
                  value={authorBio}
                  onChange={(e) => setAuthorBio(e.target.value)}
                  placeholder="Short author background snippet..."
                  className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl p-3 text-sm text-parchment-100 focus:outline-none focus:border-terracotta leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Journey CTA */}
      {activeTab === 'cta' && (
        <div className="bg-himalaya-900 border border-himalaya-800 rounded-2xl p-6 space-y-6">
          <h3 className="font-editorial-serif text-lg font-bold text-white pb-2 border-b border-himalaya-800">
            Bottom Journey Booking Action
          </h3>

          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                CTA Headline Title
              </label>
              <input
                type="text"
                value={ctaTitle}
                onChange={(e) => setCtaTitle(e.target.value)}
                placeholder="Plan a Journey With Sakar"
                className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-4 py-2.5 text-sm text-parchment-100 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                CTA Narrative Description
              </label>
              <textarea
                rows={3}
                value={ctaDescription}
                onChange={(e) => setCtaDescription(e.target.value)}
                placeholder="Connect directly with Sakar to craft your mindful journey..."
                className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl p-3 text-sm text-parchment-100 focus:outline-none focus:border-terracotta"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-parchment-300 mb-1.5">
                CTA Button Text
              </label>
              <input
                type="text"
                value={ctaButtonText}
                onChange={(e) => setCtaButtonText(e.target.value)}
                placeholder="Inquire About This Journey"
                className="w-full bg-himalaya-950 border border-himalaya-700 rounded-xl px-4 py-2.5 text-sm text-parchment-100 focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
