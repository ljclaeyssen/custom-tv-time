# Export TV Time — compte "Ultiko" (user id 4567189)

Extrait le 2026-07-05 depuis les API internes de app.tvtime.com (avant fermeture du service).

## Fichiers

- `tvtime-full-export.json` — export complet tout-en-un : 277 séries suivies,
  251 films (suivis + watchlist), 5414 épisodes vus (181 séries), du 2015-10-11
  au 2026-06-26. **Consommé par l'import** (`TVTIME_EXPORT_PATH`).
- `tvtime-seen-flags.json` — flags « vu » par épisode extraits séparément :
  TV Time n'émettait pas de watch event pour les épisodes cochés en masse, ces
  flags font foi et sont fusionnés à l'import. **Consommé par l'import**
  (`TVTIME_SEEN_FLAGS_PATH`).

Les sous-ensembles redondants (`series.json`, `movies.json`,
`watched-episodes.json/.csv`, `audit-shows.json`) ont été retirés du dossier —
ils restent disponibles dans l'historique git. Le dossier est synchronisé vers
le VPS à chaque déploiement (source de l'import, montée en lecture seule).

## Structure

### Série
```json
{
  "tvdb_id": 339072,          // ID TheTVDB — utilisable pour re-mapper vers TVDB/TMDB
  "name": "SWORD GAI The Animation",
  "is_ended": false,
  "followed_at": "2019-01-06T23:05:50Z",
  "filters": ["all", "up_to_date"],
  "last_watched_at": "2019-02-06T11:39:11Z"
}
```
Statuts (`filters`) : `up_to_date` (110), `not_started_yet` (76), `stopped` (51), `continuing` (39), `watch_later` (1).

### Film
```json
{
  "uuid": "...",              // UUID interne TV Time
  "name": "...",
  "imdb_id": "tt0103639",     // utilisable pour re-mapper vers TMDB/IMDb
  "release_date": "1993-12-03",
  "followed_at": "...",
  "watched_at": "..." ,       // null si pas vu
  "rewatch_count": 0,
  "filters": ["watched"]      // "watched" (212) ou "not_watched" = watchlist (39)
}
```

### Épisode vu
```json
{
  "show_id": 355774,          // ID TheTVDB de la série
  "show_name": "Dr. STONE",
  "season": 4, "episode": 37,
  "episode_id": 11728112,     // ID TheTVDB de l'épisode
  "title": "...",
  "seen_date": "2026-06-26 17:40:43",
  "times_watched": 1
}
```

## Notes pour le remplacement maison

- Les IDs séries/épisodes sont des IDs **TheTVDB** ; les films ont un **imdb_id**. TMDB permet de résoudre les deux (`/find/{id}?external_source=tvdb_id|imdb_id`).
- La progression par série se reconstruit en croisant `watched-episodes` avec la liste d'épisodes TVDB/TMDB.
- Endpoints utilisés : `msapi.tvtime.com/prod/v1/tracking/cgw/follows/user/{id}` (entity_type=series|movie) et `api2.tozelabs.com/v2/user/{id}/watched_episodes` (via le proxy `app.tvtime.com/sidecar`, auth JWT du localStorage).
