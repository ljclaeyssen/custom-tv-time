/** Date du jour au format AAAA-MM-JJ (UTC), le format des dates TMDB. */
export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Règle métier partagée front/back : un épisode est diffusé si sa date de
 * diffusion est connue et pas dans le futur. Passer `today` explicitement
 * pour figer la date sur un lot d'épisodes.
 */
export function isAired(airDate: string | null, today = todayIso()): boolean {
  return airDate !== null && airDate <= today;
}
