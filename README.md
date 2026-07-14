# Warangal Study Rooms

A local discovery platform for students to find study centres and reading rooms in Warangal, Hanamkonda and Kazipet (Telangana, India).

**Version 1 MVP** — search, listings, Google Maps discovery, detail pages, trending / most visited / most viral rankings, SEO. No login, no bookings, no payments (deliberately out of scope for v1).

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, TypeScript strict, Tailwind CSS |
| Backend / DB | Supabase (PostgreSQL, RLS, RPC functions) |
| Maps | Google Maps JavaScript API |
| Deployment | Vercel |

## Quick start (runs with zero setup)

```bash
npm install
npm run dev
```

Open http://localhost:3000. **Without any env vars, the app runs on bundled demo data** (10 realistic Warangal centres) so you can see everything working immediately. The map section shows a graceful placeholder until a Maps key is added.

## Production setup

### 1. Supabase

1. Create a project at supabase.com
2. In the SQL Editor, run `supabase/schema.sql` (9 tables + RLS + 2 RPC functions)
3. Then run `supabase/seed.sql` (facilities, amenities, locations, 10 centres with images)
4. Copy the Project URL and anon key from **Project Settings → API**

### 2. Google Maps

1. In Google Cloud Console, enable **Maps JavaScript API**
2. Create an API key and restrict it to your production domain(s)

### 3. Environment variables

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_MAPS_KEY
```

The moment Supabase env vars are present, all reads switch from demo data to the live database automatically (`lib/queries.ts`).

### 4. Deploy to Vercel

1. Push the repo to GitHub
2. Import into Vercel — Next.js is auto-detected, no config needed
3. Add the three env vars in **Project → Settings → Environment Variables**
4. Deploy

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero + search, map discovery, Trending 🔥, Most Visited, Most Viral, locations |
| `/study-centres` | Search listing with location / facility / amenity filters and 4 sort modes |
| `/study-centre/[slug]` | Gallery, description, map, facilities, amenities, price, timing, contact |
| `/map` | Full-screen map of all centres |
| `/trending` | All trending centres |
| `/sitemap.xml`, `/robots.txt` | Generated automatically, includes every centre page |

## How search works

Free text is tokenised and **every token must match** the centre's name, area, city, address, facilities or amenities:

- `Hanamkonda` → all Hanamkonda centres
- `AC WiFi` → only centres that have **both** AC and WiFi
- Checkbox filters are AND-combined; location is an exact area match

Searches are logged to `search_logs` via the `log_search` RPC (fire-and-forget, never blocks the UI).

## Visit tracking

Each detail page load fires `/api/track-view`, which calls the `track_study_centre_view` RPC — atomically incrementing `visitor_count` and inserting a `views_tracking` row. This powers the **Most Visited** ranking. `search_logs` and `views_tracking` have no public read/write policies; writes go through security-definer RPCs only.

## Data functions (`lib/queries.ts`)

`getStudyCentres()` · `getStudyCentreBySlug()` · `searchStudyCentres()` · `getTrendingStudyCentres()` · `getMostVisited()` · `getMostViral()` · `getLocations()` · `getFacilities()` · `getAmenities()`

All pages revalidate every 5 minutes (ISR), so new centres added in Supabase appear without a redeploy.

## Replacing seed images

Seed images are Unsplash placeholders. To use real photos: upload to a public Supabase Storage bucket, then update `study_centre_images.image_url`. `next.config.ts` already allows `*.supabase.co` image hosts.

## Project structure

```
app/                  Pages, API routes, sitemap, robots
components/
  navbar/ search/ map/ study-centre/ home/ layout/
hooks/                useSearch, useStudyCentres, useGoogleMaps
lib/                  supabase client, queries, demo data, utils
types/                studyCentre.ts
supabase/             schema.sql, seed.sql
```
