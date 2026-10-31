-- Spring Roll Station menu CMS: only listed admin emails may change the menu.
-- Run this once in the Supabase SQL editor, after schema.sql. Safe to run again.
-- To add another admin later:  insert into public.cms_admins (email) values ('someone@example.com');

create table if not exists public.cms_admins (
  email text primary key,
  created_at timestamptz not null default now()
);
alter table public.cms_admins enable row level security;   -- no policies: not readable or writable through the API

insert into public.cms_admins (email) values ('director@springrollstation.com.sg')
on conflict (email) do nothing;

-- true when the signed in user's email is on the admin list
create or replace function public.is_cms_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.cms_admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_cms_admin() from public;
grant execute on function public.is_cms_admin() to anon, authenticated;

-- menu tables: anyone can read, only admins can write
drop policy if exists "staff write categories" on public.menu_categories;
drop policy if exists "admin write categories" on public.menu_categories;
create policy "admin write categories" on public.menu_categories for all to authenticated
  using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists "staff write items" on public.menu_items;
drop policy if exists "admin write items" on public.menu_items;
create policy "admin write items" on public.menu_items for all to authenticated
  using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists "staff write option groups" on public.menu_option_groups;
drop policy if exists "admin write option groups" on public.menu_option_groups;
create policy "admin write option groups" on public.menu_option_groups for all to authenticated
  using (public.is_cms_admin()) with check (public.is_cms_admin());

-- photo bucket: anyone can view, only admins can upload, replace or delete
drop policy if exists "staff upload menu photos" on storage.objects;
drop policy if exists "admin upload menu photos" on storage.objects;
create policy "admin upload menu photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'menu' and public.is_cms_admin());

drop policy if exists "staff update menu photos" on storage.objects;
drop policy if exists "admin update menu photos" on storage.objects;
create policy "admin update menu photos" on storage.objects for update to authenticated
  using (bucket_id = 'menu' and public.is_cms_admin());

drop policy if exists "staff delete menu photos" on storage.objects;
drop policy if exists "admin delete menu photos" on storage.objects;
create policy "admin delete menu photos" on storage.objects for delete to authenticated
  using (bucket_id = 'menu' and public.is_cms_admin());
