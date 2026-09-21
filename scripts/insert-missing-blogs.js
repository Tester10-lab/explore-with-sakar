const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('sakar dai blog.md', 'utf8');
const lines = content.split('\n');

function getRangeText(startLine, endLine) {
  return lines.slice(startLine - 1, endLine).join('\n').trim();
}

function parseParagraphs(rawText) {
  const blocks = [];
  const paras = rawText.split(/\n\s*\n/);
  paras.forEach(p => {
    const trimmed = p.trim();
    if (!trimmed) return;
    
    if (trimmed.startsWith('###') || trimmed.startsWith('##') || trimmed.startsWith('#')) {
      const headingText = trimmed.replace(/^#+\s*/, '').replace(/\*+/g, '').trim();
      blocks.push({ type: 'heading', level: 2, content: headingText });
    } else if (trimmed.startsWith('***') && trimmed.endsWith('***')) {
      const quoteText = trimmed.replace(/\*\*\*/g, '').trim();
      blocks.push({ type: 'quote', content: quoteText, attribution: "Sakar's Journal" });
    } else {
      const cleaned = trimmed.replace(/\\\*/g, '*').replace(/\\\-/g, '-');
      blocks.push({ type: 'paragraph', content: cleaned });
    }
  });
  return blocks;
}

const defaultAuthor = {
  name: 'Sakar',
  role: 'Responsible Tour Director & Cultural Guide',
  avatar: '/explore-with-sakar/images/sakar/sakar-portrait.jpg',
  bio: 'Born in Nepal with deep roots in Himalayan heritage and community-based hospitality. As Responsible Tour Director, Sakar guides curious international travelers beyond mass tourism, facilitating authentic human connections, spiritual stillness, and sustainable village livelihoods.'
};

const newBlogsDefs = [
  {
    slug: 'kathmandu-valleys-hidden-spiritual-heritage',
    title: "Kathmandu Valley's Hidden Spiritual Heritage: The Sacred Geometry of Kathmandu, Patan and Bhaktapur",
    subtitle: 'Behind the temples and sacred boundaries lies a living mandala where geography and spirituality connect.',
    excerpt: 'Behind the temples, courtyards and sacred boundaries lies a world of Shaiva, Vaishnava, Shakta and Buddhist traditions, where each deity carries a role in maintaining cosmic balance.',
    category: 'Spiritual Nepal',
    pillar: 'go-within',
    publishedAt: 'September 5, 2026',
    readingTime: '5 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/beyond-the-map/sacred-geometry.jpg',
      alt: 'Sacred geometry and mandala shrines of Kathmandu Valley',
      caption: 'Sacred geometry woven into the temple architecture of Patan and Bhaktapur.'
    },
    tags: ['Spiritual Heritage', 'Sacred Geometry', 'Kathmandu Valley', 'Go Within', 'Tantra'],
    startLine: 256,
    endLine: 276
  },
  {
    slug: 'a-leisurely-walk-through-pashupati',
    title: 'A Leisurely Walk Through Pashupati: Where Life Meets Eternity',
    subtitle: 'As the morning sun touches the Bagmati River, sacred ghats reveal the eternal cycle of existence.',
    excerpt: 'A leisurely walk through Pashupati is a journey into the deeper rhythm of life. As the morning sun touches the Bagmati River, the sacred cremation ghats quietly reveal the eternal cycle of existence.',
    category: 'Spiritual Nepal',
    pillar: 'go-within',
    publishedAt: 'September 6, 2026',
    readingTime: '4 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/heritage/sacred-shrine.jpg',
      alt: 'Morning light by the sacred temples of Pashupati',
      caption: 'Quiet reflections by the sacred waters of Bagmati at Pashupatinath.'
    },
    tags: ['Pashupatinath', 'Spiritual Reflection', 'Go Within', 'Impermanence'],
    startLine: 277,
    endLine: 281
  },
  {
    slug: 'himalayan-shamanism-ancient-bridge',
    title: 'Himalayan Shamanism: Nepal’s Ancient Bridge Between Nature and Spirit',
    subtitle: 'Beyond temples and monasteries exists ancestral wisdom carried through mountains, rivers, and healers.',
    excerpt: 'Beyond Nepal’s famous temples and monasteries exists another spiritual world—one carried through mountains, forests, rivers and generations of ancestral wisdom.',
    category: 'Spiritual Nepal',
    pillar: 'go-within',
    publishedAt: 'September 7, 2026',
    readingTime: '6 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/spiritual/meditation-session.jpg',
      alt: 'Himalayan shamanic wisdom and ancestral connection',
      caption: 'Sitting with spiritual practitioners in the mountain foothills.'
    },
    tags: ['Shamanism', 'Dhami Jhankri', 'Indigenous Wisdom', 'Go Within'],
    startLine: 282,
    endLine: 301
  },
  {
    slug: 'beyond-names',
    title: 'Beyond Names: The Essence of Shamanic Wisdom',
    subtitle: 'The shamanic traditions helped me see rituals not as performance, but as deep relationships with nature.',
    excerpt: 'Sitting with the shaman, I began to understand that ancient traditions are not only about rituals; they are about relationships—our relationship with ourselves, with nature, and with our ancestors.',
    category: 'Spiritual Nepal',
    pillar: 'go-within',
    publishedAt: 'September 8, 2026',
    readingTime: '5 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/spiritual/monastery-interior.jpg',
      alt: 'Quiet meditation space and sacred objects',
      caption: 'A sacred space where silence and ancient teachings meet.'
    },
    tags: ['Shamanic Wisdom', 'Self-Discovery', 'Mindfulness', 'Go Within'],
    startLine: 302,
    endLine: 320
  },
  {
    slug: 'the-cosmic-language-of-sound',
    title: 'The Cosmic Language of Sound: Vibration and Inner Harmony',
    subtitle: 'In Nada Yoga, sound is not just music—it is a sacred pathway to discovering subtle stillness within.',
    excerpt: 'Every movement in the universe carries a rhythm. The movement of planets, the flow of rivers, the breath of humans, and the vibration of sound connect us to a larger harmony.',
    category: 'Spiritual Nepal',
    pillar: 'go-within',
    publishedAt: 'September 9, 2026',
    readingTime: '6 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/spiritual/meditation-session.jpg',
      alt: 'Sound healing bowls and meditation in Nepal',
      caption: 'Tibetan singing bowls and the resonant stillness of Nada Yoga.'
    },
    tags: ['Nada Yoga', 'Sound Healing', 'Singing Bowls', 'Go Within', 'Chakras'],
    startLine: 321,
    endLine: 355
  },
  {
    slug: 'the-essence-of-buddhism-journey',
    title: 'The Essence of Buddhism: A Journey Beyond Sacred Places',
    subtitle: 'Buddhism is not only visiting stupas—it is a path to understand the mind and transform suffering.',
    excerpt: 'From the peaceful hills of Kopan Monastery to the ancient whispers of Swayambhunath, Buddhism reminds us that the true pilgrimage is not measured by distance, but by inner change.',
    category: 'Spiritual Nepal',
    pillar: 'go-within',
    publishedAt: 'September 10, 2026',
    readingTime: '4 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
      alt: 'Sacred Buddhist stupa in Kathmandu Valley',
      caption: 'Prayer flags flutter over the ancient stupas of Kathmandu.'
    },
    tags: ['Buddhism', 'Mindfulness', 'Compassion', 'Go Within', 'Pilgrimage'],
    startLine: 356,
    endLine: 364
  },
  {
    slug: 'taudaha-and-pharping-living-stories',
    title: 'Taudaha and Pharping: A Journey Through Living Stories of the Valley',
    subtitle: 'From the mythical serpent king of Taudaha to the sacred meditation caves of Guru Rinpoche.',
    excerpt: 'Just outside the busy rhythm of Kathmandu lies a place where mythology, nature and spirituality meet—Taudaha Lake and the sacred meditation caves of Pharping.',
    category: 'Spiritual Nepal',
    pillar: 'go-within',
    publishedAt: 'September 11, 2026',
    readingTime: '6 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/trails/sacred-mountain-lake.jpg',
      alt: 'Quiet waters and sacred hills of Taudaha and Pharping',
      caption: 'Where serpent legends and sacred Buddhist caves reside in peace.'
    },
    tags: ['Taudaha', 'Pharping', 'Guru Rinpoche', 'Go Within', 'Mythology'],
    startLine: 365,
    endLine: 380
  },
  {
    slug: 'nepali-birth-chart-astrology-journey',
    title: 'Nepali Birth Chart (Jat): The Connection Between Astrology and Life Journey',
    subtitle: 'The Janma Kundali as a symbolic cultural bridge between humans, stars, and the cosmos.',
    excerpt: 'The moment a child takes the first breath into this world, ancient traditions believe that the sky above carries a unique story preserved through Janma Kundali.',
    category: 'Spiritual Nepal',
    pillar: 'go-within',
    publishedAt: 'September 12, 2026',
    readingTime: '4 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/beyond-the-map/echoes-in-stone.jpg',
      alt: 'Ancient astrological inscriptions and cosmic charts in Nepal',
      caption: 'A Janma Kundali is a cultural map connecting human life with celestial rhythms.'
    },
    tags: ['Astrology', 'Kundali', 'Cosmic Connection', 'Go Within', 'Heritage'],
    startLine: 381,
    endLine: 388
  },
  {
    slug: 'kathmandu-durbar-square-every-stone-holds-a-story',
    title: 'Kathmandu Durbar Square: Where Every Stone Holds a Story',
    subtitle: 'If you want to understand Kathmandu, start with an early morning walk through Ason.',
    excerpt: 'As the first rays of sunlight enter between old brick houses, the smell of spices, incense, fresh vegetables, and traditional sweets fills the air. Ason is not just a marketplace—it is living memory.',
    category: 'Living Culture',
    pillar: 'go-beyond',
    publishedAt: 'September 13, 2026',
    readingTime: '8 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/heritage/durbar-square.jpg',
      alt: 'Pagoda temples of Kathmandu Durbar Square',
      caption: 'Centuries of Licchavi and Malla craftsmanship standing proud in Kathmandu.'
    },
    tags: ['Kathmandu Durbar Square', 'Ason', 'Newar Architecture', 'Go Beyond The Map'],
    startLine: 393,
    endLine: 512
  },
  {
    slug: 'exploring-bhaktapur-durbar-square',
    title: 'Exploring Bhaktapur Durbar Square: A Walk Through Nepal’s Living Medieval City',
    subtitle: 'Bhaktapur is not a museum where history stopped; it is a city where life continues in its ancient rhythm.',
    excerpt: 'When you arrive at Bhaktapur Durbar Square, you do not feel like you have reached a monument. You feel like you stepped through a doorway into another century.',
    category: 'Living Culture',
    pillar: 'go-beyond',
    publishedAt: 'September 14, 2026',
    readingTime: '7 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/heritage/newari-architecture.jpg',
      alt: 'Intricate wood carving and brickwork in Bhaktapur',
      caption: 'The master potters and woodcarvers of ancient Bhaktapur.'
    },
    tags: ['Bhaktapur', 'Living Heritage', 'Pottery Square', 'Go Beyond The Map'],
    startLine: 513,
    endLine: 576
  },
  {
    slug: 'patan-durbar-square-hidden-courtyards-living-craft',
    title: 'Patan Durbar Square: The City of Hidden Courtyards and Living Craft',
    subtitle: 'The master metalworkers, quiet bahals, and golden shrines of ancient Lalitpur.',
    excerpt: 'There is something different about Patan. If Kathmandu is vibrant and energetic, Patan feels thoughtful and artistic—a sanctuary for master metalworkers and hidden courtyards.',
    category: 'Living Culture',
    pillar: 'go-beyond',
    publishedAt: 'September 15, 2026',
    readingTime: '8 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/beyond-the-map/artisan-path.jpg',
      alt: 'Courtyards and bronze statues of Patan Lalitpur',
      caption: 'Walking between sacred shrines in the city of fine arts.'
    },
    tags: ['Patan', 'Lalitpur', 'Master Artisans', 'Courtyards', 'Go Beyond The Map'],
    startLine: 577,
    endLine: 682
  },
  {
    slug: 'pokhara-the-laid-back-city',
    title: 'Pokhara: The Laid Back City of Lakes and Annapurna Horizons',
    subtitle: 'Some places make you want to see everything. Pokhara makes you want to stay.',
    excerpt: 'The morning light on the lake. The sound of paddles touching the water. A distant temple bell. Pokhara can make you contemplative at dawn and adventurous by afternoon.',
    category: 'Walking Nepal',
    pillar: 'go-beyond',
    publishedAt: 'September 16, 2026',
    readingTime: '9 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/mountains/himalayan-peaks.jpg',
      alt: 'Phewa Lake with Annapurna mountain reflections in Pokhara',
      caption: 'Dawn reflections on the tranquil waters of Pokhara.'
    },
    tags: ['Pokhara', 'Phewa Lake', 'Annapurna', 'Go Beyond The Map', 'Slow Travel'],
    startLine: 683,
    endLine: 908
  },
  {
    slug: 'chitwan-national-park-sauraha-wild-heart',
    title: 'Chitwan National Park: Sauraha Where the Wild Heart of Nepal Beats',
    subtitle: 'Entering the morning mist of the Terai jungle where rhinos and ancient Tharu cultures thrive.',
    excerpt: 'Chitwan is one of those rare destinations where nature, wildlife conservation and Tharu culture come together along the tranquil banks of the Rapti River.',
    category: 'People & Places',
    pillar: 'go-beyond',
    publishedAt: 'September 17, 2026',
    readingTime: '6 min read',
    featuredImage: {
      src: '/explore-with-sakar/images/trails/rhododendron-forest.jpg',
      alt: 'Forest wilderness and nature in Chitwan Nepal',
      caption: 'The quiet jungle trails and riverbanks of Sauraha, Chitwan.'
    },
    tags: ['Chitwan', 'Wildlife', 'Tharu Culture', 'Go Beyond The Map'],
    startLine: 909,
    endLine: 933
  }
];

function updateStore(filePath) {
  if (!fs.existsSync(filePath)) return;
  const store = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!Array.isArray(store.blogs)) {
    store.blogs = [];
  }

  let addedCount = 0;
  for (const def of newBlogsDefs) {
    const exists = store.blogs.some(b => b.slug === def.slug || (b.title && b.title.toLowerCase() === def.title.toLowerCase()));
    if (!exists) {
      const rawText = getRangeText(def.startLine, def.endLine);
      const blocks = parseParagraphs(rawText);
      const blogRecord = {
        id: def.slug,
        slug: def.slug,
        title: def.title,
        subtitle: def.subtitle,
        excerpt: def.excerpt,
        category: def.category,
        pillar: def.pillar,
        author: defaultAuthor,
        publishedAt: def.publishedAt,
        readingTime: def.readingTime,
        featuredImage: def.featuredImage,
        tags: def.tags,
        status: 'published',
        content: blocks,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      store.blogs.push(blogRecord);
      addedCount++;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(store, null, 2), 'utf8');
  console.log(`Updated ${filePath}: added ${addedCount} new blogs. Total blogs: ${store.blogs.length}`);
}

updateStore('data/cms-store.json');
updateStore('.data/dev-store.json');
