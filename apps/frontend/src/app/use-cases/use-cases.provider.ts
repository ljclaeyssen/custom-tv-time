import { Provider } from '@angular/core';
import { CompleteDiscordLogin } from './complete-discord-login';
import { Logout } from './logout';
import { MarkSeasonWatched } from './mark-season-watched';
import { MarkWatchNextEpisodeWatched } from './mark-watch-next-episode-watched';
import { RetrieveMyMovies } from './retrieve-my-movies';
import { RetrieveMyShows } from './retrieve-my-shows';
import { RetrieveProfile } from './retrieve-profile';
import { RetrieveProfileStatsFull } from './retrieve-profile-stats-full';
import { RetrieveRecentlyWatched } from './retrieve-recently-watched';
import { RetrieveSeasonEpisodes } from './retrieve-season-episodes';
import { RetrieveShowProgress } from './retrieve-show-progress';
import { RetrieveWatchNext } from './retrieve-watch-next';
import { RestoreSession } from './restore-session';
import { SearchCatalog } from './search-catalog';
import { SetMovieWatched } from './set-movie-watched';
import { ToggleEpisodeWatched } from './toggle-episode-watched';
import { ToggleShowFollow } from './toggle-show-follow';
import { TrackMovie } from './track-movie';
import { UntrackMovie } from './untrack-movie';
import { UpdateShowStatus } from './update-show-status';

export function provideApplicationUseCases(): Provider[] {
  return [
    RestoreSession,
    CompleteDiscordLogin,
    RetrieveProfile,
    RetrieveProfileStatsFull,
    Logout,
    RetrieveWatchNext,
    RetrieveRecentlyWatched,
    RetrieveMyShows,
    RetrieveShowProgress,
    RetrieveSeasonEpisodes,
    ToggleEpisodeWatched,
    MarkWatchNextEpisodeWatched,
    MarkSeasonWatched,
    ToggleShowFollow,
    UpdateShowStatus,
    RetrieveMyMovies,
    TrackMovie,
    SetMovieWatched,
    UntrackMovie,
    SearchCatalog,
  ];
}
