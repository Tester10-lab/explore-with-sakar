export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';
import {
  getPublicBlogBySlug,
  getPublicRelatedBlogs,
  getPublicTopFeaturedExperiences,
} from '@/lib/content';

export async function GET(req: NextRequest) {
  const overallStart = Date.now();
  const searchParams = req.nextUrl.searchParams;
  const slug = searchParams.get('slug') || 'the-cosmic-language-of-sound';

  // 1. Connection time measurement
  const connStart = Date.now();
  let connDuration = -1;
  let connStatus = 'PENDING';
  let dbHost = 'unknown';

  try {
    const client = await getMongoClient();
    connDuration = Date.now() - connStart;
    connStatus = 'CONNECTED';
    dbHost = String(client.options.hosts?.[0] || 'atlas-connected');
  } catch (err: any) {
    connDuration = Date.now() - connStart;
    connStatus = `FAILED: ${err.message}`;
  }

  // 2. Blog by slug measurement
  const blogStart = Date.now();
  let postFound = false;
  let postTitle = '';
  try {
    const post = await getPublicBlogBySlug(slug);
    if (post) {
      postFound = true;
      postTitle = post.title;
    }
  } catch (err: any) {
    postTitle = `ERROR: ${err.message}`;
  }
  const blogQueryDuration = Date.now() - blogStart;

  // 3. Related blogs measurement
  const relStart = Date.now();
  let relatedCount = 0;
  try {
    const related = await getPublicRelatedBlogs(slug, 3);
    relatedCount = related.length;
  } catch (err) {
    relatedCount = -1;
  }
  const relatedDuration = Date.now() - relStart;

  // 4. Featured experiences measurement
  const expStart = Date.now();
  let expCount = 0;
  try {
    const experiences = await getPublicTopFeaturedExperiences(3);
    expCount = experiences.length;
  } catch (err) {
    expCount = -1;
  }
  const expDuration = Date.now() - expStart;

  const totalDuration = Date.now() - overallStart;

  return NextResponse.json(
    {
      targetSlug: slug,
      metrics: {
        mongoConnectionStatus: connStatus,
        mongoConnectionDurationMs: connDuration,
        mongoHost: dbHost,
        blogQueryDurationMs: blogQueryDuration,
        relatedBlogsDurationMs: relatedDuration,
        featuredExperiencesDurationMs: expDuration,
        totalFunctionDurationMs: totalDuration,
        estimatedRoundTrips: 3, // 1: blog, 2: related blogs (or memory cache), 3: experiences
      },
      dataSummary: {
        postFound,
        postTitle,
        relatedCount,
        expCount,
      },
      serverTimestamp: new Date().toISOString(),
      region: process.env.VERCEL_REGION || 'local',
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Server-Timing': `db-conn;dur=${connDuration}, db-blog;dur=${blogQueryDuration}, total;dur=${totalDuration}`,
      },
    }
  );
}
