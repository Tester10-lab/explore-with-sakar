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
  settings: WebsiteSettings;
  version: number;
  lastUpdated: string;
}
