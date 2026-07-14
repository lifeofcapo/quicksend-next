create extension if not exists pgcrypto;

create schema if not exists next_auth;

grant usage on schema next_auth to service_role;
grant all on schema next_auth to postgres;

create table if not exists next_auth.users (
  id uuid not null default gen_random_uuid(),
  name text null,
  email text null,
  "emailVerified" timestamptz null,
  image text null,
  constraint users_pkey primary key (id),
  constraint users_email_key unique (email)
);
grant all on table next_auth.users to postgres, service_role;

create table if not exists next_auth.sessions (
  id uuid not null default gen_random_uuid(),
  expires timestamptz not null,
  "sessionToken" text not null,
  "userId" uuid null,
  constraint sessions_pkey primary key (id),
  constraint sessions_sessiontoken_key unique ("sessionToken"),
  constraint sessions_userid_fkey foreign key ("userId")
    references next_auth.users (id) on delete cascade
);
grant all on table next_auth.sessions to postgres, service_role;

create table if not exists next_auth.accounts (
  id uuid not null default gen_random_uuid(),
  type text not null,
  provider text not null,
  "providerAccountId" text not null,
  refresh_token text null,
  access_token text null,
  expires_at bigint null,
  token_type text null,
  scope text null,
  id_token text null,
  session_state text null,
  oauth_token_secret text null,
  oauth_token text null,
  "userId" uuid null,
  constraint accounts_pkey primary key (id),
  constraint provider_unique unique (provider, "providerAccountId"),
  constraint accounts_userid_fkey foreign key ("userId")
    references next_auth.users (id) on delete cascade
);
grant all on table next_auth.accounts to postgres, service_role;

create table if not exists next_auth.verification_tokens (
  identifier text null,
  token text not null,
  expires timestamptz not null,
  constraint verification_tokens_pkey primary key (token)
);
grant all on table next_auth.verification_tokens to postgres, service_role;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 3. public.users - профиль приложения (расширяет next_auth.users)
create table if not exists public.users (
  id uuid not null,
  email text not null,
  name text null,
  avatar_url text null,
  company_name text null,
  status text not null default 'active',            -- active | inactive | pending | suspended | trial
  active_plan text not null default 'free',          -- free | basic | pro | premium | enterprise
  subscription_end timestamptz null,
  emails_sent integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint users_pkey primary key (id),
  constraint users_email_key unique (email),
  constraint users_id_fkey foreign key (id)
    references next_auth.users (id) on delete cascade
);

create index if not exists idx_users_email on public.users (email);

drop trigger if exists trg_users_updated_at on public.users;
create trigger trg_users_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

-- Автосоздание профиля при регистрации нового пользователя через Auth.js
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, name, avatar_url)
  values (new.id, coalesce(new.email, ''), new.name, new.image)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_next_auth_user_created on next_auth.users;
create trigger on_next_auth_user_created
  after insert on next_auth.users
  for each row execute function public.handle_new_auth_user();

-- 4. public.notifications
create table if not exists public.notifications (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  message text not null,
  type text not null default 'info',                 -- info | warning | success | error
  read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint notifications_pkey primary key (id),
  constraint notifications_user_id_fkey foreign key (user_id)
    references public.users (id) on delete cascade
);

create index if not exists idx_notifications_user_id on public.notifications (user_id);
create index if not exists idx_notifications_user_unread on public.notifications (user_id, read);

drop trigger if exists trg_notifications_updated_at on public.notifications;
create trigger trg_notifications_updated_at
  before update on public.notifications
  for each row execute function public.set_updated_at();

-- 5. public.tenty_reports — заявки на DSP takedown
create table if not exists public.tenty_reports (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null,

  first_name text not null,
  last_name text not null,
  company_name text null,
  email text not null,
  phone text null,
  mailing_address text null,

  reporting_platform text not null,                  -- spotify | apple_music | youtube | ...
  report_type text not null,
  content_type text not null,                         -- beat | cover | video | other
  reporting_reason text not null,

  evidence_url text not null,
  evidence_url_2 text null,

  ownership_type text not null,
  ownership_explanation text not null,

  status text not null default 'pending',             -- pending | in_review | approved | rejected | completed
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint tenty_reports_pkey primary key (id),
  constraint tenty_reports_user_id_fkey foreign key (user_id)
    references public.users (id) on delete cascade
);

create index if not exists idx_tenty_reports_user_id on public.tenty_reports (user_id);
create index if not exists idx_tenty_reports_status on public.tenty_reports (status);
create index if not exists idx_tenty_reports_created_at on public.tenty_reports (created_at desc);

drop trigger if exists trg_tenty_reports_updated_at on public.tenty_reports;
create trigger trg_tenty_reports_updated_at
  before update on public.tenty_reports
  for each row execute function public.set_updated_at();
-- 6. public.tenty_request_messages — переписка менеджера с юзером по заявке
create table if not exists public.tenty_request_messages (
  id uuid not null default gen_random_uuid(),
  request_id uuid not null,
  author_id uuid not null,
  message text not null,
  created_at timestamptz not null default now(),
  constraint tenty_request_messages_pkey primary key (id),
  constraint tenty_request_messages_request_id_fkey foreign key (request_id)
    references public.tenty_reports (id) on delete cascade,
  constraint tenty_request_messages_author_id_fkey foreign key (author_id)
    references public.users (id) on delete cascade
);

create index if not exists idx_tenty_messages_request_id on public.tenty_request_messages (request_id);

alter table public.users enable row level security;
alter table public.notifications enable row level security;
alter table public.tenty_reports enable row level security;
alter table public.tenty_request_messages enable row level security;
