import { Module } from '@nestjs/common';
import { AuthenticateWithDiscordUseCase } from '../../use-cases/authenticate-with-discord.use-case';
import { FollowShowUseCase } from '../../use-cases/follow-show.use-case';
import { ImportTvtimeExportUseCase } from '../../use-cases/import-tvtime-export.use-case';
import { MarkEpisodeWatchedUseCase } from '../../use-cases/mark-episode-watched.use-case';
import { MarkSeasonWatchedUseCase } from '../../use-cases/mark-season-watched.use-case';
import { RetrieveCurrentUserUseCase } from '../../use-cases/retrieve-current-user.use-case';
import { RetrieveMyMoviesUseCase } from '../../use-cases/retrieve-my-movies.use-case';
import { RetrieveMyShowsUseCase } from '../../use-cases/retrieve-my-shows.use-case';
import { RetrieveProfileStatsUseCase } from '../../use-cases/retrieve-profile-stats.use-case';
import { RetrieveSeasonEpisodesUseCase } from '../../use-cases/retrieve-season-episodes.use-case';
import { RetrieveShowProgressUseCase } from '../../use-cases/retrieve-show-progress.use-case';
import { RetrieveWatchNextUseCase } from '../../use-cases/retrieve-watch-next.use-case';
import { SearchCatalogUseCase } from '../../use-cases/search-catalog.use-case';
import { SetMovieWatchedUseCase } from '../../use-cases/set-movie-watched.use-case';
import { TrackMovieUseCase } from '../../use-cases/track-movie.use-case';
import { UnfollowShowUseCase } from '../../use-cases/unfollow-show.use-case';
import { UnmarkEpisodeWatchedUseCase } from '../../use-cases/unmark-episode-watched.use-case';
import { UntrackMovieUseCase } from '../../use-cases/untrack-movie.use-case';
import { UpdateShowStatusUseCase } from '../../use-cases/update-show-status.use-case';
import { AdaptersModule } from './adapters.module';

const useCases = [
  AuthenticateWithDiscordUseCase,
  RetrieveCurrentUserUseCase,
  RetrieveWatchNextUseCase,
  RetrieveMyShowsUseCase,
  RetrieveShowProgressUseCase,
  RetrieveSeasonEpisodesUseCase,
  FollowShowUseCase,
  UnfollowShowUseCase,
  UpdateShowStatusUseCase,
  MarkEpisodeWatchedUseCase,
  UnmarkEpisodeWatchedUseCase,
  MarkSeasonWatchedUseCase,
  RetrieveMyMoviesUseCase,
  TrackMovieUseCase,
  SetMovieWatchedUseCase,
  UntrackMovieUseCase,
  SearchCatalogUseCase,
  RetrieveProfileStatsUseCase,
  ImportTvtimeExportUseCase,
];

@Module({
  imports: [AdaptersModule],
  providers: useCases,
  exports: [...useCases, AdaptersModule],
})
export class UseCasesModule {}
