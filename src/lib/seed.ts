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
        url: '/experience',
        visible: true,
        order: 0,
        children: [
          { id: 'nav-beyond', label: 'Go Beyond the Map', url: '/experience/go-beyond', visible: true, order: 0 },
          { id: 'nav-within', label: 'Go Spiritual', url: '/experience/go-spiritual', visible: true, order: 1 },
          { id: 'nav-closer', label: 'Feel Closer', url: '/experience/feel-closer', visible: true, order: 2 },
          { id: 'nav-mark', label: 'Leave a Mark', url: '/experience/leave-a-mark', visible: true, order: 3 },
          { id: 'nav-all-exp', label: 'All Curated Experiences', url: '/experience/all-curated-experiences', visible: true, order: 4 },
          { id: 'nav-custom-exp', label: 'Custom Private Journeys', url: '/experience/custom-private-journeys', visible: true, order: 5 },
        ],
      },
      { id: 'nav-events', label: 'EVENTS', url: '/events', visible: true, order: 1 },
      {
        id: 'nav-stories',
        label: 'STORIES',
        url: '/blog',
        visible: true,
        order: 2,
        children: [
          { id: 'nav-journal', label: 'Sakar’s Journal & Blogs', url: '/blog', visible: true, order: 0 },
          { id: 'nav-reviews', label: 'Traveler Reviews & Guestbook', url: '/reviews', visible: true, order: 1 },
        ],
      },
      { id: 'nav-about', label: 'ABOUT SAKAR', url: '/about', visible: true, order: 3 },
      { id: 'nav-contact', label: 'CONTACT', url: '/contact', visible: true, order: 4 },
    ],
    footer: {
      columns: [
        {
          id: 'footer-explore',
          title: 'Experiences',
          links: [
            { id: 'fl-1', label: 'Go Beyond the Map', url: '/experience/go-beyond', visible: true, order: 0 },
            { id: 'fl-2', label: 'Go Spiritual', url: '/experience/go-spiritual', visible: true, order: 1 },
            { id: 'fl-3', label: 'Feel Closer', url: '/experience/feel-closer', visible: true, order: 2 },
            { id: 'fl-4', label: 'Leave a Mark', url: '/experience/leave-a-mark', visible: true, order: 3 },
            { id: 'fl-5', label: 'Custom Private Journeys', url: '/experience/custom-private-journeys', visible: true, order: 4 },
            { id: 'fl-6', label: 'All Curated Experiences', url: '/experience/all-curated-experiences', visible: true, order: 5 },
          ],
        },
        {
          id: 'footer-learn',
          title: 'Learn & Stories',
          links: [
            { id: 'fl-7', label: 'About Sakar', url: '/about', visible: true, order: 0 },
            { id: 'fl-8', label: 'Sakar’s Journal & Blogs', url: '/blog', visible: true, order: 1 },
            { id: 'fl-9', label: 'Traveler Reviews & Guestbook', url: '/reviews', visible: true, order: 2 },
            { id: 'fl-10', label: 'Events & Festivals', url: '/events', visible: true, order: 3 },
            { id: 'fl-11', label: 'FAQ', url: '/faq', visible: true, order: 4 },
          ],
        },
        {
          id: 'footer-info',
          title: 'Information',
          links: [
            { id: 'fl-10', label: 'Contact', url: '/contact', visible: true, order: 0 },
            { id: 'fl-11', label: 'Resources', url: '/resources', visible: true, order: 1 },
            { id: 'fl-12', label: 'Privacy Policy', url: '/privacy', visible: true, order: 2 },
            { id: 'fl-13', label: 'Terms', url: '/terms', visible: true, order: 3 },
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
    blogs: [],
    photos: [],
    reviews: [],
    handwrittenReviews: [],
    settings: DEFAULT_SETTINGS,
  };
}

/**
 * Returns the exact seed payload for any collection key.
 * Used for atomic seeding in Mongo and in-memory read-only fallback when Mongo is down.
 */
export function getSeedForKey(key: string): any {
  switch (key) {
    case 'events':
      return getDefaultEvents();
    case 'destinations':
      return getDefaultDestinations();
    case 'faq':
      return getDefaultFaq();
    case 'pages':
      return getDefaultPages();
    case 'navigation':
      return getDefaultNavigation();
    case 'settings': {
      const fileStore = getSeedStoreFromDisk();
      return fileStore.settings || DEFAULT_SETTINGS;
    }
    case 'inquiries':
      return [];
    case 'pageRevisions':
      return [];
    default: {
      const fileStore = getSeedStoreFromDisk();
      return (fileStore as any)[key] ?? [];
    }
  }
}
