import {
  getAllBlogs,
  getAllBlogsAsync,
  getBlogBySlug,
  getBlogBySlugAsync,
  getAllPhotos,
  getAllReviews,
  getSettings,
  getSettingsAsync,
  getAllPackages,
  getPackageBySlug,
  getAllExperiences,
  getExperienceBySlug,
  getAllServices,
  getServiceBySlug,
  getAllInquiries,
  getInquiryById,
  getAllHandwrittenReviews,
  getHandwrittenReviewById,
  getAllEvents,
  getAllDestinations,
  getAllFaq,
  getNavigation,
  getAllPages,
  getPageBySlug,
} from './db';
import { BLOG_POSTS, getPostBySlug as getStaticPostBySlug, getRelatedPosts as getStaticRelatedPosts } from '@/data/blog';
import { GALLERY_PHOTOS } from '@/data/gallery';
import { TESTIMONIALS } from '@/data/homestays';
import { TRAVEL_PACKAGES } from '@/data/packages';
import { EXPERIENCES } from '@/data/experiences';
import { SERVICE_PILLARS } from '@/data/services';
import { EVENTS_DATA } from '@/data/events';
import { DESTINATIONS } from '@/data/destinations';
import { FAQ_ITEMS } from '@/data/faq';
import { DEFAULT_PUBLIC_PAGES } from '@/data/pages';
export { DEFAULT_PUBLIC_PAGES };
import { BlogPost, GalleryPhoto, Testimonial } from '@/types';
import {
  ExtendedBlogPost,
  ExtendedGalleryPhoto,
  ExtendedTestimonial,
  ExtendedPackage,
  ExtendedExperience,
  ExtendedServicePillar,
  ContactInquiry,
  WebsiteSettings,
  HandwrittenReviewPage,
  CmsEvent,
  CmsDestination,
  CmsFaqItem,
  NavigationConfig,
  PageContent,
  PageSection,
} from '@/types/cms';

/**
 * Fetch all published packages with fallback. Empty collection stays empty.
 */
export async function getLivePackages(includeDrafts = false): Promise<ExtendedPackage[]> {
  try {
    const packages = await getAllPackages(includeDrafts);
    if (Array.isArray(packages)) {
      return packages;
    }
  } catch (err) {
    console.warn('Fallback to static packages due to CMS store read error:', err);
  }

  return TRAVEL_PACKAGES.map((pkg, i) => ({
    id: `pkg-${i + 1}-${pkg.slug}`,
    name: pkg.title,
    slug: pkg.slug,
    summary: pkg.overview,
    currency: 'USD',
    duration: pkg.duration,
    highlights: pkg.highlights,
    inclusions: pkg.inclusions,
    exclusions: pkg.exclusions,
    accommodationStyle: pkg.accommodationStyle,
    heroImage: { src: pkg.image.src, alt: pkg.image.alt },
    gallery: [{ src: pkg.image.src, alt: pkg.image.alt }],
    featured: pkg.featured,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

/**
 * Fetch single package by slug with fallback
 */
export async function getLivePackageBySlug(slug: string, includeDrafts = false): Promise<ExtendedPackage | null> {
  try {
    const pkg = await getPackageBySlug(slug, includeDrafts);
    if (pkg) return pkg;
  } catch (err) {
    console.warn('Fallback to static package by slug due to CMS error:', err);
  }

  const staticPkg = TRAVEL_PACKAGES.find((p) => p.slug === slug || p.id === slug);
  if (!staticPkg) return null;

  return {
    id: `pkg-static-${staticPkg.slug}`,
    name: staticPkg.title,
    slug: staticPkg.slug,
    summary: staticPkg.overview,
    currency: 'USD',
    duration: staticPkg.duration,
    highlights: staticPkg.highlights,
    inclusions: staticPkg.inclusions,
    exclusions: staticPkg.exclusions,
    accommodationStyle: staticPkg.accommodationStyle,
    heroImage: { src: staticPkg.image.src, alt: staticPkg.image.alt },
    gallery: [{ src: staticPkg.image.src, alt: staticPkg.image.alt }],
    featured: staticPkg.featured,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Fetch all published experiences/itineraries with fallback. Empty collection stays empty.
 */
export async function getLiveExperiences(includeDrafts = false): Promise<ExtendedExperience[]> {
  try {
    const experiences = await getAllExperiences(includeDrafts);
    if (Array.isArray(experiences)) {
      return experiences;
    }
  } catch (err) {
    console.warn('Fallback to static experiences due to CMS store read error:', err);
  }

  return EXPERIENCES.map((exp, i) => ({
    id: `exp-${i + 1}-${exp.slug}`,
    title: exp.title,
    slug: exp.slug,
    category: exp.category as any,
    categoryLabel: exp.categoryLabel,
    duration: exp.duration,
    difficulty: 'Moderate',
    location: exp.location,
    elevation: exp.elevation,
    groupSize: exp.groupSize,
    season: exp.season,
    featured: exp.featured,
    heroImage: exp.heroImage,
    gallery: exp.galleryImages,
    shortDescription: exp.shortDescription,
    fullDescription: exp.fullDescription,
    highlights: exp.culturalHighlights,
    inclusions: [
      'Personal tour directing & local hosting by Sakar',
      'Private vehicle logistics & transfers',
      'Handpicked heritage lodgings & homestays',
      'All official permits and monument entries',
    ],
    days: exp.itineraryOutline.map((day, dIdx) => ({
      dayNumber: dIdx + 1,
      title: day.title,
      description: day.description,
    })),
    sakarNote: exp.sakarNote,
    impactFootprint: exp.impactFootprint,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

/**
 * Fetch a single experience by slug with fallback
 */
export async function getLiveExperienceBySlug(slug: string, includeDrafts = false): Promise<ExtendedExperience | null> {
  try {
    const exp = await getExperienceBySlug(slug, includeDrafts);
    if (exp) return exp;
  } catch (err) {
    console.warn('Fallback to static experience by slug due to CMS error:', err);
  }

  const staticExp = EXPERIENCES.find((e) => e.slug === slug || e.id === slug);
  if (!staticExp) return null;

  return {
    id: `exp-static-${staticExp.slug}`,
    title: staticExp.title,
    slug: staticExp.slug,
    category: staticExp.category as any,
    categoryLabel: staticExp.categoryLabel,
    duration: staticExp.duration,
    difficulty: 'Moderate',
    location: staticExp.location,
    elevation: staticExp.elevation,
    groupSize: staticExp.groupSize,
    season: staticExp.season,
    featured: staticExp.featured,
    heroImage: staticExp.heroImage,
    gallery: staticExp.galleryImages,
    shortDescription: staticExp.shortDescription,
    fullDescription: staticExp.fullDescription,
    highlights: staticExp.culturalHighlights,
    inclusions: [
      'Personal tour directing & local hosting by Sakar',
      'Private vehicle logistics & transfers',
      'Handpicked heritage lodgings & homestays',
      'All official permits and monument entries',
    ],
    days: staticExp.itineraryOutline.map((day, dIdx) => ({
      dayNumber: dIdx + 1,
      title: day.title,
      description: day.description,
    })),
    sakarNote: staticExp.sakarNote,
    impactFootprint: staticExp.impactFootprint,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Fetch top featured experiences (CMS controlled via featuredOrder: 1, 2, 3)
 */
export async function getTopFeaturedExperiences(limit = 3, includeDrafts = false): Promise<ExtendedExperience[]> {
  const all = await getLiveExperiences(includeDrafts);

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

/**
 * Fetch all published blogs with fallback. Empty collection stays empty.
 */
export async function getLiveBlogs(includeDrafts = false): Promise<ExtendedBlogPost[]> {
  try {
    const blogs = await getAllBlogs(includeDrafts);
    if (Array.isArray(blogs)) {
      return blogs;
    }
  } catch (err) {
    console.warn('Fallback to static blogs due to CMS store read error:', err);
  }

  return BLOG_POSTS.map((p, i) => ({
    ...p,
    id: `blog-${i + 1}-${p.slug}`,
    status: p.isDraftSample ? 'draft' : 'published',
    createdAt: new Date(p.publishedAt || Date.now()).toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

/**
 * Fetch a single blog post by slug with fallback
 */
export async function getLiveBlogBySlug(slug: string, includeDrafts = false): Promise<ExtendedBlogPost | null> {
  try {
    const blog = await getBlogBySlug(slug, includeDrafts);
    if (blog) return blog;
  } catch (err) {
    console.warn('Fallback to static blog by slug due to CMS error:', err);
  }

  const staticPost = getStaticPostBySlug(slug);
  if (!staticPost) return null;

  return {
    ...staticPost,
    id: `blog-static-${staticPost.slug}`,
    status: 'published',
    createdAt: new Date(staticPost.publishedAt || Date.now()).toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const getLiveBlogsAsync = getLiveBlogs;
export const getLiveBlogBySlugAsync = getLiveBlogBySlug;

/**
 * Fetch related blog posts
 */
export async function getLiveRelatedBlogs(currentSlug: string, count = 3): Promise<ExtendedBlogPost[]> {
  const all = await getLiveBlogs(false);
  const current = all.find((b) => b.slug === currentSlug);
  if (!current) return all.slice(0, count);

  const related = (current.relatedSlugs || [])
    .map((slug) => all.find((b) => b.slug === slug))
    .filter((b): b is ExtendedBlogPost => Boolean(b && b.slug !== currentSlug));

  if (related.length >= count) return related.slice(0, count);

  const categoryRelated = all.filter(
    (b) => b.slug !== currentSlug && b.category === current.category && !related.some((r) => r.slug === b.slug)
  );

  const combined = [...related, ...categoryRelated];
  if (combined.length >= count) return combined.slice(0, count);

  const fallback = all.filter((b) => b.slug !== currentSlug && !combined.some((c) => c.slug === b.slug));
  return [...combined, ...fallback].slice(0, count);
}

/**
 * Fetch all gallery photos with fallback. Empty collection stays empty.
 */
export async function getLivePhotos(): Promise<ExtendedGalleryPhoto[]> {
  try {
    const photos = await getAllPhotos();
    if (Array.isArray(photos)) {
      return photos;
    }
  } catch (err) {
    console.warn('Fallback to static photos due to CMS error:', err);
  }

  return GALLERY_PHOTOS.map((photo, i) => ({
    ...photo,
    order: i,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

/**
 * Fetch all approved testimonials with fallback. Empty collection stays empty.
 */
export async function getLiveReviews(): Promise<ExtendedTestimonial[]> {
  try {
    const reviews = await getAllReviews(true);
    if (Array.isArray(reviews)) {
      return reviews;
    }
  } catch (err) {
    console.warn('Fallback to static reviews due to CMS error:', err);
  }

  return TESTIMONIALS.map((t, i) => ({
    ...t,
    travelerName: t.author,
    travelerCountry: t.country,
    rating: 5,
    status: 'approved',
    isVisible: true,
    order: i,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

/**
 * Fetch live website settings with fallback
 */
export async function getLiveSettings(): Promise<WebsiteSettings> {
  try {
    const settings = await getSettings();
    if (settings && settings.contact) {
      return settings;
    }
  } catch (err) {
    console.warn('Fallback to static settings due to CMS error:', err);
  }

  return {
    contact: {
      phoneNumber: '+977 984-0482692',
      phoneDisplay: '+977 984-0482692',
      whatsappNumber: '9779840482692',
      whatsappDefaultMessage: 'Namaste Sakar, I am interested in planning an authentic Nepal journey.',
      email: 'Explorewithsakar@gmail.com',
      address: 'Kathmandu, Nepal',
      addressDetails: 'Patan & Thamel Heritage Quarter',
      businessHours: 'Sunday – Saturday: 7:00 AM – 9:00 PM NPT',
    },
    social: {
      instagram: 'https://instagram.com/explorewithsakar',
      facebook: 'https://facebook.com/explorewithsakar',
      youtube: 'https://youtube.com/@explorewithsakar',
      tripadvisor: 'https://tripadvisor.com',
      twitter: 'https://twitter.com/explorewithsakar',
    },
    branding: {
      logoUrl: '/explore-with-sakar/images/logo.png',
      siteName: 'Explore With Sakar',
      tagline: 'Authentic Nepal Travel & Cultural Experiences',
    },
    hero: {
      badgeText: 'A Journey Beyond The Surface',
      headlinePart1: 'Discover Nepal Through',
      headlineHighlight1: 'Culture',
      headlinePart2: ', Spirituality &',
      headlineHighlight2: 'Meaningful',
      description:
        'Welcome to Explore With Sakar — where travel becomes more than a journey. It is a heartfelt opportunity to experience the true soul of Nepal.',
      ctaText: 'Begin The Journey',
      ctaLink: '#experiences',
      cutoutImage: '/explore-with-sakar/images/sakar-nobg.png',
      backgroundSlideshowImages: [
        '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
        '/explore-with-sakar/images/homestays/village-meal.jpg',
        '/explore-with-sakar/images/trails/suspension-bridge.jpg',
        '/explore-with-sakar/images/mountains/alpine-valley.jpg',
      ],
    },
    announcement: {
      isActive: true,
      badgeText: 'AUTUMN & SPRING TRAVEL CONSULTATIONS OPEN',
      text: 'Sakar • Responsible Tour Director',
      authorTitle: 'Sakar • Tour Director',
      ctaText: 'WhatsApp Sakar Direct',
      ctaLink:
        'https://wa.me/9779840482692?text=Namaste%20Sakar,%20I%20am%20interested%20in%20planning%20an%20authentic%20Nepal%20journey',
    },
    footer: {
      headline: 'Would you like to create a similar travel story in Nepal with Sakar?',
      subheadline: '',
      brandDescription:
        'Meaningful Nepal travel experiences beyond ordinary tourism. We curate intimate human connections, village homestays, living Buddhist & Hindu heritage, and responsible slow travel.',
      copyrightText: '© Explore With Sakar. Designed for the conscious traveler.',
    },
  };
}

export const getLiveSettingsAsync = getLiveSettings;

/**
 * Fetch all published service pillars with fallback. Empty collection stays empty.
 */
export async function getLiveServices(includeDrafts = false): Promise<ExtendedServicePillar[]> {
  try {
    const services = await getAllServices(includeDrafts);
    if (Array.isArray(services)) {
      return services;
    }
  } catch (err) {
    console.warn('Fallback to static services due to CMS error:', err);
  }

  return SERVICE_PILLARS.map((srv, i) => ({
    ...srv,
    status: 'published',
    order: i,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

/**
 * Fetch single service pillar by slug with fallback
 */
export async function getLiveServiceBySlug(slug: string, includeDrafts = false): Promise<ExtendedServicePillar | null> {
  try {
    const service = await getServiceBySlug(slug, includeDrafts);
    if (service) return service;
  } catch (err) {
    console.warn('Fallback to static service by slug due to CMS error:', err);
  }

  const staticSrv = SERVICE_PILLARS.find((s) => s.slug === slug || s.id === slug);
  if (!staticSrv) return null;

  return {
    ...staticSrv,
    status: 'published',
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Fetch all inquiries
 */
export async function getLiveInquiries(): Promise<ContactInquiry[]> {
  try {
    return await getAllInquiries();
  } catch (err) {
    console.error('Error reading inquiries:', err);
    return [];
  }
}

/**
 * Fetch single inquiry by id
 */
export async function getLiveInquiryById(id: string): Promise<ContactInquiry | null> {
  try {
    return await getInquiryById(id);
  } catch (err) {
    console.error('Error reading inquiry by id:', err);
    return null;
  }
}

/**
 * Fetch all handwritten guestbook review pages with fallback. Empty collection stays empty.
 */
export async function getLiveHandwrittenReviews(includeHidden = false): Promise<HandwrittenReviewPage[]> {
  try {
    const pages = await getAllHandwrittenReviews(includeHidden);
    if (Array.isArray(pages)) {
      return pages;
    }
  } catch (err) {
    console.error('Error reading handwritten reviews:', err);
  }

  return Array.from({ length: 20 }, (_, index) => ({
    id: `hw-${index + 1}`,
    guestName:
      index === 0
        ? 'Elena & Marcus Weber'
        : index === 1
        ? 'Dr. Alistair Campbell'
        : index === 2
        ? 'Sarah Lin & David Chen'
        : `International Traveler #${index + 1}`,
    country: index === 0 ? 'Switzerland' : index === 1 ? 'United Kingdom' : index === 2 ? 'Canada' : '',
    date: 'Himalayan Journal Entry',
    image: `/images/reviews/review-${index + 1}.jpg`,
    pageNumber: index + 1,
    note: "Authentic handwritten letter preserved from Sakar's physical guestbook.",
    isVisible: true,
    order: index + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

/**
 * Fetch all events with fallback. Empty collection stays empty.
 */
export async function getLiveEvents(includeHidden = false): Promise<CmsEvent[]> {
  try {
    const events = await getAllEvents(includeHidden);
    if (Array.isArray(events)) {
      return events;
    }
  } catch (err) {
    console.warn('Fallback to static events due to CMS error:', err);
  }

  return EVENTS_DATA.map((e, i) => ({
    ...e,
    order: i,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

/**
 * Fetch single event by id with fallback
 */
export async function getLiveEventById(id: string): Promise<CmsEvent | null> {
  const events = await getLiveEvents(true);
  return events.find((e) => e.id === id) || null;
}

/**
 * Fetch all destinations with fallback. Empty collection stays empty.
 */
export async function getLiveDestinations(includeHidden = false): Promise<CmsDestination[]> {
  try {
    const dests = await getAllDestinations(includeHidden);
    if (Array.isArray(dests)) {
      return dests;
    }
  } catch (err) {
    console.warn('Fallback to static destinations due to CMS error:', err);
  }

  return DESTINATIONS.map((d, i) => ({
    ...d,
    slug: d.id,
    order: i,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

/**
 * Fetch all FAQ items with fallback. Empty collection stays empty.
 */
export async function getLiveFaq(includeHidden = false): Promise<CmsFaqItem[]> {
  try {
    const items = await getAllFaq(includeHidden);
    if (Array.isArray(items)) {
      return items;
    }
  } catch (err) {
    console.warn('Fallback to static FAQ items due to CMS error:', err);
  }

  return FAQ_ITEMS.map((f, i) => ({
    id: f.id,
    category: f.category,
    question: f.question,
    answer: f.answer,
    order: i,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

/**
 * Fetch live navigation configuration
 */
export async function getLiveNavigation(): Promise<NavigationConfig> {
  try {
    return await getNavigation();
  } catch (err) {
    console.warn('Fallback to default navigation:', err);
    return await getNavigation();
  }
}

/**
 * Fetch all editable pages with fallback. Empty collection stays empty.
 */
export async function getLiveAllPages(): Promise<PageContent[]> {
  try {
    const pages = await getAllPages();
    if (Array.isArray(pages)) {
      return pages;
    }
  } catch (err) {
    console.warn('Fallback to static pages due to CMS error:', err);
  }

  return DEFAULT_PUBLIC_PAGES;
}

/**
 * Fetch a single editable page content with fallback
 */
export async function getLivePageContent(slug: string): Promise<PageContent> {
  try {
    const page = await getPageBySlug(slug);
    if (page) return page;
  } catch (err) {
    console.warn(`Fallback to static page content for slug: ${slug}`, err);
  }

  const staticPage = DEFAULT_PUBLIC_PAGES.find((p) => p.slug === slug);
  if (staticPage) return staticPage;

  return {
    slug,
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    url: `/${slug}`,
    status: 'draft',
    sections: [],
    seo: {
      title: `${slug.replace(/-/g, ' ')} | Explore With Sakar`,
      metaDescription: 'Explore Nepal with Sakar.',
    },
    lastEditedBy: 'System',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
