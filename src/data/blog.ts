import { BlogPost, BlogCategory } from '@/types';

export const BLOG_CATEGORIES: { id: BlogCategory; label: string; description: string }[] = [
  {
    id: "Sakar's Journal",
    label: "Sakar's Journal",
    description: 'Personal reflections, lessons from guiding, and quiet moments on the road.',
  },
  {
    id: "Spiritual Nepal",
    label: "Spiritual Nepal",
    description: 'Experiential reflections on monasteries, sacred spaces, chanting, and inner stillness.',
  },
  {
    id: "Living Culture",
    label: "Living Culture",
    description: 'Stories of living traditions, Newari feasts, festival rhythms, and ancestral crafts.',
  },
  {
    id: "People & Places",
    label: "People & Places",
    description: 'Portraits of village elders, artisans, monks, farmers, and hidden corners of Nepal.',
  },
  {
    id: "Travel With Meaning",
    label: "Travel With Meaning",
    description: 'Responsible tourism, community homestays, ethical travel, and lasting human connection.',
  },
  {
    id: "Walking Nepal",
    label: "Walking Nepal",
    description: 'Experiential journeys along quiet mountain paths, village trails, and high ridges.',
  },
  {
    id: "Practical Nepal",
    label: "Practical Nepal",
    description: 'Thoughtful advice, monastery etiquette, altitude preparation, and cultural customs.',
  },
];

export const SAKAR_AUTHOR = {
  name: 'Sakar',
  role: 'Responsible Tour Director & Cultural Guide',
  avatar: '/explore-with-sakar/images/sakar/sakar-portrait.jpg',
  bio: 'Born in Nepal with deep roots in Himalayan heritage and community-based hospitality. As Responsible Tour Director, Sakar guides curious international travelers beyond mass tourism, facilitating authentic human connections, spiritual stillness, and sustainable village livelihoods.',
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'the-morning-i-learned-to-slow-down',
    title: 'The Morning I Learned to Slow Down in the Himalayas',
    subtitle: 'A quiet reflection on silence, woodsmoke, and the wisdom of mountain time.',
    excerpt: 'I have walked countless mountain paths across Nepal, but some mornings stay with you for reasons that have very little to do with the view.',
    category: "Sakar's Journal",
    author: SAKAR_AUTHOR,
    publishedAt: 'August 18, 2026',
    readingTime: '6 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
      alt: 'Morning sunlight breaking across the snow peaks in Nepal',
      caption: 'Dawn over the Annapurna range before the village awakens.',
    },
    tags: ['Reflection', 'Slow Travel', 'Himalayas', 'Village Life', 'Mindfulness'],
    isDraftSample: true,
    content: [
      {
        type: 'paragraph',
        content: 'I have walked countless mountain paths across Nepal, but some mornings stay with you for reasons that have very little to do with the view. In our rush to check peaks off a list or capture the perfect summit photo, we often miss the quiet cadence that makes these mountains truly transformative.',
      },
      {
        type: 'paragraph',
        content: 'A few seasons ago, while hosting a small group in a secluded Gurung village tucked beneath the Annapurna massif, I woke up well before first light. The rest of the world was asleep. The air carried the crisp chill of high-altitude frost, intertwined with the earthy scent of cedar woodsmoke from the outdoor hearth.',
      },
      {
        type: 'quote',
        content: 'Sometimes the most meaningful part of a journey is the moment when you stop trying to reach somewhere, and simply allow yourself to be exactly where you are.',
        attribution: "From Sakar's Journal",
      },
      {
        type: 'heading',
        level: 2,
        content: 'A Cup of Tea and Unspoken Understanding',
      },
      {
        type: 'paragraph',
        content: 'An elderly grandmother from the household, Aama, had already begun her morning routine. She was boiling water on the clay chulo (stove) for black tea infused with mountain ginger. She noticed me sitting on the flagstone porch and handed me a steaming glass cup without saying a single word. Her eyes carried eighty years of mountain winters, monsoon harvests, and festival celebrations.',
      },
      {
        type: 'twoImages',
        left: {
          src: '/explore-with-sakar/images/homestays/morning-tea-homestay.jpg',
          alt: 'Morning tea served on a wooden terrace overlooking mountain slopes',
          caption: 'Freshly brewed ginger tea on the veranda.',
        },
        right: {
          src: '/explore-with-sakar/images/homestays/stone-village-house.jpg',
          alt: 'Traditional stone farmhouse with slate roof in morning light',
          caption: 'The quiet courtyard at 6:00 AM.',
        },
        caption: 'Life moves to the rhythm of daylight, wood fires, and changing seasons in the high villages.',
      },
      {
        type: 'paragraph',
        content: 'We sat side by side for nearly forty-five minutes in complete silence. As the sun crested the ridge, turning the white peaks from cold blue to soft gold, I realized how rare true stillness has become for most travelers who visit us from busy global cities.',
      },
      {
        type: 'storyImageText',
        image: {
          src: '/explore-with-sakar/images/homestays/village-storyteller.jpg',
          alt: 'Village elder sharing stories in traditional Nepali clothing',
          caption: 'Aama and her family have called this ridge home for generations.',
        },
        text: 'In our modern lives, we are conditioned to fill every silence with conversation, photos, or notifications. But here in the mountain valleys, silence is not emptiness; it is a presence. It is the language through which the land and its people communicate their deep sense of peace.',
        imagePosition: 'right',
      },
      {
        type: 'heading',
        level: 2,
        content: 'What This Means for How We Travel',
      },
      {
        type: 'paragraph',
        content: 'When I design journeys for travelers today, I intentionally build in unhurried mornings. I ensure there is space to sit by a stone wall, to watch farmers guide their water buffalo down to the terraced fields, to listen to the distant ringing of prayer bells from the monastery above.',
      },
      {
        type: 'paragraph',
        content: 'Travel in Nepal should not be an endurance race. When you slow down, the mountains open up in ways that no guidebook can ever prepare you for.',
      },
    ],
    contextualCta: {
      title: 'Want to experience quiet mountain life for yourself?',
      description: 'Let us craft an unhurried, slow-paced journey with village homestays and authentic Himalayan encounters.',
      buttonText: 'Plan a Slow Travel Journey',
      experienceSlug: 'hidden-villages',
    },
    relatedSlugs: [
      'silence-in-a-himalayan-monastery',
      'staying-with-a-family-changes-travel',
      'walking-the-quiet-side-of-nepal',
    ],
  },
  {
    slug: 'silence-in-a-himalayan-monastery',
    title: 'What Silence Can Teach Us in a Buddhist Monastery',
    subtitle: 'Witnessing the dawn puja, the resonance of deep horns, and the medicine of still contemplation.',
    excerpt: 'Sitting in the cool shadows of a high monastery courtyard at 5:30 AM, watching monks light butter lamps as mist swirls through the valley.',
    category: 'Spiritual Nepal',
    author: SAKAR_AUTHOR,
    publishedAt: 'August 14, 2026',
    readingTime: '7 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/spiritual/monastery-interior.jpg',
      alt: 'Monastery prayer hall glowing with golden butter lamps and sacred thangkas',
      caption: 'Hundred butter lamps flickering inside a sacred Tibetan Buddhist gompa.',
    },
    tags: ['Buddhism', 'Monastery', 'Meditation', 'Spiritual Journey', 'Peace'],
    isDraftSample: true,
    content: [
      {
        type: 'paragraph',
        content: 'The low, resonant sound of the dungchen (long Himalayan horn) echoed through the mountain pine trees at 5:00 AM, calling the resident monks to the morning prayer hall. It was pitch black outside, save for the blanket of stars stretching across the Himalayan sky.',
      },
      {
        type: 'paragraph',
        content: 'Walking into the gompa (monastery hall), the aroma of juniper incense and warm clarified butter immediately envelops you. There is no performance here; what you witness is a sacred practice that has been maintained in unbroken lineage for over a thousand years.',
      },
      {
        type: 'quote',
        content: 'Meditation in Nepal is not an isolated exercise you do on a mat for an hour. It is woven into the very fabric of daily life — in how a cup of water is offered, how an elder greets you with folded palms, and how prayer wheels turn with the river current.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Chanting of Mantras and Inner Resonance',
      },
      {
        type: 'paragraph',
        content: 'As twenty monks began their rhythmic chanting in deep harmonic tones, the vibrations could be felt directly in your chest. The sound is designed not merely for the ears, but to calm the nervous system and anchor the wandering mind into the present moment.',
      },
      {
        type: 'twoImages',
        left: {
          src: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
          alt: 'Swayambhunath stupa with eyes of compassion and colorful prayer flags',
          caption: 'The all-seeing eyes of compassion watching over the valley.',
        },
        right: {
          src: '/explore-with-sakar/images/spiritual/meditation-session.jpg',
          alt: 'Singing bowl sound therapy and meditation setting',
          caption: 'Seven-metal singing bowls used in sound healing.',
        },
        caption: 'Spiritual practices in Nepal span ancient stupas, monastery halls, and sonic healing disciplines.',
      },
      {
        type: 'paragraph',
        content: 'I often encourage guests not to take out their cameras during these moments. Put the lens down. Close your eyes. Allow the reverberation of bronze singing bowls and Tibetan cymbals to wash over you. The mental clutter of airports, work deadlines, and travel logistics dissolves into pure stillness.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Humble Respect Over Mystification',
      },
      {
        type: 'paragraph',
        content: 'One important distinction I share with everyone I guide is that Nepali spirituality is grounded in everyday kindness. The monks are joyful people who laugh easily, share butter tea, and care deeply about their local communities. You do not need to adopt a new religion to feel the quiet blessings of these sacred places.',
      },
    ],
    contextualCta: {
      title: 'Curious to experience Nepal’s spiritual heritage?',
      description: 'Tell Sakar what you are seeking — whether singing bowl meditation, sacred monastery visits, or peaceful retreat spaces.',
      buttonText: 'Talk to Sakar About Spiritual Journeys',
      experienceSlug: 'spiritual-immersion',
    },
    relatedSlugs: [
      'the-morning-i-learned-to-slow-down',
      'buddhist-monastery-etiquette-nepal',
      'stories-hidden-inside-old-courtyards',
    ],
  },
  {
    slug: 'staying-with-a-family-changes-travel',
    title: 'Why Staying With a Family Can Change the Way You Travel',
    subtitle: 'Beyond hotel lobbies: stepping into the warm heart of everyday Nepali village life.',
    excerpt: 'Hotels provide comfort, but village homestays provide belonging. Here is why staying under a Nepali family’s roof transforms your relationship with travel.',
    category: 'Travel With Meaning',
    author: SAKAR_AUTHOR,
    publishedAt: 'August 10, 2026',
    readingTime: '5 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/homestays/village-meal.jpg',
      alt: 'A Nepali host family serving freshly prepared local meal around wooden hearth',
      caption: 'Gathering around the family kitchen table in a remote foothill village.',
    },
    tags: ['Homestays', 'Community Tourism', 'Hospitality', 'Culture', 'Meaningful Travel'],
    isDraftSample: true,
    content: [
      {
        type: 'paragraph',
        content: 'There is a sacred Sanskrit proverb in Nepal: "Atithi Devo Bhava" — The guest is God. In urban hotels, this is a slogan. In a traditional mountain village, it is a living, breathing reality practiced with every bowl of steamed rice and every freshly refilled cup of tea.',
      },
      {
        type: 'paragraph',
        content: 'When travelers join me on our community-based journeys, many initially ask if homestays will be basic or uncomfortable. My answer is always the same: they are wonderfully simple, but the warmth, safety, and human connection you receive are richer than any five-star resort.',
      },
      {
        type: 'quote',
        content: 'You do not just stay in Nepal; you stay with Nepal. You become a temporary son, daughter, or friend welcomed into a family’s hearth.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Rhythm of a Village Household',
      },
      {
        type: 'paragraph',
        content: 'A day in a village homestay begins with the crowing of roosters and the sweeping of the stone courtyard. Guests can step into the garden to pick fresh mustard greens (rayo ko saag), help grind spices on the silauto (traditional stone mortar), or simply sit on the wooden balcony watching the morning fog lift from the terraces.',
      },
      {
        type: 'twoImages',
        left: {
          src: '/explore-with-sakar/images/homestays/organic-farming.jpg',
          alt: 'Lush green terraced hillsides farmed organically by village families',
          caption: 'Fresh produce harvested 30 feet from the kitchen door.',
        },
        right: {
          src: '/explore-with-sakar/images/homestays/artisan-craftsman.jpg',
          alt: 'Local woodcarver working in his village workshop',
          caption: 'Supporting local village artisans directly.',
        },
        caption: 'Community tourism keeps village economies thriving while preserving ancestral knowledge.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Where Your Travel Dollars Truly Go',
      },
      {
        type: 'paragraph',
        content: 'When you stay in a locally managed homestay through Explore With Sakar, 100% of your lodging and meal fees go directly into the hands of the host family. It pays for children’s school supplies, solar water heaters, and organic seed varieties. This is how travel becomes a mutual blessing rather than an extractive industry.',
      },
    ],
    contextualCta: {
      title: 'Ready to experience authentic village hospitality?',
      description: 'Explore our hand-selected homestays where families welcome you as honored kin.',
      buttonText: 'Explore Homestay Experiences',
      experienceSlug: 'village-homestay',
    },
    relatedSlugs: [
      'the-morning-i-learned-to-slow-down',
      'a-morning-inside-a-village-home',
      'walking-the-quiet-side-of-nepal',
    ],
  },
  {
    slug: 'a-morning-inside-a-village-home',
    title: 'A Morning Inside a Nepali Village Home: Food, Hearth & Stories',
    subtitle: 'From grinding fresh coriander on stone to sharing laughter over steaming dal bhat.',
    excerpt: 'The kitchen in a traditional Nepali home is the sacred center of family life. Step inside the fragrant world of woodfire cooking and genuine mountain hospitality.',
    category: 'Living Culture',
    author: SAKAR_AUTHOR,
    publishedAt: 'August 06, 2026',
    readingTime: '6 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/homestays/stone-village-house.jpg',
      alt: 'Traditional stone farmhouse with wooden balconies and mountain background',
      caption: 'A traditional Newari and Gurung stone home in the middle hills.',
    },
    tags: ['Nepali Food', 'Tradition', 'Village Hearth', 'Living Culture', 'Newari Culture'],
    isDraftSample: true,
    content: [
      {
        type: 'paragraph',
        content: 'Long before electric blenders and gas stoves reached the Himalayan foothills, Nepali kitchens were designed around the sacred hearth. In rural communities, cooking is not a chore; it is an intimate daily celebration of the earth’s harvest and family bonds.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Anatomy of a Authentic Dal Bhat',
      },
      {
        type: 'paragraph',
        content: 'Foreign travelers often think Dal Bhat is just lentils and rice. But a genuine village meal prepared with organic seasonal harvest is an art form. It includes aromatic lentil soup simmered with wild jimbu herbs from Mustang, organic brown rice, fiery tomato-coriander chutney, fermented gundruk, and fresh saag plucked from the terrace minutes before cooking.',
      },
      {
        type: 'storyImageText',
        image: {
          src: '/explore-with-sakar/images/homestays/village-meal.jpg',
          alt: 'Family and travelers enjoying meal together',
          caption: 'Every meal is offered with boundless refills and genuine joy.',
        },
        text: 'In our culture, asking for seconds is the highest compliment you can pay your host. Your host will stand over you with a ladle, smiling warmly and saying "Ali ali thapnus!" (Take just a little more!), ensuring no traveler ever leaves the table with anything less than a full heart and stomach.',
        imagePosition: 'left',
      },
      {
        type: 'paragraph',
        content: 'Sitting cross-legged on handmade straw mats (gundri), eating with your fingers while listening to grandfather recount tales of migration and festival rituals, is an experience that no restaurant in the world can replicate.',
      },
    ],
    contextualCta: {
      title: 'Taste authentic Nepali culinary culture',
      description: 'Join Sakar on a food and heritage journey celebrating regional delicacies, village cooking classes, and Newari banquets.',
      buttonText: 'Discover Nepali Food Journeys',
      experienceSlug: 'cultural-immersion',
    },
    relatedSlugs: [
      'staying-with-a-family-changes-travel',
      'stories-hidden-inside-old-courtyards',
      'buddhist-monastery-etiquette-nepal',
    ],
  },
  {
    slug: 'stories-hidden-inside-old-courtyards',
    title: "The Stories Hidden Inside Kathmandu's Ancient Bahals",
    subtitle: 'Step beyond the tourist ticket gates into the secret, living courtyards of the Kathmandu Valley.',
    excerpt: 'Behind the bustling modern motorbikes and shopfronts lie sacred courtyards where time stands still, water spouts flow with mountain springs, and daily rituals continue undisturbed.',
    category: 'People & Places',
    author: SAKAR_AUTHOR,
    publishedAt: 'July 29, 2026',
    readingTime: '5 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/heritage/ancient-alleyways.jpg',
      alt: 'Ancient narrow brick alleyway leading to a sunlit historic courtyard',
      caption: 'A secluded bahal (courtyard) in Patan, shaded from modern traffic.',
    },
    tags: ['Kathmandu', 'Newari Architecture', 'Heritage', 'Ancient Courtyards', 'History'],
    isDraftSample: true,
    content: [
      {
        type: 'paragraph',
        content: 'Most tourists visit Patan or Bhaktapur, snap a photo in front of the major palace pagodas, and leave within an hour. But the true magic of the Kathmandu Valley does not exist in the grand monuments alone — it lives in the intricate network of hundreds of residential courtyards known as Bahas and Bahis.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Architecture Built for Human Community',
      },
      {
        type: 'paragraph',
        content: 'Centuries ago, Newari architects designed these enclosed brick courtyards with small, low wooden doorways. They served a dual purpose: defending against medieval invaders and creating private communal sanctuaries where families dried mustard seeds, spun cotton, and watched children play around central stone stupas.',
      },
      {
        type: 'twoImages',
        left: {
          src: '/explore-with-sakar/images/heritage/newari-architecture.jpg',
          alt: 'Carved wooden peacock window and traditional struts',
          caption: 'Hand-carved wooden windows dating back over 400 years.',
        },
        right: {
          src: '/explore-with-sakar/images/heritage/temple-courtyard.jpg',
          alt: 'Devotees and brass prayer wheels in historic temple',
          caption: 'A living shrine where neighbours offer morning flowers.',
        },
        caption: 'Sacred art in Kathmandu is not confined to museums; it is part of daily communal life.',
      },
      {
        type: 'paragraph',
        content: 'When I walk with guests through Asan and Patan, we slip through narrow archways where travelers rarely venture. Within seconds, the noise of traffic vanishes, replaced by the soft chirp of pigeons, the clinking of copper water pots, and the rhythmic chant of elder artisans polishing Buddhist statues.',
      },
    ],
    contextualCta: {
      title: 'Explore Kathmandu’s secret heritage with Sakar',
      description: 'Experience guided heritage walks into hidden courtyards, artisan workshops, and private Newari homes.',
      buttonText: 'Plan a Heritage Walking Tour',
      experienceSlug: 'kathmandu-heritage',
    },
    relatedSlugs: [
      'a-morning-inside-a-village-home',
      'the-morning-i-learned-to-slow-down',
      'buddhist-monastery-etiquette-nepal',
    ],
  },
  {
    slug: 'walking-the-quiet-side-of-nepal',
    title: 'Beyond the Famous Trails: Walking Into the Quiet Side of Nepal',
    subtitle: 'Why skipping crowded base-camp highways reveals the purest Himalayan soul.',
    excerpt: 'Famous trekking routes have become crowded with tea-house chains and selfie sticks. Here is why trekking through quiet community ridges offers a far more profound connection.',
    category: 'Walking Nepal',
    author: SAKAR_AUTHOR,
    publishedAt: 'July 22, 2026',
    readingTime: '7 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/mountains/alpine-valley.jpg',
      alt: 'Quiet trail through pristine alpine valley with mountain stream',
      caption: 'Walking through undisturbed wilderness in the Langtang and Helambu ridges.',
    },
    tags: ['Trekking', 'Hidden Trails', 'Himalayas', 'Slow Walking', 'Adventure'],
    isDraftSample: true,
    content: [
      {
        type: 'paragraph',
        content: 'Every year, thousands of international hikers land in Kathmandu with a single goal: reaching Everest Base Camp or completing the Annapurna Circuit. While these routes possess undeniable beauty, they have also transformed into busy tourist thoroughfares with WiFi cafes, bakery chains, and long queues on suspension bridges.',
      },
      {
        type: 'paragraph',
        content: 'For travelers seeking genuine reflection, solitude, and authentic cultural immersion, Nepal offers thousands of kilometers of lesser-known trails where you will not encounter another tour group for days.',
      },
      {
        type: 'quote',
        content: 'The value of walking in the mountains is not how high your altimeter reads; it is the quality of attention you bring to every step.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Trails Where Culture Outshines Crowds',
      },
      {
        type: 'paragraph',
        content: 'Routes such as the Tamang Heritage Trail, the sacred Gosainkunda lakes, the high ridges of Helambu, and the remote valleys of Ruby Valley wind through authentic agrarian villages. Along these paths, local children wave with genuine excitement, lodge hosts cook alongside you, and mountain ridges remain pristine.',
      },
      {
        type: 'twoImages',
        left: {
          src: '/explore-with-sakar/images/trails/rhododendron-forest.jpg',
          alt: 'Sunlight filtering through mossy rhododendron trees',
          caption: 'Ancient forests alive with birdsong and mountain mist.',
        },
        right: {
          src: '/explore-with-sakar/images/trails/suspension-bridge.jpg',
          alt: 'Long suspension bridge spanning turquoise river canyon',
          caption: 'Quiet suspension crossings over pristine glacial rivers.',
        },
        caption: 'Off-the-beaten-track trails offer unfiltered nature and authentic human encounters.',
      },
      {
        type: 'paragraph',
        content: 'On these quiet journeys, walking becomes a form of moving meditation. Your breath synchronizes with the slope, your senses awaken to the scent of pine needles, and the vast scale of the Himalayas reminds you of what truly matters in life.',
      },
    ],
    contextualCta: {
      title: 'Looking for a private, off-the-beaten-path trek?',
      description: 'Sakar designs custom walking itineraries tailored to your fitness level, interests, and desire for tranquility.',
      buttonText: 'Design a Custom Trek',
      experienceSlug: 'hidden-villages',
    },
    relatedSlugs: [
      'the-morning-i-learned-to-slow-down',
      'staying-with-a-family-changes-travel',
      'buddhist-monastery-etiquette-nepal',
    ],
  },
  {
    slug: 'buddhist-monastery-etiquette-nepal',
    title: 'How to Respectfully Visit a Buddhist Monastery in Nepal',
    subtitle: 'A thoughtful guide for foreign travelers on dress, photography, clockwise walking, and cultural respect.',
    excerpt: 'Visiting a Himalayan monastery or stupa is one of Nepal’s most uplifting experiences. Here is what every conscious traveler should know before stepping inside.',
    category: 'Practical Nepal',
    author: SAKAR_AUTHOR,
    publishedAt: 'July 15, 2026',
    readingTime: '6 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
      alt: 'Buddhist stupa with prayer flags fluttering in mountain breeze',
      caption: 'The sacred stupa of Swayambhunath and Boudhanath.',
    },
    tags: ['Monastery Etiquette', 'Cultural Tips', 'Buddhism', 'Travel Advice', 'Respect'],
    isDraftSample: true,
    content: [
      {
        type: 'paragraph',
        content: 'Himalayan monasteries (Gompas) and sacred stupas are not tourist attractions or photo studios — they are active spiritual sanctuaries, monastic schools, and places of profound daily devotion. Approaching them with mindfulness, quiet awareness, and cultural etiquette ensures that your presence is a blessing rather than an intrusion.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Essential Etiquette Guidelines',
      },
      {
        type: 'practicalTips',
        title: 'Monastery & Stupa Protocol for Foreign Travelers',
        items: [
          {
            point: 'Always Walk Clockwise (Kora)',
            explanation: 'When walking around a stupa, shrine, mani stone wall, or temple, always walk in a clockwise direction with the sacred structure to your right side.',
          },
          {
            point: 'Remove Shoes & Headwear Before Entering',
            explanation: 'Take off your shoes and hats before entering the main prayer hall (gompa). Place them neatly on the shoe racks outside.',
          },
          {
            point: 'Dress Modestly with Covered Shoulders and Knees',
            explanation: 'Avoid sleeveless tops, short shorts, or revealing clothing. Loose, comfortable pants and a lightweight shawl are ideal.',
          },
          {
            point: 'Never Point Your Feet Toward Shrines or Monks',
            explanation: 'When sitting in a monastery hall, tuck your legs under or sit cross-legged. Pointing the soles of your feet toward Buddha statues or spiritual teachers is considered disrespectful in Nepali and Tibetan culture.',
          },
          {
            point: 'Ask Permission Before Photographing Monks',
            explanation: 'Never interrupt a monk during active chanting or meditation for a selfie. Most monasteries prohibit photography inside the main altar room — always look for signs or ask your guide first.',
          },
          {
            point: 'Do Not Step Over Sacred Items or Doorway Thresholds',
            explanation: 'Step cleanly over wooden raised door thresholds without stepping directly on top of them, as thresholds represent boundaries between the mundane and sacred realms.',
          },
          {
            point: 'Leave a Modest Donation (Daan)',
            explanation: 'Monasteries welcome travelers warmly without admission fees. Leaving a modest cash offering (e.g., 50 to 200 rupees) in the donation box helps support young novice monks and elderly caretakers.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: 'When you travel with Explore With Sakar, I personally guide you through each sacred site, explaining the symbolism of murals, mandalas, and ritual instruments while ensuring you feel completely at ease and culturally respectful throughout your visit.',
      },
    ],
    contextualCta: {
      title: 'Planning your visit to Nepal’s sacred sites?',
      description: 'Sakar offers personalized spiritual and cultural consultations to help you prepare your journey with confidence.',
      buttonText: 'Consult With Sakar',
      experienceSlug: 'spiritual-immersion',
    },
    relatedSlugs: [
      'silence-in-a-himalayan-monastery',
      'stories-hidden-inside-old-courtyards',
      'the-morning-i-learned-to-slow-down',
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory | 'All'): BlogPost[] {
  if (category === 'All') return BLOG_POSTS;
  return BLOG_POSTS.filter((p) => p.category === category);
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, count);

  // Match by relatedSlugs first, then by same category
  const explicitRelated = BLOG_POSTS.filter((p) => current.relatedSlugs.includes(p.slug));
  if (explicitRelated.length >= count) return explicitRelated.slice(0, count);

  const categoryRelated = BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.category === current.category && !explicitRelated.includes(p)
  );

  const combined = [...explicitRelated, ...categoryRelated];
  if (combined.length >= count) return combined.slice(0, count);

  const others = BLOG_POSTS.filter((p) => p.slug !== currentSlug && !combined.includes(p));
  return [...combined, ...others].slice(0, count);
}
