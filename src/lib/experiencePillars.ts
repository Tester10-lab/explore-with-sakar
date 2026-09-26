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
      'From Kathmandu Durbar Square to medieval Bhaktapur, the maker courtyards of Patan, the laid-back waters of Pokhara, and the wild rivers of Chitwan, Beyond the Map is a journey through living history and nature.',
    ],
    highlights: [
      'Dawn morning walk through spice-scented Ason alleys as wooden shutters open to morning devotion',
      'Entering Bhaktapur: vehicle-free brick lanes, master potters shaping clay, and fresh Juju Dhau',
      'Behind-the-scenes ateliers in Patan watching sacred deities forged and carved by hand',
      'Early morning silent wooden paddle boat on Phewa Lake reflecting sacred Machhapuchhre',
      'Gliding down Rapti River in Chitwan at dawn in a silent wooden dugout canoe beside Tharu naturalists',
    ],
    heroImage: '/images/beyond-the-map/living-courtyards.jpg',
    categoryFilter: ['beyond-the-map', 'go-beyond', 'heritage'],
    canonicalSlug: 'beyond-the-map',
  },
  'go-spiritual': {
    name: 'Go Spiritual',
    nepaliTitle: 'आध्यात्मिक शान्ति',
    introText: 'Immerse in ancient Tibetan singing bowl sound therapy, dawn monastery chant pujas, and the tranquil stillness of sacred Himalayan power places.',
    overviewText: [
      'For thousands of years, the high ridges, pine valleys, and sacred caves of Nepal have served as the world’s most potent sanctuary for yogis, meditators, and those seeking mental clarity.',
      'We craft gentle, contemplative journeys focused on acoustic sound resonance, dawn monastery prayers, mindful walking, and pure presence. Rather than dogmatic practice, our approach is experiential, peaceful, and restorative.',
    ],
    highlights: [
      'Private 7-metal Tibetan singing bowl sound sessions tuned to planetary frequencies',
      'Dawn monastery pujas and butter lamp offerings with monastic communities',
      'Pilgrimages to Guru Padmasambhava sacred meditation caves in Pharping',
      'Mindful ridge walks and gentle restorative breathwork in mountain air',
    ],
    heroImage: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
    categoryFilter: ['go-spiritual', 'spiritual-wellness', 'spiritual'],
    canonicalSlug: 'go-spiritual',
  },
  'spiritual-wellness': {
    name: 'Go Spiritual',
    nepaliTitle: 'आध्यात्मिक शान्ति',
    introText: 'Immerse in ancient Tibetan singing bowl sound therapy, dawn monastery chant pujas, and the tranquil stillness of sacred Himalayan power places.',
    overviewText: [
      'For thousands of years, the high ridges, pine valleys, and sacred caves of Nepal have served as the world’s most potent sanctuary for yogis, meditators, and those seeking mental clarity.',
      'We craft gentle, contemplative journeys focused on acoustic sound resonance, dawn monastery prayers, mindful walking, and pure presence. Rather than dogmatic practice, our approach is experiential, peaceful, and restorative.',
    ],
    highlights: [
      'Private 7-metal Tibetan singing bowl sound sessions tuned to planetary frequencies',
      'Dawn monastery pujas and butter lamp offerings with monastic communities',
      'Pilgrimages to Guru Padmasambhava sacred meditation caves in Pharping',
      'Mindful ridge walks and gentle restorative breathwork in mountain air',
    ],
    heroImage: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
    categoryFilter: ['go-spiritual', 'spiritual-wellness', 'spiritual'],
    canonicalSlug: 'go-spiritual',
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

