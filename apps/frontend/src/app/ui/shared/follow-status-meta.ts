import { FollowStatus } from '../../domain/models/show.model';

/**
 * Libellés FR et ordre d'affichage des statuts de suivi — source de vérité
 * unique. Le Record<FollowStatus, …> force l'exhaustivité : un statut ajouté
 * au modèle partagé fait échouer la compilation ici.
 */
export const FOLLOW_STATUS_META: Record<FollowStatus, { label: string; order: number }> = {
  watching: { label: 'En cours', order: 0 },
  up_to_date: { label: 'À jour', order: 1 },
  not_started: { label: 'Pas commencée', order: 2 },
  watch_later: { label: 'À voir plus tard', order: 3 },
  stopped: { label: 'Arrêtée', order: 4 },
};

/** Options de sélection dérivées, triées par ordre d'affichage. */
export const FOLLOW_STATUS_OPTIONS: { value: FollowStatus; label: string }[] = (
  Object.entries(FOLLOW_STATUS_META) as [FollowStatus, { label: string; order: number }][]
)
  .sort(([, a], [, b]) => a.order - b.order)
  .map(([value, { label }]) => ({ value, label }));
