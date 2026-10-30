# Multi-Assainissement — Comprehensive Project Context & Knowledge Base

> **Single Source of Truth** for the Multi-Assainissement project, synthesized from all historical planning, architectural discussions, deployments, SEO audits, and active code sessions. Designed for AI agents (Google Antigravity) and human engineers.

---

## 1. Executive Summary & Project Genesis

### 1.1 Background
The original company website ([multi-assainissement.com](https://multi-assainissement.com/)) was built years ago on a legacy CMS (Joomla/PHP) with outdated UX/UI, unoptimized mobile performance, broken redirect chains, and legacy SEO metadata. The company initiated a complete ground-up redevelopment into a modern, lightning-fast, statically-generated (SSG) web application using **Angular 19**, **Tailwind CSS v3**, and **AWS Amplify**.

### 1.2 Transition to Antigravity
The project history was previously tracked across multiple SpecStory/Cursor sessions (`.specstory/history/`). Development and maintenance are now transitioning to **Google Antigravity**. This document centralizes the full domain knowledge, system architecture, marketing funnel, AWS infrastructure, and active work so that any Antigravity agent can immediately understand, run, develop, and deploy the application without loss of context.

---

## 2. Company & Brand Identity (Ground Truth)

All project copy, meta tags, and schema definitions must strictly adhere to these facts:

| Entity Attribute | Specification / Ground Truth | Notes & Constraints |
| :--- | :--- | :--- |
| **Legal Company Name** | **Multi-Assainissement** (SARL Daly Hygiène) | Registered legal SARL in Tunisia. |
| **Founding Year** | **1995** (>30 years of field expertise) | Highlighted in About & Trust sections. |
| **Primary Location / NAP** | **Mezraya, Djerba 4186, Médenine, Tunisie** | Base of operations (service-area business). |
| **Primary Phone** | **`+216 26 848 831`** (Display: `26 848 831`) | **Crucial:** Old phone `98 962 556` and Fax are permanently obsolete. |
| **WhatsApp Direct** | `https://wa.me/21626848831` | With prefilled localized messages. |
| **Official Email** | **`contact@multi-assainissement.com`** | Routed via AWS SES to `aminedali44@gmail.com`. (Old Yahoo mail discontinued). |
| **Service Radius** | Île de Djerba, Zarzis, Médenine, Sud Tunisien | Focused primarily on Djerba tourism & residential zones. |
| **Lead Form Backend** | Formspree (`https://formspree.io/f/xwvgwnev`) | Delivers quote requests to `aminedali44@gmail.com`. |

### 2.1 Critical Business Constraints & Rules
1. 🚫 **NOT 24/7:** Under **no circumstances** advertise 24/7 emergency service. Interventions are planned during business and operational hours.
2. 🚫 **NO "DEVIS GRATUIT":** Never write or claim "Devis gratuit" (quotes are NOT systematically free; interventions require diagnostic and evaluation).
3. 😷 **Worker Discretion & Facial Masks (PPE):** All team photographs on the website must show technicians wearing professional half-face dual-filter respirators (PPE) covering their mouths and noses. No uncovered random faces or generic unverified stock portraits.
4. 🚫 **No Gory / Macro Insect Carcasses:** Do not show repulsive close-up pest imagery. Present clean, sanitary environments, professional bait stations, discreet technicians, and before/after hygiene results.
5. 🏨 **Clientele Hierarchy:**
   - **Residential & Commercial (Apartments, Private Villas, Syndics, Restaurants):** Primary online conversion targets (Facebook Ads, Web Search, Form submissions).
   - **Luxury Hotels & Resorts (Radisson, Vincci, Hasdrubal, Club Calimera, Seabel Rym, etc.):** Prestigious references featured on the homepage. (High-level B2B contracts are secured through direct executive relationships).

---

## 3. Services Catalog & Operational Status

The application showcases the following services, each with specific business availability:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      MULTI-ASSAINISSEMENT SERVICES                     │
├───────────────────────────────┬────────────────────────────────────────┤
│ Service Route                 │ Operational Status & Description       │
├───────────────────────────────┼────────────────────────────────────────┤
│ /desinsectisation             │ 🟢 ACTIVE (Core)                       │
│                               │ Extermination of cockroaches (blattes  │
│                               │ germaniques), bedbugs, ants, crawling  │
│                               │ insects. Primary FB ad landing page.   │
├───────────────────────────────┼────────────────────────────────────────┤
│ /deratisation                 │ 🟢 ACTIVE (Core)                       │
│                               │ Rat and mouse extermination via secure │
│                               │ bait stations & ground placement.      │
├───────────────────────────────┼────────────────────────────────────────┤
│ /capturation-des-chats        │ 🟢 ACTIVE                              │
│                               │ "Capture des chats errants":       │
│                               │ Humane cage trapping & relocation of   │
│                               │ stray cats (vital for hotel resorts).  │
├───────────────────────────────┼────────────────────────────────────────┤
│ /lutte-anti-legionellose      │ 🟢 ACTIVE                              │
│                               │ Disinfection & chemical treatment of   │
│                               │ Legionella bacteria in hot water nets. │
├───────────────────────────────┼────────────────────────────────────────┤
│ /nettoyage-piscine            │ 🟡 COMING SOON ("Bientôt")              │
│                               │ Pool cleaning & water sanitization.    │
│                               │ Page active with coming-soon badge.    │
├───────────────────────────────┼────────────────────────────────────────┤
│ /jardinage                    │ 🟡 COMING SOON ("Bientôt")              │
│                               │ Gardening & green space maintenance.   │
│                               │ Page active with coming-soon badge.    │
├───────────────────────────────┼────────────────────────────────────────┤
│ /vides-ordures                │ 🔴 DEPRECATED / REDIRECTED             │
│                               │ Obsolete in Djerba; redirected in      │
│                               │ routing & Amplify to nettoyage-piscine │
└───────────────────────────────┴────────────────────────────────────────┘
```

---

## 4. Technical Stack & Architecture

### 4.1 Core Technologies
- **Framework:** Angular 19 (`@angular/core` `^19.2.0`, Standalone Components only).
- **Static Site Generation (SSG):** `@angular/ssr` `^19.2.18` with `outputMode: "static"` in `angular.json`. Generates static pre-rendered HTML files into `dist/multi-assainissement/browser`.
- **CSS Framework:** Tailwind CSS `^3.4.19` + PostCSS + Autoprefixer + SCSS.
- **Internationalization:** `@ngx-translate/core` (`^18.0.0`) & `@ngx-translate/http-loader`.
- **Image Pipeline:** WebP with `sharp` (`^0.35.3`).
- **Engine Requirements:** Node `22.17.1`, npm `10.9.2`.

### 4.2 Project Structure
```
c:\projects\multi-assainissement\
├── .github/workflows/          # CI/CD: amplify-deploy.yml (auto-deploy on push to sandbox)
├── docs/                       # Project guides (SEO.md, GOOGLE-BUSINESS-PROFILE.md, AWS-CI-IAM.md)
├── infra/iam/                  # IAM policy definitions for AWS Amplify
├── public/                     # Static assets served at domain root
│   ├── assets/i18n/            # i18n JSON files (fr-fr.json, en-gb.json, ar-sa.json)
│   ├── assets/images/          # Optimized WebP assets, hero images, client logos
│   ├── robots.txt              # Crawler instructions referencing sitemap.xml
│   ├── sitemap.xml             # XML sitemap with lastmod timestamps
│   └── google5c59405b52b0bcd9.html # Google Search Console verification token
├── scripts/                    # Automation scripts
│   ├── convert-to-webp.mjs     # Sharp batch converter to WebP
│   ├── copy-404.mjs            # Generates 404.html in dist for Amplify
│   ├── download-fonts.mjs      # Self-hosts Inter & Outfit fonts
│   └── qa-i18n.mjs             # Compares i18n key parity across FR, EN, AR
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── config/site.config.ts # Global business NAP, phone, links, client logos
│   │   │   ├── i18n/           # LanguageService & language constants
│   │   │   ├── seo/            # SEO configs, structured-data JSON-LD builders
│   │   │   └── services/       # SeoService, JsonLdService, ScrollService
│   │   ├── pages/              # Standalone route pages
│   │   │   ├── home/           # Homepage with modular sub-components
│   │   │   ├── desinsectisation/
│   │   │   ├── deratisation/
│   │   │   ├── capturation-chats/
│   │   │   ├── legionellose/
│   │   │   ├── nettoyage-piscine/
│   │   │   ├── gardening/      # Gardening page (previously jardinage)
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── faq/
│   │   │   ├── privacy/
│   │   │   └── not-found/
│   │   ├── shared/             # Reusable UI components & layouts
│   │   │   ├── components/     # brand-logo, lead-form, proof-gallery, quick-contact, service-sidebar, language-switcher
│   │   │   └── layout/         # site-header (sticky), site-footer, site-layout, mobile-sticky-bar
│   │   ├── app.routes.ts       # Application routing definition
│   │   └── app.config.ts       # App providers & translation loader
│   ├── environments/           # Environment variables (Formspree endpoints)
│   └── styles.scss             # Global Tailwind directives & custom utilities
├── amplify-redirects.json      # AWS Amplify 301 rewrites & 404 handler
├── angular.json                # Angular CLI configuration (SSG static output)
└── package.json                # Pinned dependencies & build scripts
```

---

## 5. Internationalization (i18n) & Multi-language Architecture

### 5.1 Supported Languages
1. **`fr-fr` (Français):** Default language and **Source of Truth**. All new UI features and copy must be created in French first.
2. **`en-gb` (English):** Professional UK/International English for foreign tourists and expatriate property owners in Djerba.
3. **`ar-sa` / `ar-tn` (العربية):** Professional Arabic tailored for local Tunisian clients.

### 5.2 RTL & Language Switching
- Managed by `src/app/core/i18n/language.service.ts`.
- Switching to Arabic dynamically applies `dir="rtl"` to `<html>` and updates typography classes.
- Header language switcher displays country flag icons for quick visual switching (`FR`, `EN`, `AR`).
- WhatsApp CTA prefilled messages automatically adapt to the active language via `languageService.whatsappDevisUrl()`.

### 5.3 Translation Parity Verification
Always run the validation script before committing translation changes:
```bash
node scripts/qa-i18n.mjs
```
This ensures zero missing keys, zero superfluous keys, and no empty strings across `fr-fr.json`, `en-gb.json`, and `ar-sa.json`.

---

## 6. AWS Infrastructure & Deployment Pipeline

### 6.1 AWS Environment Details
- **AWS Account ID:** `661487689347`
- **Region:** `eu-west-3` (Paris)
- **Hosting Service:** **AWS Amplify Hosting** (App ID: `dwlehg158oagt`)
- **Primary Domain:** `https://multi-assainissement.com`
- **Staging / Sandbox Domain:** `https://sandbox.dwlehg158oagt.amplifyapp.com`
- **Git Branch:** `sandbox` branch triggers automatic CI build and deployment.

### 6.2 DNS & Domain Delegation
- Domain registered via **OVH**; authoritative nameservers delegated to **AWS Route 53**:
  - `ns-1490.awsdns-58.org`
  - `ns-1859.awsdns-40.co.uk`
  - `ns-447.awsdns-55.com`
  - `ns-983.awsdns-58.net`

### 6.3 Email Routing (AWS SES)
- Domain identity `multi-assainissement.com` verified via DKIM in SES (`eu-west-3`).
- Inbound SES receipt rule set forwards emails received on `contact@multi-assainissement.com` directly to `aminedali44@gmail.com`.
- Production SMTP credentials configured for sending professional outbound transactional messages.

### 6.4 Amplify Rewrites & Redirects (`amplify-redirects.json`)
Amplify redirects are synced via CI/CD. Crucial rules include:
- **301 Permanent Redirects:** Mapping legacy URLs indexed by Google (e.g., `/index.php`, `/services`, `/assainissement`, and long Joomla URLs like `/assainissement-desinsectisitation-decafarisation-deratisation-entreprise-assainissement-a-djerba.html`) to clean new routes.
- **Custom 404 Handling:** Unmatched paths are routed to `/404.html` with HTTP status `404`.
- ⚠️ **Strict Constraint:** **Never** add a blanket SPA rewrite `200` to `/index.html`. Doing so causes soft-404 errors that severely degrade Google search indexing for static SSG sites.

### 6.5 IAM Credentials
- **`amine-admin`:** Master administrator IAM user used for manual console operations.
- **`multi-assainissement-amplify-deploy`:** Dedicated CI user used exclusively by GitHub Actions (`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`).

---

## 7. Search Engine Optimization (SEO) & Local Visibility

### 7.1 Architecture & Implementation
- **Metadata Management:** `src/app/core/seo/seo.config.ts` defines page-specific `titleKey`, `descriptionKey`, `canonical`, and social share images.
- **SeoService:** Dynamically injects translated titles, meta tags, Open Graph tags (`og:title`, `og:description`, `og:image`, `og:locale`), and Twitter cards.
- **Structured Data (JSON-LD):** Generated by `src/app/core/seo/structured-data.ts`:
  - `LocalBusiness`: Name, logo, telephone (`+21626848831`), address (Mezraya, Djerba 4186), geo coordinates (`33.861851, 10.960291`), openingHours, priceRange (`$$`), and service area (`Djerba`).
  - `Service`: Embedded on individual service pages.
  - `FAQPage`: On `/faq` route.
  - `BreadcrumbList`: Injected across deep links.

### 7.2 Google Business Profile (GBP) & Local Search
- **Business Profile Name:** Multi-Assainissement
- **Address:** Mezraya, Djerba 4186, Tunisie (Service-area business; street address hidden on public card).
- **Categories:**
  - Primary: `Pest control service`
  - Additional: `Animal control and welfare service`, `Sanitation service`
- **Phone:** `26 848 831`
- **Reviews:** Google review URL is dynamically exposed in the footer when configured in `SITE_CONFIG.googleReviewUrl`.

---

## 8. Marketing, Lead Capture & Conversion Funnel

### 8.1 Lead Conversion Architecture
1. **Paid Traffic (Facebook Ads):**
   - Ads target residents, villa owners, syndics, and business managers in Djerba and southern Tunisia.
   - Traffic lands directly on `/desinsectisation` (the highest-converting pest problem).
2. **Lead Qualification Form:**
   - Standalone `LeadFormComponent` configured with Formspree (`https://formspree.io/f/xwvgwnev`).
   - Collects: Full Name, Phone Number, and Optional Description.
   - Purpose: Eliminates casual non-serious chat inquiries by collecting direct callback details.
3. **Instant WhatsApp Escalation:**
   - Secondary prominent CTA: Direct WhatsApp button with prefilled text (`LanguageService.whatsappDevisUrl()`).
   - Sticky mobile bar ensures zero friction for mobile users needing urgent assistance.

---

## 9. Current Working Tree & Active WIP (Status Quo)

### 9.1 Active File State
At the moment of transitioning to Antigravity:
- **Active Document:** `public/assets/i18n/fr-fr.json` (cursor on line 136, reviewing `"jardinage"` service block).
- **Component Renaming:** The gardening feature has been migrated from French directory naming (`src/app/pages/jardinage`) to English naming (`src/app/pages/gardening/` containing `gardening.page.ts` and `gardening.page.html`).
- **Route Status:** `src/app/app.routes.ts` maps `path: 'jardinage'` to `import('./pages/gardening/gardening.page').then(m => m.GardeningPage)`.
- **Title Alignment:** The stray cats service title has been standardized to **« Capture des chats errants »** (adding "errants").

### 9.2 Local Development Environment Quirks
- **Node on Windows (NVM):**
  If `nvm use` encounters path space errors, run:
  ```powershell
  $env:Path = "C:\Program Files\nvm\v22.17.1;" + $env:Path
  ```
  Or simply launch via the root helper script:
  ```bat
  dev.cmd
  ```
- **Port Conflicts:**
  If port `4200` is occupied by another local project, launch the dev server on port `4201`:
  ```bash
  npx ng serve --port 4201
  ```

---

## 10. Antigravity Developer Workflow & Guidelines

When implementing changes in this codebase with Antigravity, follow these steps:

### 10.1 Adding or Editing UI Strings
1. Update `public/assets/i18n/fr-fr.json` with the new keys/strings.
2. Provide natural translations in `public/assets/i18n/en-gb.json` and `public/assets/i18n/ar-sa.json`.
3. Validate parity: `node scripts/qa-i18n.mjs`.
4. Use `{{ 'my.key' | translate }}` in templates with `TranslatePipe` imported.

### 10.2 Adding a New Page
1. Create standalone component under `src/app/pages/<page-name>/`.
2. Add route in `src/app/app.routes.ts` with lazy `loadComponent`.
3. Add SEO definition in `src/app/core/seo/seo.config.ts`.
4. If the page is indexed, add the URL to `public/sitemap.xml` with current `<lastmod>`. (If coming soon or unready, set `robots: 'noindex, follow'`).

### 10.3 Testing & Building
```bash
# Development server
npm start

# Production SSG Build
npm run build
```
Verify that the output in `dist/multi-assainissement/browser` successfully pre-renders static HTML for all active routes.

---

*Document created for Antigravity on October 21, 2026. Maintained in the repository root for continuous agent alignment.*

