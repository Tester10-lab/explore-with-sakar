/**
 * Shared types and pure utility functions for Google Search Console.
 * Safe to import in both Client and Server Components without bundling server-only dependencies.
 */

export interface GscMetricSummary {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscQueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscDateRangeInfo {
  key: '7d' | '28d' | '3m' | '6m';
  label: string;
  startDate: string;
  endDate: string;
}

export interface GscStatus {
  configured: boolean;
  connected: boolean;
  property: string;
  lastUpdated?: string;
  error?: string;
}

export interface GscPageResult {
  hasData: boolean;
  property: string;
  exactPageUrl: string;
  pageUrl: string;
  normalizedPath: string;
  rowCount: number;
  urlMatching: boolean;
  metrics: GscMetricSummary | null;
  queries: GscQueryRow[];
  dateRange: GscDateRangeInfo;
  lastUpdated: string;
  cached?: boolean;
}

export const GSC_PRODUCTION_ORIGIN = 'https://explorewithsakar.com';

/**
 * Resolves the production canonical URL for Google Search Console.
 * Guarantees that Vercel preview/deployment domains (e.g. explore-with-sakar.vercel.app)
 * or local dev hosts are never queried against Search Console.
 * E.g., "/blog" or "https://explore-with-sakar.vercel.app/blog" -> "https://explorewithsakar.com/blog"
 */
export function getGscCanonicalUrl(urlOrPath?: string): string {
  const norm = normalizeGscUrl(urlOrPath || '/');
  return norm === '/' ? `${GSC_PRODUCTION_ORIGIN}/` : `${GSC_PRODUCTION_ORIGIN}${norm}`;
}

export interface GscOverviewResult {
  property: string;
  dateRange: GscDateRangeInfo;
  lastUpdated: string;
  cached?: boolean;
  pages: Record<string, GscMetricSummary>;
}

export const GSC_DATE_OPTIONS: Array<{ key: '7d' | '28d' | '3m' | '6m'; label: string }> = [
  { key: '7d', label: 'Last 7 days' },
  { key: '28d', label: 'Last 28 days' },
  { key: '3m', label: 'Last 3 months' },
  { key: '6m', label: 'Last 6 months' },
];

/**
 * Normalizes any URL or path to a clean, canonical pathname for matching CMS pages.
 * Handles protocol (http/https), domain, www, query parameters, hashes, and trailing slashes.
 * Examples:
 *  - "https://explorewithsakar.com/experiences/beyond-the-map/" -> "/experiences/beyond-the-map"
 *  - "https://www.explorewithsakar.com/experiences/beyond-the-map?ref=google" -> "/experiences/beyond-the-map"
 *  - "/experiences/beyond-the-map/" -> "/experiences/beyond-the-map"
 *  - "https://explorewithsakar.com/" -> "/"
 *  - "/" -> "/"
 *  - "" -> "/"
 */
export function normalizeGscUrl(urlOrPath: string): string {
  if (!urlOrPath) return '/';
  const trimmed = urlOrPath.trim();
  if (!trimmed) return '/';

  try {
    let pathname = trimmed;
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      const parsed = new URL(trimmed);
      pathname = parsed.pathname;
    } else {
      // Remove possible query parameters or hash from path
      pathname = trimmed.split('?')[0].split('#')[0];
    }

    // Ensure leading slash
    if (!pathname.startsWith('/')) {
      pathname = `/${pathname}`;
    }

    // Strip trailing slash unless it's just "/"
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.replace(/\/+$/, '');
    }

    return pathname.toLowerCase();
  } catch {
    return trimmed.toLowerCase();
  }
}

/**
 * Calculate dates for the requested date range.
 * Search Console data typically has a 2-3 day lag, so endDate is anchored to 2 days ago.
 */
export function getGscDateRange(rangeKey: string = '28d'): GscDateRangeInfo {
  const now = new Date();
  // Anchor end date to 2 days ago in UTC
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 2));

  let days = 28;
  let label = 'Last 28 days';
  let validKey: '7d' | '28d' | '3m' | '6m' = '28d';

  switch (rangeKey) {
    case '7d':
      days = 7;
      label = 'Last 7 days';
      validKey = '7d';
      break;
    case '3m':
      days = 90;
      label = 'Last 3 months';
      validKey = '3m';
      break;
    case '6m':
      days = 180;
      label = 'Last 6 months';
      validKey = '6m';
      break;
    case '28d':
    default:
      days = 28;
      label = 'Last 28 days';
      validKey = '28d';
      break;
  }

  const start = new Date(end.getTime() - (days - 1) * 24 * 60 * 60 * 1000);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  return {
    key: validKey,
    label,
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
}

