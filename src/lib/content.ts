import 'server-only';
import { unstable_cache } from 'next/cache';
import { readKey } from './store';
import { getSeedForKey } from './seed';
import {
  WebsiteSettings,
  NavigationConfig,
  ExtendedPackage,
  ExtendedExperience,
  ExtendedServicePillar,
  CmsEvent,
  CmsDestination,
  CmsFaqItem,
  ExtendedTestimonial,
  HandwrittenReviewPage,
  ExtendedGalleryPhoto,
  ExtendedBlogPost,
  PageContent,
  CmsBeyondChapter,
} from '@/types/cms';
import { LeaveAMarkData } from '@/data/leave-a-mark';

/**
 * Type for public blog list items: strips heavy `content` array
 * to keep cached entry well under 2 MB Vercel Data Cache limit.
 */
export type PublicBlogListItem = Omit<ExtendedBlogPost, 'content'>;

// ==========================================
// 1. Settings
// ==========================================
const fetchCachedSettings = unstable_cache(
  async (): Promise<WebsiteSettings> => {
    return await readKey<WebsiteSettings>('settings', { throwOnError: true });
  },
  ['cms', 'settings'],
  { tags: ['cms:settings'], revalidate: 3600 }
);

export async function getPublicSettings(): Promise<WebsiteSettings> {
  try {
    return await fetchCachedSettings();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for settings:', err);
    return getSeedForKey('settings');
  }
}

// ==========================================
// 2. Navigation
// ==========================================
const fetchCachedNavigation = unstable_cache(
  async (): Promise<NavigationConfig> => {
    return await readKey<NavigationConfig>('navigation', { throwOnError: true });
  },
  ['cms', 'navigation'],
  { tags: ['cms:navigation'], revalidate: 3600 }
);

export async function getPublicNavigation(): Promise<NavigationConfig> {
  try {
    return await fetchCachedNavigation();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for navigation:', err);
    return getSeedForKey('navigation');
  }
}

// ==========================================
// 3. Packages
// ==========================================
const fetchCachedPackages = unstable_cache(
  async (): Promise<ExtendedPackage[]> => {
    const list = await readKey<ExtendedPackage[]>('packages', { throwOnError: true });
    return (list || []).filter((pkg) => pkg.status === 'published');
  },
  ['cms', 'packages'],
  { tags: ['cms:packages'], revalidate: 3600 }
);

export async function getPublicPackages(): Promise<ExtendedPackage[]> {
  try {
    return await fetchCachedPackages();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for packages:', err);
    const seed = getSeedForKey('packages') as ExtendedPackage[];
    return (seed || []).filter((pkg) => pkg.status === 'published');
  }
}

const fetchCachedPackageBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<ExtendedPackage | null> => {
      const list = await readKey<ExtendedPackage[]>('packages', { throwOnError: true });
      const pkg = (list || []).find((p) => (p.slug === slug || p.id === slug) && p.status === 'published');
      return pkg || null;
    },
    ['cms', 'package', slug],
    { tags: ['cms:packages'], revalidate: 3600 }
  )();

export async function getPublicPackageBySlug(slug: string): Promise<ExtendedPackage | null> {
  try {
    return await fetchCachedPackageBySlug(slug);
  } catch (err) {
    console.warn(`[content] Mongo unreachable, returning static fallback for package ${slug}:`, err);
    const seed = getSeedForKey('packages') as ExtendedPackage[];
    return (seed || []).find((p) => (p.slug === slug || p.id === slug) && p.status === 'published') || null;
  }
}

// ==========================================
// 4. Experiences
// ==========================================
const fetchCachedExperiences = unstable_cache(
  async (): Promise<ExtendedExperience[]> => {
    const list = await readKey<ExtendedExperience[]>('experiences', { throwOnError: true });
    return (list || []).filter((exp) => exp.status === 'published');
  },
  ['cms', 'experiences'],
  { tags: ['cms:experiences'], revalidate: 3600 }
);

export async function getPublicExperiences(): Promise<ExtendedExperience[]> {
  try {
    return await fetchCachedExperiences();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for experiences:', err);
    const seed = getSeedForKey('experiences') as ExtendedExperience[];
    return (seed || []).filter((exp) => exp.status === 'published');
  }
}

const fetchCachedExperienceBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<ExtendedExperience | null> => {
      const list = await readKey<ExtendedExperience[]>('experiences', { throwOnError: true });
      const exp = (list || []).find((e) => (e.slug === slug || e.id === slug) && e.status === 'published');
      return exp || null;
    },
    ['cms', 'experience', slug],
    { tags: ['cms:experiences'], revalidate: 3600 }
  )();

export async function getPublicExperienceBySlug(slug: string): Promise<ExtendedExperience | null> {
  try {
    return await fetchCachedExperienceBySlug(slug);
  } catch (err) {
    console.warn(`[content] Mongo unreachable, returning static fallback for experience ${slug}:`, err);
    const seed = getSeedForKey('experiences') as ExtendedExperience[];
    return (seed || []).find((e) => (e.slug === slug || e.id === slug) && e.status === 'published') || null;
  }
}

export async function getPublicTopFeaturedExperiences(limit = 3): Promise<ExtendedExperience[]> {
  const all = await getPublicExperiences();
  const candidates = all.filter(
    (e) =>
      e.status === 'published' &&
      (e.featured || (e.featuredOrder !== undefined && e.featuredOrder > 0) || e.homepageVisible !== false)
  );
  const pool = candidates.length >= limit ? candidates : all;

  const sorted = [...pool].sort((a, b) => {
    const orderA = a.featuredOrder !== undefined && a.featuredOrder > 0 ? a.featuredOrder : a.featured ? 10 : 99;
    const orderB = b.featuredOrder !== undefined && b.featuredOrder > 0 ? b.featuredOrder : b.featured ? 10 : 99;
    return orderA - orderB;
  });

  return sorted.slice(0, limit);
}

// ==========================================
// 5. Services
// ==========================================
const fetchCachedServices = unstable_cache(
  async (): Promise<ExtendedServicePillar[]> => {
    const list = await readKey<ExtendedServicePillar[]>('services', { throwOnError: true });
    return (list || []).filter((s) => s.status === 'published');
  },
  ['cms', 'services'],
  { tags: ['cms:services'], revalidate: 3600 }
);

export async function getPublicServices(): Promise<ExtendedServicePillar[]> {
  try {
    return await fetchCachedServices();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for services:', err);
    const seed = getSeedForKey('services') as ExtendedServicePillar[];
    return (seed || []).filter((s) => s.status === 'published');
  }
}

// ==========================================
// 6. Events
// ==========================================
const fetchCachedEvents = unstable_cache(
  async (): Promise<CmsEvent[]> => {
    const list = await readKey<CmsEvent[]>('events', { throwOnError: true });
    return (list || []).filter((evt) => evt.isVisible !== false);
  },
  ['cms', 'events'],
  { tags: ['cms:events'], revalidate: 3600 }
);

export async function getPublicEvents(): Promise<CmsEvent[]> {
  try {
    return await fetchCachedEvents();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for events:', err);
    const seed = getSeedForKey('events') as CmsEvent[];
    return (seed || []).filter((evt) => evt.isVisible !== false);
  }
}

// ==========================================
// 7. Destinations
// ==========================================
const fetchCachedDestinations = unstable_cache(
  async (): Promise<CmsDestination[]> => {
    const list = await readKey<CmsDestination[]>('destinations', { throwOnError: true });
    return (list || []).filter((dest) => dest.isVisible !== false);
  },
  ['cms', 'destinations'],
  { tags: ['cms:destinations'], revalidate: 3600 }
);

export async function getPublicDestinations(): Promise<CmsDestination[]> {
  try {
    return await fetchCachedDestinations();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for destinations:', err);
    const seed = getSeedForKey('destinations') as CmsDestination[];
    return (seed || []).filter((dest) => dest.isVisible !== false);
  }
}

const fetchCachedDestinationBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<CmsDestination | null> => {
      const list = await readKey<CmsDestination[]>('destinations', { throwOnError: true });
      const dest = (list || []).find((d) => (d.slug === slug || d.id === slug) && d.isVisible !== false);
      return dest || null;
    },
    ['cms', 'destination', slug],
    { tags: ['cms:destinations'], revalidate: 3600 }
  )();

export async function getPublicDestinationBySlug(slug: string): Promise<CmsDestination | null> {
  try {
    return await fetchCachedDestinationBySlug(slug);
  } catch (err) {
    console.warn(`[content] Mongo unreachable, returning static fallback for destination ${slug}:`, err);
    const seed = getSeedForKey('destinations') as CmsDestination[];
    return (seed || []).find((d) => (d.slug === slug || d.id === slug) && d.isVisible !== false) || null;
  }
}

// ==========================================
// 8. FAQ
// ==========================================
const fetchCachedFaq = unstable_cache(
  async (): Promise<CmsFaqItem[]> => {
    const list = await readKey<CmsFaqItem[]>('faq', { throwOnError: true });
    return (list || []).filter((item) => item.isVisible !== false);
  },
  ['cms', 'faq'],
  { tags: ['cms:faq'], revalidate: 3600 }
);

export async function getPublicFaq(): Promise<CmsFaqItem[]> {
  try {
    return await fetchCachedFaq();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for FAQ:', err);
    const seed = getSeedForKey('faq') as CmsFaqItem[];
    return (seed || []).filter((item) => item.isVisible !== false);
  }
}

// ==========================================
// 9. Reviews & Handwritten Reviews
// ==========================================
const fetchCachedReviews = unstable_cache(
  async (): Promise<ExtendedTestimonial[]> => {
    const list = await readKey<ExtendedTestimonial[]>('reviews', { throwOnError: true });
    return (list || []).filter((r) => r.isVisible !== false && r.status === 'approved');
  },
  ['cms', 'reviews'],
  { tags: ['cms:reviews'], revalidate: 3600 }
);

export async function getPublicReviews(): Promise<ExtendedTestimonial[]> {
  try {
    return await fetchCachedReviews();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for reviews:', err);
    const seed = getSeedForKey('reviews') as ExtendedTestimonial[];
    return (seed || []).filter((r) => r.isVisible !== false && r.status === 'approved');
  }
}

const fetchCachedHandwrittenReviews = unstable_cache(
  async (): Promise<HandwrittenReviewPage[]> => {
    const list = await readKey<HandwrittenReviewPage[]>('handwrittenReviews', { throwOnError: true });
    return (list || []).filter((p) => p.isVisible !== false);
  },
  ['cms', 'handwrittenReviews'],
  { tags: ['cms:handwrittenReviews'], revalidate: 3600 }
);

export async function getPublicHandwrittenReviews(): Promise<HandwrittenReviewPage[]> {
  try {
    return await fetchCachedHandwrittenReviews();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for handwritten reviews:', err);
    const seed = getSeedForKey('handwrittenReviews') as HandwrittenReviewPage[];
    return (seed || []).filter((p) => p.isVisible !== false);
  }
}

// ==========================================
// 10. Photos
// ==========================================
const fetchCachedPhotos = unstable_cache(
  async (): Promise<ExtendedGalleryPhoto[]> => {
    const list = await readKey<ExtendedGalleryPhoto[]>('photos', { throwOnError: true });
    return list || [];
  },
  ['cms', 'photos'],
  { tags: ['cms:photos'], revalidate: 3600 }
);

export async function getPublicPhotos(): Promise<ExtendedGalleryPhoto[]> {
  try {
    return await fetchCachedPhotos();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for photos:', err);
    return (getSeedForKey('photos') as ExtendedGalleryPhoto[]) || [];
  }
}

// ==========================================
// 11. Blogs
// ==========================================
const fetchCachedBlogsList = unstable_cache(
  async (): Promise<PublicBlogListItem[]> => {
    const list = await readKey<ExtendedBlogPost[]>('blogs', { throwOnError: true });
    return (list || [])
      .filter((b) => b.status === 'published')
      .map(({ content, ...rest }) => rest);
  },
  ['cms', 'blogs', 'list'],
  { tags: ['cms:blogs'], revalidate: 3600 }
);

export async function getPublicBlogs(): Promise<PublicBlogListItem[]> {
  try {
    return await fetchCachedBlogsList();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for blogs list:', err);
    const seed = getSeedForKey('blogs') as ExtendedBlogPost[];
    return (seed || [])
      .filter((b) => b.status === 'published')
      .map(({ content, ...rest }) => rest);
  }
}

const fetchCachedBlogBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<ExtendedBlogPost | null> => {
      const list = await readKey<ExtendedBlogPost[]>('blogs', { throwOnError: true });
      const blog = (list || []).find((b) => b.slug === slug && b.status === 'published');
      return blog || null;
    },
    ['cms', 'blog', slug],
    { tags: ['cms:blogs'], revalidate: 3600 }
  )();

export async function getPublicBlogBySlug(slug: string): Promise<ExtendedBlogPost | null> {
  try {
    return await fetchCachedBlogBySlug(slug);
  } catch (err) {
    console.warn(`[content] Mongo unreachable, returning static fallback for blog ${slug}:`, err);
    const seed = getSeedForKey('blogs') as ExtendedBlogPost[];
    return (seed || []).find((b) => b.slug === slug && b.status === 'published') || null;
  }
}

export async function getPublicRelatedBlogs(currentSlug: string, count = 3): Promise<PublicBlogListItem[]> {
  const all = await getPublicBlogs();
  const current = all.find((b) => b.slug === currentSlug);
  if (!current) return all.slice(0, count);

  const related = (current.relatedSlugs || [])
    .map((slug) => all.find((b) => b.slug === slug))
    .filter((b): b is PublicBlogListItem => Boolean(b && b.slug !== currentSlug));

  if (related.length >= count) return related.slice(0, count);

  const categoryRelated = all.filter(
    (b) => b.slug !== currentSlug && b.category === current.category && !related.some((r) => r.slug === b.slug)
  );

  const combined = [...related, ...categoryRelated];
  if (combined.length >= count) return combined.slice(0, count);

  const fallback = all.filter((b) => b.slug !== currentSlug && !combined.some((c) => c.slug === b.slug));
  return [...combined, ...fallback].slice(0, count);
}

// ==========================================
// 12. Pages Content
// ==========================================
const fetchCachedPageContent = (slug: string) =>
  unstable_cache(
    async (): Promise<PageContent | null> => {
      const list = await readKey<PageContent[]>('pages', { throwOnError: true });
      const page = (list || []).find((p) => p.slug === slug);
      return page || null;
    },
    ['cms', 'page', slug],
    { tags: ['cms:pages'], revalidate: 3600 }
  )();

export async function getPageContent(slug: string): Promise<PageContent | null> {
  try {
    return await fetchCachedPageContent(slug);
  } catch (err) {
    console.warn(`[content] Mongo unreachable, returning static fallback for page ${slug}:`, err);
    const seed = getSeedForKey('pages') as PageContent[];
    return (seed || []).find((p) => p.slug === slug) || null;
  }
}

// ==========================================
// 13. Beyond the Map Chapters
// ==========================================
const fetchCachedBeyondChapters = unstable_cache(
  async (): Promise<CmsBeyondChapter[]> => {
    const list = await readKey<CmsBeyondChapter[]>('beyondChapters', { throwOnError: true });
    return (list || [])
      .filter((c) => c.isPublished !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
  ['cms', 'beyondChapters'],
  { tags: ['cms:beyondChapters'], revalidate: 3600 }
);

export async function getPublicBeyondChapters(): Promise<CmsBeyondChapter[]> {
  try {
    return await fetchCachedBeyondChapters();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for beyondChapters:', err);
    const seed = getSeedForKey('beyondChapters') as CmsBeyondChapter[];
    return (seed || [])
      .filter((c) => c.isPublished !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
}

// ==========================================
// 14. Leave a Mark Singleton
// ==========================================
const fetchCachedLeaveAMark = unstable_cache(
  async (): Promise<LeaveAMarkData> => {
    const data = await readKey<LeaveAMarkData>('leaveAMark', { throwOnError: true });
    return data;
  },
  ['cms', 'leaveAMark'],
  { tags: ['cms:leaveAMark'], revalidate: 3600 }
);

export async function getPublicLeaveAMark(): Promise<LeaveAMarkData> {
  try {
    return await fetchCachedLeaveAMark();
  } catch (err) {
    console.warn('[content] Mongo unreachable, returning static fallback for leaveAMark:', err);
    return getSeedForKey('leaveAMark') as LeaveAMarkData;
  }
}
