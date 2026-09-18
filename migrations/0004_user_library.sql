create table if not exists user_favorites (
  user_id text not null,
  slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, slug)
);

create table if not exists diagnose_history (
  id text primary key,
  user_id text not null,
  title text not null,
  summary text not null,
  related text,
  created_at timestamptz not null default now()
);
create index if not exists diagnose_history_user_idx on diagnose_history (user_id, created_at desc);

create table if not exists contact_messages (
  id text primary key,
  name text not null,
  email text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists mail_outbox (
  id text primary key,
  to_addr text not null,
  subject text not null,
  body text not null,
  sent_at timestamptz,
  error text,
  created_at timestamptz not null default now()
);
