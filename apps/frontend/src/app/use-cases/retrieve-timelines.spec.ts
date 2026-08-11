import { TestBed } from '@angular/core/testing';

import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { TimelinesGateway } from '../domain/gateways/timelines.gateway';
import { TimelinesStore } from '../store/timelines.store';
import {
  FAKE_TIMELINE_SUMMARY,
  InMemoryNotificationGateway,
  InMemoryTimelinesGateway,
} from '../testing/in-memory.gateways';
import { provideFrontendTesting } from '../testing/provide-frontend-testing';
import { RetrieveTimelines } from './retrieve-timelines';

describe('RetrieveTimelines', () => {
  let useCase: RetrieveTimelines;
  let gateway: InMemoryTimelinesGateway;
  let notifications: InMemoryNotificationGateway;
  let store: TimelinesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideFrontendTesting()] });
    useCase = TestBed.inject(RetrieveTimelines);
    gateway = TestBed.inject(TimelinesGateway) as InMemoryTimelinesGateway;
    notifications = TestBed.inject(NotificationGateway) as InMemoryNotificationGateway;
    store = TestBed.inject(TimelinesStore);
  });

  it('écrit les frises dans le store et coupe le loading', () => {
    gateway.feedWith({ summaries: [FAKE_TIMELINE_SUMMARY] });

    useCase.execute();

    expect(store.summaries()).toEqual([FAKE_TIMELINE_SUMMARY]);
    expect(store.summariesLoaded()).toBe(true);
    expect(store.loading()).toBe(false);
  });

  it('en cas d’échec : notifie, coupe le loading, ne marque pas la liste chargée', () => {
    gateway.failWith(new Error('boom'));

    useCase.execute();

    expect(notifications.errors).toEqual(['Impossible de charger les frises']);
    expect(store.loading()).toBe(false);
    expect(store.summariesLoaded()).toBe(false);
  });

  it('ne recharge pas une liste déjà chargée sans force', () => {
    gateway.feedWith({ summaries: [FAKE_TIMELINE_SUMMARY] });
    useCase.execute();
    gateway.failWith(new Error('ne doit pas être appelé'));

    useCase.execute();

    expect(notifications.errors).toEqual([]);
    expect(store.summaries()).toEqual([FAKE_TIMELINE_SUMMARY]);
  });
});
