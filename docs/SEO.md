# SEO guide — Multi-Assainissement

Practical guide for what is already in the site, what Google Search Console / the sitemap are, and what to do next to improve rankings for local searches on Djerba.

---

## 1. What is already done (in code)

| Area | Status | Where |
|------|--------|--------|
| Static HTML (SSG) | Done | Angular `outputMode: "static"` |
| Titles & meta descriptions per page | Done | `src/app/core/seo/seo.config.ts` |
| Canonical, Open Graph, Twitter | Done | `src/app/core/services/seo.service.ts` |
| `robots.txt` + `sitemap.xml` | Done | `public/` |
| Real 404 page (`noindex`) | Done | `/404` + Amplify rule → `404.html` |
| Legacy URL 301 redirects | Done | `amplify-redirects.json` (CI sync — [AWS-CI-IAM.md](./AWS-CI-IAM.md)) |
| WebP images (LCP) | Done | `public/assets/images/*.webp` |
| LocalBusiness JSON-LD | Done | Homepage (mobile + landline `contactPoint`) |
| WebSite JSON-LD | Done | Homepage |
| BreadcrumbList JSON-LD | Done | Inner pages via `SeoService` |
| FAQPage JSON-LD | Done | `/faq` |
| Service JSON-LD | Done | Service pages |
| Pool page `noindex` | Done | `/nettoyage-piscine` until the service is live (not in sitemap) |
| Address NAP | Done | Mezraya, Djerba 4186 in `SITE_CONFIG` |
| Internal links + references | Done | About, home, footer, service sidebars |

**Config hub for business / Maps / reviews:** `src/app/core/config/site.config.ts`

---

## 2. Sitemap — what it is

A **sitemap** is an XML file that lists the important URLs of the site so Google can discover them faster.

- Live URL (after deploy): `https://multi-assainissement.com/sitemap.xml`
- File in repo: `public/sitemap.xml`
- Also referenced from `public/robots.txt` (`Sitemap: …`)

Included pages: home, live services, about, contact, FAQ.  
Excluded on purpose: privacy (`noindex`), 404, and `/nettoyage-piscine` (`noindex` while the service is “coming soon”). When pool cleaning is live, remove `robots: 'noindex, follow'` from that page in `seo.config.ts` and add the URL back to the sitemap.

When you add a new marketing page later:

1. Add it to routes + `PAGE_SEO`
2. Add its `<url>` entry in `public/sitemap.xml` (update `lastmod`)
3. Redeploy

---

## 3. Google Search Console — what it is

**Google Search Console (GSC)** is Google’s free tool for site owners. It is **not** inside this Angular project. You use it in the browser:

→ [https://search.google.com/search-console](https://search.google.com/search-console)

It shows:

- Which pages are indexed
- Search queries that show your site (“désinsectisation Djerba”, etc.)
- Crawl / indexing errors (404, soft 404, redirects)
- Whether your sitemap was accepted

### How to set it up (after the new site is live)

1. Open Search Console → **Add property** → `https://multi-assainissement.com`
2. **Verify ownership** — HTML file at site root: `public/google5c59405b52b0bcd9.html` (deployed with the site). Alternatives: DNS TXT or meta tag in `src/index.html`.
3. Go to **Sitemaps** → submit: `sitemap.xml`  
   (full URL: `https://multi-assainissement.com/sitemap.xml`)
4. Use **URL Inspection** on a few pages (home, désinsectisation, contact) → Request indexing if needed
5. Over the following weeks, check **Pages** / coverage for unexpected 404s or soft 404s

Do this **after** Amplify serves the new Angular site on the real domain. Submitting a sitemap while the old site is still live is less useful.

---

## 4. Google Business Profile (GBP) — local SEO

For a local service business, GBP often matters as much as on-page SEO.

Your base can be the **home address** (Mezraya) — that is normal for a service-area company. You go to the client; you serve **Djerba**.

### Checklist

1. Create / claim the listing for **Multi-Assainissement**
2. Match NAP with the website:
   - Address: Mezraya, Djerba 4186, Tunisie  
   - Phone: 26 848 831  
   - Email: contact@multi-assainissement.com  
   - Website: `https://multi-assainissement.com`
3. Categories (GBP UI often **English** in TN — pick from autocomplete only): see **[GOOGLE-BUSINESS-PROFILE.md](./GOOGLE-BUSINESS-PROFILE.md)** — primary **Pest control service**, optional **Sanitation service**, **Animal control and welfare service**
4. Service area: **Djerba** (you can hide the exact street address on the public card if you prefer privacy)
5. Upload photos (team, work examples)
6. Paste the official Place / Maps share URL into `SITE_CONFIG.googleMapsUrl`
7. Create a review link (`https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`) → `SITE_CONFIG.googleReviewUrl`  
   (then the “Laisser un avis” button appears on the site)

### Reviews

After each job, ask for a Google review that mentions:

- the **service** (désinsectisation, dératisation, …)
- **Djerba** (or the town)

Hotel / restaurant / syndic reviews are especially strong for trust.

---

## 5. Amplify hosting notes (SEO-critical)

App: [Amplify console](https://eu-west-3.console.aws.amazon.com/amplify/apps/dwlehg158oagt/overview?region=eu-west-3) (`dwlehg158oagt`, `eu-west-3`).

- Redirect rules live in Amplify (**Hosting → Rewrites and redirects**), sourced from `amplify-redirects.json`
- Final rule: unknown paths → `/404.html` with status **404** (not homepage)
- **Do not** add a SPA rewrite of all routes to `/index.html` — that creates soft 404s and hurts SEO

---

## 6. How to enhance SEO further

### Priority A — after go-live (highest impact)

1. Deploy the new site on Amplify + point the domain
2. Search Console: verify + submit sitemap
3. Claim / optimize Google Business Profile
4. Collect Google reviews steadily
5. Confirm Amplify 404 + 301s work on production URLs

### Priority B — content & local signals

1. Keep hotel / establishment **references** visible (About + home) — already in place
2. Add short, useful content over time if needed (e.g. one FAQ or tip per season) — only if you have real expertise to share; avoid thin blog spam
3. Ensure Formspree (or email) works so contact leads are not lost (`environment` Formspree URL)
4. Stay consistent everywhere: same name, phone, address (site, GBP, WhatsApp, invoices)

### Priority C — optional later

1. Replace Maps **search** URL with the official GBP Place URL once claimed
2. Add `googleReviewUrl` when you have a Place ID
3. Locale-specific HTML for English and Arabic (see section 9) — only if Search Console shows demand
4. Dedicated OG images per service (nice-to-have)
5. Re-compress / replace photos if you get better originals (`scripts/convert-to-webp.mjs`)

### What not to do

- Keyword stuffing titles and body copy
- Buying fake reviews or links
- Duplicate thin pages for every village without real content
- Leaving the old Joomla soft-404 / SPA rewrite behavior on Amplify

---

## 7. Quick file map

| Need | File |
|------|------|
| Titles / descriptions | `src/app/core/seo/seo.config.ts` |
| Meta / OG runtime | `src/app/core/services/seo.service.ts` |
| JSON-LD builders | `src/app/core/seo/structured-data.ts` |
| Address, phone, Maps, reviews | `src/app/core/config/site.config.ts` |
| Sitemap | `public/sitemap.xml` |
| Robots | `public/robots.txt` |
| Amplify redirects | `amplify-redirects.json` |
| WebP conversion | `scripts/convert-to-webp.mjs` |

---

## 8. Minimal “do this next week” list

- [ ] Commit & deploy SEO changes to Amplify  
- [ ] Smoke-test: `/random-url` → 404, images WebP, address Mezraya 4186  
- [ ] Search Console: verify domain + submit `sitemap.xml`  
- [ ] Google Business Profile: claim + NAP match + service area Djerba  
- [ ] Paste real Maps / review URLs into `SITE_CONFIG` when ready  
- [ ] Ask 3–5 recent clients for Google reviews  

Local SEO for Multi-Assainissement is a marathon: technical foundation is in place; rankings will grow with GBP, reviews, and a clean production deploy.

---

## 9. What the code cannot do (you do this in the browser)

These need your Google account. They move local rankings more than further code changes.

### A. Google Business Profile

1. Open [https://business.google.com](https://business.google.com) and sign in with the business Google account.
2. Search **Multi-Assainissement**. Claim the existing card if Google finds one, or **Add your business**.
3. Category: **Pest control service**. Optional extras: Sanitation service, Animal control service.
4. Service area: **Djerba** (you can hide the street pin and show the service area only).
5. Copy the site NAP exactly:
   - Mezraya, Djerba 4186, Tunisie
   - 26 848 831 only (no fax)
   - contact@multi-assainissement.com
   - https://multi-assainissement.com
6. Add services (désinsectisation, dératisation, capture des chats, lutte anti-légionellose) and a few real photos.
7. After the listing is live, open it in Google Maps → **Share** → copy the link into `googleMapsUrl` in `src/app/core/config/site.config.ts`.
8. Find the Place ID (Maps share link, or [Place ID finder](https://developers.google.com/maps/documentation/places/web-service/place-id)) and set:

   `googleReviewUrl: 'https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID'`

   Redeploy. The “Laisser un avis Google” button appears on its own.

### B. Google Search Console

1. Open [https://search.google.com/search-console](https://search.google.com/search-console) **after** `https://multi-assainissement.com` serves this Angular site.
2. Add property → URL prefix `https://multi-assainissement.com`.
3. Verify with the HTML file already in the repo: `public/google5c59405b52b0bcd9.html` (it is deployed at the site root).
4. Sitemaps → submit `sitemap.xml`.
5. URL Inspection → home, `/desinsectisation`, `/contact` → Request indexing.
6. Do not submit the Amplify sandbox URL as the main property. Canonicals point at the production domain.

### C. Reviews

After a finished job, send the review link (step A.8). Ask the client to mention the service and Djerba. Do not buy reviews.

### D. English / Arabic in Google

The site switches language in the browser (`?lang=`). The HTML Google saves at crawl time is **French**, which is the right default for Djerba. Separate English and Arabic URLs that each ship their own HTML would be a larger build (path prefixes such as `/en/` and `/ar/`). Do that only if Search Console shows real demand.
