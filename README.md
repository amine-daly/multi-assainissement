# Multi-Assainissement

Site vitrine Angular 19 (standalone) + Tailwind CSS + SSG (`outputMode: "static"`) pour Multi-Assainissement — désinsectisation et dératisation à Djerba.

## Requirements

| Tool | Version |
|------|---------|
| Node | `22.17.1` |
| npm  | `10.9.2` |
| Angular CLI (local) | `^19.2.x` |

Pinned in `package.json` → `engines`.

### Windows (nvm) — `nvm use` broken?

If you see:

```text
activation error: exit status 1: 'C:\Program' is not recognized
```

`nvm-windows` is choking on the space in `C:\Program Files\nvm`, and the symlink folder `C:\nvm4w\nodejs` may be missing. **Skip `nvm use`.** Put Node on PATH for this terminal session instead:

**CMD:**

```bat
set "PATH=C:\Program Files\nvm\v22.17.1;%PATH%"
node -v
npm -v
```

**PowerShell:**

```powershell
$env:Path = "C:\Program Files\nvm\v22.17.1;" + $env:Path
node -v
npm -v
```

Or from the project root, run:

```bat
dev.cmd
```

That script sets PATH and runs `npm start` for you.

Longer-term fix: reinstall [nvm-windows](https://github.com/coreybutler/nvm-windows) with root/symlink paths that have **no spaces** (e.g. `C:\nvm` and `C:\nodejs`), then `nvm use 22.17.1` will work again.

## Install

```bash
npm install
```

## Development server

Prefer npm scripts (uses the local CLI from `node_modules` — no global `ng` required):

```bash
npm start
```

Or on Windows when Node is not on PATH:

```bat
dev.cmd
```

Equivalent:

```bash
npx ng serve
```

Open `http://localhost:4200/`.

If you see `'ng' is not recognized`, do **not** rely on a global Angular CLI — use `npm start`, `npx ng serve`, or `dev.cmd`.

## Production / SSG build

```bash
npm run build
```

Static prerendered output: `dist/multi-assainissement/browser` (and server bundles used at build time).

`angular.json` uses `outputMode: "static"` — all marketing routes are prerendered to HTML for SEO.

## SEO

Full guide (Search Console, sitemap, GBP, next steps): **[docs/SEO.md](docs/SEO.md)**

- Per-route titles + meta descriptions: `src/app/core/seo/seo.config.ts`
- Applied by `SeoService` (canonical, Open Graph, Twitter cards, robots)
- JSON-LD: enriched `LocalBusiness` (home), `FAQPage` (FAQ), `Service` (service pages)
- `public/robots.txt` + `public/sitemap.xml` (with `lastmod`)
- Dedicated `/404` page (`noindex`); privacy page is `noindex, follow`
- Images served as WebP under `public/assets/images/` (re-convert with `node scripts/convert-to-webp.mjs` if you add PNGs)

### Amplify redirects (required once per app)

Hosting is [AWS Amplify](https://eu-west-3.console.aws.amazon.com/amplify/apps/dwlehg158oagt/overview?region=eu-west-3) (`eu-west-3`, app `dwlehg158oagt`).

Redirects are **not** in the deploy zip — set them in the Amplify Console:

1. Open the app → **Hosting** → **Rewrites and redirects**
2. Open the **JSON editor**
3. Paste the contents of [`amplify-redirects.json`](amplify-redirects.json)
4. Save

Rules include legacy 301s (`/index.php`, `/services`, `/assainissement`, `/legionellose`, …) **with and without a trailing slash** (Amplify redirects `/path` → `/path/` before custom rules, so slash-less rules never match and Google’s old URLs hit `404.html`). Final catch-all: `404` → `/404.html`.

Pushes to **`sandbox`** also run **Sync Amplify redirect rules** in [`.github/workflows/amplify-deploy.yml`](.github/workflows/amplify-deploy.yml) (`aws amplify update-app --custom-rules`). If redirects still look stale, re-paste this file in the console (Hosting → Rewrites and redirects → JSON editor → Save).

Do **not** add a SPA `200` rewrite of all routes to `/index.html` — this site is statically prerendered and that rewrite would recreate soft 404s.

### Sprint 3 — Google Business Profile / avis / Search Console (ops)

Code is ready for Maps + optional review links (`SITE_CONFIG.googleMapsUrl` / `googleReviewUrl`). You still need to do these once the new site is live:

**Google Business Profile**
1. Claim / create the listing for Multi-Assainissement
2. NAP must match the site: Mezraya, Djerba 4186 · `26 848 831` · `dalyassainissement@yahoo.fr`
3. Categories: pest control / désinsectisation / dératisation (or closest FR/TN equivalents)
4. Service area: Djerba
5. Add photos (team, interventions — same as site assets)
6. Primary CTA: call / website → `https://multi-assainissement.com`
7. Copy the public Maps / Place URL into `SITE_CONFIG.googleMapsUrl`
8. Create a review link (`https://search.google.com/local/writereview?placeid=…`) → `SITE_CONFIG.googleReviewUrl`

**Reviews**
- After each job, ask clients to leave a Google review mentioning the service + Djerba
- Prefer hotel / restaurant / syndic contacts for stronger local trust

**Google Search Console**
1. Verify `multi-assainissement.com` (DNS or HTML tag)
2. Submit `https://multi-assainissement.com/sitemap.xml`
3. Check Coverage / Pages for soft-404s and 404s after Amplify redirects
4. Monitor queries: désinsectisation Djerba, dératisation Djerba, etc.

## Project notes

- Business data: `src/app/core/config/site.config.ts` (`SITE_CONFIG`)
- Formspree endpoint: `src/environments/environment.ts` → `formspreeEndpoint`  
  - Placeholder `.../f/xxxxxxxx` simulates on-site success (no real send)  
  - Replace with your Formspree form URL for production emails
- Routes: Accueil, Désinsectisation, Dératisation, Nettoyage piscine, À Propos, Contact, FAQ, Politique de confidentialité

## Image assets

Site photos live under `public/assets/images/` as WebP (`hero-djerba-md.webp` / `hero-djerba-sm.webp`, `team.webp`, etc.), referenced from `SITE_CONFIG` and service-page galleries. Re-run `npm run images:webp` after adding new PNGs.
