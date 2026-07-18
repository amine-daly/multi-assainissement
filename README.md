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

- Per-route titles + meta descriptions: `src/app/core/seo/seo.config.ts`
- Applied by `SeoService` (canonical, Open Graph, Twitter cards)
- JSON-LD `LocalBusiness` on the homepage
- `public/robots.txt` + `public/sitemap.xml`

## Project notes

- Business data: `src/app/core/config/site.config.ts` (`SITE_CONFIG`)
- Formspree endpoint: `src/environments/environment.ts` → `formspreeEndpoint`  
  - Placeholder `.../f/xxxxxxxx` simulates on-site success (no real send)  
  - Replace with your Formspree form URL for production emails
- Routes: Accueil, Désinsectisation, Dératisation, Vides-Ordures, À Propos, Contact, FAQ, Politique de confidentialité

## Image assets

Site photos live under `public/assets/images/` as PNG (`hero-djerba.png`, `team.png`, etc.), referenced from `SITE_CONFIG` and service-page galleries.
