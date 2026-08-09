# Mode démo (demo.vu.ljclaeyssen.fr)

Build `demo` du frontend, destinée au portfolio : aucune connexion requise,
aucun appel HTTP — `gateways.provider.ts` est remplacé par
`demo-gateways.provider.ts` (fileReplacements de la configuration `demo` dans
`apps/frontend/project.json`).

- `demo-data.ts` — données statiques réelles (posters/saisons/épisodes résolus
  via TMDB depuis l'export TV Time, heatmap calculée sur le vrai historique).
- `demo.gateways.ts` — implémentations en mémoire, interactives : cocher un
  épisode, suivre une série, changer un statut… mute l'état local pour que la
  démo réagisse comme la vraie app (perdu au rechargement, c'est voulu).

## Règle d'or

**Toute évolution du frontend doit faire évoluer la démo en même temps** :
nouvelle méthode de gateway → l'implémenter ici ; nouvel écran → le nourrir
dans `demo-data.ts`. La build `demo` est compilée en CI à chaque déploiement,
une gateway non implémentée casse le build (les abstraits sont des classes).

## Régénérer les données

Script utilisé initialement (session Claude du 2026-08-09) : lecture de
`tvtime-export/tvtime-full-export.json`, résolution TMDB (`/find`, `/tv`,
`/tv/{id}/season/{n}`) avec le token du `.env`, calcul des stats réelles,
émission de `demo-data.ts`. À refaire à la main ou via script équivalent si
besoin d'enrichir la sélection.

## Servir en local

```bash
npx nx build frontend --configuration=demo
npx serve dist/apps/frontend-demo/browser
```
