import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FollowedShow } from '../../domain/models/followed-show.model';
import {
  EpisodeWithState,
  MyShowItem,
  RecentlyWatchedItem,
  ShowProgress,
  WatchNextItem,
} from '../../domain/models/progress.model';
import { FollowShowUseCase } from '../../use-cases/follow-show.use-case';
import { MarkEpisodeWatchedUseCase } from '../../use-cases/mark-episode-watched.use-case';
import { MarkSeasonWatchedUseCase } from '../../use-cases/mark-season-watched.use-case';
import { RetrieveMyShowsUseCase } from '../../use-cases/retrieve-my-shows.use-case';
import { RetrieveRecentlyWatchedUseCase } from '../../use-cases/retrieve-recently-watched.use-case';
import { RetrieveSeasonEpisodesUseCase } from '../../use-cases/retrieve-season-episodes.use-case';
import { RetrieveShowProgressUseCase } from '../../use-cases/retrieve-show-progress.use-case';
import { RetrieveWatchNextUseCase } from '../../use-cases/retrieve-watch-next.use-case';
import { UnfollowShowUseCase } from '../../use-cases/unfollow-show.use-case';
import { UnmarkEpisodeWatchedUseCase } from '../../use-cases/unmark-episode-watched.use-case';
import { UpdateShowStatusUseCase } from '../../use-cases/update-show-status.use-case';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UpdateShowStatusDto } from '../dto/update-show-status.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('shows')
@UseGuards(JwtAuthGuard)
export class ShowsController {
  constructor(
    private readonly retrieveMyShows: RetrieveMyShowsUseCase,
    private readonly retrieveWatchNext: RetrieveWatchNextUseCase,
    private readonly retrieveRecentlyWatched: RetrieveRecentlyWatchedUseCase,
    private readonly retrieveShowProgress: RetrieveShowProgressUseCase,
    private readonly retrieveSeasonEpisodes: RetrieveSeasonEpisodesUseCase,
    private readonly followShow: FollowShowUseCase,
    private readonly unfollowShow: UnfollowShowUseCase,
    private readonly updateShowStatus: UpdateShowStatusUseCase,
    private readonly markEpisodeWatched: MarkEpisodeWatchedUseCase,
    private readonly unmarkEpisodeWatched: UnmarkEpisodeWatchedUseCase,
    private readonly markSeasonWatched: MarkSeasonWatchedUseCase,
  ) {}

  @Get()
  mine(@CurrentUser() user: { userId: string }): Promise<MyShowItem[]> {
    return this.retrieveMyShows.execute(user.userId);
  }

  @Get('watch-next')
  watchNext(@CurrentUser() user: { userId: string }): Promise<WatchNextItem[]> {
    return this.retrieveWatchNext.execute(user.userId);
  }

  @Get('recently-watched')
  recentlyWatched(@CurrentUser() user: { userId: string }): Promise<RecentlyWatchedItem[]> {
    return this.retrieveRecentlyWatched.execute(user.userId);
  }

  @Get(':tmdbId')
  detail(
    @CurrentUser() user: { userId: string },
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
  ): Promise<ShowProgress> {
    return this.retrieveShowProgress.execute(user.userId, tmdbId);
  }

  @Get(':tmdbId/season/:seasonNumber')
  seasonEpisodes(
    @CurrentUser() user: { userId: string },
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
    @Param('seasonNumber', ParseIntPipe) seasonNumber: number,
  ): Promise<EpisodeWithState[]> {
    return this.retrieveSeasonEpisodes.execute(user.userId, tmdbId, seasonNumber);
  }

  @Post(':tmdbId/follow')
  follow(
    @CurrentUser() user: { userId: string },
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
  ): Promise<FollowedShow> {
    return this.followShow.execute(user.userId, tmdbId);
  }

  @Delete(':tmdbId/follow')
  @HttpCode(204)
  async unfollow(
    @CurrentUser() user: { userId: string },
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
  ): Promise<void> {
    await this.unfollowShow.execute(user.userId, tmdbId);
  }

  @Patch(':tmdbId/status')
  @HttpCode(204)
  async setStatus(
    @CurrentUser() user: { userId: string },
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
    @Body() dto: UpdateShowStatusDto,
  ): Promise<void> {
    await this.updateShowStatus.execute(user.userId, tmdbId, dto.status);
  }

  @Post(':tmdbId/episodes/:season/:episode/watch')
  @HttpCode(204)
  async watchEpisode(
    @CurrentUser() user: { userId: string },
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
    @Param('season', ParseIntPipe) season: number,
    @Param('episode', ParseIntPipe) episode: number,
  ): Promise<void> {
    await this.markEpisodeWatched.execute(user.userId, tmdbId, season, episode);
  }

  @Delete(':tmdbId/episodes/:season/:episode/watch')
  @HttpCode(204)
  async unwatchEpisode(
    @CurrentUser() user: { userId: string },
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
    @Param('season', ParseIntPipe) season: number,
    @Param('episode', ParseIntPipe) episode: number,
  ): Promise<void> {
    await this.unmarkEpisodeWatched.execute(user.userId, tmdbId, season, episode);
  }

  @Post(':tmdbId/season/:seasonNumber/watch')
  async watchSeason(
    @CurrentUser() user: { userId: string },
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
    @Param('seasonNumber', ParseIntPipe) seasonNumber: number,
  ): Promise<{ marked: number }> {
    const marked = await this.markSeasonWatched.execute(user.userId, tmdbId, seasonNumber);
    return { marked };
  }
}
