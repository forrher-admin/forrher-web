# ForrHer

Women's health education and daily-support website. Calm, practical, non-diagnostic.

## Stack

- Next.js App Router + TypeScript (strict)
- Tailwind CSS
- Supabase (`@supabase/ssr`)
- zod validation
- react-markdown + rehype-sanitize (safe Learn rendering)

## Setup

1. Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

2. In Supabase Dashboard → **SQL** → New query, run in order:

- `supabase/migrations/20260326_stage2_core.sql`
- `supabase/migrations/20260326_spaces_enquiries.sql` (Spaces enquiry form storage)

If the Spaces table is not run yet, the enquiry form still shows a success message and logs server-side; run the SQL when ready so submissions persist.

3. Supabase Auth settings (recommended for launch testing):
   - Authentication → Providers → Email enabled
   - For local testing you may disable “Confirm email” temporarily

4. After you create your first account, promote an admin:

```sql
update public.profiles
set role = 'admin'
where email = 'your-email@example.com';
```

5. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Health check: [http://localhost:3000/api/health](http://localhost:3000/api/health) should return `{"ok":true}`.

## Stage 2+ features

- **Today**: guided situation flow with personalized Learn/Tool/Shop suggestions
- **Ask routing**: keyword match from home search `?q=` into a Today situation
- **Tools**: JSON-driven framework with 4 launch tools (checklist, kit, workday plan, doctor questions)
- **Shop**: Private Pouch + Everyday Organizer catalogue pages
- **Spaces**: informational page for workplaces/hotels/schools + enquiry form
- **Learn**: published articles from Supabase + related links
- **Account**: email/password auth, saved items, deletion request
- **Admin**: `/admin/learn` article editor (admin role only)

## Scripts

- `npm run dev` — local development
- `npm run lint` — ESLint
- `npm run build` — production build
- `npm run start` — run production build

## Notes

- Health copy in the app is placeholder until ForrHer-approved content is provided.
- Never commit `.env.local` or any secret values.
- Keep the Supabase **service role** key server-only; it is not used in this Stage 2 client app.
