import { TestBed } from '@angular/core/testing';

import { NotificationGateway } from '../domain/gateways/notification.gateway';
import { TimelinesGateway } from '../domain/gateways/timelines.gateway';
import { TimelinesStore } from '../store/timelines.store';
import {
  FAKE_TIMELINE_DETAIL,
  InMemoryNotificationGateway,
  InMemoryTimelinesGateway,
} from '../testing/in-memory.gateways';
import { provideFrontendTesting } from '../testing/provide-frontend-testing';
import { RetrieveTimelineDetail } from './retrieve-timeline-detail';

describe('RetrieveTimelineDetail', () => {
  let useCase: RetrieveTimelineDetail;
  let gateway: InMemoryTimelinesGateway;
  let notifications: InMemoryNotificationGateway;
  let store: TimelinesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideFrontendTesting()] });
    useCase = TestBed.inject(RetrieveTimelineDetail);
    gateway = TestBed.inject(TimelinesGateway) as InMemoryTimelinesGateway;
    notifications = TestBed.inject(NotificationGateway) as InMemoryNotificationGateway;
    store = TestBed.inject(TimelinesStore);
  });

  it('écrit la frise courante dans le store et coupe le loading', () => {
    gateway.feedWith({ detail: FAKE_TIMELINE_DETAIL });

    useCase.execute('test');

    expect(store.current()).toEqual(FAKE_TIMELINE_DETAIL);
    expect(store.loading()).toBe(false);
  });

  it('en cas d’échec : notifie et coupe le loading sans toucher au store', () => {
    gateway.failWith(new Error('boom'));

    useCase.execute('test');

    expect(notifications.errors).toEqual(['Impossible de charger la frise']);
    expect(store.current()).toBeNull();
    expect(store.loading()).toBe(false);
  });
});
