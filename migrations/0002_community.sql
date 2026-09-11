create table if not exists posts (
  id text primary key,
  user_id text,
  author text not null,
  title text not null,
  title_en text,
  body text not null,
  body_en text,
  problem text not null default '其他',
  crop text,
  region text,
  photo text,
  created_at timestamptz not null default now()
);

create table if not exists replies (
  id text primary key,
  post_id text not null references posts(id) on delete cascade,
  user_id text,
  author text not null,
  body text not null,
  body_en text,
  created_at timestamptz not null default now()
);

create index if not exists replies_post_id_idx on replies (post_id);
create index if not exists posts_created_at_idx on posts (created_at desc);
