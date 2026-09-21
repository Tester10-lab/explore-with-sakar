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

    const pageRoutes: MetadataRoute.Sitemap = visiblePages.map((page) => {
      const isHome = page.slug === 'home';
      const isPriorityExp = page.slug.startsWith('go-') || page.slug === 'all-curated-experiences';
      return {
        url: isHome ? `${baseUrl}` : `${baseUrl}${page.url}`,
        lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
        changeFrequency: isHome ? 'daily' : isPriorityExp ? 'weekly' : 'monthly',
        priority: isHome ? 1.0 : isPriorityExp ? 0.9 : 0.8,
      };
    });

    // 2. Experiences
    const experiences = await getPublicExperiences();
    const experienceRoutes: MetadataRoute.Sitemap = (experiences || [])
      .filter((exp) => exp.status === 'published')
      .map((exp) => ({
        url: `${baseUrl}/experience/${exp.slug}`,
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
    for (const route of [...pageRoutes, ...experienceRoutes, ...blogRoutes]) {
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
