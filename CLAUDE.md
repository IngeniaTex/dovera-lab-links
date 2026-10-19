# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Standalone link-in-bio page for Dôvera Lab (dental laboratory in Mérida, Yucatán), linked from the @dovera.lab Instagram profile. Extracted from the main site `dovera-lab-web` (`app/(links)/links`) into its own repo (`IngeniaTex/dovera-lab-links`, production branch `main`). Next.js 15 App Router as a static export, React 19, TypeScript 5, CSS Modules. Hosted on Cloudflare Workers static assets. Copy is in Spanish.

## Commands

Node 22+ is required (Wrangler). `.nvmrc` = 22. If the default Node is older, prefix commands with `~/.nvm/versions/node/v22.*/bin`.

```bash
npm run dev      # next dev, http://localhost:3000
npm run build    # static export to ./out; also the type-check step
npm run start    # wrangler dev serving ./out, http://localhost:8787 (production-like)
npm run preview  # build + wrangler dev
npm run deploy   # build + wrangler deploy
npm run lint
```

Never run `build` while `next dev` is running, because they share `.next`. Stop dev, build, `rm -rf .next`, then start dev again.

No tests, no environment variables. TypeScript is pinned to 5.x because TypeScript 6 rejects the side-effect `import "./globals.css"`.

## Hosting

- `next.config.mjs` sets `output: "export"` and `images.unoptimized: true`.
- `wrangler.jsonc` (Worker `dovera-lab-links`, which must match the dashboard name) serves `./out` with `html_handling: auto-trailing-slash`, `not_found_handling: 404-page` and observability on. It has `workers_dev: true` and no custom domain yet.
- Deploys run through Cloudflare Workers Builds on every merge to `main` (`npm run build`, then `npx wrangler deploy`). Work on feature branches and open PRs; never push to `main` directly.
- `public/_redirects` has `/links` → `/` (301). `public/_headers` makes `/_next/static/*` immutable. Put new redirects or headers there: `redirects()`/`headers()` in `next.config.mjs` don't work with a static export.
- Static export forbids API routes, middleware, `headers()`/`cookies()`, ISR, and server actions.
- Custom domain (pending): move the doveralab.com DNS from Wix to Cloudflare first, keeping the Wix records and the GoDaddy MX/SPF. Then add `"routes": [{ "pattern": "links.doveralab.com", "custom_domain": true }]` and update `pageUrl`.

## Architecture

- One route: `app/page.tsx` at `/`. `/links` redirects to `/` via `public/_redirects`.
- All content is in `data/links.ts`; keep copy there, not in JSX. Hrefs starting with `/` point to the main site and go through `resolveHref()`, which prefixes `links.mainSite`. `mailto:` links open in place; everything else opens in a new tab so Instagram's in-app browser keeps this page.
- An empty `contact.whatsapp` switches the lime CTA to "Escríbenos" → main site `/#contacto`.
- `pageUrl` is the `metadataBase` for canonical and Open Graph URLs. It is a placeholder (`https://links.doveralab.com`) until the final domain is chosen.
- Styles live in `app/page.module.css`: the identity-manual palette as `--dv-*` variables on `.page`, and a 390px column centred on black that should fit one 390×844 screen. `globals.css` only resets box-sizing and sets the black background.
- Font: DM Mono via `next/font/google` as `--dv-font`, standing in for the manual's Apercu Mono Pro.
- Assets: `public/brand/*.svg` are vectors extracted from the identity manual PDF; don't redraw or recolour them. `public/img/hero.jpg` is shown with `next/image`.

## Design values (from the approved Figma v1 + hero photo)

- Page padding 24/24/20, gap 16.
- Header: logo 248px, then the eyebrow.
- Coral card: radius 24, padding 14/20.
- Photo: 120px tall, radius 24, sello sticker 76px rotated −12° and overhanging the bottom by 14px.
- Lime CTA: 52px pill.
- Link rows: 52px pill with a 1px `--dv-line` border, a 40px accent chip and an optional lime tag under the label.
- Contact card: 1px border, radius 24.
- Footer: monogram 34px plus the eyebrow.
