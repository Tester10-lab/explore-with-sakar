import fs from 'fs';
import path from 'path';
import dns from 'dns';
import { MongoClient } from 'mongodb';

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

if (process.env.MONGODB_DNS_SERVERS && typeof dns.setServers === 'function') {
  try {
    const servers = process.env.MONGODB_DNS_SERVERS.split(',').map((s) => s.trim()).filter(Boolean);
    if (servers.length > 0) {
      dns.setServers(servers);
    }
  } catch (err) {
    console.warn('DNS setServers failed:', err);
  }
}

const newBlog = {
  slug: 'best-city-tour-guide-nepal',
  id: 'best-city-tour-guide-nepal',
  title: 'Best City Tour Guide in Nepal: What Truly Makes the Difference',
  subtitle: 'What truly makes the difference beyond the sightseeing: cultural translation, emotional pacing, and certified NATHM standards.',
  excerpt: 'Looking for the best city tour guide in Nepal? Discover the essential qualities, cultural intuition, and NATHM licensing that turn sightseeing into real connection.',
  category: 'Practical Nepal',
  pillar: 'go-beyond',
  publishedAt: 'September 29, 2026',
  readingTime: '5 min read',
  featuredImage: {
    src: '/explore-with-sakar/images/heritage/temple-courtyard.jpg',
    alt: 'Best city tour guide in Nepal leading travelers through a historic temple courtyard in Patan',
    caption: 'Guiding in Nepal is cultural translation — transforming living courtyards into open books.'
  },
  tags: [
    'licensed tour guide nepal',
    'kathmandu city sightseeing guide',
    'hire private tour guide nepal',
    'qualities of a good tour guide in nepal',
    'nathm licensed tour guide'
  ],
  status: 'published',
  fontFamily: 'serif',
  fontSize: 'base',
  author: {
    name: 'Sakar',
    role: 'Responsible Tour Director & Cultural Guide',
    avatar: '/explore-with-sakar/images/sakar/sakar-portrait.jpg',
    bio: 'Born in Nepal with deep roots in Himalayan heritage and community-based hospitality. As Responsible Tour Director, Sakar guides curious international travelers beyond mass tourism, facilitating authentic human connections, spiritual stillness, and sustainable village livelihoods.'
  },
  content: [
    {
      type: 'paragraph',
      content: 'Whenever I walk through the brick courtyards of Patan or watch the smoke curl upward from the cremation pyres at Pashupatinath, I notice two very different kinds of travelers. The first kind wanders around snapping quick photos, looking slightly overwhelmed by the sensory rush. The second kind is standing with a guide, completely absorbed, listening as if an ancient secret is being handed directly to them.'
    },
    {
      type: 'paragraph',
      content: 'Nepal isn\'t an open-air museum where history sits quietly behind glass ropes. Our heritage is alive. People still ring centuries-old brass bells on their way to work, elderly artisans carve wood in hidden courtyards, and monks chant the same mantras their ancestors recited a thousand years ago.'
    },
    {
      type: 'quote',
      content: 'Guiding here isn\'t just a job—it\'s cultural translation. And finding the best city tour guide in Nepal requires looking far past someone who just speaks fluent English or recites dynasty dates.',
      attribution: 'Sakar\'s Journal'
    },
    {
      type: 'heading',
      level: 2,
      content: 'The Attributes That Actually Matter'
    },
    {
      type: 'paragraph',
      content: 'From my experience seeing what works on the ground, these are the traits that turn a standard sightseeing walk into an unforgettable journey:'
    },
    {
      type: 'heading',
      level: 3,
      content: '1. The Instinct for Living Culture, Not Just Dates'
    },
    {
      type: 'paragraph',
      content: 'Anyone can memorize when a Malla king built a pagoda. A remarkable guide explains why the butter lamps outside a private doorway are lit at dawn, why eyes face all four directions on a stupa, or what the intricate tantric carvings on a temple strut actually mean. They help you see that religion here isn’t a Sunday routine; it’s woven into the architecture and daily life.'
    },
    {
      type: 'heading',
      level: 3,
      content: '2. Emotional Intuition and Pacing'
    },
    {
      type: 'paragraph',
      content: 'Kathmandu Valley can be intense. The noise, the heat, the dust, and the sheer volume of stimuli can tire out even seasoned travelers. A top-tier guide notices flagging energy before you do. Instead of dragging you through another museum room, they’ll steer you into a quiet, shaded bahal (monastery courtyard) for hot spiced milk tea, letting the experience breathe.'
    },
    {
      type: 'twoImages',
      left: {
        src: '/explore-with-sakar/images/heritage/durbar-square.jpg',
        alt: 'Historic Durbar Square architecture and daily life in Kathmandu Valley',
        caption: 'Centuries-old pagodas where life and spiritual devotion happen side-by-side.'
      },
      right: {
        src: '/explore-with-sakar/images/heritage/ancient-alleyways.jpg',
        alt: 'Quiet stone alleyways and courtyards in Patan',
        caption: 'Steering away from the noise into quiet, shaded courtyards for hot spiced tea.'
      }
    },
    {
      type: 'heading',
      level: 3,
      content: '3. Absolute Intellectual Honesty'
    },
    {
      type: 'paragraph',
      content: 'Nepal’s history is steeped in mythology—from gods flying over mountains to sacred lakes being drained by divine swords. An exceptional guide respects local folklore without passing off legends as archaeological facts. More importantly, when asked an obscure question, they have the confidence to say, "I haven\'t encountered that specific detail—let me check that for you," instead of making something up on the spot.'
    },
    {
      type: 'heading',
      level: 2,
      content: 'Where That Professional Polish Comes From'
    },
    {
      type: 'paragraph',
      content: 'Natural charisma and local love can get someone far, but in a country as culturally complex as Nepal, formal grounding makes all the difference.'
    },
    {
      type: 'paragraph',
      content: 'That is where institutions like NATHM (Nepal Academy of Tourism and Hotel Management) play their real role in the background. While travelers rarely hear about it, the academy acts as the quality benchmark. It forces aspiring guides through months of intense study—dissecting Buddhist iconography, Hindu philosophy, architecture, crowd psychology, and emergency safety—before they are tested in live simulations at UNESCO sites and granted their official government license.'
    },
    {
      type: 'practicalTips',
      title: 'Why an Official NATHM Government License Matters',
      items: [
        {
          point: 'Structured Storytelling & Historical Accuracy',
          explanation: 'Their storytelling has clear structure, deep context, and historical accuracy rooted in formal academic training.'
        },
        {
          point: 'Respectful Navigation of Sacred Taboos',
          explanation: 'They understand how to navigate sacred spaces and active rituals respectfully without breaking local cultural or religious taboos.'
        },
        {
          point: 'Accountability & Department of Tourism Credential',
          explanation: 'They hold an official Department of Tourism credential (the familiar green lanyard), meaning you are working with an accountable professional rather than an unregistered street tout.'
        }
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'How to Make the Most of Your Tour'
    },
    {
      type: 'paragraph',
      content: 'If you\'re planning to hire a private city tour guide for your time in Kathmandu, Bhaktapur, or Pokhara, treat the experience as a two-way conversation. Tell them what you care about—whether it’s local street food, photography, Buddhist philosophy, or Newari craftsmanship. The best guides thrive when they can tailor the day to your curiosity.'
    },
    {
      type: 'quote',
      content: 'When you find the right guide, you aren\'t just ticking off monuments—you’re experiencing our home through the eyes of someone who cherishes its living soul.',
      attribution: 'Sakar'
    }
  ],
  contextualCta: {
    title: 'Looking for an authentic, guided exploration of Kathmandu Valley?',
    description: 'Experience the living heritage, secret courtyards, and sacred stories of Kathmandu, Patan, and Bhaktapur with Sakar.',
    buttonText: 'Inquire About City Guiding',
    experienceSlug: 'beyond-the-map'
  },
  relatedSlugs: [
    'buddhist-monastery-etiquette-nepal',
    'kathmandu-durbar-square-every-stone-holds-a-story',
    'patan-durbar-square-hidden-courtyards-living-craft'
  ]
};

// 1. Update data/cms-store.json
const cmsStorePath = path.resolve(process.cwd(), 'data', 'cms-store.json');
const cmsData = JSON.parse(fs.readFileSync(cmsStorePath, 'utf8'));
if (!Array.isArray(cmsData.blogs)) {
  cmsData.blogs = [];
}
const idxInCms = cmsData.blogs.findIndex((b) => b.slug === newBlog.slug);
if (idxInCms >= 0) {
  cmsData.blogs[idxInCms] = { ...cmsData.blogs[idxInCms], ...newBlog, updatedAt: new Date().toISOString() };
  console.log(`Updated existing blog in ${cmsStorePath}`);
} else {
  cmsData.blogs.push({
    ...newBlog,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log(`Appended new blog to ${cmsStorePath} (Total: ${cmsData.blogs.length})`);
}
cmsData.lastUpdated = new Date().toISOString();
fs.writeFileSync(cmsStorePath, JSON.stringify(cmsData, null, 2), 'utf8');

// 2. Update .data/dev-store.json if exists
const devStorePath = path.resolve(process.cwd(), '.data', 'dev-store.json');
if (fs.existsSync(devStorePath)) {
  try {
    const devData = JSON.parse(fs.readFileSync(devStorePath, 'utf8'));
    if (Array.isArray(devData.blogs)) {
      const idx = devData.blogs.findIndex((b) => b.slug === newBlog.slug);
      if (idx >= 0) {
        devData.blogs[idx] = { ...devData.blogs[idx], ...newBlog, updatedAt: new Date().toISOString() };
      } else {
        devData.blogs.push({
          ...newBlog,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      devData.lastUpdated = new Date().toISOString();
      fs.writeFileSync(devStorePath, JSON.stringify(devData, null, 2), 'utf8');
      console.log(`Updated ${devStorePath} (Total: ${devData.blogs.length})`);
    }
  } catch (err) {
    console.warn(`Could not update dev-store.json:`, err);
  }
}

// 3. Update src/data/blog.ts
const blogTsPath = path.resolve(process.cwd(), 'src', 'data', 'blog.ts');
const blogTsTemplate = `import { BlogPost, BlogCategory } from '@/types';

export const BLOG_CATEGORIES: { id: BlogCategory; label: string; description: string }[] = [
  {
    id: "Sakar's Journal",
    label: "Sakar's Journal",
    description: 'Personal reflections, lessons from guiding, and quiet moments on the road.',
  },
  {
    id: 'Spiritual Nepal',
    label: 'Spiritual Nepal',
    description: 'Experiential reflections on monasteries, sacred spaces, chanting, and inner stillness.',
  },
  {
    id: 'Living Culture',
    label: 'Living Culture',
    description: 'Stories of living traditions, Newari feasts, festival rhythms, and ancestral crafts.',
  },
  {
    id: 'People & Places',
    label: 'People & Places',
    description: 'Portraits of village elders, artisans, monks, farmers, and hidden corners of Nepal.',
  },
  {
    id: 'Travel With Meaning',
    label: 'Travel With Meaning',
    description: 'Responsible tourism, community homestays, ethical travel, and lasting human connection.',
  },
  {
    id: 'Walking Nepal',
    label: 'Walking Nepal',
    description: 'Experiential journeys along quiet mountain paths, village trails, and high ridges.',
  },
  {
    id: 'Practical Nepal',
    label: 'Practical Nepal',
    description: 'Thoughtful advice, monastery etiquette, altitude preparation, and cultural customs.',
  },
];

export const SAKAR_AUTHOR = {
  name: 'Sakar',
  role: 'Responsible Tour Director & Cultural Guide',
  avatar: '/explore-with-sakar/images/sakar/sakar-portrait.jpg',
  bio: 'Born in Nepal with deep roots in Himalayan heritage and community-based hospitality. As Responsible Tour Director, Sakar guides curious international travelers beyond mass tourism, facilitating authentic human connections, spiritual stillness, and sustainable village livelihoods.',
};

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(cmsData.blogs, null, 2)};

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
  const explicitRelated = BLOG_POSTS.filter((p) => current.relatedSlugs?.includes(p.slug));
  if (explicitRelated.length >= count) return explicitRelated.slice(0, count);

  const categoryRelated = BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.category === current.category && !explicitRelated.includes(p)
  );

  const combined = [...explicitRelated, ...categoryRelated];
  if (combined.length >= count) return combined.slice(0, count);

  const others = BLOG_POSTS.filter((p) => p.slug !== currentSlug && !combined.includes(p));
  return [...combined, ...others].slice(0, count);
}
`;
fs.writeFileSync(blogTsPath, blogTsTemplate, 'utf8');
console.log(`Updated ${blogTsPath} with ${cmsData.blogs.length} blogs!`);

// 4. Update sakar dai blog.md documentation
const mdPath = path.resolve(process.cwd(), 'sakar dai blog.md');
if (fs.existsSync(mdPath)) {
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  if (!mdContent.includes('best-city-tour-guide-nepal')) {
    const markdownAppend = `

---

## Best City Tour Guide in Nepal: What Truly Makes the Difference

**Meta Title**: Best City Tour Guide in Nepal: What Truly Makes the Difference  
**Meta Description**: Looking for the best city tour guide in Nepal? Discover the essential qualities, cultural intuition, and NATHM licensing that turn sightseeing into real connection.  
**URL Slug**: best-city-tour-guide-nepal  
**Category**: Practical Nepal  
**Keywords**: licensed tour guide nepal, kathmandu city sightseeing guide, hire private tour guide nepal, qualities of a good tour guide in nepal, nathm licensed tour guide  

Whenever I walk through the brick courtyards of Patan or watch the smoke curl upward from the cremation pyres at Pashupatinath, I notice two very different kinds of travelers. The first kind wanders around snapping quick photos, looking slightly overwhelmed by the sensory rush. The second kind is standing with a guide, completely absorbed, listening as if an ancient secret is being handed directly to them.

Nepal isn't an open-air museum where history sits quietly behind glass ropes. Our heritage is alive. People still ring centuries-old brass bells on their way to work, elderly artisans carve wood in hidden courtyards, and monks chant the same mantras their ancestors recited a thousand years ago.

Because of that, guiding here isn't just a job—it's cultural translation. And finding the best city tour guide in Nepal requires looking far past someone who just speaks fluent English or recites dynasty dates.

### The Attributes That Actually Matter
From my experience seeing what works on the ground, these are the traits that turn a standard sightseeing walk into an unforgettable journey:

#### 1. The Instinct for Living Culture, Not Just Dates
Anyone can memorize when a Malla king built a pagoda. A remarkable guide explains why the butter lamps outside a private doorway are lit at dawn, why eyes face all four directions on a stupa, or what the intricate tantric carvings on a temple strut actually mean. They help you see that religion here isn’t a Sunday routine; it’s woven into the architecture and daily life.

#### 2. Emotional Intuition and Pacing
Kathmandu Valley can be intense. The noise, the heat, the dust, and the sheer volume of stimuli can tire out even seasoned travelers. A top-tier guide notices flagging energy before you do. Instead of dragging you through another museum room, they’ll steer you into a quiet, shaded bahal (monastery courtyard) for hot spiced milk tea, letting the experience breathe.

#### 3. Absolute Intellectual Honesty
Nepal’s history is steeped in mythology—from gods flying over mountains to sacred lakes being drained by divine swords. An exceptional guide respects local folklore without passing off legends as archaeological facts. More importantly, when asked an obscure question, they have the confidence to say, "I haven't encountered that specific detail—let me check that for you," instead of making something up on the spot.

### Where That Professional Polish Comes From
Natural charisma and local love can get someone far, but in a country as culturally complex as Nepal, formal grounding makes all the difference.

That is where institutions like NATHM (Nepal Academy of Tourism and Hotel Management) play their real role in the background. While travelers rarely hear about it, the academy acts as the quality benchmark. It forces aspiring guides through months of intense study—dissecting Buddhist iconography, Hindu philosophy, architecture, crowd psychology, and emergency safety—before they are tested in live simulations at UNESCO sites and granted their official government license.

When you hire a licensed guide who has come through that rigorous background, you notice the distinction immediately:
- Their storytelling has structure and historical accuracy.
- They understand how to navigate sacred spaces respectfully without breaking local taboos.
- They hold an official Department of Tourism credential (the familiar green lanyard), meaning you are working with an accountable professional rather than an unregistered street tout.

### How to Make the Most of Your Tour
If you're planning to hire a private city tour guide for your time in Kathmandu, Bhaktapur, or Pokhara, treat the experience as a two-way conversation. Tell them what you care about—whether it’s local street food, photography, Buddhist philosophy, or Newari craftsmanship. The best guides thrive when they can tailor the day to your curiosity.

When you find the right guide, you aren't just ticking off monuments—you’re experiencing our home through the eyes of someone who cherishes its living soul.
`;
    fs.appendFileSync(mdPath, markdownAppend, 'utf8');
    console.log(`Appended new blog story to ${mdPath}`);
  }
}

// 5. Sync to MongoDB Atlas
async function syncToAtlas() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('Skipping Atlas sync (no MONGODB_URI).');
    return;
  }

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas.');

    const dbsToSync = ['explore_with_sakar_dev', 'explore_with_sakar'];
    for (const dbName of dbsToSync) {
      try {
        const db = client.db(dbName);
        const col = db.collection('cms_store');
        const doc = await col.findOne({ _id: 'active_store' });
        if (!doc) {
          console.log(`Collection cms_store not initialized in ${dbName}, skipping.`);
          continue;
        }

        const existingBlogs = Array.isArray(doc.blogs) ? doc.blogs : [];
        const existingIdx = existingBlogs.findIndex((b) => b.slug === newBlog.slug);

        if (existingIdx >= 0) {
          // Update in place
          existingBlogs[existingIdx] = {
            ...existingBlogs[existingIdx],
            ...newBlog,
            updatedAt: new Date().toISOString(),
          };
          await col.updateOne(
            { _id: 'active_store' },
            {
              $set: {
                blogs: existingBlogs,
                lastUpdated: new Date().toISOString(),
              },
            }
          );
          console.log(`[Atlas: ${dbName}] Updated blog "${newBlog.slug}" successfully.`);
        } else {
          // Push new blog
          await col.updateOne(
            { _id: 'active_store' },
            {
              $push: { blogs: newBlog },
              $set: { lastUpdated: new Date().toISOString() },
            }
          );
          console.log(`[Atlas: ${dbName}] Inserted blog "${newBlog.slug}" successfully.`);
        }
      } catch (e) {
        console.warn(`[Atlas: ${dbName}] Error syncing:`, e.message);
      }
    }
  } catch (err) {
    console.error('Atlas connection error:', err.message);
  } finally {
    await client.close();
  }
}

syncToAtlas().then(() => {
  console.log('Finished all blog additions and sync tasks.');
});
