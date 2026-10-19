# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Standalone link-in-bio page for Dôvera Lab (dental laboratory in Mérida, Yucatán), linked from the @dovera.lab Instagram profile. Extracted from the main site `dovera-lab-web` (`app/(links)/links`) into its own repo (`IngeniaTex/dovera-lab-links`, production branch `main`). Next.js 15 App Router, React 19, TypeScript 5, CSS Modules. Hosted on Vercel as a regular Next.js project. Copy is in Spanish.

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # production build; also the type-check step
npm run start
npm run lint
```

Never run `build` while `next dev` is running, because they share `.next`. Stop dev, build, `rm -rf .next`, then start dev again.

No tests, no environment variables. TypeScript is pinned to 5.x because TypeScript 6 rejects the side-effect `import "./globals.css"`.

## Hosting

- Vercel, as a Next.js project connected to `IngeniaTex/dovera-lab-links`. Merges to `main` deploy to production and PRs get preview deployments. Work on feature branches and open PRs; never push to `main` directly.
- The site briefly used a Cloudflare Workers static export (PR #1). That config was removed, so server features (image optimization, `redirects()` in `next.config.mjs`) are available again.
- Domain: the `*.vercel.app` URL for now. When the final domain is added in Vercel → Settings → Domains, update `pageUrl` in `data/links.ts`.

## Architecture

- One route: `app/page.tsx` at `/`. `next.config.mjs` redirects `/links` → `/` (308).
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
