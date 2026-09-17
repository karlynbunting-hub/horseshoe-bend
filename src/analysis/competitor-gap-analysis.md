# Competitor Gap Analysis — horseshoebend.com

_Source: DataForSEO Labs (Google US, desktop). Traffic & keyword counts are modeled organic estimates, not first-party analytics. Pulled June 2026._

## Scorecard

| Metric | horseshoebend.com | nps.gov (page) | horseshoebend.co | horseshoebendtours.com |
|---|---|---|---|---|
| Est. traffic / mo | 24,994 | 109,682 | 63,318 | 11,357 |
| Top-10 keywords | 149 | 158 | 199 | 76 |
| Referring domains | 1,045 | 616 | 169 | 685 |
| Domain rank (0–1000) | 254 | 603 | 200 | 216 |
| CWV (Lighthouse perf) | 0.98 | 0.62 | 0.82 | 0.92 |
| LCP / CLS / INP | 1.1s / ~0 / 16ms | 3.1s / 0.31 / 103ms | 1.7s / 0.01 / 30ms | 1.4s / 0.03 / 196ms |

Referring domains & domain rank are read from SERP-embedded backlink fields at each site's top page (the dedicated Backlinks API wasn't enabled). nps.gov is scored at page level; its 603 domain rank reflects the whole National Park Service domain, so treat its authority as a ceiling, not a like-for-like.

## Why they win

- **nps.gov** — authority over everything. Its single Horseshoe Bend page ranks #1 for "horseshoe bend" and "arizona horseshoe bend" (165K/mo each) → ~110K visits, despite the weakest Core Web Vitals here. The .gov domain rank and exact brand match beat page speed.
- **horseshoebend.co** — one page, ruthlessly optimized. With just 169 referring domains it sits at #2 for both 165K head terms, turning a single landing page into ~63K visits/mo. Efficiency, not breadth (only 443 ranked keywords).
- **horseshoebendtours.com** — links plus commercial pages. 685 referring domains and dedicated tour/slot-canyon pages rank across the antelope-canyon tour cluster, but mostly at positions 12–24, held back by a 4.4MB page (INP 196ms).

## Top gaps by intent (top 5 of the 15 best opportunities)

- **Navigational:** antelope tour page · horseshoe trailhead · page city arizona · page az · page city az
- **Informational:** canyon x tours · antelope canyon tours az · antelope canyon tours · horseshoe point · horseshoe trail
- **Commercial:** antelope slot canyon tours
- **Transactional:** none in the top 15 (tickets / booking / reservations rank lower)

Full scored list (40 keywords) is in `competitor_gap_keywords.csv`. OpportunityScore = SearchVolume × PositionGap ÷ KeywordDifficulty, where PositionGap uses a baseline of 100 when horseshoebend.com does not rank in the top 100. 20 loosely-matched terms with no difficulty score were excluded.

## Action plan

### Quick wins (1–2 weeks)
| Task | Owner | Effort | Impact | Measurement hook |
|---|---|---|---|---|
| Retune homepage title/H1 to recapture the two 165K head terms (now #4–5, behind .co at #2) | Writer | Quick | High | Avg position for head terms in GSC |
| Optimize /antelope-canyon/ for the "antelope canyon location" cluster (#16–19 → top 10) | Writer | Quick | Med–High | Top-10 keyword count for that URL |
| Add descriptive internal links from homepage + parking page into tour/antelope pages | Dev | Quick | Med | Internal links per target page; crawl depth |

### Mid-term (3–6 weeks)
| Task | Owner | Effort | Impact | Measurement hook |
|---|---|---|---|---|
| Build a commercial "Antelope Canyon Tours from Page, AZ" page for the 74K cluster you don't rank for | Writer | Medium | High | Rankings + bookings for the cluster |
| Create a "Page, AZ" travel hub for geo terms (page az 40.5K, page city arizona 33K) | Writer | Medium | High | Top-10 count for page-az cluster |
| Add a trail/directions page for "horseshoe trailhead/trail/point" (low KD 1–8) | Writer | Medium | Med | Clicks for trail terms |
| Outreach for 10–15 referring domains to the new tour pages | Outreach | Medium | Med | Referring domains to new pages |

### Strategic (7–12 weeks)
| Task | Owner | Effort | Impact | Measurement hook |
|---|---|---|---|---|
| Build the full Antelope Canyon topical cluster to out-content tours.com's links | Writer + Dev | Strategic | High | Total keywords + top-10 share in cluster |
| Digital-PR campaign to grow referring domains toward parity on commercial terms | Outreach | Strategic | High | Referring domains & domain rank growth |
| Hold the CWV lead (perf 0.98) as content scales — lazy-load, image budgets | Dev | Strategic | Med | LCP / CLS in Lighthouse & CrUX |

## Top pages driving each site

- **horseshoebend.com:** `/` (19.6K visits) · `/antelope-canyon/` (2.2K) · `/parking-lot-reopens/` (1.0K)
- **nps.gov:** the single Horseshoe Bend page (109.7K) — ranks #1 for "horseshoe bend" / "arizona horseshoe bend"
- **horseshoebend.co:** effectively one page — `/` is 63,290 of 63,318 total visits
- **horseshoebendtours.com:** `/` (9.4K) · `/slot-canyon-plus-overlook` (1.5K) · `/blog/page-az-the-place-to-visit` (0.2K)
