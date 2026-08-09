# Vu. — remplaçant maison de TV Time

Tracker personnel de séries et films. Monorepo **Nx** : Angular 21 + PrimeNG (PWA mobile-first,
dark minimaliste) / NestJS + PostgreSQL / métadonnées **TMDB** / login **Discord**.

## Structure

```
apps/frontend            Angular 21 — clean architecture (domain / gateways / use-cases / store / ui)
apps/backend             NestJS — clean architecture (domain / adapters / use-cases / infrastructure)
packages/shared-models   Contrats TypeScript partagés front/back (@ctt/shared-models)
tvtime-export/           Export de l'ancien compte TV Time (source de l'import)
```

## Démarrage

### 1. Prérequis

- Node 22+, Docker
- Un fichier `.env` à la racine (copier `.env.example`) avec :
  - `TMDB_API_READ_ACCESS_TOKEN` — jeton v4 : https://www.themoviedb.org/settings/api
  - `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` — voir ci-dessous
  - `JWT_SECRET` — chaîne aléatoire longue

### 2. Application Discord (login)

1. https://discord.com/developers/applications → **New Application**
2. Onglet **OAuth2** → copier *Client ID* et *Client Secret* dans le `.env`
3. Toujours dans OAuth2 → **Redirects** → ajouter :
   `http://localhost:3000/api/auth/discord/callback`

### 3. Lancer

```bash
docker compose up -d          # PostgreSQL 17 sur le port 5433
npx nx serve backend          # API sur http://localhost:3000/api
npx nx serve frontend         # App sur http://localhost:4200 (proxy /api -> :3000)
```

### 4. Importer l'historique TV Time

Se connecter via Discord, puis **Profil → Importer mon historique**.
L'import résout les IDs TheTVDB/IMDb vers TMDB via `/find`, il est idempotent
(relançable sans doublons). Les séries/films non résolus sont listés en avertissements.

## Points d'attention connus

- **Animes au long cours** (One Piece, Pokémon…) : le découpage des saisons peut différer
  entre TheTVDB (source de l'export) et TMDB. Les épisodes importés gardent la numérotation
  TVDB : quelques séries peuvent afficher une progression décalée, à recaler à la main
  ou via un futur matching par date de diffusion.
- **Schéma DB** : `synchronize: true`, choix assumé pour une prod mono-utilisateur.
  Attention : toute suppression de champ d'entité droppe la colonne (et ses données)
  au redémarrage — passer aux migrations TypeORM avant d'ouvrir à d'autres utilisateurs.
- **PWA** : le service worker n'est actif qu'en build production
  (`npx nx build frontend` puis servir `dist/apps/frontend/browser`).

## Démo publique

**https://demo.vu.ljclaeyssen.fr** — build `demo` du frontend pour le portfolio :
aucune connexion, aucun appel HTTP, gateways in-memory alimentés par de vraies
données (voir [apps/frontend/src/app/demo/](apps/frontend/src/app/demo/README.md)).
**Règle d'or : toute évolution du frontend doit faire évoluer la démo en même temps.**

```bash
npx nx build frontend --configuration=demo   # sortie : dist/apps/frontend-demo
```

## Déploiement

**Production : https://vu.ljclaeyssen.fr** (VPS Hetzner ARM partagé). Un push sur `main`
déclenche `.github/workflows/deploy.yml` : build de l'image backend ARM64 poussée sur GHCR,
build du front statique, puis déploiement sur le serveur (`docker-compose.prod.yml`,
front servi par Caddy — voir `deploy/Caddyfile.vu`). Le dossier `tvtime-export/` est
synchronisé vers le serveur à chaque déploiement (source de l'import, monté en lecture
seule dans le conteneur backend).

## Commandes utiles

```bash
npx nx build backend && npx nx build frontend   # builds prod
npx nx lint frontend                            # lint (boundaries clean arch)
npx nx graph                                    # graphe des dépendances
```
