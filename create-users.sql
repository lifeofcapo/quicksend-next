drop table if exists users;

create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  image text,
  active_plan text default 'Free',
  subscription_end timestamptz,
  total_campaigns integer default 0,
  total_recipients integer default 0,
  remaining_campaigns integer default 0,
  remaining_recipients integer default 0,
  created_at timestamptz default now()
);

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
