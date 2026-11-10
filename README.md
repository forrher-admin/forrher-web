# ForrHer

Women's health education and daily-support website. Calm, practical, non-diagnostic.

## Stack

- Next.js App Router + TypeScript (strict)
- Tailwind CSS
- Supabase (`@supabase/ssr`)

## Setup

1. Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

2. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Health check: [http://localhost:3000/api/health](http://localhost:3000/api/health) should return `{"ok":true}`.

## Scripts

- `npm run dev` — local development
- `npm run lint` — ESLint
- `npm run build` — production build
- `npm run start` — run production build

## Notes

- Health copy in the app is placeholder until ForrHer-approved content is provided.
- Never commit `.env.local` or any secret values.
