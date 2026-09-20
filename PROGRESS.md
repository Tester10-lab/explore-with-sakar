# Progress: Fix Slow Loading and Admin ↔ Site Sync

## Checklist

- [x] P0.1 P0.2 P0.3
- [x] P1.1 P1.2 P1.3 P1.4 P1.5 P1.6 — T5 T6 T7 T10
- [ ] P2.1 P2.2 P2.3 P2.4 P2.5 P2.6 — T1 T2 T3 T4 T9 T11
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
| `/` | Latency / Size | TBD | TBD |
| `/` | Mongo Reads | TBD | TBD |

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
*(Pending execution)*

### Phase 3
*(Pending execution)*

### Phase 4
*(Pending execution)*
