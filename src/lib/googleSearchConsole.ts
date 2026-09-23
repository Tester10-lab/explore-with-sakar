import { readKey, writeKey } from './store';
import {
  GscMetricSummary,
  GscQueryRow,
  GscDateRangeInfo,
  GscStatus,
  GscPageResult,
  GscOverviewResult,
  normalizeGscUrl,
  getGscDateRange,
  getGscCanonicalUrl,
  GSC_PRODUCTION_ORIGIN,
} from './gscShared';

export type {
  GscMetricSummary,
  GscQueryRow,
  GscDateRangeInfo,
  GscStatus,
  GscPageResult,
  GscOverviewResult,
};
export {
  normalizeGscUrl,
  getGscDateRange,
  getGscCanonicalUrl,
  GSC_PRODUCTION_ORIGIN,
};

export interface GscStoredAuth {
  refreshToken: string;
  accessToken?: string;
  expiresAt?: number; // epoch ms
  connectedAt: string;
  scope?: string;
}

// In-memory cache for API calls
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}
const gscCache = new Map<string, CacheEntry<any>>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export function invalidateGscCache(): void {
  gscCache.clear();
}

/**
 * Get the Google Search Console property from environment, defaulting to domain property.
 */
export function getGscProperty(): string {
  return process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY || 'sc-domain:explorewithsakar.com';
}

/**
 * Check if Google OAuth credentials are fully provided in environment variables.
 */
export function isGscOAuthConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

/**
 * Read stored OAuth tokens server-side.
 */
export async function getStoredGscAuth(): Promise<GscStoredAuth | null> {
  try {
    const auth = await readKey<GscStoredAuth | null>('gsc_auth');
    if (!auth || !auth.refreshToken) return null;
    return auth;
  } catch {
    return null;
  }
}

/**
 * Save OAuth tokens server-side.
 */
export async function saveStoredGscAuth(auth: GscStoredAuth): Promise<void> {
  await writeKey('gsc_auth', auth);
  invalidateGscCache();
}

/**
 * Clear stored OAuth tokens and cache.
 */
export async function clearStoredGscAuth(): Promise<void> {
  await writeKey('gsc_auth', null);
  invalidateGscCache();
}

/**
 * Generate Google OAuth 2.0 authorization URL.
 */
export function getGoogleOAuthUrl(redirectUri: string, state: string): string {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID is not set in environment variables.');
  }

  const scope = 'https://www.googleapis.com/auth/webmasters.readonly';

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope,
    access_type: 'offline',
    prompt: 'consent',
    state,
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/**
 * Exchange authorization code for tokens.
 */
export async function exchangeCodeForTokens(code: string, redirectUri: string): Promise<GscStoredAuth> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Google OAuth credentials not configured in environment variables.');
  }

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }).toString(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error_description || data.error || 'Failed to exchange authorization code for tokens');
  }

  if (!data.refresh_token) {
    // If prompt=consent wasn't provided or user already consented, Google might omit refresh_token
    const existing = await getStoredGscAuth();
    if (existing?.refreshToken) {
      data.refresh_token = existing.refreshToken;
    } else {
      throw new Error('No refresh token returned by Google. Please disconnect and reconnect to grant offline access.');
    }
  }

  const expiresAt = Date.now() + (Number(data.expires_in) || 3600) * 1000;

  const authData: GscStoredAuth = {
    refreshToken: data.refresh_token,
    accessToken: data.access_token,
    expiresAt,
    connectedAt: new Date().toISOString(),
    scope: data.scope,
  };

  await saveStoredGscAuth(authData);
  return authData;
}

/**
 * Get a valid access token, automatically refreshing using refresh_token if expired.
 */
export async function getValidAccessToken(): Promise<string | null> {
  const auth = await getStoredGscAuth();
  if (!auth || !auth.refreshToken) return null;

  // If access token is still valid for at least 5 minutes, reuse it
  if (auth.accessToken && auth.expiresAt && auth.expiresAt - Date.now() > 5 * 60 * 1000) {
    return auth.accessToken;
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return null;
  }

  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: auth.refreshToken,
        grant_type: 'refresh_token',
      }).toString(),
    });

    const data = await res.json();
    if (!res.ok) {
      if (data.error === 'invalid_grant') {
        // Token has been revoked on Google's side
        await clearStoredGscAuth();
      }
      return null;
    }

    const newAuth: GscStoredAuth = {
      ...auth,
      accessToken: data.access_token,
      expiresAt: Date.now() + (Number(data.expires_in) || 3600) * 1000,
    };

    await saveStoredGscAuth(newAuth);
    return data.access_token;
  } catch {
    return null;
  }
}

/**
 * Fetch Search Console overview for all pages.
 */
export async function fetchGscOverview(
  rangeKey: string = '28d',
  forceRefresh: boolean = false
): Promise<GscOverviewResult> {
  const property = getGscProperty();
  const dateRange = getGscDateRange(rangeKey);
  const cacheKey = `overview_${property}_${dateRange.key}`;

  if (!forceRefresh) {
    const cached = gscCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return { ...cached.data, cached: true };
    }
  }

  const accessToken = await getValidAccessToken();
  if (!accessToken) {
    throw new Error('Not connected to Google Search Console or token expired.');
  }

  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      dimensions: ['page'],
      rowLimit: 5000,
      startRow: 0,
    }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const msg = errBody?.error?.message || `Google API error (${res.status})`;
    throw new Error(msg);
  }

  const data = await res.json();
  const rows: Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }> =
    data.rows || [];

  // Group and aggregate metrics by normalized path
  const pages: Record<string, { clicks: number; impressions: number; totalPosWeighted: number }> = {};

  for (const row of rows) {
    const rawUrl = row.keys?.[0] || '';
    const normPath = normalizeGscUrl(rawUrl);

    if (!pages[normPath]) {
      pages[normPath] = { clicks: 0, impressions: 0, totalPosWeighted: 0 };
    }

    pages[normPath].clicks += row.clicks || 0;
    pages[normPath].impressions += row.impressions || 0;
    pages[normPath].totalPosWeighted += (row.position || 0) * (row.impressions || 1);
  }

  const finalPages: Record<string, GscMetricSummary> = {};
  for (const [normPath, item] of Object.entries(pages)) {
    const ctr = item.impressions > 0 ? item.clicks / item.impressions : 0;
    const position = item.impressions > 0 ? item.totalPosWeighted / item.impressions : 0;
    finalPages[normPath] = {
      clicks: item.clicks,
      impressions: item.impressions,
      ctr: Number(ctr.toFixed(4)),
      position: Number(position.toFixed(1)),
    };
  }

  const result: GscOverviewResult = {
    property,
    dateRange,
    lastUpdated: new Date().toISOString(),
    pages: finalPages,
  };

  gscCache.set(cacheKey, { data: result, timestamp: Date.now() });
  return result;
}

/**
 * Fetch Search Console metrics & top queries for a specific CMS page.
 */
export async function fetchGscPageDetails(
  pageUrlOrPath: string,
  rangeKey: string = '28d',
  forceRefresh: boolean = false
): Promise<GscPageResult> {
  const property = getGscProperty();
  const dateRange = getGscDateRange(rangeKey);
  const normalizedPath = normalizeGscUrl(pageUrlOrPath);
  const canonicalUrl = getGscCanonicalUrl(pageUrlOrPath);
  const cacheKey = `page_${property}_${canonicalUrl}_${dateRange.key}`;

  if (!forceRefresh) {
    const cached = gscCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return { ...cached.data, cached: true };
    }
  }

  const accessToken = await getValidAccessToken();
  if (!accessToken) {
    throw new Error('Not connected to Google Search Console or token expired.');
  }

  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`;

  // Helper to query search analytics with a specific page filter
  const executeQuery = async (targetPageUrl: string, dimension: 'query' | 'page') => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        dimensions: [dimension],
        dimensionFilterGroups: [
          {
            filters: [
              {
                dimension: 'page',
                operator: 'equals',
                expression: targetPageUrl,
              },
            ],
          },
        ],
        rowLimit: dimension === 'query' ? 100 : 20,
      }),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const msg = errBody?.error?.message || `Google API error (${res.status})`;
      throw new Error(msg);
    }

    return await res.json();
  };

  // 1. Query Top Queries using exact canonical URL (e.g. https://explorewithsakar.com/blog)
  let activePageUrl = canonicalUrl;
  let queryData = await executeQuery(canonicalUrl, 'query');
  let queryRows: Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }> =
    queryData.rows || [];

  // If no rows found and URL has no trailing slash, check trailing slash variant
  if (queryRows.length === 0 && !canonicalUrl.endsWith('/')) {
    const slashUrl = `${canonicalUrl}/`;
    const altData = await executeQuery(slashUrl, 'query').catch(() => null);
    if (altData?.rows && altData.rows.length > 0) {
      activePageUrl = slashUrl;
      queryRows = altData.rows;
    }
  }

  const topQueries: GscQueryRow[] = queryRows.map((r) => ({
    query: r.keys?.[0] || '(not provided)',
    clicks: r.clicks || 0,
    impressions: r.impressions || 0,
    ctr: Number((r.ctr || 0).toFixed(4)),
    position: Number((r.position || 0).toFixed(1)),
  }));

  // 2. Query Page Aggregate Metrics for active page URL
  const pageData = await executeQuery(activePageUrl, 'page').catch(() => ({ rows: [] }));
  const pageRows: Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }> =
    pageData.rows || [];

  let metrics: GscMetricSummary | null = null;
  let hasData = false;

  if (pageRows.length > 0) {
    let totalClicks = 0;
    let totalImpressions = 0;
    let totalPosWeighted = 0;

    for (const r of pageRows) {
      totalClicks += r.clicks || 0;
      totalImpressions += r.impressions || 0;
      totalPosWeighted += (r.position || 0) * (r.impressions || 1);
    }

    if (totalImpressions > 0) {
      hasData = true;
      metrics = {
        clicks: totalClicks,
        impressions: totalImpressions,
        ctr: Number((totalImpressions > 0 ? totalClicks / totalImpressions : 0).toFixed(4)),
        position: Number((totalImpressions > 0 ? totalPosWeighted / totalImpressions : 0).toFixed(1)),
      };
    }
  } else if (topQueries.length > 0) {
    let totalClicks = 0;
    let totalImpressions = 0;
    let totalPosWeighted = 0;
    for (const q of topQueries) {
      totalClicks += q.clicks;
      totalImpressions += q.impressions;
      totalPosWeighted += q.position * q.impressions;
    }
    hasData = true;
    metrics = {
      clicks: totalClicks,
      impressions: totalImpressions,
      ctr: Number((totalImpressions > 0 ? totalClicks / totalImpressions : 0).toFixed(4)),
      position: Number((totalImpressions > 0 ? totalPosWeighted / totalImpressions : 0).toFixed(1)),
    };
  }

  const result: GscPageResult = {
    hasData,
    property,
    exactPageUrl: activePageUrl,
    pageUrl: pageUrlOrPath,
    normalizedPath,
    rowCount: topQueries.length,
    urlMatching: true,
    metrics,
    queries: topQueries,
    dateRange,
    lastUpdated: new Date().toISOString(),
  };

  gscCache.set(cacheKey, { data: result, timestamp: Date.now() });
  return result;
}
