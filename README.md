# Sibert Residence — Website (Next.js + TypeScript)

A guest house website for Sibert Residence, La Passe, La Digue, Seychelles.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS (design tokens in `tailwind.config.ts`)
- Framer Motion (lazy-load intro, scroll reveals, drawer nav animation)
- Lucide React (icons)
- React Hook Form + Zod (booking & contact forms)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

```
app/                 App Router pages (/, /rooms, /restaurant, /shop, /services, /contact)
components/          Header (burger drawer nav), Footer, Loader, BookingForm,
                      ContactForm, Boulder (signature image frame), PageHero, etc.
lib/content.ts        All site copy/data in one typed file — edit here to update
                      rooms, services, gallery, menu, and contact details.
```

## Design notes

- Palette and type scale are Tailwind tokens (`green-deep`, `gold`, `sand`, etc.) —
  see `tailwind.config.ts`.
- The signature visual motif is the "boulder" image frame (`components/Boulder.tsx`),
  an organic border-radius shape echoing La Digue's granite boulders.
- Fonts: Fraunces (display), Work Sans (body), Yesteryear (script accent) — loaded
  via `next/font/google` in `app/layout.tsx`. This requires network access to
  fonts.googleapis.com at build time (works out of the box on Vercel).

## Images

Photos currently reference the existing `sibert.sc` media library directly (real
property photos) so the site launches with real content. Before going live, either:

1. Keep the remote references (already allow-listed in `next.config.mjs` under
   `images.remotePatterns`), or
2. Download the photos into `/public/images` and update the paths in `lib/content.ts`
   for full control over the asset library.

## Booking & payment (CyberSource)

The booking forms (`components/BookingForm.tsx`) are front-end only — they validate
input and simulate a submit, but do not process real payments. To go live:

1. Stand up a small backend/serverless route (e.g. a Next.js Route Handler under
   `app/api/`) that generates a signed CyberSource Secure Acceptance payment token
   using your merchant credentials (never expose the secret key client-side).
2. Replace the `setTimeout` mock in `BookingPanel`'s submit handler with a call to
   that route, then redirect to CyberSource's hosted payment page (or render their
   embedded checkout) using the returned token.
3. Handle the CyberSource redirect/webhook back to a confirmation page to finalize
   the reservation in your booking database.

## Deployment

Designed for Vercel (matches the rest of the Databytes stack): push to GitHub and
import the repo in Vercel — no extra config needed beyond the environment variables
you add for the future CyberSource integration.
