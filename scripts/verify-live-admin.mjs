import https from 'https';

const BASE_URL = 'https://explore-with-sakar.vercel.app';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (c) => { body += c; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body,
        });
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(data);
    }
    req.end();
  });
}

async function verifyAdmin() {
  console.log('--- Live Admin API & Blogs Verification ---');

  // 1. Attempt login
  const loginPayload = JSON.stringify({
    username: 'admin',
    password: process.env.ADMIN_PASSWORD || 'sakar2026',
  });

  console.log('Logging in to live Vercel admin API...');
  const loginRes = await request(
    {
      hostname: 'explore-with-sakar.vercel.app',
      path: '/api/admin/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginPayload),
      },
    },
    loginPayload
  );

  console.log('Login status:', loginRes.statusCode);
  const setCookie = loginRes.headers['set-cookie'];
  let sessionCookie = '';
  if (setCookie) {
    sessionCookie = Array.isArray(setCookie) ? setCookie.join('; ') : setCookie;
    console.log('Session cookie acquired: YES');
  } else {
    console.log('No session cookie returned. Response:', loginRes.body);
  }

  // 2. Fetch /api/admin/blogs with session cookie
  if (sessionCookie) {
    console.log('Fetching live /api/admin/blogs...');
    const blogsRes = await request({
      hostname: 'explore-with-sakar.vercel.app',
      path: '/api/admin/blogs',
      method: 'GET',
      headers: {
        Cookie: sessionCookie,
      },
    });

    console.log('Live /api/admin/blogs status:', blogsRes.statusCode);
    try {
      const data = JSON.parse(blogsRes.body);
      const blogs = data.blogs || [];
      console.log(`Live /api/admin/blogs returned: ${blogs.length} blogs`);
      if (blogs.length > 0) {
        console.log('First blog title:', blogs[0].title);
        console.log('Last blog title:', blogs[blogs.length - 1].title);
      }
    } catch {
      console.log('Could not parse JSON. Body snippet:', blogsRes.body.slice(0, 200));
    }

    // 3. Fetch /admin/blogs HTML page with session cookie
    console.log('Fetching live /admin/blogs web page...');
    const pageRes = await request({
      hostname: 'explore-with-sakar.vercel.app',
      path: '/admin/blogs',
      method: 'GET',
      headers: {
        Cookie: sessionCookie,
      },
    });
    console.log('Live /admin/blogs page status:', pageRes.statusCode);
    console.log('Live /admin/blogs page length:', pageRes.body.length);
  }
}

verifyAdmin().catch(console.error);
