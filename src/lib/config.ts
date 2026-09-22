/**
 * Centralized site configuration.
 * Single source of truth for site origin and domain handling.
 * Does not assume the domain is live or purchased; falls back cleanly to NEXT_PUBLIC_SITE_URL or VERCEL_URL.
 */

export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://explorewithsakar.com')
).replace(/\/$/, '');

export const SITE_NAME = 'Explore With Sakar';

export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${cleanPath}`;
}

/**
 * Normalizes any canonical URL or path to always use the current SITE_ORIGIN.
 * Re-anchors internal domain variants (explorewithsakar.com, localhost, 127.0.0.1, Vercel preview)
 * to SITE_ORIGIN to guarantee 100% environment-consistent canonical and OG URLs.
 */
export function normalizeCanonicalUrl(urlOrPath?: string, fallbackPath: string = '/'): string {
  const target = (urlOrPath || fallbackPath || '/').trim();
  if (!target) return `${SITE_ORIGIN}/`;

  try {
    if (target.startsWith('http://') || target.startsWith('https://')) {
      const parsed = new URL(target);
      const isInternalHost =
        parsed.hostname === 'explorewithsakar.com' ||
        parsed.hostname === 'www.explorewithsakar.com' ||
        parsed.hostname === 'localhost' ||
        parsed.hostname === '127.0.0.1' ||
        (process.env.VERCEL_URL && parsed.hostname === process.env.VERCEL_URL);

      if (isInternalHost) {
        return getCanonicalUrl(parsed.pathname + parsed.search);
      }
      return target;
    }
  } catch {
    // Fall back to treating as path
  }

  return getCanonicalUrl(target);
}
