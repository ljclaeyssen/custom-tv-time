# Lessons

## 2026-07-07 — TV Time : les watch events ne sont PAS la source de vérité
L'endpoint `watched_episodes` de TV Time omet les épisodes cochés en masse (saison entière) :
5 414 watch events vs 10 338 flags "vu" réels chez Louis-Jean (presque le double !).
La source de vérité : `api2.tozelabs.com/v2/show/{tvdb_id}?fields=seasons.fields(number,episodes.fields(id,number,season_number,is_watched))`
→ flag `is_watched` par épisode. Toujours croiser les deux lors d'un export de tracker.
Fichier extrait : `tvtime-export/tvtime-seen-flags.json`.

## 2026-07-07 — Numérotation TVDB ≠ TMDB : résoudre épisode par épisode
Le couple (saison, épisode) n'est pas portable entre TVDB et TMDB (animes découpés
différemment : TVDB S02E01 = TMDB S01E14). Résolution fiable : TMDB `/find/{tvdb_episode_id}?external_source=tvdb_id`
→ `tv_episode_results`. Pour les non-résolus : repli par position absolue. Et tracer la
provenance des données (`source: import|manual`) pour pouvoir resynchroniser sans détruire
les actions utilisateur.

## 2026-07-05 — Monorepo Nx dès le départ
Les normes Angular de Louis-Jean (`angular-norms`) supposent un monorepo Nx ("Nx CLI obligatoire").
J'ai d'abord scaffoldé deux apps indépendantes (`ng new` + `nest new`) → duplication des modèles
front/back, puis migration Nx demandée par Louis-Jean en cours de route.
**Règle : pour tout projet multi-app de Louis-Jean, partir directement sur Nx
(`create-nx-workspace --preset=angular-monorepo`) avec une lib `shared-models` pour les contrats.**

## 2026-07-05 — Nx 23 : preset "apps" = TS project references
Le template vide de Nx 23 crée un setup TypeScript à project references que `@nx/angular`
refuse. Utiliser le preset `angular-monorepo` (setup classique tsconfig.base.json + paths),
puis ajouter `@nx/nest`. Attention : le template crée des apps/libs d'exemple (shop, api…)
à supprimer, et `create-nx-workspace` ignore parfois `--appName`.

## 2026-07-05 — PowerShell 5.1 et JSON : BOM fatal
`ConvertTo-Json | Set-Content -Encoding utf8` écrit un BOM UTF-8 que Nx (et d'autres parseurs
stricts) rejettent. Pour éditer un JSON d'outillage : passer par node/Bash, ou
`[System.IO.File]::WriteAllText` avec UTF8 sans BOM.

## 2026-07-05 — Heredocs bash longs : fragiles ici
Les gros scripts multi-heredocs (>150 lignes) échouent parfois avec "unexpected EOF" sur ce
setup Windows/Git Bash. Préférer plusieurs petits scripts, ou Read+Write par fichier.
