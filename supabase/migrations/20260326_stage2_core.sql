-- ForrHer Stage 2: profiles, articles, saved_items
-- Run in Supabase SQL Editor (Dashboard → SQL → New query).
-- Project has "auto-expose new tables" OFF: policies + grants are explicit.

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  deletion_requested_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update
    set email = excluded.email,
        updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

grant select, update on public.profiles to authenticated;

create or replace function public.prevent_profile_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'Only admins can change profile roles';
  end if;
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_protect_role on public.profiles;
create trigger profiles_protect_role
  before update on public.profiles
  for each row execute function public.prevent_profile_role_escalation();

-- ---------------------------------------------------------------------------
-- Articles
-- ---------------------------------------------------------------------------
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  body_markdown text not null,
  category text not null,
  source_label text,
  last_reviewed_at date,
  published boolean not null default false,
  related_slugs text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_published_idx on public.articles (published);
create index if not exists articles_category_idx on public.articles (category);

alter table public.articles enable row level security;

drop policy if exists "articles_public_read_published" on public.articles;
create policy "articles_public_read_published"
  on public.articles
  for select
  to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "articles_admin_insert" on public.articles;
create policy "articles_admin_insert"
  on public.articles
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "articles_admin_update" on public.articles;
create policy "articles_admin_update"
  on public.articles
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "articles_admin_delete" on public.articles;
create policy "articles_admin_delete"
  on public.articles
  for delete
  to authenticated
  using (public.is_admin());

grant select on public.articles to anon, authenticated;
grant insert, update, delete on public.articles to authenticated;

-- ---------------------------------------------------------------------------
-- Saved items
-- ---------------------------------------------------------------------------
create table if not exists public.saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  item_type text not null check (item_type in ('article', 'tool', 'today')),
  item_key text not null,
  title text not null,
  href text not null,
  created_at timestamptz not null default now(),
  unique (user_id, item_type, item_key)
);

create index if not exists saved_items_user_idx on public.saved_items (user_id);

alter table public.saved_items enable row level security;

drop policy if exists "saved_items_select_own" on public.saved_items;
create policy "saved_items_select_own"
  on public.saved_items
  for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "saved_items_insert_own" on public.saved_items;
create policy "saved_items_insert_own"
  on public.saved_items
  for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "saved_items_delete_own" on public.saved_items;
create policy "saved_items_delete_own"
  on public.saved_items
  for delete
  to authenticated
  using (user_id = auth.uid());

grant select, insert, delete on public.saved_items to authenticated;

-- ---------------------------------------------------------------------------
-- Placeholder seed articles (replace with ForrHer-approved content)
-- ---------------------------------------------------------------------------
insert into public.articles (
  slug, title, summary, body_markdown, category, source_label, last_reviewed_at, published, related_slugs
) values
(
  'understanding-your-cycle-basics',
  'Understanding your cycle basics',
  'A calm, plain-language overview of the menstrual cycle for everyday reference.',
  $md$
# Understanding your cycle basics

PLACEHOLDER: replace with ForrHer-approved content.

Your cycle is a pattern that can change with stress, travel, sleep, and health. This page shares general information only.

## What many people notice
- Bleeding days and non-bleeding days
- Energy that rises and falls
- Comfort needs that change through the month

## A gentle next step
Track what feels typical for you, and keep notes to share with a professional if something feels different.
$md$,
  'Cycle basics',
  'ForrHer placeholder',
  current_date,
  true,
  array['comfort-on-heavier-days']
),
(
  'comfort-on-heavier-days',
  'Comfort on heavier days',
  'Practical, non-medical ideas that may make heavier flow days feel more manageable.',
  $md$
# Comfort on heavier days

PLACEHOLDER: replace with ForrHer-approved content.

Heavier days can feel tiring. Small preparations often help more than big changes.

## Ideas some people find useful
- Keep spare products where you spend your day
- Choose clothes that help you feel secure
- Plan lighter tasks when you can

## When to seek care
If bleeding feels unusual for you, or you feel faint, dizzy, or very unwell, speak with a qualified health professional.
$md$,
  'Period care',
  'ForrHer placeholder',
  current_date,
  true,
  array['understanding-your-cycle-basics', 'packing-a-simple-period-kit']
),
(
  'packing-a-simple-period-kit',
  'Packing a simple period kit',
  'A short guide to building a small kit for work, school, or travel.',
  $md$
# Packing a simple period kit

PLACEHOLDER: replace with ForrHer-approved content.

A small kit can reduce stress when your period starts unexpectedly.

## Common kit items
- Absorbent products you trust
- A spare pair of underwear
- Wipes or tissues
- A sealable bag for used items

Keep the kit where you can reach it quickly.
$md$,
  'Everyday planning',
  'ForrHer placeholder',
  current_date,
  true,
  array['comfort-on-heavier-days']
)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- After signup, promote Mae/admin once (replace the email):
-- update public.profiles set role = 'admin' where email = 'you@example.com';
-- ---------------------------------------------------------------------------
