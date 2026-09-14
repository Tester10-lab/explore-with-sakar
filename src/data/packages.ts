export interface PackageItem {
  id: string;
  slug: string;
  title: string;
  nepaliTitle?: string;
  tagline: string;
  duration: string;
  idealFor: string;
  season: string;
  groupSize: string;
  image: {
    src: string;
    alt: string;
  };
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  accommodationStyle: string;
  transportStyle: string;
  customizable: boolean;
  featured: boolean;
}

export const TRAVEL_PACKAGES: PackageItem[] = [
  {
    id: 'living-culture-heritage',
    slug: 'living-culture-heritage',
    title: 'Living Culture & Heritage Immersion',
    nepaliTitle: 'जीवन्त संस्कृति र सम्पदा',
    tagline: 'Centuries of Sacred Art, Hidden Bahals & Newari Hearth Hospitality',
    duration: '5 – 7 Days',
    idealFor: 'Culture enthusiasts, photographers, historians & mindful travelers',
    season: 'Year-Round (Best: Oct – May)',
    groupSize: 'Private (1 – 8 Travelers)',
    image: {
      src: '/explore-with-sakar/images/heritage/durbar-square.jpg',
      alt: 'Ancient Newari temple courtyards in Kathmandu Valley',
    },
    overview: 'Step beyond standard monument tickets into living monastic courtyards (Bahals), private artisan studios, and family hearths across Kathmandu, Patan, and Bhaktapur. Guided personally by Sakar, you will explore secret shrines, meet master bronze sculptors and woodcarvers, and experience authentic festive meals.',
    highlights: [
      'Private walking tours through secret Patan & Bhaktapur residential courtyards',
      'Exclusive sessions with multi-generational master woodcarvers & bronze smiths',
      'Traditional multi-course Newari Samay Baji feast in a private heritage home',
      'Dawn circumambulation (Kora) and prayer wheel blessing at Swayambhunath Stupa',
      'Evening spiritual aarti ceremony and classical flute music along the holy riverbanks',
    ],
    inclusions: [
      'Personal tour directing & local cultural hosting by Sakar throughout',
      'Private comfortable climate-controlled transport for all transfers & excursions',
      'Handpicked boutique heritage hotel / guesthouse accommodations',
      'All UNESCO World Heritage site entry permits and heritage conservation fees',
      'Curated authentic meals (daily breakfast + featured traditional culinary feasts)',
      'Private artisan studio access and hands-on workshop materials',
    ],
    exclusions: [
      'International flights to/from Kathmandu',
      'Nepal tourist entry visa fees',
      'Personal travel & medical insurance',
      'Discretionary personal expenses, souvenirs & alcoholic beverages',
    ],
    accommodationStyle: 'Boutique Heritage Suites & Preserved Traditional Guesthouses',
    transportStyle: 'Private Chauffeur-Driven Air-Conditioned Vehicle',
    customizable: true,
    featured: true,
  },
  {
    id: 'himalayan-spiritual-sound',
    slug: 'himalayan-spiritual-sound',
    title: 'Himalayan Spiritual & Sound Sanctuary',
    nepaliTitle: 'ध्वनि ध्यान र आध्यात्मिक यात्रा',
    tagline: '7-Metal Tibetan Singing Bowls, Monastery Dawns & Sacred Mountain Solitude',
    duration: '7 – 10 Days',
    idealFor: 'Inner seekers, wellness travelers, yogis & those seeking deep mental reset',
    season: 'Year-Round (Best: Sep – Dec & Feb – May)',
    groupSize: 'Private / Intimate Group (1 – 6 Travelers)',
    image: {
      src: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
      alt: 'Sacred stupa with fluttering prayer flags in morning light',
    },
    overview: 'A restorative journey dedicated to inner stillness and ancient Himalayan sound practices. Experience private 1-on-1 sound therapy sessions using 7-metal hand-hammered singing bowls, witness dawn monastery chanting ceremonies, explore the sacred meditation caves of Pharping, and practice gentle breathwork amidst tranquil mountain ridges.',
    highlights: [
      'Private Tibetan singing bowl resonance therapies with certified traditional master',
      'Dawn monastery chanting and butter lamp offering puja in Pharping sacred valley',
      'Mindfulness walking meditation along serene pine forest ridge trails',
      'Exclusive philosophy dialogues with elder Buddhist and Vedic practitioners',
      'Organic Ayurvedic and herbal meals crafted for digestion and vitality',
    ],
    inclusions: [
      'Private accompaniment & cultural context by Sakar',
      'Daily guided meditation and private singing bowl sound immersion sessions',
      'Monastery guest house & peaceful hillside wellness lodge accommodations',
      'All private road transfers in dedicated vehicle',
      'Nutritious organic vegetarian meals and herbal teas throughout',
      'Monastery donations and sacred site access arrangements',
    ],
    exclusions: [
      'International flights to/from Nepal',
      'Nepal entry visa fees',
      'Personal medical & travel insurance',
      'Personal sound bowl purchases (authentic master bowls available directly from makers)',
    ],
    accommodationStyle: 'Tranquil Mountain Wellness Lodges & Monastic Guest Sanctuaries',
    transportStyle: 'Private Overland Vehicle',
    customizable: true,
    featured: true,
  },
  {
    id: 'authentic-homestay-quiet-trails',
    slug: 'authentic-homestay-quiet-trails',
    title: 'Authentic Village Homestay & Quiet Trails',
    nepaliTitle: 'गाउँले होमस्टे र शान्त हिमाली बाटो',
    tagline: 'Stay With Nepal: Living Hearth Hospitality & Off-the-Beaten-Path Walks',
    duration: '8 – 12 Days',
    idealFor: 'Conscious travelers, slow explorers, families & community-minded adventurers',
    season: 'Sep – Jun (Best: Oct – Nov & Mar – May)',
    groupSize: 'Private (2 – 6 Travelers)',
    image: {
      src: '/explore-with-sakar/images/homestays/village-meal.jpg',
      alt: 'Host family sharing meal around traditional wood stove',
    },
    overview: 'Stay in the welcoming stone and timber homes of Gurung and Tamang mountain communities in the Annapurna and Langtang foothills. Wake to golden Himalayan sunrises, harvest organic greens from terraced fields, cook on woodstoves, and walk peaceful trails through rhododendron forests with zero commercial tourist crowds.',
    highlights: [
      'Live with verified, clean, welcoming host families as honored guests',
      'Hands-on village cooking: farm-fresh Dal Bhat, buckwheat rotis & wild nettle soup',
      'Gentle day treks along peaceful unpaved mountain ridges and suspension bridges',
      'Direct cultural bridge provided by Sakar for genuine heartfelt human conversations',
      '100% of homestay hosting fees go directly into village household hands',
    ],
    inclusions: [
      'Full-time guidance, facilitation, and cultural translation by Sakar',
      'Private family homestay accommodations with clean private bedding & mountain views',
      'All hearty, home-cooked farm-to-hearth organic meals and morning teas',
      'All local community entry fees and conservation area permits (ACAP/TIMS)',
      'Private dedicated 4WD / vehicle transfers to trailheads and villages',
      'Ethically compensated local porters where light luggage assistance is needed',
    ],
    exclusions: [
      'International flights',
      'Nepal entry visa',
      'Personal travel insurance (mandatory for trekking)',
      'Extra snacks, bottled beverages & personal gear',
    ],
    accommodationStyle: 'Verified Community Homestays & Small Family Eco-Lodges',
    transportStyle: 'Private 4WD Jeep & Scenic Walking Routes',
    customizable: true,
    featured: true,
  },
  {
    id: 'grand-sacred-nepal-explorer',
    slug: 'grand-sacred-nepal-explorer',
    title: 'Grand Sacred Nepal Explorer',
    nepaliTitle: 'महान पवित्र नेपाल यात्रा',
    tagline: 'The Definitive Journey: Valley Shrines, Himalayan Ridges, High Desert & Terai Wilds',
    duration: '12 – 16 Days',
    idealFor: 'Travelers wanting the complete, deep Nepal journey at an unhurried pace',
    season: 'Oct – Dec & Feb – May',
    groupSize: 'Private (1 – 8 Travelers)',
    image: {
      src: '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
      alt: 'Panoramic Himalayan view across Nepal mountain ridges',
    },
    overview: 'A masterfully curated grand journey weaving Kathmandu’s ancient medieval bahals, Pokhara’s lakeside serenity, the sacred rainshadow gorges of Muktinath & Lower Mustang, peaceful Gurung mountain homestays, and the lush sub-tropical lowlands of Chitwan National Park.',
    highlights: [
      'Comprehensive cultural exploration of Kathmandu, Patan & Bhaktapur with Sakar',
      'Scenic Himalayan mountain flights framing the Annapurna and Dhaulagiri massifs',
      'Pilgrimage to holy Muktinath 108 water spouts and medieval mud citadel of Kagbeni',
      'Relaxing lakeside retreat in Pokhara with private boat rides and ridge sunsets',
      'Silent river canoe safari and ethical wildlife tracking in Chitwan National Park',
      'Homestay warmth combined with boutique mountain lodge comfort',
    ],
    inclusions: [
      'Complete private journey direction and seamless accompaniment by Sakar',
      'All domestic flights (e.g. Pokhara – Jomsom – Pokhara / Chitwan – Kathmandu)',
      'Private air-conditioned overland vehicles and rugged 4WD for Mustang gorge',
      'Carefully balanced accommodations: boutique heritage hotels, eco-lodges & homestays',
      'All meals throughout the journey (breakfast, authentic lunches & curated dinners)',
      'All national park, conservation, ACAP, TIMS, and heritage monument permits',
      'All private boat excursions, monastery pujas, and artisan sessions',
    ],
    exclusions: [
      'International flights to/from Nepal',
      'Nepal entry visa',
      'Comprehensive travel and medical insurance with high-altitude coverage',
      'Personal tips and personal shopping expenses',
    ],
    accommodationStyle: 'Boutique Heritage Suites, Premium Eco-Resorts & Curated Homestays',
    transportStyle: 'Private Flights, Overland AC Vehicles & 4WD Mountain Jeeps',
    customizable: true,
    featured: true,
  },
];
