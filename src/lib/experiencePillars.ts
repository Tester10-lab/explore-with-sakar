export interface ExperiencePillar {
  name: string;
  nepaliTitle?: string;
  introText: string;
  overviewText: string[];
  highlights: string[];
  heroImage: string;
  categoryFilter: string[];
  canonicalSlug: string;
}

export const EXPERIENCE_PILLARS: Record<string, ExperiencePillar> = {
  'beyond-the-map': {
    name: 'Beyond the Map',
    nepaliTitle: 'नक्साभन्दा परको यात्रा',
    introText: 'Guided exploration into medieval Bahals, ancient Silk Road trade corridors, and master workshops. Step beyond the common tourist map.',
    overviewText: [
      'If you want to understand Kathmandu, do not start with a monument. Start with a morning walk where the city wakes up in the narrow alleys of Ason. As the first rays of sunlight enter between old brick houses, the smell of spices, incense, fresh vegetables, and traditional sweets fills the air. Ason is not just a marketplace; it is a living memory standing along the ancient trade routes connecting the plains of India with the Tibetan plateau.',
      'One of Kathmandu’s greatest secrets is hidden not in its palaces, but in its neighbourhoods. The old settlements were designed around people—with homes, markets, temples, schools, and social spaces within walking distance.',
      'From Kathmandu Durbar Square to medieval Bhaktapur, the maker courtyards of Patan, and the laid-back waters of Pokhara, Beyond the Map is a journey through living history.',
    ],
    highlights: [
      'Dawn morning walk through spice-scented Ason alleys as wooden shutters open to morning devotion',
      'Entering Bhaktapur: vehicle-free brick lanes, master potters shaping clay, and fresh Juju Dhau',
      'Behind-the-scenes ateliers in Patan watching sacred deities forged and carved by hand',
      'Early morning silent wooden paddle boat on Phewa Lake reflecting sacred Machhapuchhre',
    ],
    heroImage: '/images/beyond-the-map/living-courtyards.jpg',
    categoryFilter: ['beyond-the-map', 'go-beyond', 'heritage'],
    canonicalSlug: 'beyond-the-map',
  },
  'go-within': {
    name: 'Go Within',
    nepaliTitle: 'भित्र जाऊ',
    introText: '7-metal singing bowl resonance, dawn monastery chanting, and sacred Padmasambhava meditation caves. Journey into Himalayan spiritual sanctuary.',
    overviewText: [
      'In a world consumed by digital noise and perpetual motion, the Himalayas offer an ancient technology of stillness. Go Within is not sightseeing; it is an unhurried inward pilgrimage rooted in centuries of living Buddhist and Vedic contemplative traditions.',
      'From the resonant vibrations of hand-hammered 7-metal singing bowls in sacred courtyards to the dawn chanting of monks reverberating through misty monastery halls, this journey creates the conditions for genuine mental clarity.',
      'Step into ancient meditation caves where great masters sat for decades, walk prayer-flag lined ridges in mindful silence, and rediscover the peace that was always waiting beneath the chatter of daily life.',
    ],
    highlights: [
      'Private singing bowl sound bath with master healers using planetary acoustic frequencies',
      'Dawn monastery puja witnessing sacred horn sounding, butter lamp lighting, and deep harmonic chanting',
      'Pilgrimage to Pharping’s sacred Asura Cave where Padmasambhava attained supreme realization',
      'Contemplative ridge walk between Thrangu Tashi Yangtse Monastery and the sacred Namo Buddha stupa',
    ],
    heroImage: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
    categoryFilter: ['go-within', 'go-spiritual', 'spiritual-wellness', 'spiritual'],
    canonicalSlug: 'go-within',
  },
  'spiritual-wellness': {
    name: 'Go Within',
    nepaliTitle: 'भित्र जाऊ',
    introText: '7-metal singing bowl resonance, dawn monastery chanting, and sacred Padmasambhava meditation caves. Journey into Himalayan spiritual sanctuary.',
    overviewText: [
      'In a world consumed by digital noise and perpetual motion, the Himalayas offer an ancient technology of stillness. Go Within is not sightseeing; it is an unhurried inward pilgrimage rooted in centuries of living Buddhist and Vedic contemplative traditions.',
      'From the resonant vibrations of hand-hammered 7-metal singing bowls in sacred courtyards to the dawn chanting of monks reverberating through misty monastery halls, this journey creates the conditions for genuine mental clarity.',
      'Step into ancient meditation caves where great masters sat for decades, walk prayer-flag lined ridges in mindful silence, and rediscover the peace that was always waiting beneath the chatter of daily life.',
    ],
    highlights: [
      'Private singing bowl sound bath with master healers using planetary acoustic frequencies',
      'Dawn monastery puja witnessing sacred horn sounding, butter lamp lighting, and deep harmonic chanting',
      'Pilgrimage to Pharping’s sacred Asura Cave where Padmasambhava attained supreme realization',
      'Contemplative ridge walk between Thrangu Tashi Yangtse Monastery and the sacred Namo Buddha stupa',
    ],
    heroImage: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
    categoryFilter: ['go-within', 'go-spiritual', 'spiritual-wellness', 'spiritual'],
    canonicalSlug: 'go-within',
  },
  'go-deeper': {
    name: 'Go Deeper',
    nepaliTitle: 'गहिरो जाऊ',
    introText: 'Immersive deep-dive journeys into Nepal\'s hidden layers and living traditions. Go beyond the surface and connect with the authentic pulse of the Himalayas.',
    overviewText: [
      'Most travelers only see the surface of Nepal: the famous monuments, the postcard mountain views, the bustling tourist shops. Go Deeper invites you to step beneath that veneer into the profound architectural mathematics, living kinship systems, and generational artisan knowledge that make the Kathmandu Valley one of the world\'s most complex living cultural landscapes.',
      'Walk with cultural anthropologists through ancient residential Bahals that function as five-generation living rooms. Decode the esoteric cosmic geometry of Newari temple complexes laid out according to sacred Tantric yantras.',
      'Stand shoulder-to-shoulder with master lost-wax bronze casters whose techniques have remained unchanged since the Licchavi dynasty. This is travel as deep cultural immersion and intellectual discovery.',
    ],
    highlights: [
      'Guided anthropological exploration through centuries-old Newari residential courtyard compounds',
      'Decoding the sacred cosmic geometry, astronomical alignments, and mandalic layouts of valley temples',
      'Private access to traditional artisan guilds: master repoussé metalsmiths, stone carvers, and woodwrights',
      'Unhurried dialogues with local heritage scholars and community elders on living cultural preservation',
    ],
    heroImage: '/explore-with-sakar/images/mountains/alpine-valley.jpg',
    categoryFilter: ['go-deeper'],
    canonicalSlug: 'go-deeper',
  },
  'leave-a-mark': {
    name: 'Leave a Mark',
    nepaliTitle: 'छाप छोड्नुहोस्',
    introText: 'Matching your actual professional skills with local communities in Nepal that need structural and administrative empowerment.',
    overviewText: [
      'Traditional voluntourism often focuses on short-term manual labor that feels good in the moment but leaves little lasting structural value for the community. Leave a Mark takes a radically different approach: we believe true responsible travel means pairing your actual professional capabilities—project management, financial planning, digital architecture, writing, and strategic communication—with grassroots Nepali initiatives that need administrative scaffolding.',
      'Many community cooperatives, indigenous forest collectives, and village schools have enormous passion and hard work, but they lack the administrative frameworks to secure international grants, track budgets, or streamline logistics.',
      'By dedicating a portion of your journey to quiet, high-level capacity building alongside local leaders, you leave behind an invisible but permanent foundation that continues to empower communities long after you return home.',
    ],
    highlights: [
      'Project proposal structuring and grant documentation for community-led environmental and cultural initiatives',
      'Mentoring and deliverable blueprints alongside Tamang and Tharu grassroots cooperative coordinators',
      'Hands-on participation in community-owned native tree reforestation and sacred forest stewardship',
      'Creating sustainable financial models, budget tracking systems, and transparent operational frameworks',
    ],
    heroImage: '/explore-with-sakar/images/trails/river-gorge.jpg',
    categoryFilter: ['leave-a-mark', 'responsible'],
    canonicalSlug: 'leave-a-mark',
  },
  'homestays': {
    name: 'Feel Closer',
    nepaliTitle: 'नजिक महसुस गर्नुहोस्',
    introText: 'Authentic family hospitality, woodstove cooking, and lifelong human bonds with Gurung, Tamang, and Newar hosts in Nepal\'s mountain villages.',
    overviewText: [
      'Authentic family hospitality, woodstove cooking, and lifelong human bonds with Gurung, Tamang, and Newar hosts in Nepal\'s mountain villages.',
      'Share hot cups of freshly brewed chai around clay hearths, participate in seasonal agricultural rhythms, and experience the warmth of true Nepali hospitality in homes that welcome you as family.',
    ],
    highlights: [
      'Home-cooked traditional meals prepared over wood-fired earthen hearths with village families',
      'Private heritage stays in carefully preserved traditional Gurung, Tamang, and Newari homesteads',
      'Seasonal participation in community agricultural rituals, millet harvesting, and seed planting',
      'Direct economic contribution supporting rural family livelihoods and mountain heritage conservation',
    ],
    heroImage: '/explore-with-sakar/images/homestays/village-meal.jpg',
    categoryFilter: ['feel-closer', 'homestays', 'homestay'],
    canonicalSlug: 'homestays',
  },
};
