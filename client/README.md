# VANTAGE — Creator & Brand Growth Agency

Premium marketing site for an influencer / creator growth agency. Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Quick start

```bash
cd client
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin (inquiries inbox)

1. Open [http://localhost:3000/admin](http://localhost:3000/admin)
2. Sign in with `ADMIN_PASSWORD` from `.env.local` (default: `vantage-admin`)

Contact form posts to `/api/contact` and saves to `data/inquiries.json`. Mark read, archive, or delete in admin.

> Simple password gate for local/ops use — change `ADMIN_PASSWORD` before any public deploy.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Edit brand content

All company-specific copy lives in one file:

```
src/config/siteConfig.ts
```

## Structure

```
src/
  app/                  # Routes, SEO, OG image, sitemap, robots
  components/
    ui/                 # Button, Container, SectionHeading
    sections/           # Homepage sections
    admin/              # Admin inbox UI
  config/siteConfig.ts
  lib/                  # Auth + inquiry storage
data/inquiries.json     # Local inquiry store (gitignored)
```

## Extra pages

- `/privacy` — policy stub
- `/case-studies` — outcome grid
- `/services/[slug]` — service detail pages
- `/admin` — inquiries inbox
- `/404` — branded not-found

## Design system

- Display: **Syne** · Body: **DM Sans**
- Accent: electric lime on dark textured canvas
- Motions: hero fade-up, stats count-up, brand marquee (respects `prefers-reduced-motion`)
