import { TestBed } from '@angular/core/testing';

import { MoviesGateway } from '../domain/gateways/movies.gateway';
import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { MoviesStore } from '../store/movies.store';
import {
  FAKE_MOVIE_PROGRESS,
  InMemoryMoviesGateway,
  InMemoryNotificationGateway,
} from '../testing/in-memory.gateways';
import { provideFrontendTesting } from '../testing/provide-frontend-testing';
import { RetrieveMovieProgress } from './retrieve-movie-progress';

describe('RetrieveMovieProgress', () => {
  let useCase: RetrieveMovieProgress;
  let gateway: InMemoryMoviesGateway;
  let notifications: InMemoryNotificationGateway;
  let store: MoviesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideFrontendTesting()] });
    useCase = TestBed.inject(RetrieveMovieProgress);
    gateway = TestBed.inject(MoviesGateway) as InMemoryMoviesGateway;
    notifications = TestBed.inject(NotificationGateway) as InMemoryNotificationGateway;
    store = TestBed.inject(MoviesStore);
  });

  it('écrit la fiche film dans le store et coupe le loading', () => {
    gateway.feedProgressWith(FAKE_MOVIE_PROGRESS);

    useCase.execute(1);

    expect(store.current()).toEqual(FAKE_MOVIE_PROGRESS);
    expect(store.loading()).toBe(false);
  });

  it('en cas d’échec : notifie et coupe le loading', () => {
    gateway.failWith(new Error('boom'));

    useCase.execute(1);

    expect(notifications.errors).toEqual(['Impossible de charger le film']);
    expect(store.current()).toBeNull();
    expect(store.loading()).toBe(false);
  });
});
