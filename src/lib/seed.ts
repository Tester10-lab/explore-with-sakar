import fs from 'fs';
import path from 'path';
import {
  CMSDataStore,
  CmsEvent,
  CmsDestination,
  CmsFaqItem,
  NavigationConfig,
  WebsiteSettings,
  HomepageStat,
  ExtendedBlogPost,
  ExtendedPackage,
  ExtendedExperience,
  ExtendedServicePillar,
  ExtendedGalleryPhoto,
  ExtendedTestimonial,
  HandwrittenReviewPage,
} from '@/types/cms';
import { EVENTS_DATA } from '@/data/events';
import { DESTINATIONS } from '@/data/destinations';
import { FAQ_ITEMS } from '@/data/faq';
import { DEFAULT_PUBLIC_PAGES } from '@/data/pages';
import { BEYOND_EXPERIENCES } from '@/data/beyond-the-map';
import { LEAVE_A_MARK_CONTENT } from '@/data/leave-a-mark';
import { CmsBeyondChapter } from '@/types/cms';
import { BLOG_POSTS } from '@/data/blog';

const SEED_FILE = path.join(process.cwd(), 'data', 'cms-store.json');

export const DEFAULT_STATS: HomepageStat[] = [
  { id: 'stat-1', value: '10+ Years', label: 'Local Field Guidance', sublabel: 'Across Sacred Himalayan Valleys' },
  { id: 'stat-2', value: '1,200+', label: 'Conscious Travelers', sublabel: 'Curated with Heart & Care' },
  { id: 'stat-3', value: '100%', label: 'Direct Community Benefit', sublabel: 'To Village Hosts, Kitchens & Porters' },
  { id: 'stat-4', value: '4.9 / 5', label: 'Traveler Satisfaction', sublabel: 'Direct Host Testimonials' },
];

export const DEFAULT_SETTINGS: WebsiteSettings = {
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

export function getDefaultNavigation(): NavigationConfig {
  return {
    header: [
      {
        id: 'nav-experiences',
        label: 'EXPERIENCES',
        url: '/experiences',
        subtitle: 'Our Curated Travel Experiences',
        columns: 2,
        visible: true,
        order: 0,
        children: [
          {
            id: 'nav-beyond',
            label: 'Go Beyond the Map',
            description: 'Living courtyards, medieval stone mysteries & master artisan guilds.',
            url: '/experiences/beyond-the-map',
            badge: 'Exploration',
            icon: 'compass',
            visible: true,
            order: 0,
          },
          {
            id: 'nav-within',
            label: 'Go Within',
            description: 'Himalayan singing bowl resonance, monastery chanting & meditation caves.',
            url: '/experiences/spiritual-wellness',
            badge: 'Spiritual',
            icon: 'sparkles',
            visible: true,
            order: 1,
          },
          {
            id: 'nav-deeper',
            label: 'Go Deeper',
            description: 'Immersive deep-dive journeys into Nepal\'s hidden layers and living traditions.',
            url: '/experiences/go-deeper',
            badge: 'Immersive',
            icon: 'layers',
            visible: true,
            order: 2,
          },
          {
            id: 'nav-mark',
            label: 'Leave a Mark',
            description: 'Strategic volunteer tourism & administrative empowerment for grassroots communities.',
            url: '/experiences/leave-a-mark',
            badge: 'Strategic',
            icon: 'heart',
            visible: true,
            order: 3,
          },
          {
            id: 'nav-all-exp',
            label: 'All Curated Experiences',
            description: 'Browse complete day-by-day itineraries, departures & cultural routes.',
            url: '/experiences',
            icon: 'calendar',
            visible: true,
            order: 4,
          },
          {
            id: 'nav-custom-exp',
            label: 'Custom Private Journeys',
            description: '100% tailor-made itineraries for solo travelers, couples & families with Sakar.',
            url: '/experiences/custom-journeys',
            badge: 'Bespoke',
            icon: 'shield-check',
            visible: true,
            order: 5,
          },
        ],
      },
      {
        id: 'nav-events',
        label: 'EVENTS',
        url: '/events',
        visible: true,
        order: 1,
      },
      {
        id: 'nav-stories',
        label: 'STORIES',
        subtitle: 'Perspectives & Reflections',
        columns: 1,
        url: '/blog',
        visible: true,
        order: 2,
        children: [
          {
            id: 'nav-journal',
            label: 'Sakar’s Journal & Blogs',
            description: 'Field notes, personal essays, and reflections on slow travel and heritage.',
            url: '/blog',
            badge: 'Essays',
            icon: 'book-open',
            visible: true,
            order: 0,
          },
          {
            id: 'nav-reviews',
            label: 'Traveler Reviews & Guestbook',
            description: 'Read guest reflections and flip through Sakar’s handwritten guestbook.',
            url: '/reviews',
            badge: 'Reviews',
            icon: 'star',
            visible: true,
            order: 1,
          },
        ],
      },
      {
        id: 'nav-about',
        label: 'ABOUT SAKAR',
        url: '/about',
        visible: true,
        order: 3,
      },
    ],
    footer: {
      columns: [
        {
          id: 'footer-experiences',
          title: 'Experiences',
          links: [
            { id: 'fl-1', label: 'Go Beyond the Map', url: '/experiences/beyond-the-map', visible: true, order: 0 },
            { id: 'fl-2', label: 'Go Within', url: '/experiences/spiritual-wellness', visible: true, order: 1 },
            { id: 'fl-3', label: 'Go Deeper', url: '/experiences/go-deeper', visible: true, order: 2 },
            { id: 'fl-4', label: 'Leave a Mark', url: '/experiences/leave-a-mark', visible: true, order: 3 },
            { id: 'fl-5', label: 'Custom Private Journeys', url: '/experiences/custom-journeys', visible: true, order: 4 },
            { id: 'fl-6', label: 'All Curated Experiences →', url: '/experiences', visible: true, order: 5 },
          ],
        },
        {
          id: 'footer-explore',
          title: 'Explore',
          links: [
            { id: 'fl-7', label: 'Destinations', url: '/destinations', visible: true, order: 0 },
            { id: 'fl-8', label: 'Curated Itineraries', url: '/experiences', visible: true, order: 1 },
            { id: 'fl-10', label: 'Visual Journey Gallery', url: '/gallery', visible: true, order: 2 },
            { id: 'fl-11', label: 'Events & Festivals', url: '/events', visible: true, order: 3 },
            { id: 'fl-12', label: 'Stories & Field Notes', url: '/blog', visible: true, order: 4 },
          ],
        },
        {
          id: 'footer-travel-guide',
          title: 'Travel Guide',
          links: [
            { id: 'fl-13', label: 'Travel Resources & Visas', url: '/resources', visible: true, order: 0 },
            { id: 'fl-14', label: 'Frequently Asked Questions', url: '/faq', visible: true, order: 1 },
            { id: 'fl-15', label: 'Contact & Inquiries', url: '/contact', visible: true, order: 2 },
          ],
        },
      ],
    },
    updatedAt: new Date().toISOString(),
  };
}

export function getDefaultEvents(): CmsEvent[] {
  return EVENTS_DATA.map((e, i) => ({
    ...e,
    order: i,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function getDefaultDestinations(): CmsDestination[] {
  return DESTINATIONS.map((d, i) => ({
    ...d,
    slug: d.id,
    order: i,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function getDefaultFaq(): CmsFaqItem[] {
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


export function getDefaultBeyondChapters(): CmsBeyondChapter[] {
  return BEYOND_EXPERIENCES.map((exp, i) => ({
    ...exp,
    order: i,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function getDefaultLeaveAMark() {
  return LEAVE_A_MARK_CONTENT;
}

export function getDefaultPages() {
  return DEFAULT_PUBLIC_PAGES;
}

let cachedSeedFileStore: CMSDataStore | null = null;

export function getSeedStoreFromDisk(): CMSDataStore {
  if (cachedSeedFileStore) {
    return JSON.parse(JSON.stringify(cachedSeedFileStore));
  }
  if (fs.existsSync(SEED_FILE)) {
    try {
      const raw = fs.readFileSync(SEED_FILE, 'utf-8');
      cachedSeedFileStore = JSON.parse(raw) as CMSDataStore;
      return JSON.parse(JSON.stringify(cachedSeedFileStore));
    } catch (err) {
      console.error('[seed] Error reading seed store from disk:', err);
    }
  }
  return {
    version: 4,
    lastUpdated: new Date().toISOString(),
    admin: {
      username: 'admin',
      passwordHash: '',
      salt: '',
      updatedAt: new Date().toISOString(),
    },
    packages: [],
    experiences: [],
    services: [],
    inquiries: [],
    blogs: BLOG_POSTS as any,
    photos: [],
    reviews: [],
    handwrittenReviews: [],
    settings: DEFAULT_SETTINGS,
  };
}

export function getSeedForKey(key: string): any {
  const fileStore = getSeedStoreFromDisk();

  // For blogs: if fileStore has a populated array, use it; otherwise guarantee BLOG_POSTS (37 blogs)
  if (key === 'blogs') {
    if (fileStore && Array.isArray(fileStore.blogs) && fileStore.blogs.length > 0) {
      return fileStore.blogs;
    }
    return BLOG_POSTS;
  }

  // Always honor explicit data from fileStore, even if it is an empty array []
  if (fileStore && (fileStore as any)[key] !== undefined) {
    return (fileStore as any)[key];
  }

  // Fallback defaults only for initial structural setup if key is completely missing
  switch (key) {
    case 'pages':
      return getDefaultPages();
    case 'navigation':
      return getDefaultNavigation();
    case 'settings':
      return fileStore?.settings || DEFAULT_SETTINGS;
    case 'leaveAMark':
      return getDefaultLeaveAMark();
    case 'events':
      return fileStore?.events || getDefaultEvents();
    case 'destinations':
      return fileStore?.destinations || getDefaultDestinations();
    case 'faq':
      return fileStore?.faq || getDefaultFaq();
    case 'beyondChapters':
      return fileStore?.beyondChapters || getDefaultBeyondChapters();
    case 'blogs':
      return (fileStore?.blogs && fileStore.blogs.length > 0) ? fileStore.blogs : BLOG_POSTS;
    case 'photos':
      return fileStore?.photos || [];
    case 'reviews':
      return fileStore?.reviews || [];
    case 'handwrittenReviews':
      return fileStore?.handwrittenReviews || [];
    case 'inquiries':
    case 'pageRevisions':
    default:
      return [];
  }
}
