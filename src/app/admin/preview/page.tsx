'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  ExternalLink,
  Edit3,
  Globe,
  ArrowLeft,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import { DEFAULT_PUBLIC_PAGES } from '@/data/pages';

function PreviewContent() {
  const searchParams = useSearchParams();
  const initialSlug = searchParams?.get('slug') || 'home';

  const [selectedSlug, setSelectedSlug] = useState(initialSlug);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);

  const currentPage =
    DEFAULT_PUBLIC_PAGES.find((p) => p.slug === selectedSlug) || DEFAULT_PUBLIC_PAGES[0];

  const deviceWidthMap = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <AdminHeader
        title="Live Multi-Device Preview"
        subtitle="Simulate and test how the main website renders across desktop, tablet, and mobile screens."
      />

      {/* Control Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-16 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-100 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Pages Manager</span>
          </Link>

          {/* Page Selector Dropdown */}
          <div className="relative">
            <select
              value={selectedSlug}
              onChange={(e) => {
                setSelectedSlug(e.target.value);
                setRefreshKey((k) => k + 1);
              }}
              className="appearance-none bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-medium rounded-xl pl-8 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              {DEFAULT_PUBLIC_PAGES.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} ({p.url})
                </option>
              ))}
            </select>
            <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Device View Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDeviceView('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              deviceView === 'desktop'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              deviceView === 'tablet'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDeviceView('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              deviceView === 'mobile'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
            title="Reload frame"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <a
            href={currentPage.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-medium transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Tab</span>
          </a>

          <Link
            href={`/admin/pages/${currentPage.slug}`}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-500/20"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Sections</span>
          </Link>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 bg-slate-950 p-4 sm:p-6 flex justify-center items-start overflow-auto">
        <div
          className={`${deviceWidthMap[deviceView]} h-[88vh] transition-all duration-300 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-800`}
        >
          <iframe
            key={refreshKey}
            src={currentPage.url}
            className="w-full h-full border-0"
            title={`Preview of ${currentPage.name}`}
          />
        </div>
      </div>
    </div>
  );
}

export default function AdminPreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
          Loading live preview frame...
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
