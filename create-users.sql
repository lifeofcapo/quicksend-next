-- Create table users (if it doesn't exist)
create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  avatar_url text,
  company_name text,
  emails_sent integer default 0,
  active_plan text default 'Free',
  subscription_end timestamp with time zone,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Ensure email uniqueness
create unique index if not exists users_email_key on public.users (email);

-- Add missing columns (if table already exists)
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'users' and column_name = 'avatar_url') then
    alter table public.users add column avatar_url text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'users' and column_name = 'company_name') then
    alter table public.users add column company_name text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'users' and column_name = 'emails_sent') then
    alter table public.users add column emails_sent integer default 0;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'users' and column_name = 'active_plan') then
    alter table public.users add column active_plan text default 'Free';
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'users' and column_name = 'subscription_end') then
    alter table public.users add column subscription_end timestamp with time zone;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'users' and column_name = 'status') then
    alter table public.users add column status text default 'active';
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'users' and column_name = 'created_at') then
    alter table public.users add column created_at timestamp with time zone default timezone('utc'::text, now());
  end if;
end $$;

-- Enable RLS
alter table public.users enable row level security;

-- Allow users to see only their own data
create policy "Users can view their own data" 
  on public.users for select 
  using (auth.uid() = id);

-- Allow inserting user data (for sign-up)
create policy "Allow insert for new users"
  on public.users for insert
  with check (true);


create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users (id) on delete cascade,
  title text not null,
  message text not null,
  created_at timestamptz default now(),
  read boolean default false
);

create index if not exists idx_notifications_user_id
  on public.notifications (user_id);

alter table public.notifications enable row level security;

create policy "Users can view only their notifications"
  on public.notifications
  for select
  using (auth.uid() = user_id);

create policy "Users can update only their notifications"
  on public.notifications
  for update
  using (auth.uid() = user_id);

-- Optional: Trigger for auto-notify via logs (optional feature)
-- Можно добавить webhooks или realtime notifications позже
