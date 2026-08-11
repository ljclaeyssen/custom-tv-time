# Créer une frise chronologique

Les frises (« timelines ») sont du **contenu versionné dans le repo** : chaque frise est un
fichier JSON committé, et le backend **synchronise la base dessus à chaque démarrage**
(création, mise à jour, suppression — idempotent). Publier une frise = committer un fichier
et déployer. Aucun SQL manuel, ni en dev ni en prod.

## Le pipeline

```
tools/frises/<slug>.json          ← seed de CURATION (ce que tu écris : titres + ordre)
        │  node tools/generate-frise.mjs tools/frises/<slug>.json
        ▼
apps/backend/src/infrastructure/seeds/frises/<slug>.json   ← contenu RÉSOLU (ids TMDB,
        │                                                     posters, titres FR, dates)
        │  + frises.seeds.ts régénéré automatiquement
        ▼
SyncTimelinesUseCase (au boot du backend) → tables timelines / timeline_items
```

La base est un **miroir** des fichiers versionnés : une frise insérée à la main en base
sera supprimée au prochain démarrage.

## Créer ou modifier une frise

1. Écrire (ou éditer) le seed de curation `tools/frises/<slug>.json` :

```json
{
  "slug": "mcu",
  "name": "MCU — ordre chronologique",
  "description": "Films et séries Marvel dans l'ordre de l'histoire.",
  "position": 10,
  "posterFrom": "The Avengers",
  "items": [
    { "section": "Phase 1", "type": "movie", "query": "Iron Man", "year": 2008 },
    { "section": "Phase 4", "type": "season", "query": "Loki", "year": 2021, "season": 1 }
  ]
}
```

- `query` : recherché sur TMDB (titre original ou français) ; `year` filtre l'année de
  sortie (film) ou de première diffusion (série) — indispensable pour les titres ambigus
  (« Pokémon », les deux « Mewtwo contre-attaque »…).
- `section` : étiquette de regroupement visuel ; le front groupe les items consécutifs.
- `position` : ordre de la frise dans la liste des frises.
- `posterFrom` : `query` de l'item dont le poster devient celui de la frise (défaut : le 1ᵉʳ).
- L'ordre du tableau `items` EST l'ordre de la frise (positions ×10 générées).

2. Générer le contenu résolu :

```bash
node tools/generate-frise.mjs tools/frises/mcu.json
```

3. **Relire le résumé sur stderr** (un titre qui a matché de travers se voit tout de
   suite) et le diff git du JSON généré.

4. Committer les deux JSON (+ `frises.seeds.ts` s'il a bougé). C'est tout :
   - **dev** : le backend resynchronise au prochain démarrage (`npx nx serve backend`) ;
   - **prod** : push sur `main` → déploiement → synchronisation au boot du conteneur.

Le log de démarrage confirme : `Frises synchronisées : X créée(s), Y mise(s) à jour…`.

## Supprimer une frise

Supprimer `tools/frises/<slug>.json` **et** `apps/backend/src/infrastructure/seeds/frises/<slug>.json`,
puis relancer le générateur sur n'importe quelle autre frise (l'index `frises.seeds.ts`
est rescanné). Au prochain démarrage, la frise disparaît de la base.

## Vérification

- Log `TimelinesSeeder` au démarrage du backend.
- `GET /api/timelines` (authentifié) ou l'onglet **Frises** de l'app.

## Pièges

- **Découpage TMDB ≠ découpage marketing** des saisons (animes, « Part 1/2 ») : en cas de
  doute sur `season`, vérifier `seasons[]` via `/tv/{id}` (token `TMDB_API_READ_ACCESS_TOKEN`
  du `.env` racine). La saison 0 = les specials.
- Un film **pas encore sorti** se met normalement dans la frise : date future → badge
  « À venir » côté app, zéro appel TMDB à l'affichage.
- Renommer une section / réordonner = éditer le seed de curation puis **regénérer** —
  ne jamais éditer les JSON résolus ni `frises.seeds.ts` à la main.
- La démo portfolio a sa propre frise dans `apps/frontend/src/app/demo/demo-data.ts`
  (`DEMO_TIMELINES`) : penser à elle si l'écran frises évolue.
