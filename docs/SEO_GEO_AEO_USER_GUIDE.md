# Explore With Sakar: Complete SEO, GEO, AEO & Search Performance User Guide

> **A Comprehensive Reference for Content Creators, Editors, and Administrators**  
> Covers Slugs, Tags, Traditional SEO, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and Google Search Console Analytics.

---

## Table of Contents
1. [Core Philosophy & Architecture](#1-core-philosophy--architecture)
2. [Slugs & URL Architecture](#2-slugs--url-architecture)
3. [Taxonomy: Tags, Categories & Badges](#3-taxonomy-tags-categories--badges)
4. [Traditional SEO (Search Engine Optimization)](#4-traditional-seo-search-engine-optimization)
5. [GEO (Generative Engine Optimization for AI Search)](#5-geo-generative-engine-optimization-for-ai-search)
6. [AEO (Answer Engine Optimization for Snippets & Voice)](#6-aeo-answer-engine-optimization-for-snippets--voice)
7. [Google Search Performance Layer](#7-google-search-performance-layer)
8. [Using the `/admin/seo` Dashboard](#8-using-the-adminseo-dashboard)
9. [Pre-Publish Content Creator Checklist](#9-pre-publish-content-creator-checklist)

---

## 1. Core Philosophy & Architecture

Explore With Sakar represents slow, mindful, and culturally intimate travel across Nepal. Our digital platform is built around two complementary systems:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        EXPLORE WITH SAKAR CMS                          │
├──────────────────────────────────┬─────────────────────────────────────┤
│   HEURISTIC AUDIT SYSTEM         │   REAL SEARCH PERFORMANCE LAYER     │
│   (Pre-Publish Optimization)     │   (Post-Publish Empirical Data)     │
│                                  │                                     │
│   • Traditional SEO Checklist    │   • Google Search Console API       │
│   • GEO AI Engine Readiness      │   • Real Clicks & Impressions       │
│   • AEO Answer Snippet Scoring   │   • Actual SERP Rank & CTR          │
│   • JSON-LD Structured Data      │   • Top Real Search Queries         │
└──────────────────────────────────┴─────────────────────────────────────┘
```

1. **The Heuristic Audit System (SEO / GEO / AEO)**: Evaluates page structure, copy, semantic entities, and metadata against algorithms to ensure readiness for Google, Bing, Perplexity, ChatGPT, and Apple Siri.
2. **The Real Search Performance Layer**: Connects securely via Google OAuth to the official Google Search Console Search Analytics API (`sc-domain:explorewithsakar.com`) to report actual clicks, impressions, CTR, and SERP positions.

> [!IMPORTANT]
> **Heuristic Scores vs. Real Performance Data:**  
> Heuristic audit scores (e.g. 92/100 Grade A) measure *content quality and technical setup*. Search Console metrics measure *actual human search behavior on Google*. They are never mixed into one formula.

---

## 2. Slugs & URL Architecture

### What is a Slug?
A **slug** is the human-readable, URL-safe identifier at the end of a web address that points to a specific resource. For example, in:
`https://explorewithsakar.com/experiences/beyond-the-map`
The slug is:
`beyond-the-map`

### URL Hierarchy & Mapping in Explore With Sakar
Our routing strictly mirrors our brand hierarchy:

| Section | Route Pattern | Example Slug | Example Full URL |
|---|---|---|---|
| **Root Pages** | `/[slug]` or `/` | `home`, `about`, `contact` | `https://explorewithsakar.com/about` |
| **Experiences** | `/experiences/[slug]` | `beyond-the-map`, `go-within`, `homestays`, `leave-a-mark` | `https://explorewithsakar.com/experiences/beyond-the-map` |
| **Experience Subtopics** | `/experiences/[slug]/[topic]` | `beyond-the-map` + `go-beyond` | `https://explorewithsakar.com/experiences/beyond-the-map/go-beyond` |
| **Destinations** | `/destinations/[slug]` | `kathmandu-valley`, `mustang-muktinath` | `https://explorewithsakar.com/destinations/kathmandu-valley` |
| **Articles / Journal** | `/blog/[slug]` | `the-morning-i-learned-to-slow-down` | `https://explorewithsakar.com/blog/the-morning-i-learned-to-slow-down` |
| **Events & Festivals** | `/events/[slug]` | `indra-jatra`, `mani-rimdu` | `https://explorewithsakar.com/events/indra-jatra` |

### Rules for Crafting Slugs
1. **Always Use Kebab-Case**: All lowercase letters separated by single hyphens (`-`).
   - ✅ Correct: `nepal-homestay-etiquette`
   - ❌ Incorrect: `Nepal_Homestay_Etiquette`, `nepalHomestayEtiquette`, `nepal homestay`
2. **Include Primary Target Keyword**: The slug is a direct signal to search engines.
   - ✅ Good: `patan-secret-courtyards`
   - ❌ Too Vague: `article-1` or `chapter-2`
3. **Strip Stop Words**: Remove unnecessary words (`and`, `the`, `of`, `in`, `a`) unless needed for readability.
   - Title: *"The 7 Hidden Courtyards of Patan"*
   - Recommended Slug: `hidden-courtyards-patan`
4. **Permanent Once Published**:
   - Changing a slug changes the URL. If a page is already indexed by Google, changing its slug will create a broken 404 link unless a 301 redirect is configured in `redirects.ts`.

---

## 3. Taxonomy: Tags, Categories & Badges

Taxonomies structure our content for visitors, internal search engines, and AI crawlers.

```
┌────────────────────────────────────────────────────────┐
│                   PRIMARY CATEGORY                     │
│               (Broad Editorial Theme)                  │
│       e.g., "Sakar's Journal", "Field Notes"           │
├────────────────────────────────────────────────────────┤
│                      TAGS (3-5)                        │
│          (Specific Entities & Topics)                  │
│  e.g., ["Slow Travel", "Patan", "Newar Heritage"]      │
├────────────────────────────────────────────────────────┤
│                     PILLAR BADGE                       │
│              (Core Travel Philosophy)                  │
│  e.g., "Pillar 01 • Guided Exploration"                │
└────────────────────────────────────────────────────────┘
```

### 1. Primary Categories (Broad Editorial Grouping)
Used for primary navigation and high-level filtering. Every blog or experience belongs to one primary category:
- **Sakar's Journal**: Intimate personal reflections, host essays, philosophy.
- **Cultural Guides**: Historical deep dives into temples, crafts, and architecture.
- **Slow Travel & Homestays**: Mountain community living, village hospitality.
- **Practical Field Notes**: Visas, altitudes, packing, weather rhythms.

### 2. Semantic Tags (Topic Clustering)
Tags connect related content across different sections of the website. For example, a traveler reading about the Newari woodcarving workshop in Bhaktapur can find related journal entries and destinations tagged with `Newar Heritage`.
- **Target Count**: Assign **3 to 5 tags** per post or experience.
- **Case Consistency**: Always use Title Case (`Slow Travel`, `Tibetan Singing Bowls`, `Monastery Chanting`).
- **Entity Alignment**: Ensure tags match recognized cultural or geographic entities (e.g., `Annapurna`, `Mustang`, `Patan`, `Homestay`).

### 3. Pillar Badges
Badges are visual editorial indicators used in cards and hero sections to reinforce our 4 Core Pillars:
- `Pillar 01 • Guided Exploration` (Beyond the Map)
- `Pillar 02 • Spiritual & Wellness` (Go Within)
- `Pillar 03 • Living Hearth Hospitality` (Feel Closer)
- `Pillar 04 • Strategic Empowerment` (Leave a Mark)

---

## 4. Traditional SEO (Search Engine Optimization)

Traditional SEO ensures that search engines like Google and Bing crawl, understand, and rank our pages.

### A. Page Title (`<title>`)
The single most important on-page SEO factor.

```
┌──────────────────────────────────────────────────────────────┐
│  [Primary Keyword] — [Compelling Value] | Explore With Sakar │
└──────────────────────────────────────────────────────────────┘
```

- **Optimal Length**: **45 to 65 characters**.
  - Less than 40 chars wastes SERP real estate.
  - More than 65 chars gets truncated (`...`) on mobile and desktop.
- **Structure**:
  - Always end with the brand suffix: ` | Explore With Sakar`
  - Put the primary keyword in the first 35 characters.
- **Examples**:
  - ✅ `Go Beyond the Map | Authentic Exploration with Sakar` (55 chars)
  - ✅ `Tibetan Sound Therapy & Monastery Walks | Explore With Sakar` (59 chars)
  - ❌ `Experiences` (too short, no keyword, no brand)
  - ❌ `Explore Nepal with Sakar Aryal Featuring Private Guided Cultural Tours in Kathmandu, Patan, and Bhaktapur` (truncated at 108 chars)

### B. Meta Description
The advertising snippet displayed beneath the title in search results.

- **Optimal Length**: **120 to 165 characters**.
  - Under 100 characters gives Google an excuse to rewrite your snippet with random body text.
  - Over 165 characters gets cut off mid-sentence.
- **Formula**:
  1. State the unique experience or topic clearly.
  2. Mention Sakar or local host connection.
  3. Include an active invitation/call to action.
- **Examples**:
  - ✅ `Step past grand facades into residential bahals, medieval stone courtyards, artisan guilds, and sacred Newar heritage in Nepal with Sakar.` (138 chars)
  - ❌ `Tour Nepal with us.` (20 chars — too short, zero search impact)

### C. Canonical URLs
A canonical URL tells search engines which version of a page is the authoritative original, preventing duplicate content penalties.

- **Always Use the Live Production Domain**: `https://explorewithsakar.com`
- **Never Use Development or Vercel Staging URLs**:
  - ❌ `https://explore-with-sakar.vercel.app/blog`
  - ❌ `http://localhost:3000/blog`
  - ✅ `https://explorewithsakar.com/blog`
- **Trailing Slash Consistency**:
  - Root: `https://explorewithsakar.com/`
  - Subpaths: `https://explorewithsakar.com/experiences/beyond-the-map` (no trailing slash)

### D. OpenGraph & Social Sharing
Controls how your link appears when shared on WhatsApp, Facebook, LinkedIn, Twitter/X, and iMessage:
- **`og:title`**: Clear, evocative headline (defaults to SEO Title).
- **`og:description`**: 2–3 sentences enticing social clicks (defaults to Meta Description).
- **`og:image`**: High-resolution landscape image.
  - Recommended dimensions: **1200 × 630 pixels** (1.91:1 aspect ratio).
  - Subject matter: Evocative human moments, mountain dawns, artisan hands, or architectural courtyards. Avoid pure text graphics.

### E. Indexing Controls
- **`noIndex`**: Leave unchecked for all public pages. Only enable for private staging pages, confirmation pages, or internal administrative views.
- **`sitemapVisible`**: Keep enabled so the page is included in `https://explorewithsakar.com/sitemap.xml`.

---

## 5. GEO (Generative Engine Optimization for AI Search)

### What is GEO?
Generative Engine Optimization is the practice of optimizing content so that **AI Search Engines** (Perplexity AI, ChatGPT Search, Google Gemini AI Overviews, Claude, Microsoft Copilot) cite and quote Explore With Sakar as an authoritative primary source.

Unlike traditional search (which matches keywords and links), AI models evaluate **semantic authority, named entities, factual clarity, and author expertise (E-E-A-T)**.

```
┌────────────────────────────────────────────────────────┐
│                   GEO THREE-PILLAR CORE                │
├────────────────────────────────────────────────────────┤
│  1. E-E-A-T AUTHOR SIGNALS                             │
│     Direct quotes from Sakar Aryal, firsthand host     │
│     notes, professional guide credentials.             │
├────────────────────────────────────────────────────────┤
│  2. HIMALAYAN ENTITY DENSITY                           │
│     Specific regional nouns (Patan, Newar, Tamang,     │
│     Bahal, Guthi, Annapurna) instead of generic "Asia".│
├────────────────────────────────────────────────────────┤
│  3. CITABLE FACTUAL STATEMENTS                         │
│     Declarative sentences, numbered timelines, and     │
│     structured answers that LLMs extract into outputs. │
└────────────────────────────────────────────────────────┘
```

### GEO Rule 1: First-Person Voice & E-E-A-T Signals
AI engines heavily favor verified human experience. Generic travel copy ("Nepal is a land of beauty") is dismissed by LLMs as generic training data.

- **Use Firsthand Framing**:
  - Instead of: *"Visitors can eat dal bhat with villagers."*
  - Use: *"When Sakar sits with the Gurung elders in Ghandruk around the woodfire chulo, meals are cooked with stone-ground millet and fermented gundruk."*
- **Include Direct Quotes**: Always feature a Host Note or quote block attributed to Sakar Aryal.
- **Specify Credentials**: Reiterate Sakar's role: *"Responsible Tour Director and cultural storyteller born in the Kathmandu Valley."*

### GEO Rule 2: Himalayan Entity Density
AI models build knowledge graphs around specific **named entities**. Our content auditor scans for specific regional terms:

| Entity Category | Preferred Specific Terms (Use These) | Avoid (Too Generic) |
|---|---|---|
| **Geography** | Patan, Bhaktapur, Kathmandu Valley, Mustang, Annapurna, Pokhara, Langtang | "The mountains", "The Orient", "The Valley" |
| **Culture** | Newari bahal, chaitya, stupa, puja, chulo, singing bowls, Guthi system | "Traditions", "Local customs", "Monuments" |
| **Communities** | Gurung, Tamang, Sherpa, Newar, Tharu | "Tribes", "Villagers", "Native people" |
| **Philosophy** | Slow travel, heritage conservation, living hearth, non-extractive tourism | "Sightseeing tour", "Vacation package" |

### GEO Rule 3: Citation-Ready Declarative Statements
When Perplexity or ChatGPT answers a query like *"How to experience Patan beyond tourists?"*, it extracts complete sentences that make definitive statements.

- **Structure**: Write clear, standalone declarative sentences that don't rely on surrounding context to make sense.
- **Example**: *"Patan's residential bahals—such as Kwa Bahal and Ha Bahal—are enclosed Buddhist courtyards dating to the 12th century where Newar families preserve daily chanting rituals away from vehicle traffic."*
  - This sentence is completely self-contained. An AI search engine can lift and cite it verbatim with 100% confidence.

---

## 6. AEO (Answer Engine Optimization for Snippets & Voice)

### What is AEO?
Answer Engine Optimization focuses on winning **Google Featured Snippets (Position 0)** and serving immediate, authoritative voice answers for Apple Siri, Google Assistant, and Amazon Alexa.

### The 40–50 Word Direct Answer Rule
When a user asks Google or Siri a question, the algorithm searches for a direct paragraph containing between **40 and 55 words** immediately following a question heading.

```
┌──────────────────────────────────────────────────────────────────────────┐
│  <h2>What makes a village homestay in Nepal authentic?</h2>              │
│                                                                          │
│  <p>                                                                     │
│    An authentic Nepal homestay integrates travelers directly into daily  │
│    family rhythms rather than a commercial lodge. Guests stay in private │
│    traditional stone rooms, share organic hearth-cooked meals with hosts,│
│    and participate in seasonal farm routines while financial proceeds    │
│    remain 100% within the village.                                       │
│  </p>  [47 words — Exact Featured Snippet Length]                        │
└──────────────────────────────────────────────────────────────────────────┘
```

### Formatting Q&A Sections
1. **Use Question Headers (H2 or H3)**:
   - Begin headers with interrogatives: `What`, `How`, `Why`, `When`, `Where`, `Is it safe to`.
   - Examples:
     - `What is the best time to visit Kathmandu for cultural festivals?`
     - `How does Sakar ensure ethical volunteer travel in Leave a Mark?`
2. **Lead with the Direct Answer**:
   - Provide the answer in the first sentence. Elaborate in subsequent sentences. Never start an answer with *"Well, it depends on many things..."*
3. **Use Bulleted Lists for Sequences**:
   - For itineraries, gear lists, and steps, use numbered lists (`<ol>`) or bullet points (`<ul>`). Google often converts lists into table snippets.

### JSON-LD Structured Data Schema
Our automated auditor generates search-engine-ready JSON-LD schemas:
- **`FAQPage` Schema**: Tags questions and accepted answers so Google displays expandable dropdown accordions directly on search results pages.
- **`TouristTrip` / `TravelAction`**: Structured itinerary days, departure locations, and guide credentials.
- **`Organization`**: Identity, founder (Sakar Aryal), logo, and official contact channels.

---

## 7. Google Search Performance Layer

The **Google Search Performance Layer** connects directly to the Google Search Console API. It shows empirical, real-world data about how Google searchers interact with each CMS page.

### Key Metrics Explained

| Metric | Definition | Good Benchmark | What It Tells You |
|---|---|---|---|
| **Clicks** | Total times a searcher clicked your Google SERP link to visit the page. | Increasing month-over-month | Actual organic search volume landing on this page. |
| **Impressions** | Total times your page appeared in a user's search results for any query. | High numbers indicate topical visibility | Search demand and topic relevance in Google's index. |
| **CTR (Click-Through Rate)** | `Clicks ÷ Impressions` expressed as a percentage. | **3% to 8%+** for non-branded, **20%+** for branded | How attractive your SEO Title & Meta Description are in the SERP. |
| **Average Position** | The average numerical ranking of your URL for reported search queries. | **1.0 to 3.0** (Top 3), **4.0 to 10.0** (Page 1) | How strongly Google ranks this page compared to competitors. |

### Interpreting Top Search Queries
In `/admin/seo`, the **Top Search Queries** table lists every search term Google searchers typed before seeing or clicking your page:

```
┌──────────────────────────────────────┬────────┬────────┬───────┬────────┐
│ Search Query                         │ Clicks │ Impr   │ CTR   │ Pos    │
├──────────────────────────────────────┼────────┼────────┼───────┼────────┤
│ patan hidden courtyards tour         │ 42     │ 480    │ 8.8%  │ 2.4    │
│ authentic nepal village homestay     │ 28     │ 610    │ 4.6%  │ 4.1    │
│ tibetan singing bowl sound therapy   │ 19     │ 920    │ 2.1%  │ 8.7    │
└──────────────────────────────────────┴────────┴────────┴───────┴────────┘
```

#### How to Act on This Data:
- **High Impressions + Low CTR (e.g. 920 impressions, 2.1% CTR, Position 8.7)**:
  - *Diagnosis*: People are searching for this term, but your title or description is not compelling enough to click, or your rank is near the bottom of Page 1.
  - *Action*: Rewrite the SEO Title to include this exact search query near the front. Enhance the Meta Description with an active invitation.
- **High CTR + Position 1–3**:
  - *Diagnosis*: A winning keyword. Protect this content and ensure internal links point to it.
- **Unexpected Search Queries**:
  - If a page ranks for a question you haven't explicitly answered, add an H2 and a 45-word direct answer to that page to capture even higher rank!

### Date Range Filters
- **Last 7 days**: Best for spotting sudden rank drops or recent indexing gains.
- **Last 28 days**: The standard benchmark for monthly health.
- **Last 3 months & 6 months**: Best for evaluating seasonal travel trends (e.g. autumn festival search surges).

> [!NOTE]
> **Google Search Console 2–3 Day Data Lag**:  
> Google does not report real-time search data. Google Search Console processes analytics in daily batch pipelines. The "End Date" in our system is anchored to 2 days ago to ensure 100% data integrity.

---

## 8. Using the `/admin/seo` Dashboard

The `/admin/seo` interface is divided into two primary workspaces:

### Workspace 1: Page Metadata & Indexing
The command center for viewing every CMS page at a glance.
- **Search & Filters**: Quickly filter pages by `Needs Review`, `No-Index`, or `Excluded Sitemap`.
- **Compact Search Performance Column**: Shows real `Clicks`, `Impr`, `CTR`, and `Pos` right inside the table row.
- **Quick Edit Modal**: Click **"Edit SEO"** on any row to modify titles, descriptions, OpenGraph tags, and indexing rules with real-time character counters.

### Workspace 2: Automated SEO / GEO / AEO Auditor
The deep-dive auditor for any individual page.
1. **Page Selector**: Switch between any CMS page (Homepage, Blog, Experiences, Destinations, etc.).
2. **3-Pillar Score Cards**:
   - **Overall Composite Health**: Letter grade (`A+` to `F`) and score out of 100.
   - **Traditional SEO Score**: Checks SERP titles, character limits, canonicals, and OpenGraph.
   - **GEO Score**: Measures E-E-A-T signals, author attribution, and Himalayan entity density.
   - **AEO Score**: Checks question headers, direct answer paragraph lengths, and schema formatting.
3. **Google Search Performance Layer**:
   - Real KPI cards for Clicks, Impressions, CTR, and Position.
   - Top Search Queries table.
   - **"Refresh Search Data"** button to bypass server cache.
4. **Audit Checklist Tab**:
   - Lists every passed, warning, and failing item with actionable advice.
   - Click **"Apply Recommended Fix"** to automatically update your page's title and description to the auditor's mathematically optimized suggestions.
5. **AI Simulation Tab**:
   - Simulates what Perplexity AI or ChatGPT would extract from this page, showing detected entities and citation confidence.
6. **Schema & Auto-Fixes Tab**:
   - Preview generated JSON-LD structured data ready for Google rich results.

---

## 9. Pre-Publish Content Creator Checklist

Before publishing any new experience, destination, blog article, or festival page, run through this quick 5-minute checklist:

- [ ] **Slug Check**: Is the slug lowercase, kebab-case, and keyword-rich? (e.g., `kathmandu-monastery-dawn-puja`)
- [ ] **Title Check**: Is the title between 45 and 65 characters and ending with ` | Explore With Sakar`?
- [ ] **Description Check**: Is the description between 120 and 165 characters with a clear hook?
- [ ] **Canonical URL Check**: Does the canonical URL point to `https://explorewithsakar.com/...`?
- [ ] **Author / E-E-A-T Signal**: Does the page mention Sakar Aryal, include a host reflection, or provide firsthand context?
- [ ] **Entity Check**: Are specific places and cultural elements named (e.g. *Bhaktapur*, *Newar woodcarving*, *Gundruk*) instead of generic terms?
- [ ] **AEO Question**: Does the page contain at least one question header (`What...`, `How...`) followed by a concise 40–50 word answer?
- [ ] **Social Preview Image**: Is there a landscape 1200×630 OpenGraph image attached?
- [ ] **Audit Score**: In `/admin/seo`, does the page achieve at least **Grade A (85%+)**?
- [ ] **Search Console Monitor**: For existing pages, check the **Google Search Performance** layer to see if impressions are trending upward!
