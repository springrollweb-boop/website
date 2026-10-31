-- Spring Roll Station menu CMS
-- Run this once in the Supabase SQL editor of the project (Dashboard > SQL Editor > New query > Run),
-- then run admins.sql, which limits all changes to the emails on the admin list.

create extension if not exists pgcrypto;

-- Menu sections (Phở, Bánh Mì, ...)
create table if not exists public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  vn text not null default '',
  blurb text not null default '',
  note text not null default '',
  sort integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Reusable option groups shown in the item popup (phở add-ons, sauces, meat choice, ...)
create table if not exists public.menu_option_groups (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  title text not null,
  hint text not null default '',
  type text not null default 'multi' check (type in ('single', 'multi')),
  required boolean not null default false,
  choices jsonb not null default '[]',   -- [{"id":"whole-egg","name":"Whole Egg","price":1.60}]
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Menu items
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.menu_categories(id) on delete cascade,
  slug text unique not null,
  name text not null,
  vn text not null default '',
  description text not null default '',
  price numeric(8,2) not null default 0,
  image_url text not null default '',   -- full URL from the photo bucket, or a filename inside assets/menu/
  badges text[] not null default '{}',
  option_group_keys text[] not null default '{}',
  sort integer not null default 0,
  visible boolean not null default true,     -- hidden items do not appear on the website
  available boolean not null default true,   -- false shows "Sold out" and disables ordering
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists menu_items_category_idx on public.menu_items(category_id, sort);

-- keep updated_at fresh
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists touch_menu_categories on public.menu_categories;
create trigger touch_menu_categories before update on public.menu_categories for each row execute function public.touch_updated_at();
drop trigger if exists touch_menu_items on public.menu_items;
create trigger touch_menu_items before update on public.menu_items for each row execute function public.touch_updated_at();
drop trigger if exists touch_menu_option_groups on public.menu_option_groups;
create trigger touch_menu_option_groups before update on public.menu_option_groups for each row execute function public.touch_updated_at();

-- Row level security: anyone can read, only signed in staff can change anything
alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.menu_option_groups enable row level security;

drop policy if exists "public read categories" on public.menu_categories;
create policy "public read categories" on public.menu_categories for select using (true);
drop policy if exists "staff write categories" on public.menu_categories;
create policy "staff write categories" on public.menu_categories for all to authenticated using (true) with check (true);

drop policy if exists "public read items" on public.menu_items;
create policy "public read items" on public.menu_items for select using (true);
drop policy if exists "staff write items" on public.menu_items;
create policy "staff write items" on public.menu_items for all to authenticated using (true) with check (true);

drop policy if exists "public read option groups" on public.menu_option_groups;
create policy "public read option groups" on public.menu_option_groups for select using (true);
drop policy if exists "staff write option groups" on public.menu_option_groups;
create policy "staff write option groups" on public.menu_option_groups for all to authenticated using (true) with check (true);

-- Photo bucket: public to view, staff to upload
insert into storage.buckets (id, name, public) values ('menu', 'menu', true)
on conflict (id) do update set public = true;

drop policy if exists "public read menu photos" on storage.objects;
create policy "public read menu photos" on storage.objects for select using (bucket_id = 'menu');
drop policy if exists "staff upload menu photos" on storage.objects;
create policy "staff upload menu photos" on storage.objects for insert to authenticated with check (bucket_id = 'menu');
drop policy if exists "staff update menu photos" on storage.objects;
create policy "staff update menu photos" on storage.objects for update to authenticated using (bucket_id = 'menu');
drop policy if exists "staff delete menu photos" on storage.objects;
create policy "staff delete menu photos" on storage.objects for delete to authenticated using (bucket_id = 'menu');
