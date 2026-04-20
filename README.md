# Svelte From Zero — Crypto Price Tracker

A live crypto price tracker built with **SvelteKit + TypeScript + Vite**, powered by the free [CoinGecko API](https://www.coingecko.com/en/api/documentation) (no API key required).

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## What it does

- Fetches the top 50 coins by market cap
- Live prices, 24h change %, market cap, volume
- Search across coin name + symbol
- Per-coin detail page with 7-day SVG sparkline
- Fully responsive dark theme

## Stack

- **SvelteKit 2** — file-based routing, SSR-ready, zero config
- **Svelte 4** — compiled reactive components, no virtual DOM
- **TypeScript** — typed API responses end-to-end
- **Vite 5** — dev server + production bundler
- **CoinGecko public API** — free forever, no key, 10-30 req/min

## Step-by-step Guide

Every commit on the `main` branch is one teaching step. Clone the repo and walk through them with `git log --oneline` to see the project grow.

1. **STEP 1** — Scaffold SvelteKit + TypeScript + Vite
2. **STEP 2** — Add Tailwind-style utilities and global dark theme
3. **STEP 3** — Build the CoinGecko API service (typed fetch wrapper)
4. **STEP 4** — Home page listing top 50 coins
5. **STEP 5** — Search / filter coins by name or symbol
6. **STEP 6** — Coin detail route `/coin/[id]` with market data
7. **STEP 7** — Render a 7-day price sparkline as pure SVG
8. **STEP 8** — Polish, error states, Vercel deploy config

### STEP 1 — SvelteKit Scaffold

SvelteKit uses a convention-over-config layout:

```
src/
├── app.html          Root HTML shell — %sveltekit.head% + %sveltekit.body%
├── app.css           Global styles (imported once from +layout.svelte)
├── app.d.ts          Ambient TS types for App.Locals / PageData / Error
└── routes/
    ├── +layout.svelte   Wraps every page with shared chrome
    └── +page.svelte     The "/" route
```

`svelte.config.js` wires `adapter-auto` (Vercel-compatible) and `vitePreprocess` (so `<script lang="ts">` just works).

### STEP 2 — Dark Theme + Layout

We keep Tailwind-style utilities inline (class-based) but written in a single CSS file — no build-time JIT needed. The layout adds a sticky header, centered container, and the muted navy palette shared across every page.

### STEP 3 — CoinGecko API Service

One typed module, `src/lib/api.ts`, wraps all CoinGecko calls:

- `getTopCoins(limit)` → `/coins/markets`
- `getCoin(id)` → `/coins/{id}`
- `getCoinChart(id, days)` → `/coins/{id}/market_chart`

Typed response shapes prevent the usual "why is `price_change_percentage_24h` undefined?" surprises.

### STEP 4 — Home Page

`+page.ts` (a SvelteKit **load function**) fetches the top-50 list on the server so the first paint already has data. The page component consumes `data.coins` as a typed prop.

### STEP 5 — Search

A single `$state`-reactive variable filters the loaded list client-side — no extra API call per keystroke. The filter matches on both name and symbol.

### STEP 6 — Coin Detail

Dynamic route `/coin/[id]/+page.ts` reads the URL param, calls the API, and renders a full market panel: price, rank, supply, ATH, ATL, volume, market cap.

### STEP 7 — 7-Day Sparkline

We request `market_chart?days=7` and render the result as a single `<svg>` `<polyline>`. No chart library — ~30 lines of code. The sparkline auto-scales to its container and uses a gradient stroke.

### STEP 8 — Vercel Deploy

`adapter-auto` detects Vercel automatically. Push to GitHub, import the repo in the Vercel dashboard (or `vercel --prod` from CLI), done. No env vars required.

## License

MIT — learn, fork, break, rebuild.
