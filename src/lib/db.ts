import fs from 'fs';
import path from 'path';
import {
  CMSDataStore,
  ExtendedBlogPost,
  ExtendedGalleryPhoto,
  ExtendedTestimonial,
  ExtendedPackage,
  ExtendedExperience,
  ExtendedServicePillar,
  ContactInquiry,
  HomepageStat,
  WebsiteSettings,
  AdminUser,
  HandwrittenReviewPage,
} from '@/types/cms';
import { BLOG_POSTS } from '@/data/blog';
import { GALLERY_PHOTOS } from '@/data/gallery';
import { TESTIMONIALS } from '@/data/homestays';
import { TRAVEL_PACKAGES } from '@/data/packages';
import { EXPERIENCES } from '@/data/experiences';
import { SERVICE_PILLARS } from '@/data/services';
import { hashPassword } from './auth';

const isVercel = Boolean(process.env.VERCEL);
const DATA_DIR = isVercel ? path.join('/tmp', 'data') : path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'cms-store.json');
const SEED_FILE = path.join(process.cwd(), 'data', 'cms-store.json');

const DEFAULT_STATS: HomepageStat[] = [
  { id: 'stat-1', value: '10+ Years', label: 'Local Field Guidance', sublabel: 'Across Sacred Himalayan Valleys' },
  { id: 'stat-2', value: '1,200+', label: 'Conscious Travelers', sublabel: 'Curated with Heart & Care' },
  { id: 'stat-3', value: '100%', label: 'Direct Community Benefit', sublabel: 'To Village Hosts, Kitchens & Porters' },
  { id: 'stat-4', value: '4.9 / 5', label: 'Traveler Satisfaction', sublabel: 'Direct Host Testimonials' },
];

// Default initial website settings
const DEFAULT_SETTINGS: WebsiteSettings = {
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
    description: 'Welcome to Explore With Sakar — where travel becomes more than a journey. It is a heartfelt opportunity to experience the true soul of Nepal.',
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
  stats: DEFAULT_STATS,
  announcement: {
    isActive: true,
    badgeText: 'AUTUMN & SPRING TRAVEL CONSULTATIONS OPEN',
    text: 'Sakar • Responsible Tour Director',
    authorTitle: 'Sakar • Tour Director',
    ctaText: 'WhatsApp Sakar Direct',
    ctaLink: 'https://wa.me/9779840482692?text=Namaste%20Sakar,%20I%20am%20interested%20in%20planning%20an%20authentic%20Nepal%20journey',
  },
  footer: {
    headline: "Would you like to create a similar travel story in Nepal with Sakar?",
    subheadline: '',
    brandDescription: 'Meaningful Nepal travel experiences beyond ordinary tourism. We curate intimate human connections, village homestays, living Buddhist & Hindu heritage, and responsible slow travel.',
    copyrightText: '© Explore With Sakar. Designed for the conscious traveler.',
  },
};

function getInitialStore(): CMSDataStore {
  const initialAdminPassword = process.env.ADMIN_PASSWORD || 'sakar@admin2026';
  const initialAdminUsername = process.env.ADMIN_USERNAME || 'admin';
  const { hash, salt } = hashPassword(initialAdminPassword);

  const initialAdmin: AdminUser = {
    username: initialAdminUsername,
    passwordHash: hash,
    salt,
    updatedAt: new Date().toISOString(),
  };

  // Convert static packages to ExtendedPackage
  const initialPackages: ExtendedPackage[] = TRAVEL_PACKAGES.map((pkg, index) => ({
    id: `pkg-${index + 1}-${pkg.slug}`,
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

  // Convert static experiences to ExtendedExperience
  const initialExperiences: ExtendedExperience[] = EXPERIENCES.map((exp, index) => ({
    id: `exp-${index + 1}-${exp.slug}`,
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

  // Convert static service pillars to ExtendedServicePillar
  const initialServices: ExtendedServicePillar[] = SERVICE_PILLARS.map((srv, index) => ({
    ...srv,
    status: 'published',
    order: index,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  // Convert static blog posts to ExtendedBlogPost
  const initialBlogs: ExtendedBlogPost[] = BLOG_POSTS.map((post, index) => ({
    ...post,
    id: `blog-${index + 1}-${post.slug}`,
    status: post.isDraftSample ? 'draft' : 'published',
    createdAt: new Date(post.publishedAt || Date.now()).toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  // Convert static gallery photos to ExtendedGalleryPhoto
  const initialPhotos: ExtendedGalleryPhoto[] = GALLERY_PHOTOS.map((photo, index) => ({
    ...photo,
    order: index,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  // Convert static testimonials to ExtendedTestimonial
  const initialReviews: ExtendedTestimonial[] = TESTIMONIALS.map((t, index) => ({
    ...t,
    travelerName: t.author,
    travelerCountry: t.country,
    rating: 5,
    status: 'approved',
    isVisible: true,
    order: index,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  // Initial 20 handwritten journal pages
  const initialHandwrittenReviews: HandwrittenReviewPage[] = Array.from({ length: 20 }, (_, index) => ({
    id: `hw-${index + 1}`,
    guestName: index === 0 ? 'Elena & Marcus Weber' : index === 1 ? 'Dr. Alistair Campbell' : index === 2 ? 'Sarah Lin & David Chen' : `International Traveler #${index + 1}`,
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

  return {
    admin: initialAdmin,
    packages: initialPackages,
    experiences: initialExperiences,
    services: initialServices,
    inquiries: [],
    blogs: initialBlogs,
    photos: initialPhotos,
    reviews: initialReviews,
    handwrittenReviews: initialHandwrittenReviews,
    settings: DEFAULT_SETTINGS,
    version: 4,
    lastUpdated: new Date().toISOString(),
  };
}

// In-memory cache for fast reads
let memoryCache: CMSDataStore | null = null;

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function sanitizeAndMigrateStore(data: CMSDataStore): CMSDataStore {
  const initial = getInitialStore();

  // Safety verification & backward-compatible migrations for packages
  if (!data.packages || !Array.isArray(data.packages) || data.packages.length === 0) {
    data.packages = initial.packages;
  } else {
    data.packages = data.packages.map((pkg: any, idx: number) => ({
      id: pkg.id || `pkg-${idx + 1}-${pkg.slug || 'package'}`,
      name: pkg.name || pkg.title || 'Curated Nepal Package',
      slug: pkg.slug || `package-${idx + 1}`,
      summary: pkg.summary || pkg.overview || '',
      price: pkg.price !== undefined ? Number(pkg.price) : undefined,
      currency: pkg.currency || 'USD',
      priceNote: pkg.priceNote || 'per person / private group',
      duration: pkg.duration || '7 Days',
      highlights: Array.isArray(pkg.highlights) ? pkg.highlights : [],
      inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions : [],
      exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions : [],
      accommodationStyle: pkg.accommodationStyle || 'Boutique Heritage Lodgings',
      heroImage: pkg.heroImage || pkg.image || {
        src: '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
        alt: pkg.name || pkg.title || 'Package hero',
      },
      gallery: Array.isArray(pkg.gallery) ? pkg.gallery : [],
      featured: Boolean(pkg.featured),
      status: pkg.status === 'draft' ? 'draft' : 'published',
      createdAt: pkg.createdAt || new Date(2025, 0, 1 + idx).toISOString(),
      updatedAt: pkg.updatedAt || new Date().toISOString(),
    }));
  }

  if (!data.experiences || !Array.isArray(data.experiences) || data.experiences.length === 0) {
    data.experiences = initial.experiences;
  }
  if (!data.services || !Array.isArray(data.services) || data.services.length === 0) {
    data.services = initial.services;
  }
  if (!data.inquiries || !Array.isArray(data.inquiries)) {
    data.inquiries = [];
  }
  if (!data.blogs || !Array.isArray(data.blogs) || data.blogs.length === 0) {
    data.blogs = initial.blogs;
  }
  if (!data.photos || !Array.isArray(data.photos) || data.photos.length === 0) {
    data.photos = initial.photos;
  }
  if (!data.reviews || !Array.isArray(data.reviews) || data.reviews.length === 0) {
    data.reviews = initial.reviews;
  }
  if (!data.handwrittenReviews || !Array.isArray(data.handwrittenReviews) || data.handwrittenReviews.length === 0) {
    data.handwrittenReviews = initial.handwrittenReviews;
  }
  if (!data.settings) {
    data.settings = DEFAULT_SETTINGS;
  } else if (!data.settings.stats || !Array.isArray(data.settings.stats) || data.settings.stats.length === 0) {
    data.settings.stats = DEFAULT_STATS;
  }
  if (!data.admin) {
    data.admin = initial.admin;
  }

  return data;
}

export function readStore(): CMSDataStore {
  if (memoryCache) {
    return memoryCache;
  }

  ensureDataDir();

  let seedStore: CMSDataStore | null = null;
  if (fs.existsSync(SEED_FILE)) {
    try {
      seedStore = JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8'));
    } catch (e) {
      console.error('Error reading seed store:', e);
    }
  }

  if (!fs.existsSync(DB_FILE)) {
    if (seedStore) {
      const sanitized = sanitizeAndMigrateStore(seedStore);
      fs.writeFileSync(DB_FILE, JSON.stringify(sanitized, null, 2), 'utf-8');
      memoryCache = sanitized;
      return sanitized;
    }

    const initial = getInitialStore();
    writeStore(initial);
    return initial;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const data = JSON.parse(raw) as CMSDataStore;

    // Merge any items from SEED_FILE that were added to repository
    if (seedStore) {
      if (Array.isArray(seedStore.blogs)) {
        if (!data.blogs) data.blogs = [];
        const existingSlugs = new Set(data.blogs.map((b) => b.slug));
        for (const sb of seedStore.blogs) {
          if (!existingSlugs.has(sb.slug)) {
            data.blogs.push(sb);
          }
        }
      }
      if (Array.isArray(seedStore.experiences)) {
        if (!data.experiences) data.experiences = [];
        const existingSlugs = new Set(data.experiences.map((e) => e.slug));
        for (const se of seedStore.experiences) {
          if (!existingSlugs.has(se.slug)) {
            data.experiences.push(se);
          }
        }
      }
      if (Array.isArray(seedStore.services)) {
        if (!data.services) data.services = [];
        const existingSlugs = new Set(data.services.map((s) => s.slug));
        for (const ss of seedStore.services) {
          if (!existingSlugs.has(ss.slug)) {
            data.services.push(ss);
          }
        }
      }
    }

    const sanitized = sanitizeAndMigrateStore(data);
    memoryCache = sanitized;
    return sanitized;
  } catch (error) {
    console.error('Error reading CMS database file, initializing with defaults:', error);
    const initial = getInitialStore();
    writeStore(initial);
    return initial;
  }
}

export function writeStore(store: CMSDataStore): void {
  store.lastUpdated = new Date().toISOString();
  memoryCache = store;

  try {
    ensureDataDir();
    // Atomic write via temp file
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(store, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Failed to write store to disk, keeping in memory cache:', err);
  }
}

// ==================== PACKAGES OPERATIONS ====================

export function getAllPackages(includeDrafts = true): ExtendedPackage[] {
  const store = readStore();
  let packages = store.packages;
  if (!packages || !Array.isArray(packages) || packages.length === 0) {
    packages = getInitialStore().packages;
    store.packages = packages;
    writeStore(store);
  }
  if (!includeDrafts) {
    packages = packages.filter((p) => p.status === 'published');
  }
  return [...packages].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export function getPackageBySlug(slug: string, includeDrafts = true): ExtendedPackage | null {
  const packages = getAllPackages(includeDrafts);
  return packages.find((p) => p.slug === slug || p.id === slug) || null;
}

export function createPackage(pkgData: Omit<ExtendedPackage, 'id' | 'createdAt' | 'updatedAt'>): ExtendedPackage {
  const store = readStore();
  const newPkg: ExtendedPackage = {
    ...pkgData,
    id: `pkg-${Date.now()}-${pkgData.slug || 'package'}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.packages = [newPkg, ...(store.packages || [])];
  writeStore(store);
  return newPkg;
}

export function updatePackage(id: string, updates: Partial<ExtendedPackage>): ExtendedPackage | null {
  const store = readStore();
  const index = (store.packages || []).findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return null;

  const updated: ExtendedPackage = {
    ...store.packages[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  store.packages[index] = updated;
  writeStore(store);
  return updated;
}

export function deletePackage(id: string): boolean {
  const store = readStore();
  const initialLen = (store.packages || []).length;
  store.packages = (store.packages || []).filter((p) => p.id !== id && p.slug !== id);
  if (store.packages.length !== initialLen) {
    writeStore(store);
    return true;
  }
  return false;
}

// ==================== EXPERIENCES OPERATIONS ====================

export function getAllExperiences(includeDrafts = true): ExtendedExperience[] {
  const store = readStore();
  let experiences = store.experiences || [];
  if (!includeDrafts) {
    experiences = experiences.filter((e) => e.status === 'published');
  }
  return experiences.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getExperienceBySlug(slug: string, includeDrafts = true): ExtendedExperience | null {
  const experiences = getAllExperiences(includeDrafts);
  return experiences.find((e) => e.slug === slug || e.id === slug) || null;
}

export function createExperience(expData: Omit<ExtendedExperience, 'id' | 'createdAt' | 'updatedAt'>): ExtendedExperience {
  const store = readStore();
  const newExp: ExtendedExperience = {
    ...expData,
    id: `exp-${Date.now()}-${expData.slug || 'experience'}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.experiences = [newExp, ...(store.experiences || [])];
  writeStore(store);
  return newExp;
}

export function updateExperience(id: string, updates: Partial<ExtendedExperience>): ExtendedExperience | null {
  const store = readStore();
  const index = (store.experiences || []).findIndex((e) => e.id === id || e.slug === id);
  if (index === -1) return null;

  const updated: ExtendedExperience = {
    ...store.experiences[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  store.experiences[index] = updated;
  writeStore(store);
  return updated;
}

export function deleteExperience(id: string): boolean {
  const store = readStore();
  const initialLen = (store.experiences || []).length;
  store.experiences = (store.experiences || []).filter((e) => e.id !== id && e.slug !== id);
  if (store.experiences.length !== initialLen) {
    writeStore(store);
    return true;
  }
  return false;
}

// ==================== BLOG OPERATIONS ====================

export function getAllBlogs(includeDrafts = true): ExtendedBlogPost[] {
  const store = readStore();
  let blogs = store.blogs || [];
  if (!includeDrafts) {
    blogs = blogs.filter((b) => b.status === 'published');
  }
  return blogs.sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
}

export function getBlogBySlug(slug: string, includeDrafts = true): ExtendedBlogPost | null {
  const blogs = getAllBlogs(includeDrafts);
  return blogs.find((b) => b.slug === slug || b.id === slug) || null;
}

export function createBlog(blogData: Omit<ExtendedBlogPost, 'id' | 'createdAt' | 'updatedAt'>): ExtendedBlogPost {
  const store = readStore();
  const newBlog: ExtendedBlogPost = {
    ...blogData,
    id: `blog-${Date.now()}-${blogData.slug}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.blogs = [newBlog, ...(store.blogs || [])];
  writeStore(store);
  return newBlog;
}

export function updateBlog(id: string, updates: Partial<ExtendedBlogPost>): ExtendedBlogPost | null {
  const store = readStore();
  const index = (store.blogs || []).findIndex((b) => b.id === id || b.slug === id);
  if (index === -1) return null;

  const updated: ExtendedBlogPost = {
    ...store.blogs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  store.blogs[index] = updated;
  writeStore(store);
  return updated;
}

export function deleteBlog(id: string): boolean {
  const store = readStore();
  const initialLen = (store.blogs || []).length;
  store.blogs = (store.blogs || []).filter((b) => b.id !== id && b.slug !== id);
  if (store.blogs.length !== initialLen) {
    writeStore(store);
    return true;
  }
  return false;
}

// ==================== GALLERY OPERATIONS ====================

export function getAllPhotos(): ExtendedGalleryPhoto[] {
  const store = readStore();
  return (store.photos || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function createPhoto(photoData: Omit<ExtendedGalleryPhoto, 'id' | 'createdAt' | 'updatedAt' | 'order'>): ExtendedGalleryPhoto {
  const store = readStore();
  const order = (store.photos || []).length;
  const newPhoto: ExtendedGalleryPhoto = {
    ...photoData,
    id: `photo-${Date.now()}`,
    order,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.photos = [...(store.photos || []), newPhoto];
  writeStore(store);
  return newPhoto;
}

export function updatePhoto(id: string, updates: Partial<ExtendedGalleryPhoto>): ExtendedGalleryPhoto | null {
  const store = readStore();
  const index = (store.photos || []).findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: ExtendedGalleryPhoto = {
    ...store.photos[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  store.photos[index] = updated;
  writeStore(store);
  return updated;
}

export function deletePhoto(id: string): boolean {
  const store = readStore();
  const initialLen = (store.photos || []).length;
  store.photos = (store.photos || []).filter((p) => p.id !== id);
  if (store.photos.length !== initialLen) {
    writeStore(store);
    return true;
  }
  return false;
}

export function reorderPhotos(photoIds: string[]): boolean {
  const store = readStore();
  const photoMap = new Map((store.photos || []).map((p) => [p.id, p]));

  const reordered: ExtendedGalleryPhoto[] = [];
  photoIds.forEach((id, index) => {
    const photo = photoMap.get(id);
    if (photo) {
      photo.order = index;
      photo.updatedAt = new Date().toISOString();
      reordered.push(photo);
    }
  });

  store.photos = reordered;
  writeStore(store);
  return true;
}

// ==================== REVIEWS / TESTIMONIALS ====================

export function getAllReviews(onlyApproved = false): ExtendedTestimonial[] {
  const store = readStore();
  let reviews = store.reviews || [];
  if (onlyApproved) {
    reviews = reviews.filter((r) => r.status === 'approved' && r.isVisible !== false);
  }
  return reviews.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function createReview(reviewData: Omit<ExtendedTestimonial, 'id' | 'createdAt' | 'updatedAt' | 'order'>): ExtendedTestimonial {
  const store = readStore();
  const order = (store.reviews || []).length;
  const newReview: ExtendedTestimonial = {
    ...reviewData,
    id: `review-${Date.now()}`,
    order,
    status: reviewData.status || 'approved',
    isVisible: reviewData.isVisible !== undefined ? reviewData.isVisible : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.reviews = [...(store.reviews || []), newReview];
  writeStore(store);
  return newReview;
}

export function updateReview(id: string, updates: Partial<ExtendedTestimonial>): ExtendedTestimonial | null {
  const store = readStore();
  const index = (store.reviews || []).findIndex((r) => r.id === id);
  if (index === -1) return null;

  const updated: ExtendedTestimonial = {
    ...store.reviews[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  store.reviews[index] = updated;
  writeStore(store);
  return updated;
}

export function deleteReview(id: string): boolean {
  const store = readStore();
  const initialLen = (store.reviews || []).length;
  store.reviews = (store.reviews || []).filter((r) => r.id !== id);
  if (store.reviews.length !== initialLen) {
    writeStore(store);
    return true;
  }
  return false;
}

// ==================== HANDWRITTEN REVIEWS OPERATIONS ====================

export function getAllHandwrittenReviews(includeHidden = false): HandwrittenReviewPage[] {
  const store = readStore();
  let pages = store.handwrittenReviews || [];
  if (!includeHidden) {
    pages = pages.filter((p) => p.isVisible !== false);
  }
  return [...pages].sort((a, b) => a.order - b.order);
}

export function getHandwrittenReviewById(id: string): HandwrittenReviewPage | null {
  const store = readStore();
  return (store.handwrittenReviews || []).find((p) => p.id === id) || null;
}

export function createHandwrittenReview(data: Partial<HandwrittenReviewPage>): HandwrittenReviewPage {
  const store = readStore();
  const existing = store.handwrittenReviews || [];
  const newPage: HandwrittenReviewPage = {
    id: `hw-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    guestName: data.guestName?.trim() || 'Anonymous Guest',
    country: data.country?.trim() || '',
    date: data.date?.trim() || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    image: data.image || '/images/reviews/review-1.jpg',
    pageNumber: data.pageNumber || existing.length + 1,
    note: data.note?.trim() || '',
    isVisible: data.isVisible !== false,
    order: data.order || existing.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.handwrittenReviews = [...existing, newPage];
  writeStore(store);
  return newPage;
}

export function updateHandwrittenReview(id: string, updates: Partial<HandwrittenReviewPage>): HandwrittenReviewPage | null {
  const store = readStore();
  const list = [...(store.handwrittenReviews || [])];
  const index = list.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: HandwrittenReviewPage = {
    ...list[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  list[index] = updated;
  store.handwrittenReviews = list;
  writeStore(store);
  return updated;
}

export function deleteHandwrittenReview(id: string): boolean {
  const store = readStore();
  const list = store.handwrittenReviews || [];
  const initialLen = list.length;
  store.handwrittenReviews = list.filter((p) => p.id !== id);
  if (store.handwrittenReviews.length !== initialLen) {
    writeStore(store);
    return true;
  }
  return false;
}

// ==================== WEBSITE SETTINGS ====================

export function getSettings(): WebsiteSettings {
  const store = readStore();
  return store.settings || DEFAULT_SETTINGS;
}

export function updateSettings(updates: Partial<WebsiteSettings>): WebsiteSettings {
  const store = readStore();
  store.settings = {
    ...store.settings,
    ...updates,
    contact: { ...store.settings.contact, ...(updates.contact || {}) },
    social: { ...store.settings.social, ...(updates.social || {}) },
    branding: { ...store.settings.branding, ...(updates.branding || {}) },
    hero: { ...store.settings.hero, ...(updates.hero || {}) },
    stats: updates.stats || store.settings.stats,
    announcement: { ...store.settings.announcement, ...(updates.announcement || {}) },
    footer: { ...store.settings.footer, ...(updates.footer || {}) },
  };

  writeStore(store);
  return store.settings;
}

// ==================== SERVICES OPERATIONS ====================

export function getAllServices(includeDrafts = true): ExtendedServicePillar[] {
  const store = readStore();
  let services = store.services || [];
  if (!includeDrafts) {
    services = services.filter((s) => s.status === 'published');
  }
  return services.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getServiceBySlug(slug: string, includeDrafts = true): ExtendedServicePillar | null {
  const services = getAllServices(includeDrafts);
  return services.find((s) => s.slug === slug || s.id === slug) || null;
}

export function createService(serviceData: Omit<ExtendedServicePillar, 'id' | 'createdAt' | 'updatedAt' | 'order'>): ExtendedServicePillar {
  const store = readStore();
  const order = (store.services || []).length;
  const newService: ExtendedServicePillar = {
    ...serviceData,
    id: `service-${Date.now()}-${serviceData.slug || 'item'}`,
    order,
    status: serviceData.status || 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.services = [...(store.services || []), newService];
  writeStore(store);
  return newService;
}

export function updateService(id: string, updates: Partial<ExtendedServicePillar>): ExtendedServicePillar | null {
  const store = readStore();
  const services = store.services || [];
  const index = services.findIndex((s) => s.id === id || s.slug === id);
  if (index === -1) return null;

  const updated: ExtendedServicePillar = {
    ...services[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  store.services[index] = updated;
  writeStore(store);
  return updated;
}

export function deleteService(id: string): boolean {
  const store = readStore();
  const initialLen = (store.services || []).length;
  store.services = (store.services || []).filter((s) => s.id !== id && s.slug !== id);
  if (store.services.length !== initialLen) {
    writeStore(store);
    return true;
  }
  return false;
}

export function reorderServices(serviceIds: string[]): boolean {
  const store = readStore();
  const serviceMap = new Map((store.services || []).map((s) => [s.id, s]));

  const reordered: ExtendedServicePillar[] = [];
  serviceIds.forEach((id, index) => {
    const srv = serviceMap.get(id);
    if (srv) {
      srv.order = index;
      srv.updatedAt = new Date().toISOString();
      reordered.push(srv);
    }
  });

  store.services = reordered;
  writeStore(store);
  return true;
}

// ==================== INQUIRIES / SUBMISSIONS ====================

export function getAllInquiries(): ContactInquiry[] {
  const store = readStore();
  return (store.inquiries || []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getInquiryById(id: string): ContactInquiry | null {
  const inquiries = getAllInquiries();
  return inquiries.find((i) => i.id === id) || null;
}

export function createInquiry(
  inquiryData: Omit<ContactInquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): ContactInquiry {
  const store = readStore();
  const newInquiry: ContactInquiry = {
    ...inquiryData,
    id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: 'unread',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.inquiries = [newInquiry, ...(store.inquiries || [])];
  writeStore(store);
  return newInquiry;
}

export function updateInquiry(id: string, updates: Partial<ContactInquiry>): ContactInquiry | null {
  const store = readStore();
  const inquiries = store.inquiries || [];
  const index = inquiries.findIndex((i) => i.id === id);
  if (index === -1) return null;

  const updated: ContactInquiry = {
    ...inquiries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  store.inquiries[index] = updated;
  writeStore(store);
  return updated;
}

export function deleteInquiry(id: string): boolean {
  const store = readStore();
  const initialLen = (store.inquiries || []).length;
  store.inquiries = (store.inquiries || []).filter((i) => i.id !== id);
  if (store.inquiries.length !== initialLen) {
    writeStore(store);
    return true;
  }
  return false;
}

// ==================== ADMIN AUTHENTICATION ====================

export function getAdminUser(): AdminUser {
  const store = readStore();
  return store.admin;
}

export function updateAdminPassword(passwordHash: string, salt: string): void {
  const store = readStore();
  store.admin.passwordHash = passwordHash;
  store.admin.salt = salt;
  store.admin.updatedAt = new Date().toISOString();
  writeStore(store);
}
