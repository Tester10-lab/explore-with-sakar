'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Hash,
  Tag,
  Globe,
  Bot,
  MessageSquare,
  BarChart3,
  Sliders,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Info,
  ShieldCheck,
  Compass,
  FileText,
  HelpCircle,
  TrendingUp,
  Cpu,
  Layers,
  Wand2,
  Clock,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';

// Section IDs and metadata
const SECTIONS = [
  { id: 'architecture', title: '1. Core Philosophy & Dual Engine', icon: Cpu, badge: 'Architecture' },
  { id: 'slugs', title: '2. Slugs & URL Architecture', icon: Hash, badge: 'Routing & URLs' },
  { id: 'taxonomies', title: '3. Tags, Categories & Badges', icon: Tag, badge: 'Taxonomy' },
  { id: 'seo', title: '4. Traditional SEO & Canonicals', icon: Globe, badge: 'On-Page SEO' },
  { id: 'geo', title: '5. Generative Engine Optimization (GEO)', icon: Bot, badge: 'AI Search' },
  { id: 'aeo', title: '6. Answer Engine Optimization (AEO)', icon: MessageSquare, badge: 'Snippets & Voice' },
  { id: 'gsc', title: '7. Google Search Performance Layer', icon: BarChart3, badge: 'Empirical GSC' },
  { id: 'tools', title: '8. Using the /admin/seo Dashboard', icon: Sliders, badge: 'CMS Admin' },
  { id: 'checklist', title: '9. Pre-Publish Creator Checklist', icon: CheckCircle2, badge: 'Checklist' },
];

export default function AdminGuidePage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Interactive Slug Helper Tool State
  const [slugInputTitle, setSlugInputTitle] = useState('The 7 Hidden Courtyards of Patan');
  const [slugSection, setSlugSection] = useState<'experiences' | 'destinations' | 'blog' | 'events'>('experiences');

  // Interactive Title & Meta Length Calculator
  const [testTitle, setTestTitle] = useState('Patan Secret Courtyards & Heritage Walk | Explore With Sakar');
  const [testDesc, setTestDesc] = useState(
    'Step past grand facades into residential bahals, medieval stone courtyards, artisan guilds, and sacred Newar heritage in Nepal with Sakar.'
  );

  // Interactive AEO 40-50 Word Counter
  const [aeoText, setAeoText] = useState(
    'An authentic Nepal homestay integrates travelers directly into daily family rhythms rather than a commercial lodge. Guests stay in private traditional stone rooms, share organic hearth-cooked meals with hosts, and participate in seasonal farm routines while financial proceeds remain 100% within the village.'
  );

  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    slug: true,
    title: true,
    desc: true,
    canonical: true,
    eeat: false,
    entities: false,
    aeo: false,
    og: true,
    audit: false,
  });

  const toggleChecklist = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const checklistProgress = useMemo(() => {
    const total = Object.keys(checkedItems).length;
    const completed = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  }, [checkedItems]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Generated slug computation
  const generatedSlug = useMemo(() => {
    const stopWords = new Set(['and', 'the', 'of', 'in', 'a', 'an', 'to', 'for', 'with', 'on', 'at']);
    return slugInputTitle
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .split(/\s+/)
      .filter((word) => !stopWords.has(word) && word.length > 0)
      .join('-');
  }, [slugInputTitle]);

  const fullGeneratedUrl = `https://explorewithsakar.com/${slugSection}/${generatedSlug || 'your-slug'}`;

  // Word count for AEO
  const aeoWordCount = useMemo(() => {
    const trimmed = aeoText.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [aeoText]);

  // Search filtering
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      return activeTab === 'all' ? SECTIONS : SECTIONS.filter((s) => s.id === activeTab);
    }
    const q = searchQuery.toLowerCase();
    return SECTIONS.filter((s) => s.title.toLowerCase().includes(q) || s.badge.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Header */}
      <AdminHeader
        title="Creator & SEO Master Guide"
        subtitle="The definitive handbook for Slugs, Tags, Traditional SEO, Generative AI (GEO), Answer Snippets (AEO), and Google Search Console"
        action={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/seo?tab=auditor"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-terracotta text-white hover:bg-terracotta-light shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch SEO Auditor</span>
            </Link>
            <Link
              href="/admin/seo"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Manage Page SEO</span>
            </Link>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Hero Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-himalaya-950 via-himalaya-900 to-terracotta-dark/90 text-white p-6 sm:p-8 shadow-xl border border-himalaya-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/20 border border-terracotta/40 text-terracotta-light text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Content Creator & Administrator Manual
            </div>
            <h1 className="font-editorial-serif text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Mastering Modern Himalayan Search & Storytelling
            </h1>
            <p className="text-sm sm:text-base text-parchment-200 font-light leading-relaxed">
              Explore With Sakar combines thoughtful human narrative with high-precision digital architecture. Use this guide to structure
              slugs, assign semantic tags, master on-page search rankings, win AI engine citations (Perplexity & ChatGPT), and monitor live Google
              Search Console analytics.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs text-parchment-400">Jump directly to:</span>
              <button
                onClick={() => {
                  setActiveTab('slugs');
                  setSearchQuery('');
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-parchment-100 transition-colors"
              >
                # Slugs
              </button>
              <button
                onClick={() => {
                  setActiveTab('taxonomies');
                  setSearchQuery('');
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-parchment-100 transition-colors"
              >
                # Tags
              </button>
              <button
                onClick={() => {
                  setActiveTab('geo');
                  setSearchQuery('');
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-parchment-100 transition-colors"
              >
                # GEO (AI)
              </button>
              <button
                onClick={() => {
                  setActiveTab('aeo');
                  setSearchQuery('');
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-parchment-100 transition-colors"
              >
                # AEO (Snippets)
              </button>
              <button
                onClick={() => {
                  setActiveTab('gsc');
                  setSearchQuery('');
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-parchment-100 transition-colors"
              >
                # Search Console
              </button>
              <button
                onClick={() => {
                  setActiveTab('checklist');
                  setSearchQuery('');
                }}
                className="px-2.5 py-1 rounded-lg bg-terracotta hover:bg-terracotta-light text-xs font-bold text-white transition-colors"
              >
                ✓ Checklist
              </button>
            </div>
          </div>

          {/* Decorative Background Glow */}
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-terracotta/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-40 top-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Search Bar & Tab Navigation Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g., 'kebab-case', '40 words', 'E-E-A-T', 'canonical', 'CTR', 'schema')..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab('all');
                  setSearchQuery('');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'all' && !searchQuery ? 'bg-terracotta text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Show All Sections
              </button>
            </div>
          </div>

          {/* Tab Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium no-scrollbar">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg shrink-0 transition-all ${
                activeTab === 'all' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Topics
            </button>
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1.5 transition-all ${
                    activeTab === sec.id ? 'bg-terracotta text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sec.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: ARCHITECTURE & PHILOSOPHY */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'architecture') && (
          <section id="architecture" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-editorial-serif text-slate-900">1. Core Philosophy & Dual Engine Architecture</h2>
                  <p className="text-xs text-slate-500">Heuristic Pre-Publish Optimization + Empirical Post-Publish Search Console Data</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">Foundation</span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Explore With Sakar treats every travel experience, journal entry, and destination as an authoritative cultural repository. To
              ensure these stories are discovered by mindful global travelers, our digital ecosystem is powered by two distinct systems:
            </p>

            {/* Architecture Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
                    Phase 1: Pre-Publish
                  </span>
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-amber-950 font-editorial-serif">The Heuristic Audit System (SEO / GEO / AEO)</h3>
                <p className="text-xs text-amber-900/80 leading-relaxed">
                  Evaluates page copy, semantic structure, schema markups, and entity density against algorithmic best practices before a page
                  goes live.
                </p>
                <ul className="text-xs space-y-2 text-amber-950">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Calculates 0–100 quality grades (A+ to F) for Titles and Metas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Detects E-E-A-T signals (Sakar Aryal quotes & credentials)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Scores 40–50 word AEO direct answer snippets for voice search</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                    Phase 2: Post-Publish
                  </span>
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-emerald-950 font-editorial-serif">The Google Search Performance Layer</h3>
                <p className="text-xs text-emerald-900/80 leading-relaxed">
                  Queries the official Google Search Console API directly using the verified domain property{' '}
                  <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-emerald-900">sc-domain:explorewithsakar.com</code>.
                </p>
                <ul className="text-xs space-y-2 text-emerald-950">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Real Clicks, Total Impressions, CTR%, and Average Position</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Top Search Queries table showing what travelers actually search</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Strict zero-mock policy: never replaces Google data with website visits</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
              <Info className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Cardinal Rule:</strong> Heuristic quality scores measure <em>readiness</em>. Google Search
                Console measures <em>real-world human traffic</em>. They work in tandem: use the auditor to perfect your content before
                launching, and use Search Console to monitor real keyword rankings after indexing.
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: SLUGS & URL ARCHITECTURE */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'slugs') && (
          <section id="slugs" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                  <Hash className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-editorial-serif text-slate-900">2. Slugs & URL Architecture</h2>
                  <p className="text-xs text-slate-500">Creating clean, keyword-rich, and permanent web identifiers</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">Routing</span>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                A <strong>slug</strong> is the human-readable, URL-safe path segment at the end of a web address that uniquely identifies a
                specific page or resource. Slugs tell both visitors and search engine crawlers what the page is about before the content even
                loads.
              </p>

              {/* Anatomy diagram */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs overflow-x-auto space-y-2">
                <div className="text-slate-400"># URL Anatomy Breakdown:</div>
                <div className="text-slate-300">
                  <span className="text-emerald-400">https://explorewithsakar.com</span>
                  <span className="text-slate-500">/</span>
                  <span className="text-sky-400">experiences</span>
                  <span className="text-slate-500">/</span>
                  <span className="text-amber-400 font-bold bg-amber-950/80 px-1 py-0.5 rounded">beyond-the-map</span>
                </div>
                <div className="text-slate-400 flex items-center gap-6 pt-1 text-[11px]">
                  <span>▲ Production Domain</span>
                  <span>▲ Section Directory</span>
                  <span className="text-amber-300 font-semibold">▲ The Resource Slug</span>
                </div>
              </div>

              {/* URL Hierarchy Table */}
              <h3 className="font-bold text-slate-900 text-base pt-2">Website URL Route Matrix</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Content Type</th>
                      <th className="p-3">Route Pattern</th>
                      <th className="p-3">Sample Slug</th>
                      <th className="p-3">Live Canonical URL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Pillar Experiences</td>
                      <td className="p-3 font-mono text-slate-600">/experiences/[slug]</td>
                      <td className="p-3 font-mono text-amber-700">beyond-the-map</td>
                      <td className="p-3 font-mono text-slate-700">https://explorewithsakar.com/experiences/beyond-the-map</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Experience Topics</td>
                      <td className="p-3 font-mono text-slate-600">/experiences/[slug]/[topic]</td>
                      <td className="p-3 font-mono text-amber-700">kathmandu-durbar-square</td>
                      <td className="p-3 font-mono text-slate-700">https://explorewithsakar.com/experiences/beyond-the-map/kathmandu-durbar-square</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Destinations</td>
                      <td className="p-3 font-mono text-slate-600">/destinations/[slug]</td>
                      <td className="p-3 font-mono text-amber-700">mustang-muktinath</td>
                      <td className="p-3 font-mono text-slate-700">https://explorewithsakar.com/destinations/mustang-muktinath</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Himalayan Journal</td>
                      <td className="p-3 font-mono text-slate-600">/blog/[slug]</td>
                      <td className="p-3 font-mono text-amber-700">the-morning-i-learned-to-slow-down</td>
                      <td className="p-3 font-mono text-slate-700">https://explorewithsakar.com/blog/the-morning-i-learned-to-slow-down</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Events & Festivals</td>
                      <td className="p-3 font-mono text-slate-600">/events/[slug]</td>
                      <td className="p-3 font-mono text-amber-700">indra-jatra</td>
                      <td className="p-3 font-mono text-slate-700">https://explorewithsakar.com/events/indra-jatra</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 4 Golden Rules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">1</span>
                    Strict Kebab-Case
                  </div>
                  <p className="text-xs text-slate-600">
                    Always use lowercase letters separated by single hyphens. Never use underscores, uppercase letters, spaces, or symbols.
                  </p>
                  <p className="text-[11px] font-mono text-emerald-700">✅ nepal-homestay-etiquette</p>
                  <p className="text-[11px] font-mono text-rose-600">❌ Nepal_Homestay_Etiquette</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">2</span>
                    Include Primary Keywords
                  </div>
                  <p className="text-xs text-slate-600">
                    The slug carries strong weight in Google ranking algorithms. Include the exact topic and geographic place.
                  </p>
                  <p className="text-[11px] font-mono text-emerald-700">✅ patan-secret-courtyards</p>
                  <p className="text-[11px] font-mono text-rose-600">❌ chapter-02-new-story</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">3</span>
                    Strip Grammatical Stop Words
                  </div>
                  <p className="text-xs text-slate-600">
                    Remove &ldquo;the&rdquo;, &ldquo;and&rdquo;, &ldquo;of&rdquo;, &ldquo;a&rdquo;, &ldquo;in&rdquo; to keep slugs concise and
                    punchy.
                  </p>
                  <p className="text-[11px] font-mono text-emerald-700">✅ hidden-courtyards-patan</p>
                  <p className="text-[11px] font-mono text-rose-600">❌ the-7-hidden-courtyards-of-patan</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">4</span>
                    Never Change Once Indexed
                  </div>
                  <p className="text-xs text-slate-600">
                    Changing a slug breaks inbound links and resets Google rankings to 0 unless a 301 redirect is coded in{' '}
                    <code>redirects.ts</code>.
                  </p>
                  <p className="text-[11px] text-amber-800 font-semibold">Treat published slugs as permanent stones.</p>
                </div>
              </div>

              {/* Interactive Slug Helper Tool */}
              <div className="mt-6 p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-amber-700" />
                    <h4 className="font-bold text-amber-950 text-sm">Interactive Slug & Canonical URL Generator</h4>
                  </div>
                  <span className="text-[11px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">Live Creator Tool</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Article or Experience Title</label>
                    <input
                      type="text"
                      value={slugInputTitle}
                      onChange={(e) => setSlugInputTitle(e.target.value)}
                      placeholder="e.g., The 7 Hidden Courtyards of Patan"
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Section</label>
                    <select
                      value={slugSection}
                      onChange={(e: any) => setSlugSection(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                    >
                      <option value="experiences">/experiences/</option>
                      <option value="destinations">/destinations/</option>
                      <option value="blog">/blog/</option>
                      <option value="events">/events/</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Computed Production URL:</div>
                    <div className="font-mono text-xs text-terracotta-dark font-bold truncate">{fullGeneratedUrl}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(fullGeneratedUrl, 'slug-url')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all shrink-0"
                  >
                    {copiedCode === 'slug-url' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'slug-url' ? 'Copied URL!' : 'Copy URL'}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: TAXONOMIES (TAGS, CATEGORIES & BADGES) */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'taxonomies') && (
          <section id="taxonomies" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-700 flex items-center justify-center font-bold">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-editorial-serif text-slate-900">3. Taxonomy: Tags, Categories & Badges</h2>
                  <p className="text-xs text-slate-500">Connecting stories, powering search filters, and teaching search engines</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">Taxonomy</span>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                Taxonomies structure our content for human readers, interactive on-site filters, and search engine topical clustering. We
                maintain a strict 3-tier hierarchy:
              </p>

              {/* The 3 tiers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Primary Category</h3>
                  <p className="text-xs text-slate-600">
                    Broad editorial grouping. Every article or package belongs to exactly one category:
                  </p>
                  <ul className="text-xs space-y-1 font-medium text-slate-700">
                    <li>• Sakar&apos;s Journal</li>
                    <li>• Cultural Guides</li>
                    <li>• Slow Travel & Homestays</li>
                    <li>• Practical Field Notes</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-200 text-rose-800 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h3 className="font-bold text-rose-950 text-sm">Semantic Tags (3 to 5)</h3>
                  <p className="text-xs text-rose-900/80">
                    Topic and entity tags connecting related content across different sections.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-rose-200 text-[11px] font-semibold text-rose-800">
                      Patan
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-rose-200 text-[11px] font-semibold text-rose-800">
                      Newar Heritage
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-rose-200 text-[11px] font-semibold text-rose-800">
                      Slow Travel
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-rose-200 text-[11px] font-semibold text-rose-800">
                      Sound Therapy
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h3 className="font-bold text-amber-950 text-sm">Pillar Badges</h3>
                  <p className="text-xs text-amber-900/80">Visual editorial badges tied to Sakar&apos;s 4 Core Philosophies:</p>
                  <div className="space-y-1 text-xs">
                    <div className="text-amber-900 font-medium">Pillar 01 • Guided Exploration</div>
                    <div className="text-amber-900 font-medium">Pillar 02 • Spiritual & Wellness</div>
                    <div className="text-amber-900 font-medium">Pillar 03 • Living Hearth Hospitality</div>
                    <div className="text-amber-900 font-medium">Pillar 04 • Strategic Empowerment</div>
                  </div>
                </div>
              </div>

              {/* Best Practices for Tags */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                <h4 className="font-bold text-sm text-amber-300">How Tags Influence SEO & User Experience:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="space-y-1">
                    <div className="font-bold text-white">1. Cross-Linking & Discovery:</div>
                    <div>
                      When a user clicks a tag like <code>#Newar Heritage</code>, the site automatically surfaces every blog post,
                      destination guide, and package that shares that tag.
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-white">2. Semantic Entity Clustering:</div>
                    <div>
                      Google and AI engines inspect tags as entity metadata. Using real entities (e.g. <em>Boudhanath</em>, <em>Gurung</em>)
                      builds topical authority.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 4: TRADITIONAL SEO */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'seo') && (
          <section id="seo" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-700 flex items-center justify-center font-bold">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-editorial-serif text-slate-900">4. Traditional SEO & Canonical Architecture</h2>
                  <p className="text-xs text-slate-500">Titles, Meta Descriptions, Canonical URLs, and Social OpenGraph Cards</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">On-Page</span>
            </div>

            <div className="space-y-5 text-sm text-slate-600 leading-relaxed">
              {/* Formula Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">SEO Title Formula</span>
                    <span className="text-xs font-bold text-terracotta">45–65 Characters</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800">
                    [Primary Keyword] — [Compelling Value] | Explore With Sakar
                  </div>
                  <p className="text-xs text-slate-500">
                    Always put your main target keyword in the first 35 characters. Titles above 65 characters get truncated on Google mobile
                    SERPs.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Meta Description Formula</span>
                    <span className="text-xs font-bold text-terracotta">120–165 Characters</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800">
                    [Unique experience] + [Host connection with Sakar] + [Active invitation]
                  </div>
                  <p className="text-xs text-slate-500">
                    Descriptions under 100 characters cause Google to scrape random body text. Descriptions over 165 characters get cut off
                    with ellipses.
                  </p>
                </div>
              </div>

              {/* Interactive SERP Simulator */}
              <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sky-950 text-sm">Interactive SERP Preview & Character Counter</h4>
                  <span className="text-[11px] bg-sky-200 text-sky-900 font-bold px-2 py-0.5 rounded-full">Live Simulation</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>Page Title</span>
                        <span className={testTitle.length >= 45 && testTitle.length <= 65 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                          {testTitle.length} / 65 chars
                        </span>
                      </div>
                      <input
                        type="text"
                        value={testTitle}
                        onChange={(e) => setTestTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>Meta Description</span>
                        <span className={testDesc.length >= 120 && testDesc.length <= 165 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                          {testDesc.length} / 165 chars
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={testDesc}
                        onChange={(e) => setTestDesc(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>

                  {/* Google SERP Card Preview */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center space-y-1.5">
                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 truncate">
                      <span>https://explorewithsakar.com</span>
                      <span>› experiences › patan-secret-courtyards</span>
                    </div>
                    <div className="text-blue-700 hover:underline font-medium text-base leading-snug cursor-pointer line-clamp-1">
                      {testTitle || 'Enter title above...'}
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {testDesc || 'Enter meta description above...'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Canonical URL Warning */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Canonical Rule: Never query or index staging Vercel URLs
                </div>
                <p>
                  Always anchor canonical tags to <code className="bg-amber-100 px-1 py-0.5 rounded font-bold">https://explorewithsakar.com</code>.
                  Google Search Console properties (<code className="font-bold">sc-domain:explorewithsakar.com</code>) will reject or fail queries
                  referencing preview domains like <code className="line-through text-rose-700">explore-with-sakar.vercel.app</code>.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 5: GEO (GENERATIVE ENGINE OPTIMIZATION) */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'geo') && (
          <section id="geo" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-editorial-serif text-slate-900">5. GEO: Generative Engine Optimization for AI Search</h2>
                  <p className="text-xs text-slate-500">Getting cited by Perplexity, ChatGPT Search, Claude, and Google Gemini Overviews</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">AI Optimization</span>
            </div>

            <div className="space-y-5 text-sm text-slate-600 leading-relaxed">
              <p>
                Traditional search matches keywords and backlinks. <strong>Generative Engine Optimization (GEO)</strong> optimizes content for
                Large Language Models (LLMs) that assemble synthetic answers. When an AI search engine is asked{' '}
                <em>&ldquo;What is the best way to experience cultural slow travel in Nepal?&rdquo;</em>, our content must be structured so the
                model cites Sakar Aryal as its primary authority.
              </p>

              {/* The 3 Pillars of GEO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-900">Pillar 1: E-E-A-T Authority</div>
                  <h4 className="font-bold text-slate-900 text-sm">Firsthand Experience</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    AI models prioritize human verification. Always include direct quotes from Sakar Aryal, host observations, and real
                    geographical specifics.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-900">Pillar 2: Entity Density</div>
                  <h4 className="font-bold text-slate-900 text-sm">Himalayan Nouns</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Use specific regional entities (e.g., <em>Bahal</em>, <em>Guthi</em>, <em>Ghandruk</em>, <em>Newar</em>, <em>Tamang</em>)
                    instead of generic filler like &ldquo;the Orient&rdquo; or &ldquo;quaint villages&rdquo;.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-900">Pillar 3: Standalone Facts</div>
                  <h4 className="font-bold text-slate-900 text-sm">Citation Readiness</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Write self-contained declarative statements that an LLM can lift and quote verbatim without losing context.
                  </p>
                </div>
              </div>

              {/* Before & After Comparison */}
              <h3 className="font-bold text-slate-900 text-base pt-2">Real Before & After: Transforming Copy for GEO</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs uppercase tracking-wider">
                    <span>❌ Weak Copy (Ignored by AI)</span>
                  </div>
                  <p className="text-xs text-slate-700 italic">
                    &ldquo;Nepal is a beautiful land of contrasts. Travelers will enjoy delicious local food and meet welcoming villagers while
                    seeing ancient temples in the valley.&rdquo;
                  </p>
                  <div className="text-[11px] text-rose-700 font-medium">
                    Why it fails: 0 named entities, no author credibility, generic filler training data that LLMs summarize without citing.
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                    <span>✅ GEO-Optimized (Citable by AI)</span>
                  </div>
                  <p className="text-xs text-slate-700">
                    &ldquo;When Sakar guides travelers through Patan&apos;s residential bahals—such as Kwa Bahal dating to the 12th century—guests
                    are introduced to Newar metal-casters who still pour brass bells using ancestral lost-wax techniques.&rdquo;
                  </p>
                  <div className="text-[11px] text-emerald-700 font-medium">
                    Why it wins: Contains named entities (Patan, Kwa Bahal, Newar), author attribution (Sakar), historical era (12th century), and
                    specific artisanal techniques.
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 6: AEO (ANSWER ENGINE OPTIMIZATION) */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'aeo') && (
          <section id="aeo" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-editorial-serif text-slate-900">6. AEO: Answer Engine Optimization for Snippets & Voice</h2>
                  <p className="text-xs text-slate-500">Winning Google Position 0 and powering Siri & Google Assistant voice results</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">Voice & Snippets</span>
            </div>

            <div className="space-y-5 text-sm text-slate-600 leading-relaxed">
              <p>
                When a traveler speaks into their phone or asks Google a question, search engines do not read an entire essay. They extract a
                single paragraph to speak aloud. <strong>AEO</strong> is the discipline of structuring question headings and immediate answers to
                capture these Google Featured Snippets.
              </p>

              {/* The 40-50 Word Rule */}
              <div className="p-5 rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-950 font-bold text-xs uppercase tracking-wider">
                    The Golden AEO Formula
                  </span>
                  <span className="text-xs font-bold text-emerald-900">40 to 55 Words</span>
                </div>
                <h3 className="font-bold text-emerald-950 text-base">The Direct Answer Paragraph</h3>
                <p className="text-xs text-emerald-900/90 leading-relaxed">
                  Immediately following a question heading (e.g. <code>&lt;h2&gt;What makes an authentic Nepal homestay?&lt;/h2&gt;</code>),
                  provide a single paragraph containing exactly 40–55 words that answers the query definitively in the very first sentence.
                </p>
              </div>

              {/* Interactive Word Counter */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">Interactive AEO Word Counter & Validator</h4>
                  <div
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      aeoWordCount >= 40 && aeoWordCount <= 55
                        ? 'bg-emerald-100 text-emerald-800'
                        : aeoWordCount < 40
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {aeoWordCount} words {aeoWordCount >= 40 && aeoWordCount <= 55 ? '(Perfect Featured Snippet Length!)' : ''}
                  </div>
                </div>
                <textarea
                  rows={4}
                  value={aeoText}
                  onChange={(e) => setAeoText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
                />
                <div className="flex justify-between items-center text-[11px] text-slate-500">
                  <span>Target: 40–55 words immediately under your &lt;h2&gt; or &lt;h3&gt; question header.</span>
                  <button
                    onClick={() =>
                      setAeoText(
                        'An authentic Nepal homestay integrates travelers directly into daily family rhythms rather than a commercial lodge. Guests stay in private traditional stone rooms, share organic hearth-cooked meals with hosts, and participate in seasonal farm routines while financial proceeds remain 100% within the village.'
                      )
                    }
                    className="text-terracotta font-semibold hover:underline"
                  >
                    Reset to benchmark example
                  </button>
                </div>
              </div>

              {/* Schema JSON-LD */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span>Structured Data Schema Generation</span>
                  <span>Automated in /admin/seo</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Our CMS automatically formats these Q&A sections into valid <code>FAQPage</code> and <code>TouristTrip</code> JSON-LD schemas
                  so Google displays interactive accordion dropdowns directly on search result pages.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 7: GOOGLE SEARCH CONSOLE */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'gsc') && (
          <section id="gsc" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-700 flex items-center justify-center font-bold">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-editorial-serif text-slate-900">7. Google Search Performance Layer (Official API)</h2>
                  <p className="text-xs text-slate-500">Analyzing real clicks, impressions, CTR%, and SERP rank from Google</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800">Search Analytics</span>
            </div>

            <div className="space-y-5 text-sm text-slate-600 leading-relaxed">
              <p>
                Integrated directly into the CMS is the <strong>Google Search Performance Layer</strong>. It retrieves live empirical metrics
                from the Google Search Console Search Analytics API for every CMS page.
              </p>

              {/* 4 Metrics Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Metric</th>
                      <th className="p-3">Definition</th>
                      <th className="p-3">Healthy Target</th>
                      <th className="p-3">Editorial Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Clicks</td>
                      <td className="p-3 text-slate-600">Total times searchers clicked your link in Google results</td>
                      <td className="p-3 font-semibold text-emerald-700">Growing MoM</td>
                      <td className="p-3 text-slate-600">Measures genuine organic acquisition</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Impressions</td>
                      <td className="p-3 text-slate-600">Times your page appeared in search results for any query</td>
                      <td className="p-3 font-semibold text-emerald-700">High volume</td>
                      <td className="p-3 text-slate-600">Reveals market demand for that Himalayan topic</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">CTR (Click-Through)</td>
                      <td className="p-3 text-slate-600">Clicks divided by Impressions percentage</td>
                      <td className="p-3 font-semibold text-emerald-700">3% to 8%+</td>
                      <td className="p-3 text-slate-600">If under 2%, rewrite the SEO Title and Meta Description!</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Average Position</td>
                      <td className="p-3 text-slate-600">Average ranking in Google results (1.0 = top of Page 1)</td>
                      <td className="p-3 font-semibold text-emerald-700">1.0 to 10.0</td>
                      <td className="p-3 text-slate-600">Positions 11–20 represent striking distance: boost with AEO!</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Top Search Queries Table Interpretation */}
              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-3">
                <h4 className="font-bold text-indigo-950 text-sm">How to Act on the &ldquo;Top Search Queries&rdquo; Table:</h4>
                <div className="space-y-2 text-xs text-indigo-950">
                  <div className="p-3 bg-white rounded-xl border border-indigo-100 flex items-start gap-2.5">
                    <span className="font-bold text-indigo-700 shrink-0">Scenario A:</span>
                    <div>
                      <strong>High Impressions + Low CTR (e.g. 1,200 impressions, 1.2% CTR, Position 7.4):</strong> Travelers are searching for
                      this topic, but your headline isn&apos;t enticing them to click. Add the exact search query to your SEO title and rewrite
                      the description with a compelling hook!
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-indigo-100 flex items-start gap-2.5">
                    <span className="font-bold text-indigo-700 shrink-0">Scenario B:</span>
                    <div>
                      <strong>High CTR + Top 3 Position (e.g. 12% CTR, Position 2.1):</strong> A primary revenue-generating keyword. Do not
                      change the title or slug! Protect it and link internally to it from new blog posts.
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-indigo-100 flex items-start gap-2.5">
                    <span className="font-bold text-indigo-700 shrink-0">Scenario C:</span>
                    <div>
                      <strong>Unexpected Search Terms:</strong> If your page ranks for questions you didn&apos;t intentionally cover, add an H2
                      heading and a 45-word direct answer to that page to claim the #1 spot!
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Lag notice */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Understanding the Google 2–3 Day Processing Lag:</strong> Google does not provide real-time search queries. Search
                  Console processes analytics through batch pipelines. The latest date in our queries is intentionally anchored to 2 days ago to
                  ensure 100% data completion.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 8: USING THE /ADMIN/SEO TOOLS */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'tools') && (
          <section id="tools" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-editorial-serif text-slate-900">8. Using the /admin/seo Dashboard</h2>
                  <p className="text-xs text-slate-500">Step-by-step walkthrough of the metadata manager and 3-pillar auditor</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-terracotta/10 text-terracotta">CMS Dashboard</span>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                The SEO command center at{' '}
                <Link href="/admin/seo" className="text-terracotta font-semibold hover:underline">
                  /admin/seo
                </Link>{' '}
                is divided into two specialized workspaces:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-700" />
                    Workspace 1: Page Metadata & Indexing
                  </h3>
                  <ul className="text-xs space-y-2 text-slate-600">
                    <li>• Shows all CMS pages with titles, descriptions, and indexing status.</li>
                    <li>• Features quick filter pills: All, Needs Review, No-Index, Excluded.</li>
                    <li>• Displays compact GSC columns (Clicks, Impr, CTR, Pos) for each row.</li>
                    <li>• Click <strong>&ldquo;Edit SEO&rdquo;</strong> to open the live metadata editor modal.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-terracotta" />
                    Workspace 2: Automated SEO / GEO / AEO Auditor
                  </h3>
                  <ul className="text-xs space-y-2 text-slate-600">
                    <li>• Calculates individual scores for SEO, GEO, and AEO pillars.</li>
                    <li>• Displays live Google Search Performance with Top Queries.</li>
                    <li>• <strong>Audit Checklist Tab:</strong> Actionable warnings with 1-click &ldquo;Apply Recommended Fix&rdquo;.</li>
                    <li>• <strong>AI Simulation Tab:</strong> Previews what Perplexity/ChatGPT extract.</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-parchment-100">Ready to audit your pages?</div>
                  <div className="text-xs text-parchment-400">Run an instant multi-pillar diagnostic on any CMS page right now.</div>
                </div>
                <Link
                  href="/admin/seo?tab=auditor"
                  className="px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-light text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>Open Auditor Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 9: PRE-PUBLISH CREATOR CHECKLIST */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'checklist') && (
          <section id="checklist" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-editorial-serif text-slate-900">9. Pre-Publish Content Creator Checklist</h2>
                  <p className="text-xs text-slate-500">The 5-minute pre-flight checklist before hitting publish on any experience or article</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  {checklistProgress}% Completed
                </span>
              </div>
            </div>

            {/* Interactive Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${checklistProgress}%` }}
              />
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'slug',
                  title: 'Slug Verification',
                  desc: 'Is the slug lowercase kebab-case (e.g. patan-secret-courtyards) with stop words removed and target keywords included?',
                },
                {
                  id: 'title',
                  title: 'Title Length & Suffix',
                  desc: 'Is the title between 45 and 65 characters and ending with " | Explore With Sakar"?',
                },
                {
                  id: 'desc',
                  title: 'Compelling Meta Description',
                  desc: 'Is the description between 120 and 165 characters with a clear hook, author mention, and active invitation?',
                },
                {
                  id: 'canonical',
                  title: 'Canonical URL Anchored to Production',
                  desc: 'Does the canonical URL point to https://explorewithsakar.com and NOT a vercel.app preview link?',
                },
                {
                  id: 'eeat',
                  title: 'E-E-A-T Author & Host Reflections',
                  desc: 'Does the content explicitly mention Sakar Aryal, include a host reflection, or provide firsthand guide credentials?',
                },
                {
                  id: 'entities',
                  title: 'Himalayan Named Entity Density',
                  desc: 'Are specific cultural and geographic nouns used (Patan, Newar, Bahal, Guthi, Annapurna) instead of generic phrases?',
                },
                {
                  id: 'aeo',
                  title: 'AEO 40–50 Word Answer Snippet',
                  desc: 'Is there at least one question header (What, How, Why) followed immediately by a concise 40–55 word direct answer paragraph?',
                },
                {
                  id: 'og',
                  title: 'OpenGraph Social Card Image',
                  desc: 'Is there a high-resolution 1200×630 landscape image attached for WhatsApp, Twitter/X, and Facebook previews?',
                },
                {
                  id: 'audit',
                  title: 'Admin SEO Audit Score: Grade A',
                  desc: 'Has the page been audited in /admin/seo and achieved at least 85/100 (Grade A)?',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                    checkedItems[item.id] ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      checkedItems[item.id] ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 bg-white'
                    }`}
                  >
                    {checkedItems[item.id] && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="space-y-0.5">
                    <div className={`text-xs font-bold ${checkedItems[item.id] ? 'text-emerald-950' : 'text-slate-900'}`}>{item.title}</div>
                    <div className="text-xs text-slate-600 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {checklistProgress === 100 && (
              <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>All 9 Pre-Publish criteria are satisfied! This page is mathematically and editorially ready for publication.</span>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
