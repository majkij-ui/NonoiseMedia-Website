# SEO backlog — Nonoise Media

> **Status (2026-11-20): backlog, not current work.** The current plan is `TODO.md` in the repo root.
> Statuses below were re-checked against the code on 2026-11-20. Still open: Sortlist profile,
> case study pages at `/work/[slug]`, a standalone `/faq`, blog posts, and the homepage / About H1
> (the homepage currently has no `<h1>` at all). URLs in this file predate the switch to unprefixed
> Polish URLs and the `www` canonical host.

**Goal:** Direct lead gen from Polish clients searching for video production in Warsaw
**Primary keywords:** `produkcja filmowa Warszawa`, `filmy korporacyjne Warszawa`, `film reklamowy Warszawa`
**Audit date:** 2026-04-02

---

## ✅ Quick Wins — Completed 2026-04-02

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| ✅ | **`app/sitemap.ts`** — auto-generates sitemap for all public PL/EN routes; `/sitemap.xml` is now a live route | Critical | 1 hr |
| ✅ | **`app/robots.ts`** — explicit `Allow: /`, `Disallow: /pl/lp/ /en/lp/`, sitemap URL declared | Critical | 30 min |
| ✅ | **Homepage title tag** — changed to `"Produkcja Filmowa i Wideo dla Firm Warszawa \| Nonoise Media"` with `title.absolute` to prevent template duplication | Critical | 15 min |
| ✅ | **Root meta description** — now includes `produkcja filmowa`, `Warszawa`, core service types | High | 15 min |
| ✅ | **Offer page title** — `"Oferta — Filmy Korporacyjne, Reklamowe i Produktowe"` | High | 15 min |
| ✅ | **About page title** — `"O Nas — Studio Produkcji Filmowej w Warszawie"` | High | 15 min |
| ✅ | **Work page title** — `"Portfolio — Realizacje Wideo dla Firm"` | High | 15 min |
| ✅ | **Contact page title** — `"Kontakt — Wycena Projektu Wideo"` | High | 15 min |
| ✅ | **Questionnaire `generateMetadata`** — locale-aware PL/EN title + description (was using root defaults) | Medium | 30 min |
| ✅ | **Organization + LocalBusiness JSON-LD schema** in root `app/layout.tsx` — name, address, phone, email, services | High | 1.5 hr |
| ✅ | **Default locale `pl`** — `i18n/routing.ts` now serves Polish as the root, matching the primary target market | High | 15 min |

> All changes committed and pushed to GitHub.
> **Next step: submit `https://nonoise.media/sitemap.xml` to Google Search Console.**

---

## ✅ Strategic Investments — Completed 2026-04-03

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| ✅ | **4 service landing pages** built at `/offer/[slug]` — dynamic route, SSG for PL+EN, locale-aware metadata | Very High | 1 day |
| ✅ | **`lib/service-pages.ts`** data model — all copy, FAQ, meta, process steps, featured project ID per page | — | — |
| ✅ | **`components/service-landing/service-landing-client.tsx`** — reusable 6-section template: Hero → Benefits → Process → Case Study → FAQ accordion → CTA strip | — | — |
| ✅ | **FAQ accordions embedded** in each service page — 4 Q&As per page targeting long-tail keywords (pricing, timelines, formats) | High | — |
| ✅ | **Sitemap updated** — all 8 new service URLs (4 slugs × 2 locales) added at priority 0.85 | High | — |

> To add a new service page (e.g. `/offer/reportaz-eventowy`): add an entry to `lib/service-pages.ts`. Route, metadata, sitemap, and both locales are automatic.

---

## 🔴 Quick Wins — Still To Do

*Actions under 2 hours, high immediate impact.*

| # | Action | Impact | Effort | Notes |
|---|--------|--------|--------|-------|
| ✅ | **Submit sitemap to Google Search Console** — go to GSC → Sitemaps → add `https://nonoise.media/sitemap.xml` | Critical | 5 min | Do this today; accelerates indexation of all SEO changes |
| ✅ | **Claim Google Business Profile** — create/verify listing for Nonoise Media in Warsaw | High | 1 hr | Essential for local `produkcja filmowa Warszawa` map pack results |
| ✅ | **Create Clutch.co profile** — competitors (Solvo Film, BeeProduction) appear in "Top Video Production Warsaw" rankings | High | 1 hr | Free listing; Clutch results appear on page 1 for agency searches |
| ☐ | **Create Sortlist profile** — same rationale as Clutch | Medium | 30 min | Secondary but low effort |
| ✅ | **Make pricing public** (done: `OfferPricingTiers` renders on `/offer`) — move `OfferPricingTiers` from noindex `/lp/kampania` to `/offer` or a new `/cennik` page | High | 1–2 hr | Captures `ile kosztuje film korporacyjny` + `produkcja wideo cena` queries |
| ✅ | **Verify hreflang tags in live HTML** (done: `pl` / `en` / `x-default` on all indexable routes) — confirm `next-intl` is generating correct `<link rel="alternate" hreflang="...">` tags | Medium | 30 min | Open DevTools on `/pl/` and `/en/`, check `<head>` for alternate links |

---

## 🟡 Strategic Investments — This Quarter

*Higher effort, bigger long-term SEO growth.*

### Service Landing Pages
*Each page: keyword-optimised H1, ~400 words of service copy, 1–2 embedded case studies, FAQ accordion, CTA.*

| # | Page | Target Keyword | Priority | Effort |
|---|------|---------------|----------|--------|
| ✅ | `/offer/filmy-korporacyjne` | `filmy korporacyjne Warszawa` | **High** | Half day — live, SSG, PL+EN |
| ✅ | `/offer/filmy-reklamowe` | `film reklamowy Warszawa` | **High** | Half day — live, SSG, PL+EN |
| ✅ | `/offer/filmy-wizerunkowe` | `film wizerunkowy Warszawa` | **High** | Half day — PHH case study embedded |
| ✅ | `/offer/filmy-produktowe` | `filmy produktowe Warszawa` | **Medium** | Half day — Rondo case study embedded |
| ✅ | `/offer/reportaz-eventowy` | `reportaż eventowy Warszawa` | **Medium** | Half day — add entry to `lib/service-pages.ts`, embed CIONET + Kunzek |

### Case Study Detail Pages
*6 case studies currently trapped as grid items with no indexable URL.*

| # | Page | Notes | Effort |
|---|------|-------|--------|
| ☐ | `/work/phh` | Film wizerunkowy dla Polskiego Holdingu Hotelowego | 2 hr |
| ☐ | `/work/rondo` | Film produktowy e-gravel | 2 hr |
| ☐ | `/work/omnioffice` | Kampania social media | 2 hr |
| ☐ | `/work/cionet` | Reportaż eventowy C-level | 2 hr |
| ☐ | `/work/wrytmieslow` | Seria teledysków | 2 hr |
| ☐ | `/work/kunzek` | Reportaż z targów Warsaw Industry Week | 2 hr |

### Structured Data
| # | Action | Impact | Effort |
|---|--------|--------|--------|
| ✅ | **VideoObject schema** on `/work` (done; case study pages do not exist yet) | High | 3–4 hr | Enables Google Video rich results in SERPs |
| ✅ | **BreadcrumbList schema** on all sub-pages | Low | 1 hr | Improves SERP display of URLs |

### Content
| # | Action | Target Keyword | Priority | Effort |
|---|--------|---------------|----------|--------|
| ✅ | **FAQ accordions per service page** — 4 Q&As per page covering pricing, process, timelines, platforms | `ile kosztuje film korporacyjny` etc. | **High** | Done — embedded in each `/offer/[slug]` page |
| ☐ | **Standalone FAQ page at `/faq`** — 10+ Q&As, all services combined | `ile kosztuje film korporacyjny`, `jak wygląda produkcja filmowa` | **Medium** | Half day — lower priority now FAQ is on each service page |
| ☐ | **Blog post** — "Ile kosztuje film korporacyjny w 2026 roku?" | `produkcja wideo cena`, `film korporacyjny cena` | **High** | 3–4 hr |
| ☐ | **Blog post** — "Jak przygotować brief wideo dla agencji?" | `brief wideo`, `produkcja filmowa jak zacząć` | **Medium** | 3–4 hr |
| ☐ | **Blog post** — "Filmy na LinkedIn — kompletny poradnik dla firm" | `wideo LinkedIn dla firm` | **Medium** | 3–4 hr |
| ☐ | **Blog post** — "Film wizerunkowy vs film reklamowy — czym się różnią?" | `film wizerunkowy`, `film reklamowy` | **Medium** | 3–4 hr |

### On-Page Copy
| # | Action | Impact | Effort |
|---|--------|--------|--------|
| ☐ | **Rewrite homepage H1** to include a primary keyword alongside the brand tagline | High | 1 hr |
| ☐ | **Rewrite About page H1** — "WYBIJ SIĘ PONAD SZUM" has zero search signal; add keyword context | Medium | 1 hr |

---

## 📊 Keyword Opportunity Reference

| Keyword | Difficulty | Opportunity | Intent | Recommended Page |
|---------|-----------|-------------|--------|-----------------|
| produkcja filmowa Warszawa | High | **High** | Transactional | Homepage |
| filmy korporacyjne Warszawa | Medium | **High** | Transactional | `/offer/filmy-korporacyjne` |
| film reklamowy Warszawa | Medium | **High** | Transactional | `/offer/filmy-reklamowe` |
| studio filmowe Warszawa | High | **High** | Commercial | Homepage |
| filmy produktowe Warszawa | Medium | **High** | Transactional | `/offer/filmy-produktowe` |
| film wizerunkowy Warszawa | Low | **High** | Transactional | `/offer/filmy-wizerunkowe` |
| dom produkcyjny Warszawa | Low | **High** | Commercial | Homepage (already in schema) |
| ile kosztuje film korporacyjny | Medium | **High** | Informational | `/faq` or `/cennik` |
| produkcja wideo dla firm Warszawa | Medium | **High** | Transactional | Homepage / About |
| film korporacyjny Warszawa cena | Low | **High** | Transactional | `/cennik` |
| reportaż eventowy Warszawa | Low | **Medium** | Transactional | `/offer/reportaz-eventowy` |
| filmy dla firm Warszawa | Medium | **Medium** | Transactional | About / Offer |
| wideo na LinkedIn Warszawa | Low | **Medium** | Transactional | Service page |
| produkcja wideo cena Warszawa | Medium | **Medium** | Transactional | `/cennik` |
| rolki Instagram dla firm | Low | **Medium** | Transactional | Service page |

---

## Competitor Benchmark

| Dimension | Nonoise Media | Solvo Film |
|-----------|--------------|------------|
| Keyword-rich title tags | ✅ Fixed | ✅ Strong |
| Individual service pages | ✅ 4 pages live | ✅ Has them |
| FAQ / informational content | ✅ Per-page accordions (4×4 Q&As) | ✅ Has full FAQ page |
| Sitemap | ✅ Added + service pages included | ✅ WordPress auto |
| Structured data | ✅ Org+LocalBiz added | ❌ None detected |
| Clutch / Sortlist listing | ❌ Missing | ✅ Listed |
| Google Business Profile | ❓ Unverified | ❓ Unverified |
| Case study detail pages | ❌ Grid only + embedded in service pages | ❓ Unconfirmed |
| Blog / content | ❌ None | ❓ Unconfirmed |
