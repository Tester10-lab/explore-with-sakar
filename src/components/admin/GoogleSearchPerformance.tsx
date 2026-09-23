'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  MousePointer,
  Eye,
  Percent,
  Award,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Shield,
  Calendar,
  Loader2,
  LogOut,
  Globe,
  AlertTriangle,
} from 'lucide-react';
import { PageContent } from '@/types/cms';
import { getGscCanonicalUrl } from '@/lib/gscShared';

interface GoogleSearchPerformanceProps {
  page: PageContent;
  onRefreshPages?: () => void;
}

interface GscMetrics {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GscQueryItem {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GscStatusState {
  configured: boolean;
  connected: boolean;
  property: string;
  lastUpdated?: string;
}

const DATE_RANGE_OPTIONS = [
  { key: '7d', label: 'Last 7 days' },
  { key: '28d', label: 'Last 28 days' },
  { key: '3m', label: 'Last 3 months' },
  { key: '6m', label: 'Last 6 months' },
];

export default function GoogleSearchPerformance({ page, onRefreshPages }: GoogleSearchPerformanceProps) {
  const [status, setStatus] = useState<GscStatusState | null>(null);
  const [isStatusLoading, setIsStatusLoading] = useState(true);

  const [dateRange, setDateRange] = useState<string>('28d');
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const [hasData, setHasData] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<GscMetrics | null>(null);
  const [queries, setQueries] = useState<GscQueryItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // 1. Fetch GSC status
  const fetchStatus = useCallback(async () => {
    setIsStatusLoading(true);
    try {
      const res = await fetch('/api/admin/seo/gsc/status');
      if (res.ok) {
        const data = await res.json();
        setStatus({
          configured: data.configured,
          connected: data.connected,
          property: data.property,
          lastUpdated: data.lastUpdated,
        });
      } else {
        setStatus({
          configured: false,
          connected: false,
          property: 'sc-domain:explorewithsakar.com',
        });
      }
    } catch {
      setStatus({
        configured: false,
        connected: false,
        property: 'sc-domain:explorewithsakar.com',
      });
    } finally {
      setIsStatusLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // 2. Fetch page metrics
  const fetchPagePerformance = useCallback(
    async (forceRefresh = false) => {
      if (!status?.connected) return;

      if (forceRefresh) {
        setIsRefreshing(true);
      } else {
        setIsDataLoading(true);
      }
      setApiError(null);

      try {
        const targetUrl = getGscCanonicalUrl(page.url);
        const url = `/api/admin/seo/gsc/page?url=${encodeURIComponent(targetUrl)}&range=${dateRange}${
          forceRefresh ? '&refresh=true' : ''
        }`;
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
          setHasData(Boolean(data.hasData));
          setMetrics(data.metrics || null);
          setQueries(data.queries || []);
          setLastUpdated(data.lastUpdated || new Date().toISOString());
        } else {
          if (data.code === 'NOT_CONNECTED') {
            setStatus((prev) => (prev ? { ...prev, connected: false } : null));
          } else {
            setApiError(data.error || 'Failed to fetch Search Console data');
          }
        }
      } catch (err: any) {
        setApiError('Network error connecting to Search Console API');
      } finally {
        setIsDataLoading(false);
        setIsRefreshing(false);
      }
    },
    [status?.connected, page.url, dateRange]
  );

  useEffect(() => {
    if (status?.connected) {
      fetchPagePerformance(false);
    }
  }, [status?.connected, fetchPagePerformance]);

  const handleDisconnect = async () => {
    if (!confirm('Are you sure you want to disconnect Google Search Console?')) return;
    setIsDisconnecting(true);
    try {
      const res = await fetch('/api/admin/seo/gsc/disconnect', { method: 'POST' });
      if (res.ok) {
        setStatus((prev) => (prev ? { ...prev, connected: false } : null));
        setHasData(false);
        setMetrics(null);
        setQueries([]);
        if (onRefreshPages) onRefreshPages();
      }
    } catch {
      alert('Error disconnecting Google Search Console');
    } finally {
      setIsDisconnecting(false);
    }
  };

  const canonicalUrl = getGscCanonicalUrl(page.url);

  // ── Render Loading Status ──
  if (isStatusLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xs">
        <Loader2 className="w-8 h-8 animate-spin text-terracotta mb-3" />
        <p className="text-sm font-semibold text-slate-700">Checking Google Search Console connection...</p>
      </div>
    );
  }

  // ── Render Missing Configuration State ──
  if (!status?.configured) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start gap-4 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-editorial-serif text-lg font-bold text-slate-900">
              Google Search Console: Setup Required
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              To view real search performance (clicks, impressions, CTR, and search queries) for{' '}
              <strong>{page.name}</strong>, configure your Google Cloud OAuth credentials.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-3">
            <p className="font-bold text-slate-800">Required Environment Variables (.env.local):</p>
            <pre className="p-3 bg-slate-900 text-amber-300 rounded-xl font-mono text-[11px] overflow-x-auto">
{`# Google Search Console OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_SEARCH_CONSOLE_PROPERTY=${status?.property || 'sc-domain:explorewithsakar.com'}`}
            </pre>
            <div className="flex items-center gap-2 text-slate-600 pt-1">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                OAuth Authorized Redirect URI to register in Google Console:{' '}
                <code className="text-slate-800 font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  {typeof window !== 'undefined' ? `${window.location.origin}/api/admin/seo/gsc/callback` : '/api/admin/seo/gsc/callback'}
                </code>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:underline"
            >
              <span>Open Google Cloud Credentials Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={fetchStatus}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Check Configuration</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Render Disconnected State ──
  if (!status.connected) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-lg font-bold text-slate-900">
                Google Search Console Disconnected
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Property: <code className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">{status.property}</code>
              </p>
            </div>
          </div>

          <a
            href="/api/admin/seo/gsc/auth"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
          >
            <Shield className="w-4 h-4" />
            <span>Connect Google Search Console</span>
          </a>
        </div>

        <div className="mt-6 bg-slate-50 rounded-2xl p-4 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Secure Read-Only Access</span>
          </div>
          <p className="leading-relaxed">
            Connecting will request read-only access (<code className="font-mono text-[11px] text-slate-700">webmasters.readonly</code>) to fetch search queries, impressions, CTR, and search positions. Google tokens are stored safely on the server and are never exposed to the browser.
          </p>
        </div>
      </div>
    );
  }

  // ── Render Connected State ──
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-editorial-serif text-xl font-bold text-slate-900">
              Google Search Performance
            </h3>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              Connected
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-500 font-mono">
            <span>Property: <strong className="text-slate-800 font-semibold">{status.property}</strong></span>
            <span className="text-slate-300">•</span>
            <span>Canonical: <code className="text-terracotta bg-terracotta/5 px-1 py-0.5 rounded">{canonicalUrl}</code></span>
            {lastUpdated && (
              <>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] text-slate-400">
                  Last updated: {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Date Filter & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Filter Pills */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            {DATE_RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setDateRange(opt.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  dateRange === opt.key
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Refresh button */}
          <button
            onClick={() => fetchPagePerformance(true)}
            disabled={isRefreshing || isDataLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all border border-slate-200 disabled:opacity-50"
            title="Bypass server cache and fetch fresh data from Google Search Console"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Search Data'}</span>
          </button>

          {/* Disconnect button */}
          <button
            onClick={handleDisconnect}
            disabled={isDisconnecting}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            title="Disconnect Google Search Console"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error Notice */}
      {apiError && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Error querying Google Search Console</p>
            <p className="mt-0.5 text-rose-700">{apiError}</p>
          </div>
        </div>
      )}

      {/* Loading state for page performance */}
      {isDataLoading ? (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-8 h-8 animate-spin text-terracotta mb-2" />
          <p className="text-xs text-slate-500 font-medium">Fetching Search Console analytics for {page.name}...</p>
        </div>
      ) : !hasData || !metrics ? (
        /* Explicit No Data State */
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 text-center space-y-2">
          <Globe className="w-8 h-8 text-slate-400 mx-auto mb-1 opacity-60" />
          <h4 className="font-editorial-serif text-base font-bold text-slate-800">
            No Search Console data available for this page and date range.
          </h4>
          <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
            Google Search Console has not recorded any search impressions or clicks for this page within the selected date range ({DATE_RANGE_OPTIONS.find(o => o.key === dateRange)?.label}). Real search data typically takes 2–3 days to appear after indexing.
          </p>
        </div>
      ) : (
        /* Connected with Real Metrics */
        <div className="space-y-6">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* 1. Clicks */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[11px] font-bold uppercase tracking-wider">Clicks</span>
                <MousePointer className="w-4 h-4 text-blue-600" />
              </div>
              <div className="mt-3">
                <span className="font-editorial-serif text-3xl font-bold text-slate-900">
                  {metrics.clicks.toLocaleString()}
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Search visits to this page</p>
              </div>
            </div>

            {/* 2. Impressions */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[11px] font-bold uppercase tracking-wider">Impressions</span>
                <Eye className="w-4 h-4 text-purple-600" />
              </div>
              <div className="mt-3">
                <span className="font-editorial-serif text-3xl font-bold text-slate-900">
                  {metrics.impressions.toLocaleString()}
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Times shown in SERPs</p>
              </div>
            </div>

            {/* 3. CTR */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[11px] font-bold uppercase tracking-wider">Avg CTR</span>
                <Percent className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-3">
                <span className="font-editorial-serif text-3xl font-bold text-emerald-700">
                  {(metrics.ctr * 100).toFixed(1)}%
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Click-through rate</p>
              </div>
            </div>

            {/* 4. Average Position */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[11px] font-bold uppercase tracking-wider">Avg Position</span>
                <Award className="w-4 h-4 text-amber-600" />
              </div>
              <div className="mt-3">
                <span className="font-editorial-serif text-3xl font-bold text-amber-700">
                  {metrics.position.toFixed(1)}
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Average SERP rank</p>
              </div>
            </div>
          </div>

          {/* Top Search Queries Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-600" />
                <h4 className="font-editorial-serif text-sm font-bold text-slate-900">
                  Top Search Queries for this Page
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                  {queries.length} queries
                </span>
              </div>
            </div>

            {queries.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No individual queries found for this page in the selected date range.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/60 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-2.5 px-4">Search Query</th>
                      <th className="py-2.5 px-4 text-right">Clicks</th>
                      <th className="py-2.5 px-4 text-right">Impressions</th>
                      <th className="py-2.5 px-4 text-right">CTR</th>
                      <th className="py-2.5 px-4 text-right">Position</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {queries.map((q, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-4 font-medium text-slate-900">
                          {q.query}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-blue-700">
                          {q.clicks.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                          {q.impressions.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono text-emerald-700">
                          {(q.ctr * 100).toFixed(1)}%
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-amber-700">
                          {q.position.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
