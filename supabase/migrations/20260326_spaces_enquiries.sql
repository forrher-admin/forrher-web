-- ForrHer Spaces: public enquiry form storage
-- Run in Supabase SQL Editor after Stage 2 core migration.
-- Project has "auto-expose new tables" OFF: policies + grants are explicit.

create table if not exists public.space_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organisation text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.space_enquiries enable row level security;

-- Anyone can submit an enquiry (anonymous or signed-in).
drop policy if exists "space_enquiries_insert_public" on public.space_enquiries;
create policy "space_enquiries_insert_public"
  on public.space_enquiries
  for insert
  to anon, authenticated
  with check (true);

-- Only admins can read enquiries.
drop policy if exists "space_enquiries_select_admin" on public.space_enquiries;
create policy "space_enquiries_select_admin"
  on public.space_enquiries
  for select
  to authenticated
  using (public.is_admin());

grant insert on public.space_enquiries to anon, authenticated;
grant select on public.space_enquiries to authenticated;
