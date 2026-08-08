import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvtimeExportFileAdapter } from '../../adapters/fs/tvtime-export-file.adapter';
import { DiscordAuthAdapter } from '../../adapters/http/discord-auth.adapter';
import { TmdbCatalogAdapter } from '../../adapters/http/tmdb-catalog.adapter';
import { JwtAuthTokensAdapter } from '../../adapters/security/jwt-auth-tokens.adapter';
import { FollowedShowEntity } from '../../adapters/persistence/entities/followed-show.entity';
import { MovieMetaEntity } from '../../adapters/persistence/entities/movie-meta.entity';
import { ShowMetaEntity } from '../../adapters/persistence/entities/show-meta.entity';
import { TrackedMovieEntity } from '../../adapters/persistence/entities/tracked-movie.entity';
import { UserEntity } from '../../adapters/persistence/entities/user.entity';
import { WatchedEpisodeEntity } from '../../adapters/persistence/entities/watched-episode.entity';
import { FollowsPersistenceAdapter } from '../../adapters/persistence/follows-persistence.adapter';
import { StatsMetaPersistenceAdapter } from '../../adapters/persistence/stats-meta-persistence.adapter';
import { TrackedMoviesPersistenceAdapter } from '../../adapters/persistence/tracked-movies-persistence.adapter';
import { UsersPersistenceAdapter } from '../../adapters/persistence/users-persistence.adapter';
import { WatchedEpisodesPersistenceAdapter } from '../../adapters/persistence/watched-episodes-persistence.adapter';
import { AuthTokensPort } from '../../domain/ports/auth-tokens.port';
import { CatalogPort } from '../../domain/ports/catalog.port';
import { DiscordAuthPort } from '../../domain/ports/discord-auth.port';
import { FollowsPort } from '../../domain/ports/follows.port';
import { StatsMetaPort } from '../../domain/ports/stats-meta.port';
import { TrackedMoviesPort } from '../../domain/ports/tracked-movies.port';
import { TvtimeExportPort } from '../../domain/ports/tvtime-export.port';
import { UsersPort } from '../../domain/ports/users.port';
import { WatchedEpisodesPort } from '../../domain/ports/watched-episodes.port';

const portBindings = [
  { provide: UsersPort, useClass: UsersPersistenceAdapter },
  { provide: FollowsPort, useClass: FollowsPersistenceAdapter },
  { provide: WatchedEpisodesPort, useClass: WatchedEpisodesPersistenceAdapter },
  { provide: TrackedMoviesPort, useClass: TrackedMoviesPersistenceAdapter },
  { provide: StatsMetaPort, useClass: StatsMetaPersistenceAdapter },
  { provide: CatalogPort, useClass: TmdbCatalogAdapter },
  { provide: DiscordAuthPort, useClass: DiscordAuthAdapter },
  { provide: TvtimeExportPort, useClass: TvtimeExportFileAdapter },
  { provide: AuthTokensPort, useClass: JwtAuthTokensAdapter },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      FollowedShowEntity,
      WatchedEpisodeEntity,
      TrackedMovieEntity,
      ShowMetaEntity,
      MovieMetaEntity,
    ]),
  ],
  providers: portBindings,
  exports: portBindings.map((binding) => binding.provide),
})
export class AdaptersModule {}
