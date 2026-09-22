import fs from 'fs';
import path from 'path';

const storePath = path.resolve(process.cwd(), 'data', 'cms-store.json');
const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));
const blogs = store.blogs || [];

const content = `import { BlogPost, BlogCategory } from '@/types';

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

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogs, null, 2)};

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

const targetPath = path.resolve(process.cwd(), 'src', 'data', 'blog.ts');
fs.writeFileSync(targetPath, content, 'utf8');
console.log(`Successfully updated ${targetPath} with ${blogs.length} blogs!`);
