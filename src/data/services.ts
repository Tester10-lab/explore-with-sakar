export interface ServicePillar {
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
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'homestays',
    slug: 'homestays',
    title: 'Village Homestays & Community Living',
    nepaliTitle: 'गाउँले होमस्टे र आतिथ्य',
    tagline: 'Stay With Nepal: Living Hearth Hospitality, Organic Farming & Lifelong Human Connections',
    shortDescription: 'Step beyond hotels to live under traditional slate roofs with Gurung and Tamang mountain families. Share meals, learn ancestral recipes, and forge genuine lifelong bonds.',
    fullPhilosophy: [
      'True cultural understanding never happens through the tinted window of a tourist bus. It happens when you sit cross-legged by a wood-burning hearth (Chulo), sharing steaming tea with a grandmother whose hands have worked the mountain soil for eighty years.',
      'Our homestay experiences are carefully curated with verified host families who receive you not as a transactional customer, but as an honored family guest. Sakar bridges language and cultural nuances so meaningful conversations flow naturally.',
      '100% of your hosting payment remains directly in the hands of village mothers and community development funds, providing sustainable livelihoods that keep rural heritage alive.',
    ],
    heroImage: {
      src: '/explore-with-sakar/images/homestays/village-meal.jpg',
      alt: 'Family and guests sharing a home-cooked meal around wooden table',
    },
    keyFeatures: [
      {
        title: 'Verified Private Homestays',
        description: 'Clean, cozy guest rooms with fresh private bedding, warm blankets, and panoramic mountain views.',
      },
      {
        title: 'Farm-to-Hearth Cooking',
        description: 'Harvest organic greens from terraced gardens and learn to cook traditional Dal Bhat on a wood fire.',
      },
      {
        title: 'Living Village Rhythms',
        description: 'Participate in dawn butter lamp rituals, tea harvesting, community weaving looms, and evening folk songs.',
      },
      {
        title: 'Direct Economic Impact',
        description: 'Transparent local benefit empowering women-led cooperatives and rural village schools.',
      },
    ],
    quote: 'We do not receive visitors as clients. When you sit by our wood fire and eat our rice, you are family.',
    quoteAuthor: 'Aama Gurung, Ghandruk Village Host',
    badge: 'Signature Pillar',
    relatedSlug: 'village-homestay-community-immersion',
  },
  {
    id: 'culture',
    slug: 'culture',
    title: 'Living Culture & Sacred Heritage',
    nepaliTitle: 'जीवन्त संस्कृति र सम्पदा',
    tagline: 'Secret Monastic Courtyards, Multi-Generational Artisans & Living Traditions',
    shortDescription: 'Explore the breathing soul of Kathmandu Valley. Step through hidden archways into medieval Newari bahals, private artisan studios, and sacred living rituals.',
    fullPhilosophy: [
      'Kathmandu is not a city of lifeless monuments behind museum ropes; it is a breathing, sacred mandala where ancient stone shrines receive fresh marigolds every morning and master bronze casters hammer deity statues in medieval courtyards.',
      'Guided by Sakar, you bypass tourist bottlenecks and discover the secret residential courtyards (Bahals) of Patan and Bhaktapur, listen to the temple bells at dusk, and understand the deep cosmological philosophy of Himalayan architecture.',
      'Meet multi-generational master woodcarvers, lost-wax bronze sculptors, and sacred thangka artists in their private home studios.',
    ],
    heroImage: {
      src: '/explore-with-sakar/images/heritage/durbar-square.jpg',
      alt: 'Ancient Newari wood carving on historic pagoda temple',
    },
    keyFeatures: [
      {
        title: 'Hidden Courtyard (Bahal) Walks',
        description: 'Discover centuries-old Buddhist monasteries and medieval Newari residential alleyways hidden from main streets.',
      },
      {
        title: 'Master Artisan Encounters',
        description: 'Private studio sessions with master woodcarvers, lost-wax bronze sculptors, and sacred thangka painters.',
      },
      {
        title: 'Culinary Heritage Feasts',
        description: 'Authentic multi-course Newari Samay Baji banquets served in private historic courtyard homes.',
      },
      {
        title: 'Sacred Rituals & Dawn Kora',
        description: 'Experience morning circumambulation at Swayambhunath and evening spiritual aarti along sacred rivers.',
      },
    ],
    quote: 'In Patan, every cobblestone holds a prayer, and every carved window frames five hundred years of living devotion.',
    quoteAuthor: 'Sakar, Cultural Guide',
    badge: 'Cultural Immersion',
    relatedSlug: 'kathmandu-heritage-living-culture',
  },
  {
    id: 'spiritual-wellness',
    slug: 'spiritual-wellness',
    title: 'Himalayan Spiritual & Sound Sanctuary',
    nepaliTitle: 'ध्वनि ध्यान र आध्यात्मिक शान्ति',
    tagline: '7-Metal Tibetan Singing Bowls, Dawn Monastery Pujas & Sacred Mountain Stillness',
    shortDescription: 'A sanctuary for inner restoration. Experience private singing bowl sound therapies, Buddhist monastery chanting, sacred cave walks, and mindful presence in the Himalayas.',
    fullPhilosophy: [
      'For millennia, the Himalayan peaks and valleys have served as the earth’s most revered sanctuary for seekers, meditators, and yogis. This journey is crafted for those who wish to step off the global treadmill and reconnect with inner quietude.',
      'Our approach centers on experiential mindfulness and ancient sound vibration: certified 7-metal hand-hammered singing bowl sessions, dawn pujas inside serene hillside gompas, and quiet walks through sacred pine forests.',
      'Rather than dogmatic ritual, we cultivate pure presence, gentle breathwork, and deep somatic restoration in sacred power places like Pharping and high Himalayan ridges.',
    ],
    heroImage: {
      src: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
      alt: 'Buddhist stupa with prayer flags in tranquil morning light',
    },
    keyFeatures: [
      {
        title: 'Authentic Sound Bowl Therapy',
        description: 'Private 1-on-1 and group sound resonance sessions using 7-metal hand-hammered Himalayan singing bowls.',
      },
      {
        title: 'Dawn Monastery Pujas',
        description: 'Witness morning horn resonance, deep chanting, and butter lamp rituals inside peaceful Buddhist gompas.',
      },
      {
        title: 'Sacred Cave Pilgrimage',
        description: 'Walk tranquil trails to the ancient meditation caves of Guru Padmasambhava in Pharping.',
      },
      {
        title: 'Mindfulness & Gentle Breathwork',
        description: 'Guided quiet walking meditations, restorative breathwork, and nourishing herbal nutrition.',
      },
    ],
    quote: 'The singing bowl does not force silence upon the mind; its pure harmonic vibration gently invites the mind home.',
    quoteAuthor: 'Singing Bowl Sound Master',
    badge: 'Restorative Wellness',
    relatedSlug: 'spiritual-immersion-singing-bowls',
  },
  {
    id: 'trekking',
    slug: 'trekking',
    title: 'Mountain Treks & Hidden Trails',
    nepaliTitle: 'शान्त हिमाली पदयात्रा',
    tagline: 'Slow Walking, Uncrowded Ridge Trails, Rhododendron Forests & Alpine Serenity',
    shortDescription: 'Experience Nepal on foot without the crowds. Gentle unhurried treks through Langtang, Helambu, Annapurna foothills, and Mustang rainshadow canyons.',
    fullPhilosophy: [
      'Commercial trekking highways with noisy lodges and crowded trails miss the true magic of the Himalayas. Explore With Sakar focuses on quiet, contemplative walking routes that prioritize pristine nature and intimate mountain communities.',
      'We practice slow trekking: walking at a natural, mindful pace with ample time to stop for tea, photograph mountain light, journal beside glacial streams, and converse with village shepherds.',
      'We maintain strict porter welfare standards with fair ethical wages, warm gear, comprehensive insurance, and strict load limits.',
    ],
    heroImage: {
      src: '/explore-with-sakar/images/trails/suspension-bridge.jpg',
      alt: 'Long suspension bridge crossing emerald river gorge with prayer flags',
    },
    keyFeatures: [
      {
        title: 'Crowd-Free Quiet Routes',
        description: 'Handpicked secondary trails through virgin rhododendron forests and secluded alpine pastures.',
      },
      {
        title: 'Unhurried Pacing & Acclimatization',
        description: 'Paced for comfort, observation, and gentle altitude adaptation rather than racing the clock.',
      },
      {
        title: 'Ethical Porter Welfare',
        description: 'Guaranteed fair wages, insurance, quality equipment, and humane weight limits for all mountain crew.',
      },
      {
        title: 'Leave No Trace Principles',
        description: 'Eco-conscious trail ethics preserving pristine mountain ecosystems for generations to come.',
      },
    ],
    quote: 'If we see an elder weaving bamboo or the clouds opening over the summit, we stop, brew tea, and savor the moment.',
    quoteAuthor: 'Sakar, Trek Director',
    badge: 'Slow Mountain Travel',
    relatedSlug: 'hidden-himalayan-trails-village-walks',
  },
  {
    id: 'custom-journeys',
    slug: 'custom-journeys',
    title: 'Bespoke Private Itinerary Curation',
    nepaliTitle: 'निजी तथा व्यक्तिगत यात्रा योजना',
    tagline: 'Tailor-Made Routes Designed Around Your Personal Rhythm, Dates & Curiosity',
    shortDescription: 'Every traveler is unique. We craft 100% private, bespoke Nepal journeys for solo travelers, couples, and multi-generational families with personal host care.',
    fullPhilosophy: [
      'No two travelers are alike. Some wish to spend three days in a quiet pottery courtyard; others dream of meditating at dawn on a high ridge or tasting wild honey with village beekeepers.',
      'Our bespoke curation begins with a personal conversation. Sakar listens to your travel dreams, physical comfort preferences, and dates, crafting a seamless, deeply considered journey from airport greeting to farewell blessing.',
      'You travel with complete flexibility, private vehicle comfort, handpicked lodgings, and Sakar’s dedicated personal accompaniment.',
    ],
    heroImage: {
      src: '/explore-with-sakar/images/mountains/mountain-ridge.jpg',
      alt: 'Scenic mountain ridge overlooking Himalayan horizon',
    },
    keyFeatures: [
      {
        title: 'Collaborative Route Design',
        description: 'Interactive itinerary tailoring until every day matches your preferred pace and passions.',
      },
      {
        title: 'Private & Flexible Travel',
        description: 'Exclusive private vehicle, private guide, and the agility to modify daily plans on the go.',
      },
      {
        title: 'Solo, Couple & Family Specialist',
        description: 'Thoughtful arrangements for solo traveler safety, romantic escapes, and family-friendly pacing.',
      },
      {
        title: '24/7 Personal Host Support',
        description: 'Direct contact with Sakar from initial planning through your entire time in Nepal.',
      },
    ],
    quote: 'We don’t sell packaged tours off a shelf; we co-create a personal chapter of your life in Nepal.',
    quoteAuthor: 'Explore With Sakar Team',
    badge: 'Bespoke Private',
    relatedSlug: 'kathmandu-heritage-living-culture',
  },
  {
    id: 'beyond-the-map',
    slug: 'beyond-the-map',
    title: 'Go Beyond the Map',
    nepaliTitle: 'नक्साभन्दा परको यात्रा',
    tagline: 'Step Past Grand Facades into Secret Residential Bahals, Untold Histories & Master Artisan Guilds',
    shortDescription: 'Step past the grand facades into the secret residential bahals of old Kathmandu, untold histories of Patan and Bhaktapur, master artisan guilds, and the sacred geometry of the Valley.',
    fullPhilosophy: [
      'Most visitors stop at the grand monuments. We walk past them, slipping into the hidden courtyards where the true pulse of the valley has beaten for centuries.',
      'Sakar leads you through spice-scented alleyways to meet multi-generational masters in their private studios, decode sacred mandala architecture, and witness living heritage in daily morning devotion.',
      'A slow, contemplative journey that honors the living residents and ancestral crafts of Nepal.',
    ],
    heroImage: {
      src: '/images/beyond-the-map/living-courtyards.jpg',
      alt: 'Hidden courtyards of old Kathmandu',
    },
    keyFeatures: [
      {
        title: 'Hidden Bahal Walks',
        description: 'Explore secretive residential courtyards and ancient trade stupas.',
      },
      {
        title: 'Artisan Lineage Deep-Dive',
        description: 'Behind-closed-doors sessions with master woodcarvers and bronze smiths.',
      },
      {
        title: 'Sacred Mandala Geometry',
        description: 'Decode the astronomical and architectural blueprint of the valley.',
      },
      {
        title: 'Unhurried Pacing',
        description: 'Ample time for tea, conversations with elders, and slow photography.',
      },
    ],
    quote: 'When we step off the tourist street through a low doorway, the noise disappears and the stones begin to speak.',
    quoteAuthor: 'Sakar, Founder & Host',
    badge: 'Signature Exploration',
    relatedSlug: 'living-courtyards-kathmandu',
  },
  {
    id: 'leave-a-mark',
    slug: 'leave-a-mark',
    title: 'Leave a Mark: Regenerative Travel & Community Conservation',
    nepaliTitle: 'सकारात्मक प्रभाव र दिगो संरक्षण',
    tagline: 'Community Projects, Village School Mentorship, River Care & Ethical Wildlife Stewardship',
    shortDescription: 'Travel that gives back more than it takes. Support women-led rural cooperatives, plant native trees, volunteer with mountain schools, and preserve endangered heritage.',
    fullPhilosophy: [
      'We believe travel should be regenerative, leaving ecosystems healthier and communities stronger than when we arrived.',
      'Leave a Mark connects travelers with grassroots conservation and education initiatives led directly by local community leaders. Rather than superficial performative volunteering, we participate in tangible, long-term programs requested by the communities themselves.',
      'A portion of every journey funds village drinking water filters, solar lighting, scholarship funds for rural girls, and wildlife buffer zone protection.',
    ],
    heroImage: {
      src: '/explore-with-sakar/images/trails/river-gorge.jpg',
      alt: 'Serene Himalayan river and forest conservation sanctuary',
    },
    keyFeatures: [
      {
        title: 'Community Cooperative Support',
        description: 'Direct investment in women-led handloom weaving and organic farming collectives.',
      },
      {
        title: 'Rural Education & Libraries',
        description: 'Supply books, solar learning tools, and school sports equipment to remote mountain schools.',
      },
      {
        title: 'Native Reforestation & Trail Care',
        description: 'Participate in indigenous rhododendron and oak planting along eroded ridgelines.',
      },
      {
        title: 'Ethical Wildlife Protection',
        description: 'Support community anti-poaching buffer zones around Chitwan and Annapurna sanctuaries.',
      },
    ],
    quote: 'True travel does not just change the traveler; it honors and uplifts the soil and people that hosted them.',
    quoteAuthor: 'Community Elder, Chitwan Buffer Zone',
    badge: 'Regenerative Impact',
    relatedSlug: 'chitwan-indigenous-wildlife-tharu',
  },
];

export function getServiceBySlug(slug: string): ServicePillar | undefined {
  return SERVICE_PILLARS.find((s) => s.slug === slug);
}
