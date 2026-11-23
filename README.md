# Shahrizal Arshad — Portfolio

Personal portfolio for **Shahrizal Arshad** — ERP systems, websites, and landing pages for small businesses.

## Stack

- **Framework:** Next.js 16 (App Router, `cacheComponents`) + React 19 + TypeScript
- **Styling:** Standalone vanilla CSS ([`app/globals.css`](app/globals.css))
- **Typography:** `Bricolage Grotesque Variable` via `@fontsource-variable/bricolage-grotesque`

## Editing Content

All text, client logos, and case studies live in two files:

- `lib/content.ts` — site info, headline, clients, projects, services, and about copy
- `lib/cases.ts` — full case studies rendered at `/work/[slug]`

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email displayed in CTAs and footer |
| `NEXT_PUBLIC_SITE_URL` | Optional canonical site URL (auto-detects `VERCEL_PROJECT_PRODUCTION_URL` on Vercel) |

## Local Development

```bash
npm install
npm run dev
```

Build and verify production output:

```bash
npm run build
npm start
```
