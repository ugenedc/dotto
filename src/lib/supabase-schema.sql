-- Dotto Supabase schema: auth, profiles, listings, favorites, saved_searches,
-- offers, orders, order_events, payment_plans, plan_payments, popularity

-- Auth handled by Supabase "auth" schema. We'll extend with public profiles.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text check (role in ('buyer','seller','admin')) default 'buyer',
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

create table if not exists public.styles (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete restrict,
  domain text not null unique,
  tld text not null,
  slug text not null unique,
  price_usd numeric(12,2) not null,
  allow_offers boolean default true,
  payment_plan_available boolean default false,
  category_id uuid references public.categories(id),
  style_ids uuid[] default '{}',
  syllables int,
  length int,
  status text check (status in ('draft','published','under_offer','sold')) default 'published',
  popularity_score int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, listing_id)
);

create table if not exists public.saved_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text,
  filters jsonb not null,
  alerts boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  amount_usd numeric(12,2) not null,
  message text,
  status text check (status in ('pending','countered','accepted','declined','expired')) default 'pending',
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete restrict,
  buyer_id uuid not null references public.profiles(id) on delete restrict,
  seller_id uuid not null references public.profiles(id) on delete restrict,
  total_usd numeric(12,2) not null,
  escrow_provider text default 'stripe',
  status text check (status in ('pending','paid','in_transfer','buyer_confirmed','released','refunded','disputed')) default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  type text not null,
  data jsonb,
  created_at timestamptz default now()
);

create table if not exists public.payment_plans (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  deposit_percent int not null check (deposit_percent between 0 and 100),
  months int not null check (months > 0),
  started_at timestamptz default now()
);

create table if not exists public.plan_payments (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.payment_plans(id) on delete cascade,
  due_date date not null,
  amount_usd numeric(12,2) not null,
  paid_at timestamptz,
  status text check (status in ('due','paid','failed','refunded')) default 'due'
);

create table if not exists public.popularity (
  listing_id uuid primary key references public.listings(id) on delete cascade,
  views int default 0,
  hearts int default 0,
  offers int default 0,
  carts int default 0,
  updated_at timestamptz default now()
);

-- RLS policies
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.favorites enable row level security;
alter table public.saved_searches enable row level security;
alter table public.offers enable row level security;
alter table public.orders enable row level security;
alter table public.order_events enable row level security;
alter table public.payment_plans enable row level security;
alter table public.plan_payments enable row level security;
alter table public.popularity enable row level security;

-- Basic policies (example minimal; refine per app needs)
create policy "profiles self" on public.profiles for select using (auth.uid() = id);
create policy "profiles insert self" on public.profiles for insert with check (auth.uid() = id);

create policy "listings read all" on public.listings for select using (true);
create policy "listings seller manage" on public.listings for all using (seller_id = auth.uid()) with check (seller_id = auth.uid());

create policy "favorites read own" on public.favorites for select using (user_id = auth.uid());
create policy "favorites write own" on public.favorites for insert with check (user_id = auth.uid());
create policy "favorites delete own" on public.favorites for delete using (user_id = auth.uid());

create policy "saved searches read own" on public.saved_searches for select using (user_id = auth.uid());
create policy "saved searches write own" on public.saved_searches for insert with check (user_id = auth.uid());
create policy "saved searches update own" on public.saved_searches for update using (user_id = auth.uid());
create policy "saved searches delete own" on public.saved_searches for delete using (user_id = auth.uid());

create policy "offers read own or seller" on public.offers for select using (buyer_id = auth.uid() or exists (select 1 from public.listings l where l.id = listing_id and l.seller_id = auth.uid()));
create policy "offers create buyer" on public.offers for insert with check (buyer_id = auth.uid());
create policy "offers update own" on public.offers for update using (buyer_id = auth.uid());

create policy "orders read participant" on public.orders for select using (buyer_id = auth.uid() or seller_id = auth.uid());
create policy "orders create buyer" on public.orders for insert with check (buyer_id = auth.uid());

create policy "popularity read all" on public.popularity for select using (true);


