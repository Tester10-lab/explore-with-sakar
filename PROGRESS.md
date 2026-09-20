# Progress: Fix Slow Loading and Admin ↔ Site Sync

## Checklist

- [x] P0.1 P0.2 P0.3
- [x] P1.1 P1.2 P1.3 P1.4 P1.5 P1.6 — T5 T6 T7 T10
- [x] P2.1 P2.2 P2.3 P2.4 P2.5 P2.6 — T1 T2 T3 T4 T9 T11
- [ ] P3.1 P3.2 P3.3 P3.4 — T8 T12
- [ ] P4.1 P4.2 (P4.3 blocked)

---

## Baseline Numbers (P0.3)

| Endpoint | Metric | Cold Run | Warm Run |
|---|---|---|---|
| `/` | Latency / Size | 23.11s / 2,269,188 B | 0.133s / 2,269,188 B |
| `/api/public/content` | Latency / Size | 2.894s / 7,491,993 B | 0.218s / 7,491,993 B |

---

## After Numbers (T11 Comparison)

| Endpoint | Metric | Cold Run | Warm Run |
|---|---|---|---|
| `/` | Latency / Size | 0.702s / 2,269,068 B | 0.058s / 2,269,068 B |
| `/` | Mongo Reads | 0 (Static prerender) | 0 |
| `/api/public/settings` | Latency / Size | 0.290s / 2,428 B | 0.035s / 2,428 B |
| `/api/public/content` | Status | Deleted (0 B) | Deleted (0 B) |

---

## Phase Notes & Decisions

### Phase 0
- Created branch `fix/loading-and-sync`.
- Added `.env.example` with documented environment variable keys.
- Added `.data/` to `.gitignore`.

### Phase 1
- **P1.1 `mongodb.ts`**: Removed hardcoded URI and DB name. Lazy connection, clearing cached promise on error, 10s cooldown before retrying. Applied `dns.setServers` only when `MONGODB_DNS_SERVERS` is set. Throws `MongoUnavailableError`.
- **P1.2 `store.ts` & `seed.ts`**: Single-key projection `readKey(key)` with atomic pipeline seeding `[{ $set: { [key]: { $ifNull: [ "$<key>", { $literal: seed } ] } } }]`. Single-key `$set` `writeKey(key, value)`. Atomic `pushInquiry`, `updateInquiryById`, `deleteInquiryById`. Read-only seed fallback in memory on Mongo disconnection. Runtime writes to `data/cms-store.json` removed.
- **P1.3 `db.ts`**: Rebuilt all exports as async functions over `store.ts`. Deleted `memoryCache`, `readStore`, `writeStore`, `writeStoreAsync`, `readStoreAsync`. Empty collections `[]` stay empty and never restore static defaults. Updated callers with `await`.
- **P1.4 API routes & UI toasts**: All admin API mutations and public inquiry route await writes and return 503 on `MongoUnavailableError`. Admin UI pages toast the actual `error` message returned from API.
- **P1.5 `auth.ts`**: Removed hardcoded secret. Requires `ADMIN_JWT_SECRET` in production, random dev secret with warning.
- **P1.6 `next.config.mjs`**: Traced `./data/**/*` for `'/**/*'`.
- **Verified T5, T6, T7, T10**:
  - T10: Fresh database seed has events, destinations, faq, pages, navigation, settings matching live public defaults.
  - T5: Empty collection `[]` stays empty and does not revert to defaults.
  - T6: Atomic inquiry push verified; parallel submissions both recorded.
  - T7: Invalid Mongo URI serves seed content on read, returns 503 on write, and `data/cms-store.json` is never modified.
- `npx tsc --noEmit` and `npm run build` both passed with 0 errors.

### Phase 2
- **P2.1 `src/lib/content.ts`**: Implemented cached getters using `unstable_cache` with tags (`cms:<key>`), 3600s TTL. Stripped heavy `content` from blog list to keep entries well under 2MB Vercel limit. Fallback gracefully returns static seed when Mongo throws without caching errors.
- **P2.2 `src/lib/revalidate.ts` & Admin Routes**: Wired `revalidateContent` to all mutating admin routes (packages, experiences, services, navigation, settings, pages, destinations, events, faq, reviews, handwrittenReviews, photos, blogs).
- **P2.3 Root Layout SSR & SettingsProvider**: `src/app/layout.tsx` server-renders `getPublicSettings()` and `getPublicNavigation()` in parallel, passing initial data to `<SettingsProvider>`. Created lightweight `/api/public/settings` for `refreshSettings()` without downloading the entire database. Added `router.refresh()` to admin Settings, Homepage, and Navigation pages.
- **P2.4 Public Pages Migration**: Removed `force-dynamic` and `revalidate = 0` from `/` and `/blog/[slug]`. Converted `/`, `/about`, `/packages`, `/experience`, `/events`, `/destinations`, `/destinations/[slug]`, `/faq`, `sitemap.ts`, `FeelCloserExperience`, and `GoSpiritualExperience` to cached content getters.
- **P2.5 Server Components Conversion**: Converted `/blog`, `/gallery`, `/reviews` to Server Components fetching cached data and passing it to `BlogClient`, `GalleryClient`, and `ReviewsClient`. Removed runtime `/api/public/content` fetch in `GuestBook.tsx`.
- **P2.6 Cleanup**: Verified 0 occurrences of `/api/public/content` across codebase. Deleted `src/app/api/public/content/route.ts`.
- **Verified T1, T2, T3, T4, T9, T11**:
  - Cold load on `/`: 0.702s (down from 23.11s, **33x speedup**).
  - Warm load on `/`: 0.058s (down from 0.133s, **2.3x speedup**).
  - Pre-rendered static pages generated across all 106 routes.
  - Zero type errors with `npx tsc --noEmit`. Production build passed with 0 errors.

### Phase 3: Admin Matches Site
- **P3.1 Fix AdminSidebar Links**:
  - Replaced broken links in `src/components/admin/AdminSidebar.tsx` with valid seed slugs (`go-beyond`, `go-spiritual`, `feel-closer`, `custom-private-journeys`).
  - Verified all sidebar links now resolve to valid routes and seeded content (verified Test T12).
- **P3.2 Dynamic Navigation Engine**:
  - Created `src/lib/navIcons.ts` with custom Lucide icon registry and graceful fallbacks.
  - Added seeded default navigation structure in `src/lib/seed.ts` matching existing public navbar.
  - Exported `useSiteNavigation` hook in `src/context/SettingsContext.tsx` with resilient fallback.
  - Updated `Navbar.tsx`, `MobileNav.tsx`, and `Footer.tsx` to render dynamically from CMS settings, falling back seamlessly if unconfigured.
  - Added icon picker in `src/app/admin/navigation/page.tsx` with live previews (verified Test T8).
- **P3.3 Services Architecture Audit**:
  - Verified `ServiceCard` and `SERVICE_PILLARS` are unused on public routes.
  - Confirmed `/admin/services` remains safely decoupled and excluded from main admin navigation.
- **P3.4 Page Editor Overrides & Admin Sync**:
  - Created `src/lib/pageContentHelper.ts` with `getPageHeroOverrides` and variadic `isSectionVisible`.
  - Added notice banner and `router.refresh()` in `src/app/admin/pages/[slug]/page.tsx`.
  - Connected `pageContent` and section visibility toggles into all 8 hand-coded pages (`experience/[slug]`, `GoBeyondExperience`, `GoSpiritualExperience`, `FeelCloserExperience`, `LeaveAMarkExperience`, `CustomJourneysExperience`, `about/page.tsx`, `contact/page.tsx`, and `resources/page.tsx`).
  - Refactored `src/app/contact/page.tsx` into a Server Component with `src/components/contact/ContactClient.tsx`.
  - Added `router.refresh()` to every mutation in all admin management pages (`reviews`, `photos`, `inquiries`, `events`, `destinations`, `faq`, `packages`, `experiences`, `blogs`, `settings`, `pages`) ensuring immediate client-side synchronization.
- **Verification**:
  - `npx tsc --noEmit` exited with code 0.
  - `npm run build` generated 106/106 static pages with code 0.
  - Verified T8 (navigation dynamic sync and default fallbacks) and T12 (all AdminSidebar links resolve to valid CMS entries).

### Phase 4
*(Pending execution)*
