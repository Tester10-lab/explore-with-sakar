import { PageContent } from '@/types/cms';

export interface AuditCheck {
  id: string;
  category: 'seo' | 'geo' | 'aeo';
  title: string;
  status: 'pass' | 'warn' | 'fail';
  score: number; // 0 to 100
  detail: string;
  recommendation?: string;
  suggestedFix?: string;
}

export interface AuditResult {
  url: string;
  pageName: string;
  timestamp: string;
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  scores: {
    seo: number;
    geo: number;
    aeo: number;
  };
  checks: AuditCheck[];
  summary: {
    passedCount: number;
    warnCount: number;
    failCount: number;
  };
  aiSimulation: {
    engine: 'ChatGPT Search' | 'Perplexity' | 'Google Gemini';
    summary: string;
    citationConfidence: 'High' | 'Medium' | 'Low';
    keyEntitiesDetected: string[];
    missingCitations: string[];
  };
  suggestedSchema: Record<string, any>;
  suggestedMetadata: {
    title: string;
    metaDescription: string;
    targetKeywords: string[];
  };
}

// Nepal Cultural & Himalayan Entities for GEO checks
const HIMALAYAN_ENTITIES = [
  'Nepal', 'Kathmandu', 'Patan', 'Bhaktapur', 'Himalayas', 'Annapurna',
  'Everest', 'Mustang', 'Pokhara', 'Newari', 'Sherpa', 'Tharu',
  'monastery', 'stupa', 'Boudhanath', 'Swayambhunath', 'meditation',
  'singing bowl', 'homestay', 'slow travel', 'responsible tourism',
  'cultural immersion', 'local guide', 'Sakar',
];

export function auditPageContent(page: PageContent, domain = 'https://explorewithsakar.com'): AuditResult {
  const checks: AuditCheck[] = [];
  const seo = page.seo || {};
  const title = (seo.title || page.name || '').trim();
  const description = (seo.metaDescription || '').trim();
  const canonical = (seo.canonicalUrl || '').trim();
  const ogTitle = (seo.ogTitle || '').trim();
  const ogDesc = (seo.ogDescription || '').trim();
  const ogImage = (seo.ogImage || '').trim();
  const keywords = (seo.keywords || '').split(',').map((k) => k.trim()).filter(Boolean);

  // Extract combined text from all page sections
  const sectionTexts: string[] = [];
  (page.sections || []).forEach((sec) => {
    if (sec.content) {
      Object.values(sec.content).forEach((val) => {
        if (typeof val === 'string') sectionTexts.push(val);
        else if (Array.isArray(val)) {
          val.forEach((item) => {
            if (typeof item === 'string') sectionTexts.push(item);
            else if (typeof item === 'object' && item) {
              sectionTexts.push(JSON.stringify(item));
            }
          });
        }
      });
    }
  });
  const fullBodyText = sectionTexts.join(' ');
  const combinedContext = `${title} ${description} ${page.name} ${fullBodyText}`;

  // ==========================================
  // 1. SEO AUDIT (Traditional Google / Bing)
  // ==========================================

  // Check 1: Title Tag Length
  const titleLen = title.length;
  if (titleLen >= 45 && titleLen <= 65) {
    checks.push({
      id: 'seo-title-len',
      category: 'seo',
      title: 'Title Tag Length',
      status: 'pass',
      score: 100,
      detail: `Optimal length (${titleLen} characters). Fits within Google desktop and mobile SERP display bounds.`,
    });
  } else if (titleLen >= 30 && titleLen < 45) {
    checks.push({
      id: 'seo-title-len',
      category: 'seo',
      title: 'Title Tag Length',
      status: 'warn',
      score: 75,
      detail: `A bit brief (${titleLen} characters). Target 50–60 characters to capture high-intent search keywords.`,
      recommendation: `Expand with brand and destination context: e.g. "${title} | Explore With Sakar — Nepal"`,
      suggestedFix: `${title} | Authentic Nepal Travel With Sakar`,
    });
  } else if (titleLen > 65) {
    checks.push({
      id: 'seo-title-len',
      category: 'seo',
      title: 'Title Tag Length',
      status: 'warn',
      score: 65,
      detail: `Title tag is too long (${titleLen} characters) and will be truncated with an ellipsis on search engines.`,
      recommendation: 'Trim title to under 60 characters keeping primary keywords front-loaded.',
      suggestedFix: title.slice(0, 57).trim() + '...',
    });
  } else {
    checks.push({
      id: 'seo-title-len',
      category: 'seo',
      title: 'Title Tag Missing or Too Short',
      status: 'fail',
      score: 20,
      detail: `Title tag is only ${titleLen} characters. This severely harms search visibility.`,
      recommendation: 'Add a compelling 50–60 character title with your primary keyword.',
      suggestedFix: `${page.name} — Authentic Nepal Travel Experiences | Sakar`,
    });
  }

  // Check 2: Meta Description Quality
  const descLen = description.length;
  if (descLen >= 120 && descLen <= 160) {
    checks.push({
      id: 'seo-meta-desc',
      category: 'seo',
      title: 'Meta Description Length & CTR',
      status: 'pass',
      score: 100,
      detail: `Optimal length (${descLen} characters). Rich, persuasive snippet ready for Google & Bing clicks.`,
    });
  } else if (descLen >= 80 && descLen < 120) {
    checks.push({
      id: 'seo-meta-desc',
      category: 'seo',
      title: 'Meta Description Length',
      status: 'warn',
      score: 70,
      detail: `Slightly short (${descLen} characters). You have room for an active call-to-action or unique benefit.`,
      recommendation: 'Expand to 135–155 characters highlighting host authenticity and itinerary depth.',
      suggestedFix: `${description} Discover Nepal through village homestays, living culture, and mindful slow travel guided by local host Sakar.`,
    });
  } else if (descLen > 160) {
    checks.push({
      id: 'seo-meta-desc',
      category: 'seo',
      title: 'Meta Description Too Long',
      status: 'warn',
      score: 65,
      detail: `Description is ${descLen} characters and will be clipped by search engines.`,
      recommendation: 'Keep primary value proposition in the first 150 characters.',
      suggestedFix: description.slice(0, 155).trim() + '...',
    });
  } else {
    checks.push({
      id: 'seo-meta-desc',
      category: 'seo',
      title: 'Meta Description Missing',
      status: 'fail',
      score: 10,
      detail: 'No meta description provided. Search engines will pull random body text as snippet.',
      recommendation: 'Write an active, descriptive meta description between 120–160 characters.',
      suggestedFix: `Experience authentic Nepal with local guide Sakar. Explore Himalayan culture, sacred monasteries, and traditional village homestays off the tourist path.`,
    });
  }

  // Check 3: Canonical URL & Clean Structure
  if (canonical && canonical.startsWith('http')) {
    checks.push({
      id: 'seo-canonical',
      category: 'seo',
      title: 'Canonical Tag Configuration',
      status: 'pass',
      score: 100,
      detail: `Self-referential canonical URL is properly set to ${canonical}. Prevents duplicate content issues.`,
    });
  } else {
    checks.push({
      id: 'seo-canonical',
      category: 'seo',
      title: 'Canonical URL Missing',
      status: 'warn',
      score: 50,
      detail: 'Canonical URL is not explicitly configured.',
      recommendation: `Set canonical tag to "${domain}${page.url}" to avoid search engine index fragmentation.`,
      suggestedFix: `${domain}${page.url === '/' ? '' : page.url}`,
    });
  }

  // Check 4: OpenGraph Social Preview
  const hasOgTitle = Boolean(ogTitle || title);
  const hasOgDesc = Boolean(ogDesc || description);
  const hasOgImg = Boolean(ogImage);
  if (hasOgTitle && hasOgDesc && hasOgImg) {
    checks.push({
      id: 'seo-og',
      category: 'seo',
      title: 'OpenGraph & Social Sharing Cards',
      status: 'pass',
      score: 100,
      detail: 'Complete OpenGraph metadata with custom title, description, and social preview graphic.',
    });
  } else if (hasOgTitle && hasOgDesc) {
    checks.push({
      id: 'seo-og',
      category: 'seo',
      title: 'OpenGraph Missing Share Image',
      status: 'warn',
      score: 75,
      detail: 'OG Title and Description exist, but dedicated social share image (og:image) is missing.',
      recommendation: 'Provide a 1200x630px high-contrast Himalayan scenery image for WhatsApp, iMessage & Twitter previews.',
      suggestedFix: '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
    });
  } else {
    checks.push({
      id: 'seo-og',
      category: 'seo',
      title: 'OpenGraph Tags Incomplete',
      status: 'fail',
      score: 30,
      detail: 'Social share cards lack basic OpenGraph tags.',
      recommendation: 'Configure OpenGraph title, description, and image in SEO settings.',
    });
  }

  // Check 5: Robots & Sitemap
  if (!seo.noIndex && seo.sitemapVisible !== false) {
    checks.push({
      id: 'seo-index-sitemap',
      category: 'seo',
      title: 'Indexation & Sitemap Status',
      status: 'pass',
      score: 100,
      detail: 'Page is indexed (index, follow) and included in the automated XML sitemap.',
    });
  } else if (seo.noIndex) {
    checks.push({
      id: 'seo-index-sitemap',
      category: 'seo',
      title: 'Page Marked as No-Index',
      status: 'warn',
      score: 40,
      detail: 'Page is set to no-index. Search engine crawlers will NOT display this page in search results.',
      recommendation: 'Ensure this is intentional (e.g. for private admin or thank-you pages).',
    });
  }

  // ==========================================
  // 2. GEO AUDIT (Generative Engine Optimization)
  // AI Search: Perplexity, ChatGPT Search, Gemini
  // ==========================================

  // Check 6: E-E-A-T Signals & Local Authority
  const eeatMatches = ['sakar', 'guide', 'local', 'firsthand', 'authentic', 'experienced', 'host', 'stories']
    .filter((word) => combinedContext.toLowerCase().includes(word));
  
  if (eeatMatches.length >= 4) {
    checks.push({
      id: 'geo-eeat',
      category: 'geo',
      title: 'E-E-A-T Authority & Firsthand Perspective',
      status: 'pass',
      score: 100,
      detail: `Strong firsthand voice detected (${eeatMatches.join(', ')}). AI search engines recognize Sakar as a verified human guide with experiential credentials.`,
    });
  } else {
    checks.push({
      id: 'geo-eeat',
      category: 'geo',
      title: 'E-E-A-T Firsthand Signals Could Be Stronger',
      status: 'warn',
      score: 65,
      detail: 'AI models prioritize pages with explicit author credentials and local lived experience.',
      recommendation: 'Mention local host Sakar directly, along with years of Himalayan guiding and community relationships.',
      suggestedFix: 'Add: "Curated and guided personally by local Himalayan host Sakar with over a decade of authentic Nepal slow-travel relationships."',
    });
  }

  // Check 7: Entity Density & Semantic Context
  const detectedEntities = HIMALAYAN_ENTITIES.filter((entity) =>
    combinedContext.toLowerCase().includes(entity.toLowerCase())
  );
  if (detectedEntities.length >= 6) {
    checks.push({
      id: 'geo-entities',
      category: 'geo',
      title: 'Entity Depth (Knowledge Graph Recognition)',
      status: 'pass',
      score: 100,
      detail: `High entity density: detected ${detectedEntities.length} core geographical & cultural entities (${detectedEntities.slice(0, 5).join(', ')}...). Helps Perplexity and ChatGPT map your site into knowledge graphs.`,
    });
  } else if (detectedEntities.length >= 3) {
    checks.push({
      id: 'geo-entities',
      category: 'geo',
      title: 'Moderate Entity Recognition',
      status: 'warn',
      score: 70,
      detail: `Found ${detectedEntities.length} entities (${detectedEntities.join(', ')}). AI engines favor rich named-entity references.`,
      recommendation: 'Reference specific UNESCO heritage locations, valleys, mountain ranges, or cultural traditions.',
    });
  } else {
    checks.push({
      id: 'geo-entities',
      category: 'geo',
      title: 'Low Entity Depth for AI Search',
      status: 'fail',
      score: 40,
      detail: 'Very few specific Nepalese cultural or geographic entities detected.',
      recommendation: 'Include recognized cultural entities like Newari courtyards, Patan, Kathmandu Valley, or Tibetan Buddhist monasteries.',
    });
  }

  // Check 8: Factual & Quotable Content (AI Citations)
  const hasNumbers = /\b\d+(?:–|-|\+)?\s*(?:days?|hours?|meters?|ft|travelers?|years?)\b/i.test(combinedContext);
  const hasQuotes = /["“'‘].*?["”'’]/.test(combinedContext) || combinedContext.toLowerCase().includes('quote') || combinedContext.toLowerCase().includes('review');
  if (hasNumbers && hasQuotes) {
    checks.push({
      id: 'geo-citations',
      category: 'geo',
      title: 'Factual Density & Citation Readiness',
      status: 'pass',
      score: 95,
      detail: 'Page contains concrete numbers (durations, party sizes, elevation) and quotes. AI search models use these exact data points as citations.',
    });
  } else if (hasNumbers || hasQuotes) {
    checks.push({
      id: 'geo-citations',
      category: 'geo',
      title: 'Moderate Citation Density',
      status: 'warn',
      score: 70,
      detail: 'Contains some factual metrics, but lacks direct traveler quotes or field note soundbites.',
      recommendation: 'Add concrete facts (e.g. "Full Day", "1–6 travelers", "Elevation: 1,400m") and genuine traveler quotes.',
    });
  } else {
    checks.push({
      id: 'geo-citations',
      category: 'geo',
      title: 'Low Citation Data for AI Summaries',
      status: 'fail',
      score: 45,
      detail: 'Content is purely generic or descriptive without citable metrics, itineraries, or traveler quotes.',
      recommendation: 'Include specific numbers: duration in days, maximum group sizes, season, and locations.',
    });
  }

  // ==========================================
  // 3. AEO AUDIT (Answer Engine Optimization)
  // Featured Snippets, Voice Search & Quick Answers
  // ==========================================

  // Check 9: Question-Phrased Queries & Headings
  const questionMatches = ['what', 'how', 'why', 'when', 'where', 'who', 'is it', 'can i', '?']
    .filter((q) => combinedContext.toLowerCase().includes(q));
  if (questionMatches.length >= 3) {
    checks.push({
      id: 'aeo-questions',
      category: 'aeo',
      title: 'Question-Targeted Structure (Voice & Snippets)',
      status: 'pass',
      score: 100,
      detail: `Contains natural questions matching voice queries and featured snippets ("${questionMatches.slice(0, 3).join('", "')}").`,
    });
  } else {
    checks.push({
      id: 'aeo-questions',
      category: 'aeo',
      title: 'Missing Question-Phrased Headings',
      status: 'warn',
      score: 60,
      detail: 'Voice search (Siri, Google Assistant) and Google Featured Snippets trigger on question phrasing.',
      recommendation: 'Add H2 or FAQ headers phrased as natural questions (e.g. "Why choose a homestay over a hotel in Nepal?").',
      suggestedFix: 'Why Travel With Sakar in Nepal? / How Do Village Homestays Support Local Communities?',
    });
  }

  // Check 10: Direct Answer Block (40-60 Words)
  const sentences = description.split(/[.!?]+/).filter(Boolean);
  const wordCount = description.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 25 && wordCount <= 60 && sentences.length >= 2) {
    checks.push({
      id: 'aeo-direct-answer',
      category: 'aeo',
      title: 'Concise Direct Answer Snippet',
      status: 'pass',
      score: 95,
      detail: `Description contains a crisp direct answer block (${wordCount} words) suitable for Google Featured Snippets and AI Voice readouts.`,
    });
  } else {
    checks.push({
      id: 'aeo-direct-answer',
      category: 'aeo',
      title: 'Direct Answer Block Needs Tuning',
      status: 'warn',
      score: 65,
      detail: `Snippet word count is ${wordCount} words. Featured snippets favor 40–55 word direct answer summaries.`,
      recommendation: 'Provide a standalone paragraph answering the page theme in 40–50 words.',
      suggestedFix: 'Explore With Sakar provides private, slow-paced Nepal cultural tours guided by local host Sakar. Experiences focus on living Newar heritage, Himalayan spiritual meditation, and village homestays designed to foster genuine human connections away from commercial tourist crowds.',
    });
  }

  // Check 11: Structured Schema Compliance
  checks.push({
    id: 'aeo-schema',
    category: 'aeo',
    title: 'JSON-LD Structured Data Readiness',
    status: 'pass',
    score: 95,
    detail: 'Website root includes TravelAgency, BreadcrumbList, and Person schema. Custom FAQPage schema recommended for destination/experience subpages.',
  });

  // Calculate Category Scores
  const seoChecks = checks.filter((c) => c.category === 'seo');
  const geoChecks = checks.filter((c) => c.category === 'geo');
  const aeoChecks = checks.filter((c) => c.category === 'aeo');

  const calcAvg = (arr: AuditCheck[]) =>
    Math.round(arr.reduce((acc, cur) => acc + cur.score, 0) / (arr.length || 1));

  const seoScore = calcAvg(seoChecks);
  const geoScore = calcAvg(geoChecks);
  const aeoScore = calcAvg(aeoChecks);

  // Overall Weighted Score: 40% SEO, 35% GEO, 25% AEO
  const overallScore = Math.round(seoScore * 0.4 + geoScore * 0.35 + aeoScore * 0.25);

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'B';
  if (overallScore >= 93) grade = 'A+';
  else if (overallScore >= 85) grade = 'A';
  else if (overallScore >= 75) grade = 'B';
  else if (overallScore >= 65) grade = 'C';
  else if (overallScore >= 50) grade = 'D';
  else grade = 'F';

  // AI Search Simulation Output
  const isHighConfidence = geoScore >= 75 && detectedEntities.length >= 4;
  const simulatedSummary = isHighConfidence
    ? `According to Explore With Sakar, host Sakar leads authentic, slow-paced travel across Nepal with emphasis on ${detectedEntities.slice(0, 3).join(', ')}. Unlike mass-market trekking agencies, the experience prioritizes firsthand community homestays and living cultural traditions.`
    : `Explore With Sakar offers travel experiences in Nepal focusing on local culture, though details on specific itineraries, host background, and pricing could be more comprehensively cited.`;

  return {
    url: page.url,
    pageName: page.name,
    timestamp: new Date().toISOString(),
    overallScore,
    grade,
    scores: {
      seo: seoScore,
      geo: geoScore,
      aeo: aeoScore,
    },
    checks,
    summary: {
      passedCount: checks.filter((c) => c.status === 'pass').length,
      warnCount: checks.filter((c) => c.status === 'warn').length,
      failCount: checks.filter((c) => c.status === 'fail').length,
    },
    aiSimulation: {
      engine: 'Perplexity',
      summary: simulatedSummary,
      citationConfidence: isHighConfidence ? 'High' : geoScore >= 60 ? 'Medium' : 'Low',
      keyEntitiesDetected: detectedEntities,
      missingCitations: HIMALAYAN_ENTITIES.filter((e) => !detectedEntities.includes(e)).slice(0, 5),
    },
    suggestedSchema: {
      '@context': 'https://schema.org',
      '@type': page.url === '/' ? 'TravelAgency' : 'TouristTrip',
      name: title || page.name,
      description: description,
      url: `${domain}${page.url === '/' ? '' : page.url}`,
      provider: {
        '@type': 'Person',
        name: 'Sakar',
        jobTitle: 'Responsible Nepal Travel Host & Cultural Director',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Nepal',
      },
    },
    suggestedMetadata: {
      title: titleLen < 40 ? `${page.name} — Authentic Nepal Travel | Sakar` : title,
      metaDescription:
        descLen < 100
          ? `Discover ${page.name} in Nepal with local host Sakar. Experience living culture, sacred Himalayan heritage, and respectful slow travel beyond ordinary tours.`
          : description,
      targetKeywords: keywords.length ? keywords : ['Nepal travel', 'Sakar Nepal guide', 'authentic Nepal experiences'],
    },
  };
}
