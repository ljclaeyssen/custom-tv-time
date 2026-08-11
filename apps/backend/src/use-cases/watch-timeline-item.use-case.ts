import { Injectable } from '@nestjs/common';
import { AlreadyFollowedError, EntityNotFoundError } from '../domain/exceptions/domain.errors';
import { TimelinesPort } from '../domain/ports/timelines.port';
import { FollowShowUseCase } from './follow-show.use-case';
import { MarkSeasonWatchedUseCase } from './mark-season-watched.use-case';
import { TrackMovieUseCase } from './track-movie.use-case';

/**
 * « Marquer vu » depuis une frise. Compose les use-cases existants pour que
 * l'œuvre apparaisse aussi dans les écrans classiques : un film est tracké vu
 * (upsert), une saison suit d'abord la série si nécessaire puis marque tous
 * ses épisodes diffusés.
 */
@Injectable()
export class WatchTimelineItemUseCase {
  constructor(
    private readonly timelines: TimelinesPort,
    private readonly trackMovie: TrackMovieUseCase,
    private readonly followShow: FollowShowUseCase,
    private readonly markSeasonWatched: MarkSeasonWatchedUseCase,
  ) {}

  async execute(userId: string, slug: string, itemId: string): Promise<void> {
    const timeline = await this.timelines.findBySlug(slug);
    if (!timeline) {
      throw new EntityNotFoundError('Frise', slug);
    }
    const item = await this.timelines.findItem(timeline.id, itemId);
    if (!item) {
      throw new EntityNotFoundError('Élément de frise', itemId);
    }

    if (item.itemType === 'movie') {
      await this.trackMovie.execute(userId, item.tmdbId, true);
      return;
    }

    if (item.seasonNumber === null) {
      throw new EntityNotFoundError('Saison de la frise', itemId);
    }
    try {
      await this.followShow.execute(userId, item.tmdbId);
    } catch (error) {
      if (!(error instanceof AlreadyFollowedError)) {
        throw error;
      }
    }
    await this.markSeasonWatched.execute(userId, item.tmdbId, item.seasonNumber);
  }
}
