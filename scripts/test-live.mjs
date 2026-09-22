import https from 'https';

const URLs = [
  'https://explore-with-sakar.vercel.app/experiences/beyond-the-map',
  'https://explore-with-sakar.vercel.app/experiences/beyond-the-map/kathmandu-durbar-square',
  'https://explore-with-sakar.vercel.app/experiences/go-within',
  'https://explore-with-sakar.vercel.app/experiences/go-deeper',
  'https://explore-with-sakar.vercel.app/experiences/leave-a-mark',
  'https://explore-with-sakar.vercel.app/admin/blogs',
  'https://explore-with-sakar.vercel.app/admin/experiences/beyond-the-map',
  'https://explore-with-sakar.vercel.app/admin/leave-a-mark',
];

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 AntigravityLiveQA' } }, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          length: body.length,
          hasKathmanduHeader: body.includes('Kathmandu Durbar Square: Where Every Stone Holds a Story'),
          hasBeyondTheMapHeader: body.includes('Beyond the Map'),
          hasCuratedExplorationHighlights: body.includes('Curated Exploration Highlights'),
          hasExploreTopic: body.includes('Explore Topic'),
          hasTopics: body.includes('Kathmandu Durbar Square') && body.includes('Bhaktapur Durbar Square'),
          hasAdminHeader: body.includes('Stories: Sakar’s Journal & Blogs') || body.includes('Admin'),
          bodySnippet: body.slice(0, 300),
        });
      });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

async function run() {
  console.log('--- Testing Live Vercel URLs ---');
  for (const u of URLs) {
    const res = await fetchUrl(u);
    console.log(`URL: ${res.url}`);
    console.log(`Status: ${res.status}`);
    if (res.error) {
      console.log(`Error: ${res.error}`);
    } else {
      console.log(`Length: ${res.length}`);
      console.log(`Snippet: ${res.bodySnippet.replace(/\s+/g, ' ').slice(0, 120)}`);
      if (res.url.includes('/experiences/beyond-the-map') && !res.url.includes('/kathmandu')) {
        console.log(`Has 'Beyond the Map' title: ${res.hasBeyondTheMapHeader}`);
        console.log(`Has 'Curated Exploration Highlights': ${res.hasCuratedExplorationHighlights}`);
        console.log(`Has 'Explore Topic': ${res.hasExploreTopic}`);
        console.log(`Has Kathmandu & Bhaktapur topics: ${res.hasTopics}`);
      }
    }
    console.log('----------------------------------------');
  }
}

run();
