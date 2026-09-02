# Bipper

Clone de Twitter/X. Projet-passerelle 3, formation Rocket.

React + Vite, Tailwind, Supabase (Postgres + Auth), déployé sur Vercel.

## Architecture

Pas de back-end.

```
React ──[@supabase/supabase-js, clé anon]──> Supabase
                                              ├── Auth (auth.users)
                                              └── Postgres (RLS)
```

### Base

```
auth.users ──(même id)──> profiles ──> tweets ──(parent_id)──> tweets
                              └──────> follows
```

- `profiles` : username, bio. Créée par un trigger au signup.
- `tweets` : tweets et réponses dans la même table. `parent_id` vide = racine.
- `follows` : `follower_id` suit `following_id`. Clé primaire composée.

Schéma complet dans `supabase/schema.sql`.

Le username transite par `options: { data: { username } }` au signup,
le trigger le récupère dans `raw_user_meta_data`.

### Dossiers

```
src/
  pages/       SignUpPage, LoginPage
  components/
  lib/supabase.js
supabase/schema.sql
```

## Setup

```bash
npm install
```

`.env.local` à la racine :

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

(Settings → API dans Supabase. Le préfixe VITE\_ est obligatoire.)

```bash
npm run dev
```

## Périmètre

Les 8 features de l'énoncé : inscription, connexion, déconnexion, créer
un tweet, supprimer un tweet, répondre, s'abonner, timeline, profils.

Pas de likes, retweets, hashtags, mentions, DM, recherche, édition.
Avatars = cercle coloré avec l'initiale, pas d'upload.

## Avancement

- [x] Schéma + RLS
- [x] Trigger création profil
- [x] Client Supabase
- [x] Inscription / connexion
- [ ] Session persistante
- [ ] Déconnexion
- [ ] Router
- [ ] Tweets (créer / afficher / supprimer)
- [ ] Réponses
- [ ] Abonnements
- [ ] Profils
- [ ] Design
- [ ] Déploiement
