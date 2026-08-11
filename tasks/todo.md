# V1 — Clone TV Time ("Vu.")

## Cadrage (validé par Louis-Jean)

- **Monorepo Nx** : `apps/frontend` + `apps/backend` + `packages/shared-models` (@ctt/shared-models)
- **Frontend** : Angular 21 + PrimeNG, mobile-first, PWA, dark minimaliste (Anton/Figtree, accent jaune)
- **Backend** : NestJS + PostgreSQL 17 (TypeORM), clean architecture selon `nestjs-norms`
- **Auth** : OAuth2 Discord → JWT (fait main, sans passport)
- **Métadonnées** : TMDB (token v4, côté backend uniquement, cache 6h)
- **Données perso** : import depuis `tvtime-export/` (277 séries, 251 films, 5414 épisodes vus)

## Todo v1

- [x] Export TV Time sauvegardé dans `tvtime-export/`
- [x] Clé TMDB testée (résolution TVDB/IMDb OK)
- [x] Migration monorepo Nx (workspace angular-monorepo + @nx/nest + lib partagée)
- [x] `docker-compose.yml` PostgreSQL (port 5433, container up)
- [x] Backend : entités + adapters persistence (users, follows, watched_episodes, tracked_movies)
- [x] Backend : adapter TMDB avec cache mémoire, adapter Discord OAuth, adapter fichier export
- [x] Backend : 19 use cases + 5 contrôleurs + guard JWT + filtre d'exceptions domaine
- [x] Backend : import TV Time (résolution tvdb→tmdb, idempotent, warnings)
- [x] Frontend : layers domain/gateways/store/use-cases (signals, optimistic updates)
- [x] Frontend : theme dark minimal + bottom nav + 8 écrans (login, à voir, mes séries,
      détail série, saison, films, explorer, profil)
- [x] PWA : manifest "Vu." + service worker (actif en build prod)
- [x] Builds verts (backend webpack, frontend esbuild) + smoke test API (401 guard, 302 Discord)
- [x] README : setup Discord app, lancement, points d'attention

## Reste à faire (post-v1)

- [ ] Vérifier la progression des animes au long cours (numérotation TVDB vs TMDB)
- [ ] Icônes PWA personnalisées (actuellement celles générées par @angular/pwa)
- [ ] Migrations TypeORM (`synchronize: true` assumé tant que l'app reste mono-utilisateur)
- [ ] Écrire de vrais tests métier (frontend : gateways in-memory prêts dans
      `apps/frontend/src/app/testing/` ; backend : aucun test à ce jour)

## Frises chronologiques (2026-08-11) — plan approuvé

Feature « Timelines » : frises d'ordre de visionnage (films + saisons, ex. MCU par phases).
Pas d'UI de création — insertion en base via runbook `creer-frise.md`. Plan détaillé :
`~/.claude/plans/frolicking-stirring-star.md`.

- [x] 1. shared-models : `timeline.model.ts` + export barrel
- [x] 2. Backend lecture : entités, port, adapter, helper progression, 2 use-cases GET, contrôleur, wiring
- [x] 3. Runbook `creer-frise.md` + génération : seeds de curation `tools/frises/*.json` →
      `tools/generate-frise.mjs` → JSON résolus versionnés (MCU 50, Pokémon 49, Naruto 35)
- [x] 3bis. Publication automatisée (demande LJ) : `SyncTimelinesUseCase` + `TimelinesSeeder`
      au boot — la base est un miroir des JSON versionnés, plus aucun SQL manuel dev/prod
- [x] 4. Backend action : `WatchTimelineItemUseCase` (auto-track film / auto-follow + saison vue)
- [x] 5. Frontend plomberie ×3 : gateway abstraite + Rest/Demo/InMemory, store, use-cases
- [x] 6. UI : écrans liste + détail, routes, 5e onglet bottom nav, `MoviesStore.invalidate()`
- [x] 7. Démo portfolio : `DEMO_TIMELINES` + `DemoTimelinesGateway` interactif
- [x] 8. Tests vitest (use-cases + computed du store) — 35 tests verts (12 nouveaux)

### Review frises (2026-08-11)

Vérifié de bout en bout en dev : `GET /api/timelines` (MCU 19/50, Pokémon 13/49,
Naruto 21/35 — progression dérivée du vrai tracking), marquer-vu depuis la frise
(film → track+vu ; saison non suivie → auto-follow + épisodes diffusés marqués ;
404 propre ; données de test rollbackées), UI mobile (badge « À regarder », barres
par saison, « À venir » sur Doomsday), démo interactive. Builds + lint + vitest verts.
Publication : sync au boot vérifiée (1ᵉʳ boot « 1 mise à jour, 2 inchangées », 2ᵉ boot
« 3 inchangées » = idempotent, mêmes progressions 19/50, 13/49, 21/35). En prod, les
frises arriveront toutes seules au prochain déploiement.

## Review

La v1 couvre le cœur de TV Time : cocher des épisodes ("à voir" recalculé côté serveur),
progression par saison, films vus/watchlist, recherche TMDB, stats profil, import complet
de l'historique. Le token TMDB ne quitte jamais le backend ; le front ne parle qu'à l'API.
Les modèles partagés vivent dans `@ctt/shared-models` — plus aucune duplication front/back.

## Déploiement prod (08/08) — FAIT

- **URL** : https://vu.ljclaeyssen.fr (VPS Hetzner CAX21 ARM, 157.180.42.104, projet "oui-mdr")
- **Méthode** : push sur `main` → GitHub Actions build image ARM64 → GHCR → serveur pull + `docker compose up`
- Front statique servi par Caddy, backend `127.0.0.1:3003`, postgres dédié `vu-postgres`
- Convention alignée sur les autres projets du VPS (guild/crypto/strava), aucun impact dessus
- Données migrées (dump local → prod) : 270 séries, 9828 épisodes, 251 films, user "Lonjon"
- Callback Discord prod enregistré ; login opérationnel
- Clé SSH de déploiement `ctt-deploy-github-actions` installée (clé "Home" préservée)
- Secrets GitHub : VPS_HOST, VPS_USER, VPS_SSH_KEY, PROD_ENV_FILE
