import { Timeline, TimelineItemRecord, TimelineSeedItem } from '../models/timeline.model';

export abstract class TimelinesPort {
  abstract findAll(): Promise<Timeline[]>;
  abstract findBySlug(slug: string): Promise<Timeline | null>;
  abstract findItems(timelineId: string): Promise<TimelineItemRecord[]>;
  abstract findAllItems(): Promise<TimelineItemRecord[]>;
  abstract findItem(timelineId: string, itemId: string): Promise<TimelineItemRecord | null>;
  abstract upsertBySlug(timeline: Omit<Timeline, 'id'>): Promise<Timeline>;
  abstract replaceItems(timelineId: string, items: TimelineSeedItem[]): Promise<void>;
  abstract removeBySlug(slug: string): Promise<void>;
}
