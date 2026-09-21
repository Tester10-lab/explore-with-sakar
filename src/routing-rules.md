# Explore With Sakar — URL Architecture & Routing Rules

## 1. Core Rule: Public vs. Admin Separation
Public customer-facing pages and Admin CMS management routes are strictly separated conceptually and technically.
Public URLs must never be used as Admin URLs, and Admin URLs must never become canonical public URLs.

## 2. Namespace Conventions

```text
PUBLIC EXPERIENCE CONTENT:
/experiences                     → All Curated Experiences catalog
/experiences/beyond-the-map       → Go Beyond the Map pillar
/experiences/spiritual-wellness   → Go Within (Spiritual & Sound Sanctuary) pillar
/experiences/homestays           → Feel Closer (Village Homestays) pillar
/experiences/leave-a-mark        → Leave a Mark (Volunteer Tourism) pillar
/experiences/custom-journeys     → Custom Private Journeys pillar
/experiences/[itinerary-slug]    → Individual Curated Itineraries (e.g., kathmandu-heritage-trail)

PUBLIC CONTENT & STORIES:
/events                          → Sacred Gatherings, Living Traditions & Festivals
/events/[slug]                   → Single Event Details
/blog                            → Sakar's Journal & Articles
/blog/[slug]                     → Single Article & Notes
/reviews                         → Traveler Reviews & Scanned Guestbook Letters
/about                           → About Sakar & Storytelling Philosophy
/destinations                    → Sacred Regions & Valleys
/gallery                         → Visual Journey Gallery
/faq                             → Frequently Asked Questions
/resources                       → Practical Traveler Resources & Guides
/contact                         → Inquiries & Consultation Form

PUBLIC SERVICES (Only when genuinely a distinct non-Experience service):
/services/*                      → Reserved strictly for non-experience services if created.
                                   All legacy /services/... experience URLs are 308 permanently
                                   redirected to /experiences/...

ADMIN CMS:
/admin                           → Dashboard
/admin/experiences               → Itineraries & Experience Management
/admin/pages/[slug]              → In-context Page Section & SEO Editor
/admin/events                    → Events Management
/admin/blogs                     → Blog & Story Editorial
/admin/settings                  → Global Contact & Site Settings

API:
/api/public/*                    → Unauthenticated public endpoints
/api/admin/*                     → Authenticated administrative CMS endpoints
```

## 3. SEO & Canonical Rules
- Every public Experience page has **exactly one** self-referencing canonical URL: `https://explorewithsakar.com/experiences/[slug]`.
- All legacy URLs under `/services/...`, `/service/...`, `/experience/...`, and `/packages/...` are redirected with **HTTP 308 (Permanent Redirect)** directly in `next.config.mjs`.
- Never create redirect chains (e.g. A → B → C). Always redirect directly A → C.
- Obsolete or redirected URLs must **never** be included in `sitemap.xml`.
- Admin routes (`/admin/*`, `/api/admin/*`) are blocked in `robots.ts`.
