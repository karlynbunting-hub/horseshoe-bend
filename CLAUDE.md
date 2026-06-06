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

This is a rebuild of **HorseshoeBend.com** — a visitor information and tour-booking site for Horseshoe Bend near Page, Arizona — on the Astro framework, targeted for deployment on Cloudflare. The site was previously a WordPress site; all legacy content has been exported.

## Architecture

Astro minimal template with file-based routing:

- `src/pages/` — `.astro` and `.md` files become routes automatically
- `src/components/` — Astro/framework components (not yet created)
- `public/` — static assets served at root (favicons are here)

No UI framework integrations are currently configured (`astro.config.mjs` is empty). TypeScript is enabled via `tsconfig.json`.

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
