import { BlogPost, GalleryPhoto, Testimonial, ImageAsset, BlogCategory, BlogBlock } from './index';
import { PackageItem } from '@/data/packages';

export interface AdminUser {
  username: string;
  passwordHash: string;
  salt: string;
  updatedAt: string;
}

export interface ExtendedPackage {
  id: string;
  name: string;
  slug: string;
  summary: string;
  price?: number;
  currency: string;
  priceNote?: string;
  duration: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  accommodationStyle: string;
  heroImage: ImageAsset;
  gallery: ImageAsset[];
  relatedExperience?: string;
  featured: boolean;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  image?: string;
}

export interface ExtendedExperience {
  id: string;
  title: string;
  slug: string;
  category: 'heritage' | 'spiritual' | 'homestay' | 'adventure' | 'responsible';
  categoryLabel: string;
  duration: string;
  difficulty?: 'Gentle' | 'Moderate' | 'Challenging' | 'Custom';
  location: string;
  elevation?: string;
  groupSize: string;
  season: string;
  featured: boolean;
  heroImage: ImageAsset;
  gallery: ImageAsset[];
  shortDescription: string;
  fullDescription: string[];
  highlights: string[];
  inclusions: string[];
  exclusions?: string[];
  days: ItineraryDay[];
  sakarNote?: string;
  impactFootprint?: string;
  relatedDestination?: string;
  relatedPackage?: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface ExtendedBlogPost extends Omit<BlogPost, 'content'> {
  id: string;
  status: 'published' | 'draft';
  content: BlogBlock[];
  createdAt: string;
  updatedAt: string;
}

export interface ExtendedGalleryPhoto extends GalleryPhoto {
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExtendedTestimonial {
  id: string;
  author: string;
  travelerName?: string;
  country: string;
  travelerCountry?: string;
  countryFlag?: string;
  journey: string;
  relatedTrip?: string;
  date: string;
  quote: string;
  highlight?: string;
  rating: number; // 1-5 stars
  photo?: string;
  avatar?: string;
  status: 'approved' | 'pending';
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface HandwrittenReviewPage {
  id: string;
  guestName: string;
  country?: string;
  date?: string;
  image: string; // url to image (e.g. /images/reviews/review-1.jpg or uploaded path)
  pageNumber: number;
  note?: string;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExtendedServicePillar {
  id: string;
  slug: string;
  title: string;
  nepaliTitle: string;
  tagline: string;
  shortDescription: string;
  fullPhilosophy: string[];
  heroImage: {
    src: string;
    alt: string;
  };
  keyFeatures: {
    title: string;
    description: string;
  }[];
  quote: string;
  quoteAuthor: string;
  badge: string;
  relatedSlug: string;
  status: 'published' | 'draft';
  order: number;
  createdAt: string;
  updatedAt: string;

  // Convenience & compatibility aliases
  image?: string;
  description?: string;
  subtitle?: string;
  category?: string;
  features?: string[];
  published?: boolean;
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  whatsapp?: string;
  country?: string;
  travelDates?: string;
  approximateDuration?: string;
  travelersCount?: string;
  travelStyle?: string;
  preferredInterests?: string[];
  homestayInterest?: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageStat {
  id: string;
  value: string;
  label: string;
  sublabel?: string;
}

export interface WebsiteSettings {
  contact: {
    phoneNumber: string;
    phoneDisplay: string;
    whatsappNumber: string;
    whatsappDefaultMessage: string;
    email: string;
    address: string;
    addressDetails: string;
    businessHours: string;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    tripadvisor: string;
    twitter: string;
  };
  branding: {
    logoUrl: string;
    siteName: string;
    tagline: string;
  };
  hero: {
    badgeText: string;
    headlinePart1: string;
    headlineHighlight1: string;
    headlinePart2: string;
    headlineHighlight2: string;
    description: string;
    descriptionColor?: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    cutoutImage: string;
    backgroundSlideshowImages: string[];
  };
  stats?: HomepageStat[];
  announcement: {
    isActive: boolean;
    badgeText: string;
    text: string;
    authorTitle: string;
    ctaText: string;
    ctaLink: string;
  };
  footer: {
    headline: string;
    subheadline: string;
    brandDescription: string;
    copyrightText: string;
  };
}

// ==================== PAGE CONTENT MANAGEMENT ====================

export interface PageSeo {
  title?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
  sitemapVisible?: boolean;
}

export interface PageSection {
  id: string;
  type: string;           // e.g. 'hero', 'stats', 'services', 'meet-sakar', 'blog-teaser', 'inquiry-form', etc.
  label: string;           // Display name in admin
  visible: boolean;
  order: number;
  content: Record<string, any>; // Section-specific content fields
}

export interface PageContent {
  slug: string;            // e.g. 'home', 'about', 'services', 'contact'
  name: string;            // Display name e.g. 'Homepage', 'About Sakar'
  url: string;             // Public URL e.g. '/', '/about'
  status: 'published' | 'draft';
  sections: PageSection[];
  seo: PageSeo;
  publishedAt?: string;
  lastEditedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageRevision {
  id: string;
  pageSlug: string;
  version: number;
  sections: PageSection[];
  seo: PageSeo;
  editedBy: string;
  status: 'published' | 'draft';
  createdAt: string;
}

// ==================== EVENTS ====================

export interface CmsEvent {
  id: string;
  title: string;
  nepaliName: string;
  category: 'festival' | 'spiritual' | 'community';
  categoryLabel: string;
  date: string;
  location: string;
  season: string;
  image: string;
  shortDesc: string;
  highlights: string[];
  sakarNote: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==================== DESTINATIONS ====================

export interface CmsDestination {
  id: string;
  name: string;
  slug: string;
  nepaliName: string;
  tagline: string;
  elevation: string;
  description: string;
  image: { src: string; alt: string };
  highlights: string[];
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==================== FAQ ====================

export interface CmsFaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==================== NAVIGATION ====================

export interface NavigationLink {
  id: string;
  label: string;
  url: string;
  openInNewTab?: boolean;
  visible: boolean;
  order: number;
  children?: NavigationLink[];
}

export interface NavigationConfig {
  header: NavigationLink[];
  footer: {
    columns: {
      id: string;
      title: string;
      links: NavigationLink[];
    }[];
  };
  updatedAt: string;
}

// ==================== EXTENDED DATA STORE ====================

export interface CMSDataStore {
  admin: AdminUser;
  packages: ExtendedPackage[];
  experiences: ExtendedExperience[];
  services: ExtendedServicePillar[];
  inquiries: ContactInquiry[];
  blogs: ExtendedBlogPost[];
  photos: ExtendedGalleryPhoto[];
  reviews: ExtendedTestimonial[];
  handwrittenReviews?: HandwrittenReviewPage[];
  pages?: PageContent[];
  pageRevisions?: PageRevision[];
  events?: CmsEvent[];
  destinations?: CmsDestination[];
  faq?: CmsFaqItem[];
  navigation?: NavigationConfig;
  settings: WebsiteSettings;
  version: number;
  lastUpdated: string;
}
