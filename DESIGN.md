# AI‑Search‑Ready Website Rebuild Playbook
*A repeatable, audit-driven process — distilled from the HorseshoeBend.com rebuild (WordPress → Astro 6 → Cloudflare, launched 2026‑06‑18) and reconciled with Nico Carollo's "AI Ranking" build guide.*

> **How to use this file:** Copy `DESIGN.md` into the root of the next project (e.g. TheWaveAZ.com). Work top to bottom. Each phase has a **Goal**, **What we did on Horseshoe Bend**, and a **Checklist** you can tick off. Part 2 maps this to Nico's 6 steps so nothing from either approach is lost. Part 3 is the condensed run-order for the next build.

---

## North Star: what "AI‑search ready" actually means
A site wins in Google AI Overviews / Perplexity / ChatGPT Search when it is:
1. **Extractable** — each section answers one question and stands alone (FAQ-style H2s, frontloaded answers).
2. **Entity‑clear** — Organization + named author (E‑E‑A‑T) + page entities, all linked by `@id` in JSON‑LD.
3. **Factually current & consistent** — pages, `llms.txt`, and schema agree; visible "last updated" dates.
4. **Locally authoritative** — verifiable, geo‑specific ground truths only a local would know.
5. **Fast & crawlable** — static HTML, WebP, self‑hosted fonts, AI‑crawler allowlist, XML sitemap.
6. **Structurally deep** — hub → spoke (silo) architecture, not a flat 3‑page brochure.

Keep these six in view; every phase below serves one of them.

---

## Working method: plan mode + ultrathink
Drive Claude Code deliberately — the rebuild quality depends as much on *how* you prompt as *what* you ask for.

- **Plan mode first for anything non‑trivial.** Before a large build (architecture scaffold, a new silo of pages, a schema refactor, a performance overhaul), enter **plan mode** so Claude maps the dependency matrix, files to touch, and trade‑offs, and you **approve the plan before any code is written**. This mirrors the skill's outline‑approval gate and Nico's Step 5 ("plan mode + ultra‑think to map dependencies before running the server").
- **Ultrathink for hard reasoning.** Trigger extended thinking (e.g. "ultrathink" / "think hard") on the steps that genuinely need it: architecture/silo design, keyword→slug mapping, schema graph design, **diagnosing performance regressions** (we used deep reasoning to trace FCP/LCP to a render‑blocking font `@import` and main‑thread work), and untangling tricky migrations/redirects. Don't burn it on simple edits.
- **Approval gates everywhere.** Outlines before drafts (content), plans before builds (code), and a re‑read of the result before committing. Measure, don't guess — pull real numbers (PSI API, curl timings, Googlebot fetch) before acting.

**Rule of thumb:** *Plan mode + ultrathink to decide → normal mode to execute → verify → commit.*

---

# PART 1 — The Proven Process (what we executed on Horseshoe Bend)

## Phase 0 — Inputs & source materials
**Goal:** Gather authoritative raw material before writing a line of code or copy.

**What we did:** Assembled a read‑only `source/` folder: full content export (Markdown), official branding (SVG/PNG logos, favicons), a **Tone of Voice guide** (required reading), a **visitor‑experiences** file (real review themes/quotes), Google Search Console exports (Pages/Queries/Countries CSV), the printed visitor guide PDF, and photography. Treated `source/` as inputs only — never edited.

**Checklist:**
- [ ] `source/` folder with: content export, branding (logo SVGs + favicons), tone‑of‑voice guide, visitor‑experience/review themes, GSC/analytics exports, official PDFs, photography.
- [ ] A `CLAUDE.md` capturing commands, architecture, source‑material map, content priorities, and "do not edit `source/`".
- [ ] Project memory entries for: architecture decisions, security constraints (analytics IDs), build status.

## Phase 1 — Research, priorities & competitor gap
**Goal:** Decide what to rank for and what content matters most, with real data.

**What we did:** Ran a **competitor gap analysis** (DataForSEO Labs — traffic, top‑10 keywords, referring domains, CWV per competitor) → produced `src/analysis/competitor-gap-analysis.md` + a scored 40‑keyword CSV with `OpportunityScore = Volume × PositionGap ÷ KeywordDifficulty`. Set an explicit **content priority order** (e.g., fee/parking → hike → prep → tours → nearby). Identified head terms, commercial clusters, and geo terms with no landing page.

**Checklist:**
- [ ] Competitor scorecard (≥3 competitors): est. traffic, top‑10 keywords, referring domains, domain rank, Core Web Vitals.
- [ ] Scored keyword gap list (volume, difficulty, intent, opportunity) — **use a real SEO data source** (DataForSEO), not model guesses.
- [ ] Ranked content‑priority list for the homepage and hubs.
- [ ] Note the highest‑value clusters that have **no page yet** (these become new silo pages).

## Phase 2 — Architecture (Astro + silo + schema + crawl)
**Goal:** A fast, deep, crawlable skeleton.

**What we did:**
- **Astro 6, `output: 'static'`, Cloudflare adapter.** File‑based routing in `src/pages/`. TypeScript on.
- **Hub → spoke** route structure (e.g., `/best-time-to-visit-…/` parent with `…/sunrise/`, `…/sunset/` children). Clean, keyword‑aligned slugs.
- **Migration hygiene:** 100+ legacy URLs `301`‑redirected in `astro.config.mjs` `redirects:{}` (served at the edge).
- **Schema strategy:** one `SchemaLD.astro` component + a `graph()` helper; entities defined once in `src/data/entities.ts` (Organization/TravelAgency, Person, WebSite) and referenced by `@id`. Page types: TouristAttraction, FAQPage, HowTo, BreadcrumbList, ItemList, Offer, etc.
- **Agentic endpoints:** `/api/tours.json` + `/api/status.json` (versioned) and a curated **`public/llms.txt`** as the AI source‑of‑truth.

**Checklist:**
- [ ] Astro static + Cloudflare adapter; `site:` set to the production URL.
- [ ] Hub pages + dedicated child pages for each service/topic/location (silo).
- [ ] One‑page‑one‑intent slugs; breadcrumb on every page.
- [ ] All legacy URLs mapped to `301` redirects in `astro.config.mjs`.
- [ ] `src/data/entities.ts` with Org + Person + WebSite, linked by `@id`; `SchemaLD.astro` + `graph()` helper.
- [ ] `public/llms.txt` (key facts, page list, API notes) + versioned JSON API endpoints.

## Phase 3 — Content (skill‑driven, AI‑extractable)
**Goal:** Copy that ranks in both Google and AI answers, in brand voice.

**What we did:** Used the **`hb-seo-writer` skill** — a strict **4‑step approval workflow**: (1) gather requirements, (2) research (web + sitemap for internal links + visitor experiences + tone guide), (3) present an **outline for approval**, (4) write only after sign‑off. Every page got: a **frontloaded answer capsule**, **FAQ‑style H2s** that stand alone (with `FAQPage` schema), a **comparison block** where a decision is involved, **contextual internal links** to high‑value pages, and an **E‑E‑A‑T close** tied to the named author. Honored a **negative‑keyword list** (no "breathtaking", "hidden gem", "magical", etc.).

**Checklist (per page):**
- [ ] Primary keyword in the title and the literal first paragraph.
- [ ] 2–4 self‑contained FAQ‑style sections → `FAQPage` JSON‑LD.
- [ ] Frontloaded answer; lead with the practical value.
- [ ] Comparison cards where the visitor must choose (tour type, location, etc.).
- [ ] 3–5 contextual internal links with descriptive anchors → commercial/hub pages.
- [ ] First‑hand, data‑backed claims (exact fees, distances, times); no hype words.
- [ ] Author byline / E‑E‑A‑T block referencing the real named expert.

## Phase 4 — Media pipeline (WebP everything)
**Goal:** Protect Core Web Vitals as content scales.

**What we did:** All images processed with **`sharp`** → WebP, `fit:'cover'` with gravity, `lanczos3`. Generated **responsive variants** (e.g., hero at 800/1280/1630w) + `srcset`/`sizes`. Built a **1200×630 OG share card** by compositing the hero + logo + scrim in `sharp` (webp **and** a jpg twin for messaging‑app compatibility). Descriptive, scene‑accurate **alt text** on every image (no keyword stuffing). Author headshot → square WebP avatar + `ImageObject` in Person schema.

**Checklist:**
- [ ] Every image WebP; image dir budget kept small (~few MB).
- [ ] Hero/LCP image has responsive `srcset` + a small mobile variant.
- [ ] 1200×630 OG card (webp + jpg twin); absolute `og:image` URL; full OG + Twitter tags + `og:site_name`.
- [ ] Contextual alt text everywhere; author photo in Person schema.

## Phase 5 — Pre‑launch AI‑readiness audit
**Goal:** Catch go‑live blockers and gaps before launch.

**What we did:** Wrote a formal audit (`src/analysis/HorseshoeBend-Pre-Launch-Audit.pdf`) scoring the build against a **20‑point AI SEO & Agentic Readiness brief**, the competitor gap analysis, and destination‑travel monetization norms — organized into 4 tiers.

**The four pre‑launch blockers (do before go‑live):**
1. **`robots.txt`** — allow search + explicitly allow AI crawlers (GPTBot, OAI‑SearchBot, ChatGPT‑User, ClaudeBot, anthropic‑ai, PerplexityBot, Google‑Extended, Applebot, Amazonbot, CCBot, Bytespider); `Disallow: /api/`; point to the sitemap.
2. **XML sitemap** — `@astrojs/sitemap`, outputs `sitemap-index.xml`; filter out `/api/`; tuned priorities.
3. **OG/social image** — a real 1200×630 raster (not the SVG logo).
4. **`llms.txt` accuracy** — reconcile every fact with the live pages (one stale source of truth destroys AI trust).

**The 20‑point brief (condensed):** WebMCP/agent‑readable data · agentic‑browsing markup · `llms.txt` · advanced entity schema · author persona entity · one‑page‑one‑intent · content capsules (Q‑style H2s) · frontloaded answers · first‑hand experience · data‑backed assertions · inline citations · E‑E‑A‑T bios · double‑dataset speed proof · mobile · WebP · contextual alt text · AI‑bot safe passage · indexability/meta · contextual internal linking · dual index submission + freshness lifecycle.

**Tiered action plan:** Tier 1 = the four blockers. Tier 2 = author/Org schema + About page, freshness dates, internal‑linking pass, deepen the thinnest commercial page, capture speed evidence. Tier 3 = new commercial/geo silo pages, lodging/OTA/email monetization, inline citations, article engine. Tier 4 = display ads (gated), sponsored slots, renewal lifecycle.

**Checklist:** Produce the audit, fix all Tier‑1 blockers, then work Tier‑2 before/at launch.

## Phase 6 — Performance engineering (how we went 37 → 91 mobile)
**Goal:** Green PSI on throttled mobile, not just fast desktop (GTmetrix lies if you only test desktop).

**What we did — the exact wins, in impact order:**
1. **Self‑host fonts.** A render‑blocking `@import` of Google Fonts in CSS was the #1 FCP killer. Downloaded the WebFonts (Archivo is a **variable font** → one file covers all weights), served same‑origin `woff2`, replaced the `@import` with local `@font-face`, **preloaded** the primary font, dropped the Google preconnects. *(FCP 10.2s → ~1.1s.)*
2. **Lazy‑start below‑the‑fold JS islands.** The weather widget's `setInterval` clock + fetch ran on every load; deferred all of it behind an `IntersectionObserver`.
3. **Defer analytics** off the critical path (load GA on first interaction or a delayed fallback).
4. **Remove third‑party booking script.** The booking buttons loaded a heavy third‑party lightbox API on every page → routed clicks through a **self‑hosted iframe modal** instead (in `Base.astro`). *(TBT 730ms → 0ms; Best Practices 54 → 96.)*
5. **Responsive hero + preload** for LCP.

**Diagnosis method:** measured the live deploy directly (TTFB/curl), pulled Lighthouse audits from the **PSI API**, and reasoned from real numbers rather than guessing.

**Checklist:**
- [ ] No third‑party `@import` of fonts; self‑host woff2; preload the primary font.
- [ ] All non‑critical / below‑fold JS deferred (IntersectionObserver / interaction / idle).
- [ ] Analytics deferred off the initial render window.
- [ ] No third‑party booking/chat script on load; use a self‑hosted modal/iframe.
- [ ] Hero `srcset` + preload; verify on **PSI mobile** (throttled), not just GTmetrix desktop.

## Phase 7 — Launch & verify
**Goal:** Cut over cleanly and confirm in production.

**What we did:** Deployed as a **Cloudflare Worker** (`*.workers.dev` preview). Cut the apex + `www` over via **Custom Domains** (auto‑manages DNS, near‑instant since the zone was already on Cloudflare). Kept the old WordPress backup for rollback. Then **verified in production**: homepage is the new site (0 WordPress signatures), `robots.txt` + `sitemap-index.xml`/`sitemap-0.xml` serve, legacy `301`s resolve, **Googlebot can fetch the sitemap with no Cloudflare bot challenge**, OG/llms.txt/HTTPS OK. Submitted `sitemap-index.xml` to **GSC + Bing**. ("Couldn't fetch" in GSC right after submit is normal async lag — it flipped to Success.)

**Checklist:**
- [ ] Attach apex + `www` to the Worker via Custom Domains; confirm cert Active.
- [ ] Delete leftover old DNS/redirect/page rules; enable **Always Use HTTPS**; add `www → apex` redirect.
- [ ] Verify: new site live, robots+sitemap 200, 301s work, Googlebot fetch clean, OG/llms.txt 200.
- [ ] Submit sitemap to GSC + Bing; purge cache once.

---

# PART 2 — Comparison with Nico Carollo's "AI Ranking" build guide

Both processes target the same goal (AI‑search‑ready local sites on Astro + Cloudflare via Claude Code) and agree on the fundamentals: **silo architecture, Astro static, WebP, JSON‑LD/FAQ schema, contextual internal linking, PSI/GTmetrix benchmarking, GA4.** The differences are complementary — adopt the best of each.

| Nico's step | Our equivalent | Verdict / what to adopt |
|---|---|---|
| **1. Research, silo architecture, DataForSEO keyword CSV, Figma MCP** | Phase 1 (competitor gap + DataForSEO) & Phase 2 (hub/spoke) | **Aligned.** Adopt from Nico: generate an explicit **master keyword→slug CSV** (Title, Target Keyword, Volume, Slug) up front; optionally render the map in **Figma MCP** for stakeholder sign‑off. Be **more rigorously silo** (service hub + area‑served/location hub). |
| **2. High‑fidelity UI, 2‑second hero rule, trust signals, Dribbble/21st.dev polish** | Branding + tone guide + `frontend-design` skill | **Adopt from Nico:** the **2‑second hero rule** (hero states exactly what + the primary CTA) and **trust signals directly under the hero** (licenses, certs, review counts). Pull code‑ready components from **Dribbble / 21st.dev**. *(Our build was more editorial; this sharpens conversion.)* |
| **3. Cohesive AI image style guide ("art director" wrapper)** | Phase 4 (real photos → sharp → WebP) | **Adopt when real photos are short:** an **art‑director image prompt template** (fixed camera/lens, lighting, color grade) so AI images are consistent, exported directly to **WebP**. We relied on real photography — keep doing that where possible; use the wrapper to fill gaps. |
| **4. Programmatic local deep research (40–50% unique location pages, geo ground‑truths)** | Phase 3 + Phase 5 (visitor experiences, web research) | **Adopt hard for multi‑location/geo sites:** use **`/deep-research`** to mine **verifiable, hyper‑local facts** (soil, weather events, permits, history) so each location/topic page is ≥40–50% unique. This is the strongest AI‑authority signal and we under‑used it. |
| **5. Astro engineering, plan/ultra‑think, internal linking, alt text, JSON‑LD + FAQ schema (verify with SEO Wallet)** | Phases 2, 3, 4 (entities.ts, SchemaLD, internal links, alt) | **Aligned / we go deeper.** We add: shared **entity graph by `@id`**, **author/Person E‑E‑A‑T**, **freshness `dateModified`**, `llms.txt` + JSON APIs. Adopt Nico's habit of **validating schema** with a checker (SEO Wallet / Rich Results Test). Use **plan mode** before large builds. |
| **6. Wrangler staging, GTmetrix/PSI <1s, GA4 lead events, GBP alignment** | Phases 6 & 7 (PSI 91, Cloudflare, GA4, GSC/Bing) | **Aligned / we go deeper on perf.** Adopt from Nico: **GA4 lead‑event binding** (phone‑click + booking‑form listeners), and **Google Business Profile alignment** (site services == GBP services menu). We add: self‑hosted fonts, island deferral, third‑party‑script removal, **production Googlebot fetch verification**, dual sitemap submission. |

**Net:** Our process is stronger on **audit‑driven AI readiness, entity/author E‑E‑A‑T, schema depth, performance engineering, and migration hygiene**. Nico's is stronger on **explicit keyword→slug CSV mapping, conversion‑first hero/trust UI, AI image style guides, deep local geo‑uniqueness, GA4 lead tracking, and GBP alignment.** The unified playbook below merges both.

---

# PART 3 — Unified run‑order for the next build (TheWaveAZ.com)

Do these in order. ✅ = blocking before launch. **Use plan mode + ultrathink to design each phase, approve the plan, then execute, verify, commit.**

### 0. Setup
- [ ] New repo; copy this `DESIGN.md`, the `entities.ts`/`SchemaLD.astro`/`graph()` pattern, `UpdatedStamp` + `Base.astro` freshness props, the self‑hosted‑fonts setup, and a generalized **SEO‑writer skill** (re‑point it to the new brand/tone/sitemap).
- [ ] Build `source/` (branding, tone guide, visitor experiences/reviews, GSC data, official PDFs, photos).
- [ ] `CLAUDE.md` + project memory (architecture, **analytics ID security rule**, content priorities).

### 1. Research & map
- [ ] Competitor gap analysis via **DataForSEO**; scored keyword gap list.
- [ ] **Master keyword→slug CSV** (Title, Keyword, Volume, Intent, Slug) — *(adopt from Nico)*.
- [ ] Silo plan: hub pages + dedicated child pages (topics/locations). For TheWave: permit‑lottery hub, how‑to‑get‑a‑permit, the hike, safety/conditions, nearby (Page AZ region), tours/guides — each its own page.

### 2. Architecture  *(enter plan mode + ultrathink; approve the plan before scaffolding)*
- [ ] Astro static + Cloudflare; `site:` set; TS on.
- [ ] Routes per the silo; clean slugs; breadcrumbs.
- [ ] `entities.ts` (Org + named author + WebSite by `@id`); per‑page schema (FAQPage/HowTo/etc.).
- [ ] `public/llms.txt` + versioned JSON API endpoint(s).
- [ ] Legacy `301` redirect map (if migrating an existing site).

### 3. Design system *(adopt Nico's conversion UI)*
- [ ] **2‑second hero**: what it is + primary CTA, instantly.
- [ ] **Trust signals under the hero** (permits/credentials, review counts, "X years local").
- [ ] Reusable card/comparison components; pull polish from Dribbble/21st.dev.

### 4. Imagery
- [ ] Real photos where possible → `sharp` → WebP + responsive `srcset`.
- [ ] If generating: **art‑director prompt template** for consistency; export WebP.
- [ ] 1200×630 OG card; contextual alt text everywhere.

### 5. Content (skill workflow, approval‑gated)
- [ ] **`/deep-research` per location/topic** for verifiable geo ground‑truths → ≥40–50% unique pages *(adopt from Nico)*.
- [ ] Frontloaded answer + FAQ‑style H2s (+ `FAQPage` schema) + comparison blocks + contextual internal links + E‑E‑A‑T close, in brand voice, honoring the negative‑keyword list.

### 6. Pre‑launch audit ✅
- [ ] Produce the audit (20‑point brief + competitor gap + monetization).
- [ ] Fix **Tier‑1 blockers**: robots.txt (AI allowlist) · sitemap · OG image · llms.txt accuracy.
- [ ] Tier‑2: author/Org schema + About page · freshness dates · internal‑linking pass · deepen thinnest commercial page · capture speed evidence.

### 7. Performance ✅  *(ultrathink the diagnosis — measure real numbers, don't guess)*
- [ ] Self‑host fonts (no `@import`); preload primary font.
- [ ] Defer below‑fold islands + analytics; remove third‑party on‑load scripts.
- [ ] Responsive hero + preload; **verify on PSI mobile (throttled)** ≥ 90.

### 8. Tracking & GBP *(adopt from Nico)*
- [ ] GA4 with **lead‑event binding** (phone‑click + form/booking listeners). Keep the **Measurement ID in env only — never commit a Property ID or secret**.
- [ ] **Align site services/pages with the Google Business Profile** menu.

### 9. Launch & verify ✅
- [ ] Cloudflare Custom Domain (apex + www); Always‑HTTPS; www→apex.
- [ ] Production verification: new site live, robots+sitemap 200, 301s, **Googlebot fetch clean**, OG/llms.txt 200.
- [ ] Submit sitemap to **GSC + Bing**; purge cache.

---

## Appendix A — Reusable code patterns (from this repo)
- **Schema:** `src/components/SchemaLD.astro` (renders JSON‑LD), `src/data/entities.ts` (`organization`, `person`, `website`, `graph()`, `webPage()` linked by `@id`).
- **Freshness:** `src/components/UpdatedStamp.astro` (visible "Last updated" + `<time>`); `Base.astro` emits a `WebPage` node with `datePublished`/`dateModified` when pages pass `updated`/`published` props.
- **Self‑hosted fonts:** `@font-face` in `src/styles/brand.css` pointing at `public/fonts/*.woff2` (variable font = one file); `<link rel="preload" as="font" crossorigin>` in `Base.astro`.
- **Booking modal (no third‑party script):** self‑hosted iframe modal in `Base.astro` that intercepts `a[href*="…/embeds/book"]` clicks; `target="_blank"` bypasses it.
- **Redirects:** `astro.config.mjs` `redirects:{}` for every legacy URL.
- **Sitemap:** `@astrojs/sitemap` with a `filter` excluding `/api/` and `serialize` for priorities.

## Appendix B — Verification commands (run against the live domain)
```sh
# New site, not the old CMS?
curl -s https://SITE/ | grep -ciE 'wp-content|wordpress'      # want 0
# robots + sitemap serve, with AI allowlist + sitemap pointer
curl -sI https://SITE/robots.txt ; curl -s https://SITE/robots.txt | grep -i 'GPTBot\|Sitemap:'
curl -sI https://SITE/sitemap-index.xml ; curl -sI https://SITE/sitemap-0.xml
# Googlebot can fetch the sitemap (no Cloudflare challenge)?
curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
  -o /tmp/sm.xml -w "%{http_code} %{content_type}\n" https://SITE/sitemap-index.xml
# Legacy 301s resolve to new paths?
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://SITE/OLD-PATH/
# JSON-LD validity (per built page)
python3 -c "import re,json;[json.loads(b) for b in re.findall(r'application/ld\+json\">(.*?)</script>',open('PAGE.html').read(),re.S)];print('OK')"
```

## Appendix C — Voice & safety rules (carry to every brand)
- **Negative keywords (avoid):** breathtaking, hidden gem, off the beaten path, once‑in‑a‑lifetime, magical, life‑changing, mind‑blowing, epic, awesome, super, amazing deal, synergy, leveraging, value proposition. Prefer exact figures and plain, authoritative phrasing.
- **Voice:** trusted local expert — specific (fees/distances/times), safety‑conscious (Rule → Reason → Consequence), promote as the logical next step, not a hard sell.
- **Security:** analytics **Measurement ID in env/snippet only**; never commit a Property ID, API key, or secret. Don't leak visitors to competitor blogs from commercial pages.
- **Honesty:** state real conditions (limited guardrails, permit odds, etc.); reconcile pages ↔ `llms.txt` ↔ schema so AI never gets a contradiction.

---
*Source of truth for the HorseshoeBend.com reference build: this repo, `src/analysis/competitor-gap-analysis.md`, and `src/analysis/HorseshoeBend-Pre-Launch-Audit.pdf`. Launched 2026‑06‑18 — PSI mobile 91 / A11y 95 / Best Practices 96 / SEO 100.*
