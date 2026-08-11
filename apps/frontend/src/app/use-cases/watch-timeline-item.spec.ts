import { TestBed } from '@angular/core/testing';

import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { TimelinesGateway } from '../domain/gateways/timelines.gateway';
import { MoviesStore } from '../store/movies.store';
import { TimelinesStore } from '../store/timelines.store';
import {
  FAKE_TIMELINE_DETAIL,
  FAKE_TIMELINE_SUMMARY,
  InMemoryNotificationGateway,
  InMemoryTimelinesGateway,
} from '../testing/in-memory.gateways';
import { provideFrontendTesting } from '../testing/provide-frontend-testing';
import { WatchTimelineItem } from './watch-timeline-item';

describe('WatchTimelineItem', () => {
  let useCase: WatchTimelineItem;
  let gateway: InMemoryTimelinesGateway;
  let notifications: InMemoryNotificationGateway;
  let timelinesStore: TimelinesStore;
  let moviesStore: MoviesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideFrontendTesting()] });
    useCase = TestBed.inject(WatchTimelineItem);
    gateway = TestBed.inject(TimelinesGateway) as InMemoryTimelinesGateway;
    notifications = TestBed.inject(NotificationGateway) as InMemoryNotificationGateway;
    timelinesStore = TestBed.inject(TimelinesStore);
    moviesStore = TestBed.inject(MoviesStore);
  });

  it('recharge la frise et invalide les listes dépendantes', () => {
    gateway.feedWith({ detail: FAKE_TIMELINE_DETAIL });
    timelinesStore.setSummaries([FAKE_TIMELINE_SUMMARY]);
    moviesStore.setMovies([]);

    useCase.execute('test', 'item-2');

    expect(timelinesStore.current()).toEqual(FAKE_TIMELINE_DETAIL);
    expect(timelinesStore.summariesLoaded()).toBe(false);
    expect(moviesStore.loaded()).toBe(false);
    expect(notifications.errors).toEqual([]);
  });

  it('en cas d’échec : notifie sans invalider les stores', () => {
    gateway.failWith(new Error('boom'));
    timelinesStore.setSummaries([FAKE_TIMELINE_SUMMARY]);
    moviesStore.setMovies([]);

    useCase.execute('test', 'item-2');

    expect(notifications.errors).toEqual(['Visionnage non enregistré']);
    expect(timelinesStore.summariesLoaded()).toBe(true);
    expect(moviesStore.loaded()).toBe(true);
  });
});
