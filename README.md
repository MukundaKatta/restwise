# RestWise

The sleep coach your watch forgot. Plug in your Oura, Whoop, or Apple Watch — get an AI coach that tells you what to actually do differently tonight.

## Stack

- **Next.js 15** — App Router, TypeScript strict
- **Tailwind v4** — `@tailwindcss/postcss`, CSS-first config
- **`next/font/google`** — Inter (replaces CDN link)
- **pnpm** — package manager

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, demo widget, features, how-it-works, waitlist CTA |
| `/try` | Quick check-in: hours slept, quality 1-10, caffeine cutoff time → mocked recovery score 0-100 + actionable tip |
| `/api/waitlist` | POST `{ email }` → forwards to waitlist API with `product: "restwise"` |

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Push to Vercel. Next.js is auto-detected — no config changes needed. No environment variables required.

## Status

**v0 skeleton** — landing page ported from static HTML, `/try` uses a mocked recovery model. No real AI integration yet.
