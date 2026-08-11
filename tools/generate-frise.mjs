#!/usr/bin/env node
// Résout une frise depuis son seed de curation tools/frises/<slug>.json
// (recherche TMDB : ids, posters, titres FR, dates) et écrit le contenu
// versionné dans apps/backend/src/infrastructure/seeds/frises/<slug>.json,
// puis régénère l'index frises.seeds.ts. Le backend synchronise la base sur
// ces fichiers à chaque démarrage — voir creer-frise.md.
// Usage : node tools/generate-frise.mjs tools/frises/mcu.json
// Le résumé des résolutions TMDB sort sur stderr : À RELIRE avant de committer.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const seedPath = process.argv[2];
if (!seedPath) {
  console.error('Usage : node tools/generate-frise.mjs <tools/frises/slug.json>');
  process.exit(1);
}

const seed = JSON.parse(readFileSync(seedPath, 'utf8'));
const env = readFileSync(new URL('../.env', import.meta.url), 'utf8');
const token = /^TMDB_API_READ_ACCESS_TOKEN=(.+)$/m.exec(env)?.[1]?.trim();
if (!token) {
  console.error('TMDB_API_READ_ACCESS_TOKEN introuvable dans le .env racine.');
  process.exit(1);
}

const OUT_DIR = fileURLToPath(
  new URL('../apps/backend/src/infrastructure/seeds/frises/', import.meta.url),
);
const INDEX_FILE = fileURLToPath(
  new URL('../apps/backend/src/infrastructure/seeds/frises.seeds.ts', import.meta.url),
);

async function tmdb(path, params = {}) {
  const url = new URL(`https://api.themoviedb.org/3${path}`);
  url.searchParams.set('language', 'fr-FR');
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) {
    throw new Error(`TMDB ${response.status} sur ${path}`);
  }
  return response.json();
}

const showCache = new Map();
async function resolveShow(query, year) {
  const key = `${query}:${year ?? ''}`;
  if (!showCache.has(key)) {
    const search = await tmdb('/search/tv', {
      query,
      ...(year ? { first_air_date_year: year } : {}),
    });
    const show = search.results[0];
    if (!show) {
      throw new Error(`Série introuvable : ${query}`);
    }
    showCache.set(key, await tmdb(`/tv/${show.id}`));
  }
  return showCache.get(key);
}

const items = [];
for (const [index, item] of seed.items.entries()) {
  const position = (index + 1) * 10;
  if (item.type === 'movie') {
    const search = await tmdb('/search/movie', {
      query: item.query,
      ...(item.year ? { primary_release_year: item.year } : {}),
    });
    const movie = search.results[0];
    if (!movie) {
      throw new Error(`Film introuvable : ${item.query}`);
    }
    items.push({
      query: item.query,
      resolved: {
        position,
        section: item.section,
        itemType: 'movie',
        tmdbId: movie.id,
        seasonNumber: null,
        title: movie.title,
        posterPath: movie.poster_path ?? null,
        releaseDate: movie.release_date || null,
      },
    });
    console.error(`${position}\t${item.section}\tfilm\t${movie.title} (${movie.release_date ?? '?'}) #${movie.id}`);
  } else {
    const show = await resolveShow(item.query, item.year);
    const season = show.seasons?.find((s) => s.season_number === item.season);
    if (!season) {
      throw new Error(`Saison ${item.season} introuvable : ${item.query} (#${show.id})`);
    }
    // Nom de saison TMDB s'il est parlant (« La Ligue Indigo »), sinon « Saison N ».
    const seasonLabel =
      season.name && !/^(saison|season)\s*\d+$/i.test(season.name.trim())
        ? season.name
        : `Saison ${item.season}`;
    items.push({
      query: item.query,
      resolved: {
        position,
        section: item.section,
        itemType: 'season',
        tmdbId: show.id,
        seasonNumber: item.season,
        title: `${show.name} — ${seasonLabel}`,
        posterPath: season.poster_path ?? show.poster_path ?? null,
        releaseDate: season.air_date || null,
      },
    });
    console.error(`${position}\t${item.section}\tsaison\t${show.name} — ${seasonLabel} (${season.air_date ?? '?'}) #${show.id}`);
  }
}

const posterRow = seed.posterFrom ? items.find((i) => i.query === seed.posterFrom) : items[0];
const resolved = {
  slug: seed.slug,
  name: seed.name,
  description: seed.description ?? null,
  posterPath: posterRow?.resolved.posterPath ?? null,
  position: seed.position ?? 0,
  items: items.map((i) => i.resolved),
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}${seed.slug}.json`, `${JSON.stringify(resolved, null, 2)}\n`);

// Régénère l'index à partir du contenu du dossier (tri alphabétique stable).
const slugs = readdirSync(OUT_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))
  .sort();
const identifier = (slug) => slug.replace(/-(\w)/g, (_, c) => c.toUpperCase());
const indexContent = `// Généré par tools/generate-frise.mjs — ne pas éditer à la main.
import { TimelineSeed } from '../../domain/models/timeline.model';
${slugs.map((s) => `import ${identifier(s)} from './frises/${s}.json';`).join('\n')}

export const TIMELINE_SEEDS: TimelineSeed[] = [
${slugs.map((s) => `  ${identifier(s)} as TimelineSeed,`).join('\n')}
];
`;
writeFileSync(INDEX_FILE, indexContent);

console.error(`\n→ ${resolved.items.length} items écrits dans apps/backend/src/infrastructure/seeds/frises/${seed.slug}.json`);
console.error(`→ frises.seeds.ts régénéré (${slugs.length} frise(s) : ${slugs.join(', ')})`);
console.error('Le backend synchronisera la base au prochain démarrage (dev et prod).');
