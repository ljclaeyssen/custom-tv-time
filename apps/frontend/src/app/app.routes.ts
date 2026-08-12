import { Routes } from '@angular/router';
import { authGuard } from './ui/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./ui/features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'auth/callback',
    loadComponent: () =>
      import('./ui/features/auth/auth-callback/auth-callback').then((m) => m.AuthCallback),
  },
  {
    path: 'shows',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./ui/features/shows/shows-shell/shows-shell').then((m) => m.ShowsShell),
  },
  {
    path: 'shows/:tmdbId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./ui/features/shows/show-detail/show-detail').then((m) => m.ShowDetail),
  },
  {
    path: 'shows/:tmdbId/season/:seasonNumber',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./ui/features/shows/season-detail/season-detail').then((m) => m.SeasonDetail),
  },
  {
    path: 'movies',
    canActivate: [authGuard],
    loadComponent: () => import('./ui/features/movies/movies/movies').then((m) => m.Movies),
  },
  {
    path: 'movies/:tmdbId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./ui/features/movies/movie-detail/movie-detail').then((m) => m.MovieDetail),
  },
  {
    path: 'timelines',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./ui/features/timelines/timelines-list/timelines-list').then((m) => m.TimelinesList),
  },
  {
    path: 'timelines/:slug',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./ui/features/timelines/timeline-detail/timeline-detail').then(
        (m) => m.TimelineDetail,
      ),
  },
  {
    path: 'explore',
    canActivate: [authGuard],
    loadComponent: () => import('./ui/features/explore/explore/explore').then((m) => m.Explore),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./ui/features/profile/profile/profile').then((m) => m.Profile),
  },
  { path: '', pathMatch: 'full', redirectTo: 'shows' },
  { path: '**', redirectTo: 'shows' },
];
