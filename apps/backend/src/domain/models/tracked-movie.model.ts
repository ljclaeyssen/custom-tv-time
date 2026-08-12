import { TrackedMovie } from '@ctt/shared-models';

export type { MovieProgress, TrackedMovie } from '@ctt/shared-models';

export type TrackedMovieInput = Omit<TrackedMovie, 'id' | 'addedAt'>;
