/**
 * Durée estimée en français, lisible d'un coup d'œil :
 * « ≈ 45 min », « ≈ 2 h », « ≈ 2 h 05 min ».
 */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `≈ ${minutes} min`;
  }
  const hours = Math.floor(minutes / 60).toLocaleString('fr-FR');
  const rest = minutes % 60;
  return rest > 0 ? `≈ ${hours} h ${String(rest).padStart(2, '0')} min` : `≈ ${hours} h`;
}
