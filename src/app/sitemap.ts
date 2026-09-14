import { MetadataRoute } from 'next';
import { getLivePackages, getLiveExperiences, getLiveBlogs, getLiveServices } from '@/lib/cms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://explorewithsakar.com';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  try {
    const [packages, experiences, blogs, services] = await Promise.all([
      getLivePackages(),
      getLiveExperiences(),
      getLiveBlogs(),
      getLiveServices(),
    ]);

    const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
      url: `${baseUrl}/packages/${pkg.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    }));

    const experienceRoutes: MetadataRoute.Sitemap = experiences.map((exp) => ({
      url: `${baseUrl}/experiences/${exp.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    }));

    const blogRoutes: MetadataRoute.Sitemap = blogs
      .filter((b) => b.status !== 'draft')
      .map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.publishedAt ? new Date(blog.publishedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.75,
      }));

    const serviceRoutes: MetadataRoute.Sitemap = services
      .filter((s) => s.status !== 'draft')
      .map((svc) => ({
        url: `${baseUrl}/services/${svc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));

    return [...staticRoutes, ...packageRoutes, ...experienceRoutes, ...blogRoutes, ...serviceRoutes];
  } catch (err) {
    console.error('Error generating sitemap:', err);
    return staticRoutes;
  }
}
