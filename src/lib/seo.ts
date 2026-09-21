import { Metadata } from 'next';
import { getPageContent } from '@/lib/content';

/**
 * Builds Next.js App Router metadata dynamically driven by CMS PageContent.seo,
 * falling back to hardcoded defaults if CMS is unreachable, page has no SEO,
 * or during build time.
 * Honors `noIndex` and `sitemapVisible`.
 */
export async function buildPageMetadata(
  slug: string,
  fallback: Metadata
): Promise<Metadata> {
  try {
    const page = await getPageContent(slug);
    const seo = page?.seo;

    if (!seo) {
      return fallback;
    }

    const title = seo.title || (typeof fallback.title === 'string' ? fallback.title : undefined);
    const description = seo.metaDescription || fallback.description || undefined;
    const canonical = seo.canonicalUrl || (fallback.alternates?.canonical as string) || undefined;
    const noIndex = seo.noIndex === true;

    return {
      ...fallback,
      title: title || fallback.title,
      description: description || fallback.description,
      alternates: canonical ? { canonical } : fallback.alternates,
      robots: noIndex
        ? {
            index: false,
            follow: false,
            googleBot: {
              index: false,
              follow: false,
            },
          }
        : fallback.robots,
      openGraph: {
        ...fallback.openGraph,
        title: (seo.ogTitle || title || fallback.openGraph?.title) as string,
        description: (seo.ogDescription || description || fallback.openGraph?.description) as string,
        url: canonical || (fallback.openGraph?.url as string) || undefined,
        images: seo.ogImage ? [seo.ogImage] : fallback.openGraph?.images,
      },
    };
  } catch (err) {
    console.warn(`[seo] Failed to load CMS SEO for slug '${slug}', using fallback:`, err);
    return fallback;
  }
}
