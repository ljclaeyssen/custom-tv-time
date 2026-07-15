import { TrackedMovie } from '@ctt/shared-models';

export type { TrackedMovie } from '@ctt/shared-models';

export type TrackedMovieInput = Omit<TrackedMovie, 'id' | 'addedAt'>;
