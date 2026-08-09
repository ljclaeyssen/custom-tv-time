import { TestBed } from '@angular/core/testing';

import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { ShowsGateway } from '../domain/gateways/shows.gateway';
import { MyShowItem } from '../domain/models/show.model';
import { ShowsStore } from '../store/shows.store';
import { FAKE_FOLLOWED_SHOW, InMemoryNotificationGateway, InMemoryShowsGateway } from '../testing/in-memory.gateways';
import { provideFrontendTesting } from '../testing/provide-frontend-testing';
import { RetrieveMyShows } from './retrieve-my-shows';

describe('RetrieveMyShows', () => {
  let useCase: RetrieveMyShows;
  let gateway: InMemoryShowsGateway;
  let notifications: InMemoryNotificationGateway;
  let store: ShowsStore;

  const item: MyShowItem = {
    show: FAKE_FOLLOWED_SHOW,
    watchedCount: 3,
    totalEpisodes: 10,
    ended: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideFrontendTesting()] });
    useCase = TestBed.inject(RetrieveMyShows);
    gateway = TestBed.inject(ShowsGateway) as InMemoryShowsGateway;
    notifications = TestBed.inject(NotificationGateway) as InMemoryNotificationGateway;
    store = TestBed.inject(ShowsStore);
  });

  it('écrit les séries dans le store et coupe le loading', () => {
    gateway.feedWith({ myShows: [item] });

    useCase.execute();

    expect(store.myShows()).toEqual([item]);
    expect(store.myShowsLoaded()).toBe(true);
    expect(store.loading()).toBe(false);
  });

  it('en cas d’échec : notifie, coupe le loading, ne marque pas la liste chargée', () => {
    gateway.failWith(new Error('boom'));

    useCase.execute();

    expect(notifications.errors).toEqual(['Impossible de charger vos séries']);
    expect(store.loading()).toBe(false);
    expect(store.myShowsLoaded()).toBe(false);
  });

  it('ne recharge pas une liste déjà chargée sans force', () => {
    gateway.feedWith({ myShows: [item] });
    useCase.execute();
    gateway.failWith(new Error('ne doit pas être appelé'));

    useCase.execute();

    expect(notifications.errors).toEqual([]);
    expect(store.myShows()).toEqual([item]);
  });
});
