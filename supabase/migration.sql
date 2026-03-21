-- KAWAZOE CREW - Supabase Migration
-- Run this in the Supabase SQL Editor

-- partners テーブル
create table if not exists partners (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  area text,
  skills jsonb not null default '[]',
  softwares jsonb not null default '[]',
  qualifications text,
  coverage_areas jsonb not null default '[]',
  rate_range text,
  availability text,
  portfolio_url text,
  note text,
  created_at timestamptz default now() not null
);

-- インデックス
create index if not exists partners_email_idx on partners (email);
create index if not exists partners_created_at_idx on partners (created_at desc);

-- recruits テーブル
create table if not exists recruits (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  address text,
  position text,
  experience_years text,
  qualifications text,
  softwares jsonb not null default '[]',
  preferred_location text,
  available_from text,
  motivation text not null,
  created_at timestamptz default now() not null
);

-- インデックス
create index if not exists recruits_email_idx on recruits (email);
create index if not exists recruits_created_at_idx on recruits (created_at desc);

-- Row Level Security (RLS)
-- API経由の書き込みのみ許可（サービスロールキーで操作）
alter table partners enable row level security;
alter table recruits enable row level security;

-- anon ユーザーに insert のみ許可
create policy "anon can insert partners"
  on partners for insert
  to anon
  with check (true);

create policy "anon can insert recruits"
  on recruits for insert
  to anon
  with check (true);

-- 管理者（authenticated）は全操作許可
create policy "authenticated can all on partners"
  on partners for all
  to authenticated
  using (true)
  with check (true);

create policy "authenticated can all on recruits"
  on recruits for all
  to authenticated
  using (true)
  with check (true);
