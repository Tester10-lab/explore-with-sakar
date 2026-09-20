import crypto from 'crypto';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'test-secret-key-for-admin-sync';

function makeAdminToken() {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({
    username: 'admin',
    role: 'admin',
    exp: Math.floor(Date.now() / 1000) + 3600
  })).toString('base64url');
  const sig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

async function run() {
  console.log('=== Testing Admin Creation -> Public Site Instant Sync ===');
  const token = makeAdminToken();
  const headers = {
    'Content-Type': 'application/json',
    'Cookie': `sakar_admin_session=${token}`
  };

  const testId = Date.now();

  // 1. Create Blog
  console.log('\n1. Creating test blog in admin...');
  const blogPayload = {
    title: `Sync Test Blog ${testId}`,
    slug: `sync-test-blog-${testId}`,
    excerpt: 'Verifying instant cache revalidation without server restart.',
    category: "Sakar's Journal",
    publishedAt: '2026-09-20',
    readingTime: '2 min read',
    status: 'published'
  };
  const blogRes = await fetch(`${BASE_URL}/api/admin/blogs`, {
    method: 'POST',
    headers,
    body: JSON.stringify(blogPayload)
  });
  console.log(`POST /api/admin/blogs: HTTP ${blogRes.status}`);
  const blogData = await blogRes.json();
  console.log('Created blog ID:', blogData.blog?.id || blogData.blog?.slug);

  // 2. Create Photo
  console.log('\n2. Creating test photo in admin...');
  const photoPayload = {
    title: `Sync Test Photo ${testId}`,
    category: 'mountains',
    categoryLabel: 'Himalayan Vistas',
    location: 'Nepal',
    image: '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
    alt: `Sync Test Photo ${testId}`,
    orientation: 'landscape',
    caption: 'Testing instant gallery sync.',
    featured: false
  };
  const photoRes = await fetch(`${BASE_URL}/api/admin/photos`, {
    method: 'POST',
    headers,
    body: JSON.stringify(photoPayload)
  });
  console.log(`POST /api/admin/photos: HTTP ${photoRes.status}`);
  const photoData = await photoRes.json();
  console.log('Created photo ID:', photoData.photo?.id);

  // 3. Create Review
  console.log('\n3. Creating test review in admin...');
  const reviewPayload = {
    author: `Traveler ${testId}`,
    location: 'Zurich, Switzerland',
    quote: `The journey with Sakar was life changing - test verification ${testId}.`,
    rating: 5,
    journey: 'Living Culture & Sacred Valleys',
    year: '2026',
    featured: true,
    isVisible: true,
    platform: 'direct'
  };
  const reviewRes = await fetch(`${BASE_URL}/api/admin/reviews`, {
    method: 'POST',
    headers,
    body: JSON.stringify(reviewPayload)
  });
  console.log(`POST /api/admin/reviews: HTTP ${reviewRes.status}`);
  const reviewData = await reviewRes.json();
  console.log('Created review ID:', reviewData.review?.id);

  // 4. Verify Public Pages
  console.log('\n4. Verifying public pages (WITHOUT server restart)...');

  // Check /blog
  const publicBlogRes = await fetch(`${BASE_URL}/blog`);
  const blogHtml = await publicBlogRes.text();
  const blogFound = blogHtml.includes(`Sync Test Blog ${testId}`);
  console.log(`GET /blog (HTTP ${publicBlogRes.status}): Blog found? -> ${blogFound ? 'YES (PASS)' : 'NO (FAIL)'}`);

  // Check /gallery
  const publicGalleryRes = await fetch(`${BASE_URL}/gallery`);
  const galleryHtml = await publicGalleryRes.text();
  const photoFound = galleryHtml.includes(`Sync Test Photo ${testId}`);
  console.log(`GET /gallery (HTTP ${publicGalleryRes.status}): Photo found? -> ${photoFound ? 'YES (PASS)' : 'NO (FAIL)'}`);

  // Check /reviews
  const publicReviewsRes = await fetch(`${BASE_URL}/reviews`);
  const reviewsHtml = await publicReviewsRes.text();
  const reviewFound = reviewsHtml.includes(`Traveler ${testId}`);
  console.log(`GET /reviews (HTTP ${publicReviewsRes.status}): Review found? -> ${reviewFound ? 'YES (PASS)' : 'NO (FAIL)'}`);

  // 5. Cleanup test data
  console.log('\n5. Cleaning up test items...');
  if (blogData.blog?.id || blogData.blog?.slug) {
    const id = blogData.blog?.id || blogData.blog?.slug;
    await fetch(`${BASE_URL}/api/admin/blogs/${id}`, { method: 'DELETE', headers });
  }
  if (photoData.photo?.id) {
    await fetch(`${BASE_URL}/api/admin/photos/${photoData.photo.id}`, { method: 'DELETE', headers });
  }
  if (reviewData.review?.id) {
    await fetch(`${BASE_URL}/api/admin/reviews/${reviewData.review.id}`, { method: 'DELETE', headers });
  }
  console.log('Cleanup complete.');

  if (blogFound && photoFound && reviewFound) {
    console.log('\n>>> ITEM 5 VERIFICATION PASSED: All created items appeared instantly on public pages with NO restart! <<<');
    process.exit(0);
  } else {
    console.error('\n>>> ITEM 5 VERIFICATION FAILED: Some items did not appear immediately. <<<');
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Fatal error during test:', err);
  process.exit(1);
});
