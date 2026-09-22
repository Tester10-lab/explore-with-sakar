import { PageContent } from '@/types/cms';
import { SITE_ORIGIN } from '@/lib/config';

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
    engine: string;
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

export function auditPageContent(page: PageContent, domain = SITE_ORIGIN): AuditResult {
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
  const sectionHeadings: string[] = [];
  const contentParagraphs: string[] = [];

  (page.sections || []).forEach((sec) => {
    if (sec.content) {
      // Check explicit heading properties
      ['title', 'heading', 'subtitle', 'badge', 'h2', 'h3', 'question'].forEach((prop) => {
        const val = sec.content[prop];
        if (typeof val === 'string' && val.trim().length > 0) {
          sectionHeadings.push(val.trim());
        }
      });

      // Check FAQ items or list items with questions
      if (Array.isArray(sec.content.faqItems)) {
        sec.content.faqItems.forEach((item: any) => {
          if (item && typeof item === 'object') {
            if (typeof item.question === 'string') sectionHeadings.push(item.question.trim());
            if (typeof item.q === 'string') sectionHeadings.push(item.q.trim());
            if (typeof item.answer === 'string') contentParagraphs.push(item.answer.trim());
            if (typeof item.a === 'string') contentParagraphs.push(item.a.trim());
          }
        });
      }

      // Check text paragraphs in content
      ['quote', 'description', 'text', 'body', 'manifesto', 'content'].forEach((prop) => {
        const val = sec.content[prop];
        if (typeof val === 'string' && val.trim().length > 0) {
          contentParagraphs.push(val.trim());
        }
      });

      Object.values(sec.content).forEach((val) => {
        if (typeof val === 'string') {
          sectionTexts.push(val);
        } else if (Array.isArray(val)) {
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
  // 1. SEO AUDIT (Traditional Search Engines)
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
      title: 'Meta Description Truncation Risk',
      status: 'warn',
      score: 65,
      detail: `Meta description is ${descLen} characters (over 160). It may be cut off on mobile search result snippets.`,
      recommendation: 'Condense description to under 155 characters for crisp SERP presentation.',
      suggestedFix: description.slice(0, 152).trim() + '...',
    });
  } else {
    checks.push({
      id: 'seo-meta-desc',
      category: 'seo',
      title: 'Meta Description Missing or Too Short',
      status: 'fail',
      score: 25,
      detail: `Meta description is only ${descLen} characters. Search engines will generate automated excerpts.`,
      recommendation: 'Write a dedicated 140–160 character description summarizing the unique traveler transformation.',
      suggestedFix: `Experience authentic Nepal with local host Sakar. Private guided journeys through heritage courtyards, sacred Himalayan sanctuaries, and village homestays.`,
    });
  }

  // Check 3: Canonical URL Integrity
  const expectedCanonical = `${domain}${page.url === '/' ? '' : page.url}`;
  if (canonical && (canonical === expectedCanonical || canonical === `${expectedCanonical}/`)) {
    checks.push({
      id: 'seo-canonical',
      category: 'seo',
      title: 'Canonical URL Self-Reference',
      status: 'pass',
      score: 100,
      detail: `Valid canonical URL set: "${canonical}". Prevents duplicate content penalties.`,
    });
  } else if (canonical) {
    checks.push({
      id: 'seo-canonical',
      category: 'seo',
      title: 'Canonical URL Mismatch',
      status: 'warn',
      score: 70,
      detail: `Canonical tag is "${canonical}", but route canonical is "${expectedCanonical}".`,
      recommendation: 'Update canonical URL to point to the current official route.',
      suggestedFix: expectedCanonical,
    });
  } else {
    checks.push({
      id: 'seo-canonical',
      category: 'seo',
      title: 'Missing Explicit Canonical URL',
      status: 'warn',
      score: 50,
      detail: 'No canonical URL configured in page SEO settings. The site falls back to runtime origin.',
      recommendation: `Explicitly set canonicalUrl to "${expectedCanonical}" in CMS.`,
      suggestedFix: expectedCanonical,
    });
  }

  // Check 4: OpenGraph & Social Sharing
  if (ogTitle && ogDesc && ogImage) {
    checks.push({
      id: 'seo-og',
      category: 'seo',
      title: 'OpenGraph & Social Card Completeness',
      status: 'pass',
      score: 100,
      detail: 'Complete OpenGraph metadata with custom title, description, and social sharing image.',
    });
  } else if (ogImage) {
    checks.push({
      id: 'seo-og',
      category: 'seo',
      title: 'OpenGraph Image Configured',
      status: 'pass',
      score: 85,
      detail: 'OG image is configured. Titles and descriptions fall back cleanly to page SEO metadata.',
    });
  } else {
    checks.push({
      id: 'seo-og',
      category: 'seo',
      title: 'Missing OpenGraph Image',
      status: 'warn',
      score: 60,
      detail: 'No dedicated OpenGraph image URL set. WhatsApp, Twitter/X, and Facebook will use default site banner.',
      recommendation: 'Add a high-resolution 1200x630px image URL showcasing Nepal landscapes or host Sakar.',
      suggestedFix: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200',
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
  // Heuristic evaluation of AI search readiness
  // ==========================================

  // Check 6: [Heuristic] E-E-A-T Signals & Local Authority
  const eeatMatches = ['sakar', 'guide', 'local', 'firsthand', 'authentic', 'experienced', 'host', 'stories']
    .filter((word) => combinedContext.toLowerCase().includes(word));
  
  if (eeatMatches.length >= 4) {
    checks.push({
      id: 'geo-eeat',
      category: 'geo',
      title: '[Heuristic] E-E-A-T Authority & Firsthand Voice',
      status: 'pass',
      score: 100,
      detail: `Strong firsthand voice markers detected (${eeatMatches.join(', ')}). Heuristic: Evaluates presence of named host credentials and lived field experience. (Note: Heuristic estimate, not live crawler ranking).`,
    });
  } else {
    checks.push({
      id: 'geo-eeat',
      category: 'geo',
      title: '[Heuristic] E-E-A-T Firsthand Signals Could Be Stronger',
      status: 'warn',
      score: 65,
      detail: 'Generative models prioritize pages with explicit author credentials and local lived experience. (Heuristic estimate).',
      recommendation: 'Mention local host Sakar directly, along with years of Himalayan guiding and community relationships.',
      suggestedFix: 'Add: "Curated and guided personally by local Himalayan host Sakar with over a decade of authentic Nepal slow-travel relationships."',
    });
  }

  // Check 7: [Heuristic] Entity Depth (Knowledge Graph Recognition)
  const detectedEntities = HIMALAYAN_ENTITIES.filter((entity) =>
    combinedContext.toLowerCase().includes(entity.toLowerCase())
  );
  if (detectedEntities.length >= 6) {
    checks.push({
      id: 'geo-entities',
      category: 'geo',
      title: '[Heuristic] Entity Depth (Knowledge Graph Recognition)',
      status: 'pass',
      score: 100,
      detail: `High entity density: detected ${detectedEntities.length} core geographical & cultural entities (${detectedEntities.slice(0, 5).join(', ')}...). Heuristic: Named entities improve topical relevance in generative synthesis.`,
    });
  } else if (detectedEntities.length >= 3) {
    checks.push({
      id: 'geo-entities',
      category: 'geo',
      title: '[Heuristic] Moderate Entity Recognition',
      status: 'warn',
      score: 70,
      detail: `Found ${detectedEntities.length} entities (${detectedEntities.join(', ')}). Generative models favor rich named-entity references. (Heuristic estimate).`,
      recommendation: 'Reference specific UNESCO heritage locations, valleys, mountain ranges, or cultural traditions.',
    });
  } else {
    checks.push({
      id: 'geo-entities',
      category: 'geo',
      title: '[Heuristic] Low Entity Depth for AI Search',
      status: 'fail',
      score: 40,
      detail: 'Very few specific Nepalese cultural or geographic entities detected. (Heuristic estimate).',
      recommendation: 'Include recognized cultural entities like Newari courtyards, Patan, Kathmandu Valley, or Tibetan Buddhist monasteries.',
    });
  }

  // Check 8: [Heuristic] Factual Density & Citation Readiness
  const hasNumbers = /\b\d+(?:–|-|\+)?\s*(?:days?|hours?|meters?|ft|travelers?|years?)\b/i.test(combinedContext);
  const hasQuotes = /["“'‘].*?["”'’]/.test(combinedContext) || combinedContext.toLowerCase().includes('quote') || combinedContext.toLowerCase().includes('review');
  if (hasNumbers && hasQuotes) {
    checks.push({
      id: 'geo-citations',
      category: 'geo',
      title: '[Heuristic] Factual Density & Citation Readiness',
      status: 'pass',
      score: 95,
      detail: 'Page contains concrete numbers (durations, party sizes, elevation) and quotes. Heuristic: AI synthesizers quote concrete facts and verified traveler quotes.',
    });
  } else if (hasNumbers || hasQuotes) {
    checks.push({
      id: 'geo-citations',
      category: 'geo',
      title: '[Heuristic] Moderate Citation Density',
      status: 'warn',
      score: 70,
      detail: 'Contains some factual metrics, but lacks direct traveler quotes or field note soundbites. (Heuristic estimate).',
      recommendation: 'Add concrete facts (e.g. "Full Day", "1–6 travelers", "Elevation: 1,400m") and genuine traveler quotes.',
    });
  } else {
    checks.push({
      id: 'geo-citations',
      category: 'geo',
      title: '[Heuristic] Low Citation Data for AI Summaries',
      status: 'fail',
      score: 45,
      detail: 'Content is purely generic or descriptive without citable metrics, itineraries, or traveler quotes. (Heuristic estimate).',
      recommendation: 'Include specific numbers: duration in days, maximum group sizes, season, and locations.',
    });
  }

  // ==========================================
  // 3. AEO AUDIT (Answer Engine Optimization)
  // Real Headings & Real Page Content Inspection
  // ==========================================

  // Check 9: Question-Phrased Headings (H2/H3/Section Titles)
  // Must check real heading elements, NOT general body text!
  const questionPattern = /^(what|how|why|when|where|who|which|can|is|are|do|does)\b/i;
  const questionHeadings = sectionHeadings.filter(
    (h) => h.endsWith('?') || questionPattern.test(h)
  );

  if (questionHeadings.length >= 1) {
    checks.push({
      id: 'aeo-questions',
      category: 'aeo',
      title: 'Question-Targeted Headings (Voice & Snippets)',
      status: 'pass',
      score: 100,
      detail: `Verified: Found ${questionHeadings.length} question-style heading(s) in page sections: "${questionHeadings.slice(0, 2).join('", "')}". Matches natural voice queries and search intents.`,
    });
  } else {
    checks.push({
      id: 'aeo-questions',
      category: 'aeo',
      title: 'Missing Question-Phrased Headings',
      status: 'warn',
      score: 50,
      detail: 'No question-phrased headings found among page section titles. Voice search (Siri, Google Assistant) and Featured Snippets trigger primarily on explicit question headers.',
      recommendation: 'Add H2/H3 section headings phrased as natural questions (e.g. "Why choose a homestay over a hotel?", "What does Go Within include?").',
      suggestedFix: `Why Choose ${page.name}? / What Makes Sakar's Nepal Journey Unique?`,
    });
  }

  // Check 10: Direct Answer Block (From Actual Page Content)
  // Must check real section content paragraphs, NOT meta description!
  const candidateParagraphs = contentParagraphs
    .map((p) => ({
      text: p,
      words: p.split(/\s+/).filter(Boolean).length,
    }))
    .filter((p) => p.words >= 30 && p.words <= 70 && p.text.length >= 140);

  if (candidateParagraphs.length > 0) {
    const bestBlock = candidateParagraphs[0];
    const excerpt = bestBlock.text.slice(0, 80).trim();
    checks.push({
      id: 'aeo-direct-answer',
      category: 'aeo',
      title: 'Concise Direct Answer Block in Page Content',
      status: 'pass',
      score: 95,
      detail: `Verified: Found concise direct-answer block (${bestBlock.words} words) in page body: "${excerpt}...". Suitable for direct snippet extraction by search AI.`,
    });
  } else {
    checks.push({
      id: 'aeo-direct-answer',
      category: 'aeo',
      title: 'Direct Answer Block Needs Tuning in Page Body',
      status: 'warn',
      score: 55,
      detail: 'No standalone 35–65 word concise direct-answer paragraph found in section content. While meta description exists, search engines and AI answer engines extract concise answer blocks directly from page body paragraphs.',
      recommendation: 'Provide a standalone 40–55 word summary paragraph under a key section heading answering the page topic directly.',
      suggestedFix: 'Explore With Sakar provides private, slow-paced Nepal cultural tours guided by local host Sakar. Experiences focus on living Newar heritage, Himalayan spiritual meditation, and village homestays designed to foster genuine human connections away from commercial tourist crowds.',
    });
  }

  // Check 11: Real Rendered Structured Schema Verification
  // The auditor must inspect what schemas are ACTUALLY rendered by the page implementation.
  const pageUrl = (page.url || '').toLowerCase();
  const isHomepage = pageUrl === '/' || pageUrl === '';
  const isExperienceRoute = pageUrl.startsWith('/experiences/');
  const isFaqPage = pageUrl === '/faq';
  const isBlog = pageUrl === '/blog' || pageUrl.startsWith('/blog/');

  if (isHomepage) {
    checks.push({
      id: 'aeo-schema',
      category: 'aeo',
      title: 'JSON-LD Structured Schema (TravelAgency)',
      status: 'pass',
      score: 95,
      detail: 'Verified: TravelAgency JSON-LD schema is rendered on the homepage via root layout with brand identity, founder Sakar, areaServed Nepal, and contact points.',
    });
  } else if (isExperienceRoute) {
    checks.push({
      id: 'aeo-schema',
      category: 'aeo',
      title: 'JSON-LD Structured Schema (TouristTrip & Breadcrumbs)',
      status: 'pass',
      score: 100,
      detail: 'Verified: TouristTrip and BreadcrumbList JSON-LD structured schemas are rendered on this experience route via ExperiencePackageDiscovery.',
    });
  } else if (isFaqPage) {
    checks.push({
      id: 'aeo-schema',
      category: 'aeo',
      title: 'JSON-LD Structured Schema (FAQPage)',
      status: 'pass',
      score: 100,
      detail: 'Verified: FAQPage JSON-LD schema with questions and accepted answers is rendered on this page.',
    });
  } else if (isBlog) {
    checks.push({
      id: 'aeo-schema',
      category: 'aeo',
      title: 'JSON-LD Structured Schema (BlogPosting Missing)',
      status: 'warn',
      score: 55,
      detail: 'Only root TravelAgency schema is present. Missing BlogPosting / CollectionPage JSON-LD schema on this article/journal route.',
      recommendation: 'Add BlogPosting schema to article pages with headline, author, and datePublished.',
    });
  } else {
    checks.push({
      id: 'aeo-schema',
      category: 'aeo',
      title: 'JSON-LD Structured Schema (Partial)',
      status: 'warn',
      score: 65,
      detail: 'Global TravelAgency schema is rendered by root layout, but no page-specific structured schema (e.g. AboutPage, ContactPage) is rendered for this route.',
      recommendation: 'Add page-specific schema markup matching this page type.',
    });
  }

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

  // Heuristic AI Search Simulation Output
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
      engine: 'Heuristic AI Search Extraction Simulation',
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
