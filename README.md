## Dotto – Premium, calm, trustworthy

What Dotto does:
- Curated marketplace of brandable domains
- Escrow-backed checkout with a simple refund guarantee
- Payment plans with clear deposit + monthly schedule

How escrow & guarantee work:
- You pay → We hold funds → Seller transfers domain → You confirm control → We release funds.
- Full refund if the transfer doesn’t complete. No small print.

Key flows and where to find them:
- Home discovery: `src/app/page.tsx`
- Search results + filters: `src/app/search/page.tsx`
- Domain detail with CTAs: `src/app/domain/[slug]/page.tsx`
- Favorites: `src/app/favorites/page.tsx`
- Saved searches: `src/app/saved-searches/page.tsx`
- Offers (buyer): `src/app/offers/page.tsx`
- Checkout (escrow): `src/app/checkout/page.tsx`
- Order tracking & transfer: `src/app/order/[id]/page.tsx`
- Payment plans: `src/app/plans/page.tsx`
- Trust guides: `src/app/escrow/page.tsx`, `src/app/guarantee/page.tsx`, `src/app/transfer/page.tsx`

Design system:
- Global tokens in `src/app/globals.css`
- Layout header/footer in `src/app/layout.tsx`
- UI components start in `src/components/ui`

Sample content:
- `src/lib/seed.ts` contains sample domains for UI placeholders.

Database schema (Supabase):
- See `src/lib/supabase-schema.sql` for auth, profiles, listings, favorites, saved searches, offers, orders, payment plans, and popularity tables with RLS.
