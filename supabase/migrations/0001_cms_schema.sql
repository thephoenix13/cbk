-- CBK website CMS: schema, row-level security and media storage.
-- Single admin user. Public site reads published content; only the admin writes.

-- ---------------------------------------------------------------- admin
create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admin_users enable row level security;
-- No policies: the table is only readable through is_admin() below.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users where user_id = (select auth.uid())
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------- content
-- One row of site-wide settings (contact details, footer, SEO).
create table public.site_settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Page content as JSON sections, e.g. page='home', key='hero'.
create table public.page_sections (
  page text not null,
  key text not null,
  data jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (page, key)
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  sort_order int not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client text not null default '',
  location text not null default '',
  category text not null default '',
  summary text not null default '',
  highlights text[] not null default '{}',
  cover_url text,
  gallery text[] not null default '{}',
  sort_order int not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create trigger site_settings_updated before update on public.site_settings
  for each row execute function public.set_updated_at();
create trigger page_sections_updated before update on public.page_sections
  for each row execute function public.set_updated_at();
create trigger clients_updated before update on public.clients
  for each row execute function public.set_updated_at();
create trigger projects_updated before update on public.projects
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------- RLS
alter table public.site_settings enable row level security;
alter table public.page_sections enable row level security;
alter table public.clients enable row level security;
alter table public.projects enable row level security;

create policy "public read" on public.site_settings
  for select to anon, authenticated using (true);
create policy "admin write" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public read" on public.page_sections
  for select to anon, authenticated using (true);
create policy "admin write" on public.page_sections
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public read published" on public.clients
  for select to anon, authenticated using (is_published or public.is_admin());
create policy "admin write" on public.clients
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public read published" on public.projects
  for select to anon, authenticated using (is_published or public.is_admin());
create policy "admin write" on public.projects
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------- storage
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 5242880,
        array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
on conflict (id) do nothing;

-- Public bucket: files are readable by URL. Only the admin can list or change them.
create policy "admin list media" on storage.objects
  for select to authenticated using (bucket_id = 'media' and public.is_admin());
create policy "admin upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
create policy "admin update media" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());
create policy "admin delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());
