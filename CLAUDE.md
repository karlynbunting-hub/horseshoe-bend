# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
npm run astro ... # Run Astro CLI commands (e.g. astro add, astro check)
```

## Project Overview

**HorseshoeBend.com** — a visitor information and tour-booking site for Horseshoe Bend near Page, Arizona. Rebuilt from a legacy WordPress site on the Astro framework. **Launched 2026-06-18** on Cloudflare (Workers/static). All legacy content was exported to `source/` and the rebuild is live.

## Architecture

Astro 6, `output: 'static'`, deployed via the `@astrojs/cloudflare` adapter. TypeScript is enabled. `astro.config.mjs` holds the `site` URL, the sitemap integration, and the full set of 301 redirects from legacy WordPress URLs (served as `_redirects` at the Cloudflare edge) — **add any new slug changes there**.

- `src/pages/` — file-based routes. Pages are `index.astro` files in named folders (e.g. `tours/index.astro` → `/tours/`), giving trailing-slash URLs that match the redirect map. Key routes: `/`, `/tours/`, `/antelope-canyon/`, `/river-tours/`, `/parking-fees/`, `/hike-horseshoe-bend/`, `/directions/`, `/plan-your-visit/`, `/best-time-to-visit-horseshoe-bend/` (+ `/sunrise/`, `/sunset/`), `/nearby/`, `/itineraries/`, `/faq/`, `/about/`, `/privacy-policy/`.
- `src/pages/api/` — JSON endpoints excluded from the sitemap: `tours.json` (machine-readable tour list, sourced from `src/data/tours.ts`) and `status.json` (health check).
- `src/layouts/` — `Base.astro` (head, fonts, GA, and the shared in-page booking modal), `PageLayout.astro`, `HeroLayout.astro`.
- `src/components/` — page-section components (`Nav`, `Footer`, `TourCard`, `FactsStrip`, `HikeSteps`, `ParkingMap`, `NearbyCard`, `AntelopeBanner`, `UpdatedStamp`, `SchemaLD` for JSON-LD). Client-side `islands/`: `BookingButton` and `WeatherWidget`.
- `src/data/` — `tours.ts` (canonical tour data) and `entities.ts`.
- `src/styles/brand.css` — global brand styles.
- `public/` — static assets served at root: favicons, self-hosted `fonts/`, `images/`, `logo*.svg`, `robots.txt`, `llms.txt`.

### Conventions worth knowing

- **Booking:** tour booking goes through a shared in-page modal defined in `Base.astro` that loads the FareHarbor booking URL in an iframe. `BookingButton.astro` renders a plain link (so it still works without JS) tagged `.fh-booking`; there is **no** FareHarbor third-party script. Don't reintroduce the external API.
- **Weather:** `WeatherWidget` fetches the NWS API client-side for Page, AZ and caches the gridpoint in localStorage (24h TTL). No API key.
- **Performance:** the site holds a Core Web Vitals lead (PSI mobile ~91/95/96/100). Keep it — self-host fonts, defer analytics, budget images, lazy-load. See `DESIGN.md` for the rebuild playbook.

## Source Materials (`source/`)

All reference material for the rebuild lives in `source/` — do not edit these files, they are inputs only:

- `source/horseshoebend-content-export/` — full WordPress content export as Markdown (70+ pages). Use these `.md` files as the canonical source for page copy.
- `source/branding/` — official 2026 logos in PNG and SVG (horizontal, vertical, transparent, dark mode, favicon variants). Use `Horseshoe Bend Logo 2026 Transparent SVG.svg` or the horizontal SVG for the site header.
- `source/branding/favicon files/` — favicon assets to replace the Astro defaults in `public/`
- `source/skills files/Horseshoe Bend Tone of Voice Guide.md` — **required reading before writing any copy**. Brand voice is authoritative, practical, visitor-focused. Avoid hype, slang, and vague language.
- `source/skills files/horseshoe_bend_experiences.md` — visitor experience themes and authentic quotes grounded in TripAdvisor reviews. Use for copy that should feel lived-in.
- `source/images/` and `source/extra media/` — photography and media assets
- `source/2026 Visitor Guide — Digital Version.pdf` — the current printed visitor guide
- `source/Chart.csv`, `Pages.csv`, `Queries.csv`, `Countries.csv` — Google Search Console analytics (useful for understanding top-traffic pages and search intent)
- `source/Astro Framework files/horseshoebend-astro.zip` — a prior Astro build to reference if needed

## Content Priorities

The most important visitor information to convey (in order):
1. Entrance fee and parking ($10 parking, no entry fee)
2. The hike (0.75 mi each way, ~30–40 min, easy trail)
3. Preparation (water, sunscreen, hat — minimal shade)
4. Tours (Horseshoe Bend is being repositioned around tour offerings)
5. Nearby attractions (Antelope Canyon, Glen Canyon Dam, Lake Powell)

Key pages from the export to prioritize: `01-home.md`, `10-how-to-get-here.md`, `20-hike-horseshoe-bend.md`, `12-what-should-i-bring-to-horseshoe-bend.md`, `39-best-time-visit-horseshoe-bend.md`.

## Analysis & reference assets

This repo includes a competitor SEO gap analysis. For any content, landing-page,
or SEO task, treat the brief below as the source of truth for priorities.

@src/analysis/competitor-gap-analysis.md

Read on demand (do NOT auto-load — data/code, not instructions):
- `src/analysis/competitor_gap_keywords.csv` — full 40-keyword gap list:
  volume, difficulty, position gap, OpportunityScore, intent.
- `src/components/Competitor_Gap_Dashboard.jsx` — Chart.js dashboard of the above
  (needs `chart.js` + Tailwind to run). Not wired into the site build.
