# @ctt/shared-models

Contrats TypeScript partagés entre `apps/frontend` et `apps/backend` — la seule
bibliothèque du monorepo, importée via le path `@ctt/shared-models`.

## Contenu

- `user.model.ts` — `User`, `Profile`, `ProfileStats`, `ImportReport`
- `show.model.ts` — `FollowStatus`, `FollowedShow`, `CatalogShowDetail`,
  `CatalogEpisode`, `EpisodeWithState`, `WatchNextItem`, `MyShowItem`,
  `RecentlyWatchedItem`, `SeasonProgress`, `ShowProgress`
- `movie.model.ts` — `TrackedMovie`, `CatalogMovieDetail`
- `catalog.model.ts` — `CatalogSearchResult`
- `stats.model.ts` — `ProfileStatsFull` et ses sous-structures (heatmap, records…)
- `episode.util.ts` — `isAired()` / `todayIso()`, règle métier « épisode diffusé »
  partagée front/back

## Règles

- Uniquement des types et de la logique de domaine pure : aucune dépendance
  Angular, NestJS ou Node.
- Côté frontend, ces types se consomment via les ré-exports de
  `apps/frontend/src/app/domain/models/` (jamais d'import direct dans ui/store).
