import { MetadataRoute } from 'next';
import { getPublicExperiences, getPublicBlogs } from '@/lib/content';
import { readKey } from '@/lib/store';
import { PageContent } from '@/types/cms';
import { DEFAULT_PUBLIC_PAGES } from '@/data/pages';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://explorewithsakar.com';

  try {
    // 1. Pages from CMS / Seed
    let pages: PageContent[] = [];
    try {
      pages = (await readKey<PageContent[]>('pages')) || [];
    } catch {
      // Fallback if Mongo unreachable
    }
    if (!pages || pages.length === 0) {
      pages = DEFAULT_PUBLIC_PAGES;
    }

    // Filter pages honoring sitemapVisible and noIndex
    const visiblePages = pages.filter(
      (p) => p.status === 'published' && p.seo?.sitemapVisible !== false && p.seo?.noIndex !== true
    );

    const CANONICAL_EXPERIENCE_MAP: Record<string, string> = {
      'go-beyond': '/experiences/beyond-the-map',
      'beyond-the-map': '/experiences/beyond-the-map',
      'go-spiritual': '/experiences/spiritual-wellness',
      'spiritual-wellness': '/experiences/spiritual-wellness',
      'feel-closer': '/experiences/homestays',
      'homestays': '/experiences/homestays',
      'leave-a-mark': '/experiences/leave-a-mark',
      'all-curated-experiences': '/experiences',
      'experiences': '/experiences',
      'custom-private-journeys': '/experiences/custom-journeys',
      'custom-journeys': '/experiences/custom-journeys',
    };

    const pageRoutes: MetadataRoute.Sitemap = visiblePages
      .filter((page) => !page.url?.startsWith('/admin') && !page.url?.startsWith('/api'))
      .map((page) => {
        const isHome = page.slug === 'home';
        let pagePath = page.url;

        // Check if page corresponds to one of the canonical experience pillars/catalog
        if (CANONICAL_EXPERIENCE_MAP[page.slug]) {
          pagePath = CANONICAL_EXPERIENCE_MAP[page.slug];
        } else if (pagePath.startsWith('/experience/') || pagePath.startsWith('/services/')) {
          pagePath = pagePath.replace(/^\/(?:experience|services)\//, '/experiences/');
        }

        const isCanonicalExp = Object.values(CANONICAL_EXPERIENCE_MAP).includes(pagePath);

        return {
          url: isHome ? `${baseUrl}` : `${baseUrl}${pagePath}`,
          lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
          changeFrequency: isHome ? 'daily' : isCanonicalExp ? 'weekly' : 'monthly',
          priority: isHome ? 1.0 : isCanonicalExp ? 0.9 : 0.8,
        };
      });

    // Explicitly guarantee all 6 canonical experience routes are included
    const now = new Date();
    const coreExperienceRoutes: MetadataRoute.Sitemap = [
      { url: `${baseUrl}/experiences`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
      { url: `${baseUrl}/experiences/beyond-the-map`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${baseUrl}/experiences/spiritual-wellness`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${baseUrl}/experiences/homestays`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${baseUrl}/experiences/leave-a-mark`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${baseUrl}/experiences/custom-journeys`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ];

    // 2. Curated Experiences (dynamic package departures)
    const experiences = await getPublicExperiences();
    const experienceRoutes: MetadataRoute.Sitemap = (experiences || [])
      .filter((exp) => exp.status === 'published' && !CANONICAL_EXPERIENCE_MAP[exp.slug])
      .map((exp) => ({
        url: `${baseUrl}/experiences/${exp.slug}`,
        lastModified: exp.updatedAt ? new Date(exp.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.85,
      }));

    // 3. Blogs
    const blogs = await getPublicBlogs();
    const blogRoutes: MetadataRoute.Sitemap = (blogs || [])
      .filter((b) => b.status === 'published')
      .map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.publishedAt ? new Date(blog.publishedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.75,
      }));

    // Deduplicate URLs
    const routeMap = new Map<string, MetadataRoute.Sitemap[number]>();
    for (const route of [...coreExperienceRoutes, ...pageRoutes, ...experienceRoutes, ...blogRoutes]) {
      routeMap.set(route.url, route);
    }

    return Array.from(routeMap.values());
  } catch (err) {
    console.error('Error generating sitemap:', err);
    return [
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }
}
