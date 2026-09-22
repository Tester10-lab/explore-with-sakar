import { PageContent } from '@/types/cms';
import { SITE_ORIGIN } from '@/lib/config';

/**
 * Master public pages structure mapping all current public website pages 1:1.
 * Terminology and hierarchy strictly follow the public-facing website.
 */
export const DEFAULT_PUBLIC_PAGES: PageContent[] = [
  // --- HOMEPAGE ---
  {
    slug: 'home',
    name: 'Homepage',
    url: '/',
    status: 'published',
    seo: {
      title: 'Explore With Sakar | Authentic Nepal Travel & Cultural Journeys',
      metaDescription: 'Meaningful Nepal travel experiences beyond ordinary tourism. Intimate human connections, village homestays, and sacred heritage.',
      canonicalUrl: `${SITE_ORIGIN}/`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-hero', type: 'hero', label: 'Hero Slideshow & Cutout', visible: true, order: 0, content: {} },
      { id: 'sec-stats', type: 'stats', label: 'Trust & Impact Stats Strip (Key Metrics)', visible: true, order: 1, content: {} },
      { id: 'sec-pillars', type: 'services-pillars', label: 'Our Core Pillars (Four Pillars of Travel)', visible: true, order: 2, content: { title: 'Meaningful Travel, Deeply Curated', subtitle: 'Our Core Pillars' } },
      { id: 'sec-sakar', type: 'meet-sakar', label: 'Meet Sakar: Personal Introduction', visible: true, order: 3, content: { heading: 'Namaste, I am Sakar', quote: 'Travel should create genuine connection, learning, and meaningful contribution.' } },
      { id: 'sec-blogs', type: 'blog-teaser', label: 'Stories & Reflections from the Trail (Journal Teaser)', visible: true, order: 4, content: { title: 'Stories & Reflections from the Trail', count: 3 } },
      { id: 'sec-inquiry', type: 'inquiry-form', label: 'Begin Your Journey (Inquiry Form)', visible: true, order: 5, content: { title: 'Begin Your Journey' } },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // --- EXPERIENCES (PUBLIC NAVBAR DROPDOWN) ---
  {
    slug: 'beyond-the-map',
    name: 'Go Beyond the Map',
    url: '/experiences/beyond-the-map',
    status: 'published',
    seo: {
      title: 'Go Beyond the Map | Authentic Exploration with Sakar',
      metaDescription: 'Step past grand facades into hidden residential bahals, Patan and Bhaktapur histories, master artisan guilds, and sacred geometry.',
      canonicalUrl: `${SITE_ORIGIN}/experiences/beyond-the-map`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-btm-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { badge: 'Pillar 01 • Guided Exploration', title: 'Go Beyond the Map', subtitle: 'Step past grand facades into the living courtyards, medieval stone mysteries, master artisan guilds, and sacred geometry.' } },
      { id: 'sec-btm-manifesto', type: 'philosophy', label: 'Beyond the Map Philosophy & Manifesto', visible: true, order: 1, content: { heading: 'Not Just Visiting Places — Stepping Inside the Living Soul of Nepal' } },
      { id: 'sec-btm-chapters', type: 'chapters-grid', label: 'The 4 Distinct Editorial Narratives (Kathmandu Durbar Square, Bhaktapur Durbar Square, Patan Durbar Square, Pokhara)', visible: true, order: 2, content: {} },
      { id: 'sec-btm-host-note', type: 'host-note', label: 'Host Note from Sakar', visible: true, order: 3, content: { quote: 'Nepal Is Best Experienced Hand-in-Hand, Not Through a Turnstile.' } },
      { id: 'sec-btm-cta', type: 'cta', label: 'Design Your Beyond the Map Journey CTA', visible: true, order: 4, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'go-within',
    name: 'Go Within (Spiritual & Sound Sanctuary)',
    url: '/experiences/go-within',
    status: 'published',
    seo: {
      title: 'Himalayan Spiritual & Sound Sanctuary | Explore With Sakar',
      metaDescription: 'Experience Tibetan singing bowl sound therapy, dawn monastery chanting, sacred meditation caves, and restorative mindfulness in the Himalayas.',
      canonicalUrl: `${SITE_ORIGIN}/experiences/go-within`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-sw-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { badge: 'Spiritual & Wellness', title: 'Himalayan Spiritual & Sound Sanctuary' } },
      { id: 'sec-sw-philosophy', type: 'philosophy', label: 'Reconnecting with Stillness Overview', visible: true, order: 1, content: {} },
      { id: 'sec-sw-features', type: 'features-grid', label: 'Sound Sanctuary & 7-Metal Tibetan Singing Bowls', visible: true, order: 2, content: {} },
      { id: 'sec-sw-moments', type: 'itinerary-teaser', label: 'Dawn Monastery Pujas & Cave Walks', visible: true, order: 3, content: {} },
      { id: 'sec-sw-cta', type: 'cta', label: 'Spiritual Sanctuary Consultation CTA', visible: true, order: 4, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'homestays',
    name: 'Feel Closer (Village Homestays)',
    url: '/experiences/homestays',
    status: 'published',
    seo: {
      title: 'Village Homestays & Community Living | Explore With Sakar',
      metaDescription: 'Stay with Gurung and Tamang mountain families. Share woodfire meals, harvest organic terraced fields, and experience authentic Nepali hospitality.',
      canonicalUrl: `${SITE_ORIGIN}/experiences/homestays`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-hm-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { badge: 'Signature Travel Pillar', title: 'Stay With Nepal. Not Just In Nepal.' } },
      { id: 'sec-hm-philosophy', type: 'philosophy', label: 'Living Hearth Hospitality & Culture', visible: true, order: 1, content: {} },
      { id: 'sec-hm-features', type: 'features-grid', label: 'Farm-to-Hearth Cooking & Living Rhythms', visible: true, order: 2, content: {} },
      { id: 'sec-hm-families', type: 'community-grid', label: 'Verified Mountain Host Families', visible: true, order: 3, content: {} },
      { id: 'sec-hm-cta', type: 'cta', label: 'Village Homestay Consultation CTA', visible: true, order: 4, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'leave-a-mark',
    name: 'Leave a Mark',
    url: '/experiences/leave-a-mark',
    status: 'published',
    seo: {
      title: 'Leave a Mark: Strategic Volunteer Tourism | Explore With Sakar',
      metaDescription: 'Matching your actual professional skills with local communities in Nepal that need structural, strategic, and administrative empowerment.',
      canonicalUrl: `${SITE_ORIGIN}/experiences/leave-a-mark`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-lam-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'Leave a Mark', subtitle: 'Strategic Volunteer Tourism' } },
      { id: 'sec-lam-promise', type: 'narrative', label: 'The Beyond the Map Promise', visible: true, order: 1, content: {} },
      { id: 'sec-lam-framework', type: 'features-grid', label: 'The Framework: 3-Month Execution Model', visible: true, order: 2, content: {} },
      { id: 'sec-lam-apply', type: 'features-grid', label: 'Who Should Apply', visible: true, order: 3, content: {} },
      { id: 'sec-lam-impact', type: 'narrative', label: 'The Ultimate Impact', visible: true, order: 4, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'experiences',
    name: 'All Curated Experiences',
    url: '/experiences',
    status: 'published',
    seo: {
      title: 'Curated Experiences | Handcrafted Journeys in Nepal',
      metaDescription: 'Immersive multi-day itineraries crafted by Sakar combining cultural celebrations, mountain sanctuary walks, and village warmth.',
      canonicalUrl: `${SITE_ORIGIN}/experiences`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-exp-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'Curated Experiences', subtitle: 'Carefully Shaped Journeys Designed for Depth' } },
      { id: 'sec-exp-grid', type: 'experiences-grid', label: 'Experiences Card Grid with Category Filter', visible: true, order: 1, content: {} },
      { id: 'sec-exp-cta', type: 'cta', label: 'Custom Journey Design CTA', visible: true, order: 2, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'custom-journeys',
    name: 'Custom Private Journeys',
    url: '/experiences/custom-journeys',
    status: 'published',
    seo: {
      title: 'Custom Private Journeys | Bespoke Nepal Travel Curation',
      metaDescription: 'Tailor-made itineraries for solo travelers, couples & families with Sakar. Private vehicles, personalized pace, and direct host accompaniment.',
      canonicalUrl: `${SITE_ORIGIN}/experiences/custom-journeys`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-cj-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'Custom Private Journeys', subtitle: 'Bespoke Travel Curation Shaped Around Your Curiosities' } },
      { id: 'sec-cj-philosophy', type: 'philosophy', label: 'Collaborative Route Design Philosophy', visible: true, order: 1, content: {} },
      { id: 'sec-cj-features', type: 'features-grid', label: 'Solo, Couple & Multi-Generational Family Benefits', visible: true, order: 2, content: {} },
      { id: 'sec-cj-cta', type: 'cta', label: 'Start Designing Your Journey CTA', visible: true, order: 3, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // --- EVENTS (PUBLIC NAVBAR ITEM) ---
  {
    slug: 'events',
    name: 'Events',
    url: '/events',
    status: 'published',
    seo: {
      title: 'Festivals & Sacred Events in Nepal | Explore With Sakar',
      metaDescription: 'Experience Indra Jatra, Tihar, Mani Rimdu, Solstice retreats, and Shivaratri with authentic respectful access guided by Sakar.',
      canonicalUrl: `${SITE_ORIGIN}/events`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-eve-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'Festivals & Sacred Events', subtitle: 'Living Traditions, Sacred Gatherings & Seasonal Celebrations' } },
      { id: 'sec-eve-filter', type: 'filter-bar', label: 'Category Filter Bar (All / Festival / Spiritual / Community)', visible: true, order: 1, content: {} },
      { id: 'sec-eve-grid', type: 'events-grid', label: 'Events Cards List with Sakar Notes', visible: true, order: 2, content: {} },
      { id: 'sec-eve-cta', type: 'cta', label: 'Plan Around an Event CTA', visible: true, order: 3, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // --- STORIES (PUBLIC NAVBAR DROPDOWN) ---
  {
    slug: 'blog',
    name: 'Sakar’s Journal & Blogs',
    url: '/blog',
    status: 'published',
    seo: {
      title: 'Himalayan Journal | Stories & Reflections on Nepal Travel',
      metaDescription: 'Firsthand essays, cultural insights, homestay memories, and practical travel wisdom from Sakar Aryal in Nepal.',
      canonicalUrl: `${SITE_ORIGIN}/blog`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-blog-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'The Himalayan Journal', subtitle: 'Stories, Reflections & Cultural Notes from the Road' } },
      { id: 'sec-blog-grid', type: 'blog-grid', label: 'Article Cards Grid with Category Filter', visible: true, order: 1, content: {} },
      { id: 'sec-blog-cta', type: 'cta', label: 'Newsletter & Inquiries CTA', visible: true, order: 2, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'reviews',
    name: 'Traveler Reviews & Guestbook',
    url: '/reviews',
    status: 'published',
    seo: {
      title: 'Traveler Reflections & Handwritten Letters | Explore With Sakar',
      metaDescription: 'Read authentic reviews, heartfelt feedback, and scanned handwritten guestbook letters from travelers who explored Nepal with Sakar.',
      canonicalUrl: `${SITE_ORIGIN}/reviews`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-rev-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'Traveler Reflections', subtitle: 'Voices of Gratitude & Handwritten Memories' } },
      { id: 'sec-rev-metrics', type: 'trust-metrics', label: 'Trust & Satisfaction Metrics', visible: true, order: 1, content: {} },
      { id: 'sec-rev-guestbook', type: 'handwritten-guestbook', label: 'Interactive Handwritten Guestbook Viewer', visible: true, order: 2, content: {} },
      { id: 'sec-rev-grid', type: 'reviews-grid', label: 'Digital Testimonial Cards Grid', visible: true, order: 3, content: {} },
      { id: 'sec-rev-cta', type: 'cta', label: 'Write Your Own Chapter CTA', visible: true, order: 4, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // --- ABOUT SAKAR (PUBLIC NAVBAR ITEM) ---
  {
    slug: 'about',
    name: 'About Sakar',
    url: '/about',
    status: 'published',
    seo: {
      title: 'About Sakar | Tour Director & Cultural Storyteller in Nepal',
      metaDescription: 'Learn about Sakar Aryal, his philosophy of slow and responsible travel in Nepal, and his roots in community hosting.',
      canonicalUrl: `${SITE_ORIGIN}/about`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-about-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'About Sakar', subtitle: 'A Life Rooted in the Living Spirit of Nepal' } },
      { id: 'sec-about-story', type: 'story', label: 'Personal Journey & Background', visible: true, order: 1, content: {} },
      { id: 'sec-about-reflections', type: 'reflections', label: 'Traveler Reflections & Community Impact', visible: true, order: 2, content: {} },
      { id: 'sec-about-cta', type: 'cta', label: 'Bottom Call To Action', visible: true, order: 3, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // --- EXPLORE & GUIDES (PUBLIC FOOTER COLUMNS) ---
  {
    slug: 'destinations',
    name: 'Destinations',
    url: '/destinations',
    status: 'published',
    seo: {
      title: 'Destinations in Nepal | Sacred Valleys & Mountain Havens',
      metaDescription: 'Discover Nepal’s most resonant regions: Kathmandu Valley, Annapurna Foothills, Mustang, Langtang, Chitwan, and Bandipur.',
      canonicalUrl: `${SITE_ORIGIN}/destinations`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-dest-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'Destinations', subtitle: 'Places That Hold Stories, Sacred Rhythms, and Mountain Stillness' } },
      { id: 'sec-dest-grid', type: 'destinations-grid', label: 'Destinations Cards Grid', visible: true, order: 1, content: {} },
      { id: 'sec-dest-cta', type: 'cta', label: 'Plan a Visit CTA', visible: true, order: 2, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'gallery',
    name: 'Visual Journey Gallery',
    url: '/gallery',
    status: 'published',
    seo: {
      title: 'Visual Journey | Photo Gallery of Nepal',
      metaDescription: 'A photographic journey through Nepal: Himalayan sunrises, ancient courtyards, village kitchens, and joyful encounters.',
      canonicalUrl: `${SITE_ORIGIN}/gallery`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-gal-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'Visual Journey', subtitle: 'Moments of Grace, Silence, and Living Culture' } },
      { id: 'sec-gal-tabs', type: 'category-tabs', label: 'Category Filter Tabs', visible: true, order: 1, content: {} },
      { id: 'sec-gal-grid', type: 'gallery-grid', label: 'Masonry Photo Grid with Lightbox', visible: true, order: 2, content: {} },
      { id: 'sec-gal-cta', type: 'cta', label: 'Create Your Memories CTA', visible: true, order: 3, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'faq',
    name: 'Frequently Asked Questions',
    url: '/faq',
    status: 'published',
    seo: {
      title: 'FAQ | Nepal Travel Questions Answered by Sakar',
      metaDescription: 'Practical information on best travel seasons, visa requirements, altitude safety, village homestay etiquette, and booking policies.',
      canonicalUrl: `${SITE_ORIGIN}/faq`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-faq-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'Frequently Asked Questions', subtitle: 'Everything You Need to Know Before Setting Foot in Nepal' } },
      { id: 'sec-faq-accordion', type: 'faq-accordion', label: 'Categorized Accordion Q&A', visible: true, order: 1, content: {} },
      { id: 'sec-faq-cta', type: 'cta', label: 'Still Have Questions? WhatsApp Sakar CTA', visible: true, order: 2, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'resources',
    name: 'Traveler Resources & Visas',
    url: '/resources',
    status: 'published',
    seo: {
      title: 'Traveler Resources | Packing Lists & Cultural Etiquette in Nepal',
      metaDescription: 'Packing guides, cultural etiquette tips, Nepal reading lists, and health advice curated for mindful travelers.',
      canonicalUrl: `${SITE_ORIGIN}/resources`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-res-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'Traveler Resources', subtitle: 'Essential Preparation Guides, Cultural Etiquette & Packing Lists' } },
      { id: 'sec-res-grid', type: 'resources-grid', label: 'Resource Guides Cards', visible: true, order: 1, content: {} },
      { id: 'sec-res-cta', type: 'cta', label: 'Consultation Assistance CTA', visible: true, order: 2, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // --- INQUIRIES & CONTACT ---
  {
    slug: 'contact',
    name: 'Contact & Inquiries',
    url: '/contact',
    status: 'published',
    seo: {
      title: 'Contact Sakar | Start Planning Your Nepal Journey',
      metaDescription: 'Direct contact with Sakar Aryal via WhatsApp, email, or inquiry form to plan your custom Nepal journey.',
      canonicalUrl: `${SITE_ORIGIN}/contact`,
      sitemapVisible: true,
    },
    sections: [
      { id: 'sec-cnt-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'Begin the Conversation', subtitle: 'Reach Out to Sakar Directly to Shape Your Nepal Journey' } },
      { id: 'sec-cnt-channels', type: 'contact-channels', label: 'Direct Channels (WhatsApp, Phone, Email, Office)', visible: true, order: 1, content: {} },
      { id: 'sec-cnt-form', type: 'inquiry-form', label: 'Comprehensive Bespoke Inquiry Form', visible: true, order: 2, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // --- LEGAL & POLICIES ---
  {
    slug: 'privacy',
    name: 'Privacy Policy',
    url: '/privacy',
    status: 'published',
    seo: {
      title: 'Privacy Policy | Explore With Sakar',
      metaDescription: 'Privacy policy for Explore With Sakar. How we handle and protect your personal travel inquiry data.',
      canonicalUrl: `${SITE_ORIGIN}/privacy`,
      sitemapVisible: false,
    },
    sections: [
      { id: 'sec-pri-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'Privacy Policy' } },
      { id: 'sec-pri-content', type: 'rich-text', label: 'Privacy Policy Content', visible: true, order: 1, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'terms',
    name: 'Terms of Service & Booking Conditions',
    url: '/terms',
    status: 'published',
    seo: {
      title: 'Terms of Service & Booking Conditions | Explore With Sakar',
      metaDescription: 'Booking terms, payment conditions, cancellation rules, and travel insurance requirements.',
      canonicalUrl: `${SITE_ORIGIN}/terms`,
      sitemapVisible: false,
    },
    sections: [
      { id: 'sec-trm-hero', type: 'hero', label: 'Page Hero Header', visible: true, order: 0, content: { title: 'Terms & Conditions' } },
      { id: 'sec-trm-content', type: 'rich-text', label: 'Terms & Conditions Content', visible: true, order: 1, content: {} },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
