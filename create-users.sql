drop table if exists users;


"STRUCTURE OF DB"


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
