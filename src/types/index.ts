export type ExperienceCategory = 
  | 'cultural'
  | 'spiritual'
  | 'homestay'
  | 'adventure'
  | 'heritage'
  | 'responsible'
  | 'beyond-the-map'
  | 'go-spiritual'
  | 'spiritual-wellness'
  | 'go-deeper'
  | 'homestays'
  | 'leave-a-mark'
  | 'all-curated'
  | 'custom-journeys';

export interface ImageAsset {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ExperienceCategory;
  categoryLabel: string;
  duration: string;
  location: string;
  elevation?: string;
  groupSize: string;
  season: string;
  featured: boolean;
  heroImage: ImageAsset;
  galleryImages: ImageAsset[];
  shortDescription: string;
  fullDescription: string[];
  culturalHighlights: string[];
  sakarNote: string;
  itineraryOutline: { day: string; title: string; description: string }[];
  impactFootprint: string;
}

export interface TravelerPersona {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  recommendedSlugs: string[];
  image: ImageAsset;
}

export interface HomestayExperience {
  id: string;
  villageName: string;
  region: string;
  hostFamily: string;
  community: string;
  description: string;
  quote: string;
  image: ImageAsset;
  dailyRhythm: string[];
  foodExperience: string[];
}

export interface Destination {
  id: string;
  name: string;
  nepaliName: string;
  tagline: string;
  elevation: string;
  description: string;
  image: ImageAsset;
  highlights: string[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  nepaliTitle?: string;
  category: 'heritage' | 'spiritual' | 'homestay' | 'mountains' | 'trails';
  categoryLabel: string;
  location: string;
  image: string;
  alt: string;
  orientation: 'portrait' | 'landscape' | 'square';
  caption: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  country: string;
  countryFlag: string;
  journey: string;
  date: string;
  quote: string;
  highlight: string;
  avatar?: string;
}

export type BlogCategory = 
  | "Sakar's Journal"
  | "Spiritual Nepal"
  | "Living Culture"
  | "People & Places"
  | "Travel With Meaning"
  | "Walking Nepal"
  | "Practical Nepal";

export type BlogBlock =
  | {
      type: 'paragraph';
      content: string;
      textColor?: string;
      fontFamily?: 'serif' | 'sans' | 'display' | 'mono';
      fontSize?: 'sm' | 'base' | 'lg' | 'xl';
      fontWeight?: 'light' | 'normal' | 'medium' | 'bold';
    }
  | {
      type: 'heading';
      level: 2 | 3;
      content: string;
      fontFamily?: 'serif' | 'sans' | 'display';
      textColor?: string;
    }
  | { type: 'quote'; content: string; attribution?: string }
  | { type: 'image'; image: ImageAsset; caption?: string; layout?: 'full' | 'standard' }
  | { type: 'twoImages'; left: ImageAsset; right: ImageAsset; caption?: string }
  | { type: 'storyImageText'; image: ImageAsset; text: string; imagePosition?: 'left' | 'right' }
  | { type: 'gallery'; images: ImageAsset[]; caption?: string }
  | { type: 'practicalTips'; title: string; items: { point: string; explanation: string }[] };

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: BlogCategory;
  id?: string;
  status?: 'published' | 'draft';
  createdAt?: string;
  updatedAt?: string;
  fontFamily?: 'serif' | 'sans' | 'display' | 'mono';
  fontSize?: 'sm' | 'base' | 'lg' | 'xl';
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  readingTime: string;
  featuredImage: ImageAsset;
  tags: string[];
  pillar?: string;
  isDraftSample?: boolean;
  content: BlogBlock[];
  contextualCta?: {
    title: string;
    description: string;
    buttonText: string;
    experienceSlug?: string;
  };
  relatedSlugs?: string[];
}

export interface BookingInquiry {
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  travelDates: string;
  approximateDuration: string;
  travelersCount: string;
  travelStyle: string;
  preferredInterests: string[];
  homestayInterest: string;
  message: string;
  interestedEvent?: {
    id: string;
    title: string;
  };
}
