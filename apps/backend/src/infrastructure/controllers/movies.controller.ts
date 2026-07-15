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
import { TrackedMovie } from '../../domain/models/tracked-movie.model';
import { RetrieveMyMoviesUseCase } from '../../use-cases/retrieve-my-movies.use-case';
import { SetMovieWatchedUseCase } from '../../use-cases/set-movie-watched.use-case';
import { TrackMovieUseCase } from '../../use-cases/track-movie.use-case';
import { UntrackMovieUseCase } from '../../use-cases/untrack-movie.use-case';
import { CurrentUser } from '../decorators/current-user.decorator';
import { SetMovieWatchedDto, TrackMovieDto } from '../dto/track-movie.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(
    private readonly retrieveMyMovies: RetrieveMyMoviesUseCase,
    private readonly trackMovie: TrackMovieUseCase,
    private readonly setMovieWatched: SetMovieWatchedUseCase,
    private readonly untrackMovie: UntrackMovieUseCase,
  ) {}

  @Get()
  mine(@CurrentUser() user: { userId: string }): Promise<TrackedMovie[]> {
    return this.retrieveMyMovies.execute(user.userId);
  }

  @Post(':tmdbId')
  track(
    @CurrentUser() user: { userId: string },
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
    @Body() dto: TrackMovieDto,
  ): Promise<TrackedMovie> {
    return this.trackMovie.execute(user.userId, tmdbId, dto.watched ?? false);
  }

  @Patch(':tmdbId/watched')
  @HttpCode(204)
  async setWatched(
    @CurrentUser() user: { userId: string },
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
    @Body() dto: SetMovieWatchedDto,
  ): Promise<void> {
    await this.setMovieWatched.execute(user.userId, tmdbId, dto.watched);
  }

  @Delete(':tmdbId')
  @HttpCode(204)
  async untrack(
    @CurrentUser() user: { userId: string },
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
  ): Promise<void> {
    await this.untrackMovie.execute(user.userId, tmdbId);
  }
}
