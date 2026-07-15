import { WatchedEpisode, WatchedEpisodeInput } from '../models/watched-episode.model';

export abstract class WatchedEpisodesPort {
  abstract findAllByUser(userId: string): Promise<WatchedEpisode[]>;
  abstract findByUserAndShow(userId: string, tmdbShowId: number): Promise<WatchedEpisode[]>;
  abstract addMany(episodes: WatchedEpisodeInput[]): Promise<number>;
  abstract remove(userId: string, tmdbShowId: number, season: number, episode: number): Promise<void>;
  abstract removeAllForShow(userId: string, tmdbShowId: number): Promise<void>;
  abstract removeAllExcept(
    userId: string,
    tmdbShowId: number,
    keep: { season: number; episode: number }[],
  ): Promise<number>;
  abstract removeImportedForShows(userId: string, tmdbShowIds: number[]): Promise<number>;
  abstract countByUser(userId: string): Promise<number>;
}
