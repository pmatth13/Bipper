-- 1. PROFILES
-- Données publiques de l'utilisateur.
-- Reliée à auth.users (gérée par Supabase) par le même id.

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  bio text,
  created_at timestamptz not null default now()
);

grant select on profiles to anon;
grant select, insert, update on profiles to authenticated;

create policy "Profils visibles par tous"
on profiles for select
to anon, authenticated
using (true);

create policy "Chacun crée son profil"
on profiles for insert
to authenticated
with check (auth.uid() = id);

create policy "Chacun modifie son profil"
on profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);


-- 2. TWEETS
-- Tweets et réponses dans la même table.
-- parent_id vide = tweet racine, rempli = réponse.

create table tweets (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references profiles on delete cascade,
  content text not null check (char_length(content) between 1 and 280),
  parent_id uuid references tweets on delete cascade,
  created_at timestamptz not null default now()
);

grant select on tweets to anon;
grant select, insert, delete on tweets to authenticated;

create policy "Tweets visibles par tous"
on tweets for select
to anon, authenticated
using (true);

create policy "Chacun poste en son nom"
on tweets for insert
to authenticated
with check (auth.uid() = author_id);

create policy "Chacun supprime ses tweets"
on tweets for delete
to authenticated
using (auth.uid() = author_id);


-- 3. FOLLOWS
-- Table de jointure : une ligne = un abonnement.
-- Lecture : follower_id suit following_id.

create table follows (
  follower_id uuid not null references profiles on delete cascade,
  following_id uuid not null references profiles on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

grant select on follows to anon;
grant select, insert, delete on follows to authenticated;

create policy "Abonnements visibles par tous"
on follows for select
to anon, authenticated
using (true);

create policy "Chacun s'abonne en son nom"
on follows for insert
to authenticated
with check (auth.uid() = follower_id);

create policy "Chacun se désabonne lui-même"
on follows for delete
to authenticated
using (auth.uid() = follower_id);


-- 4. CRÉATION AUTOMATIQUE DU PROFIL
-- À l'inscription, Supabase crée la ligne dans auth.users.
-- Ce trigger crée la ligne correspondante dans profiles.
-- Le username doit être passé en métadonnée au signUp :
--   supabase.auth.signUp({ email, password,
--     options: { data: { username } } })

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data ->> 'username');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();