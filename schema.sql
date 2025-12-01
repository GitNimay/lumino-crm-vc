-- LEADS TABLE (Missing from your provided schema)
create table public.leads (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null default auth.uid (),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone default now(),
  name text not null,
  company text not null,
  email text default '',
  phone text default '',
  value numeric default 0,
  stage text not null check (stage in ('New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost')),
  status text not null check (status in ('Active', 'Cold', 'Closed')),
  tags text[] default '{}',
  last_activity timestamp with time zone default now(),
  avatar_url text,
  constraint leads_pkey primary key (id),
  constraint leads_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete cascade
);

-- Enable RLS
alter table public.leads enable row level security;

-- Policies
create policy "Users can view own leads" on public.leads for select using (auth.uid() = user_id);
create policy "Users can insert own leads" on public.leads for insert with check (auth.uid() = user_id);
create policy "Users can update own leads" on public.leads for update using (auth.uid() = user_id);
create policy "Users can delete own leads" on public.leads for delete using (auth.uid() = user_id);

-- PROFILES TABLE (Required for User Sign Up)
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,
  constraint profiles_pkey primary key (id)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- TRIGGER for New Users
-- This handles the creation of a profile when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'avatar_url');
  return new;
end;
$$;

-- Trigger definition
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Optional: Trigger to update updated_at
-- create extension if not exists moddatetime schema extensions;
-- create trigger handle_updated_at before update on public.leads
--   for each row execute procedure moddatetime (updated_at);
