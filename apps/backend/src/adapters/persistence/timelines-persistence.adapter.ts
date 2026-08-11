import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Timeline,
  TimelineItemRecord,
  TimelineItemType,
  TimelineSeedItem,
} from '../../domain/models/timeline.model';
import { TimelinesPort } from '../../domain/ports/timelines.port';
import { TimelineItemEntity } from './entities/timeline-item.entity';
import { TimelineEntity } from './entities/timeline.entity';

@Injectable()
export class TimelinesPersistenceAdapter extends TimelinesPort {
  constructor(
    @InjectRepository(TimelineEntity)
    private readonly timelines: Repository<TimelineEntity>,
    @InjectRepository(TimelineItemEntity)
    private readonly items: Repository<TimelineItemEntity>,
  ) {
    super();
  }

  async findAll(): Promise<Timeline[]> {
    const entities = await this.timelines.find({ order: { position: 'ASC', createdAt: 'ASC' } });
    return entities.map((e) => this.toDomain(e));
  }

  async findBySlug(slug: string): Promise<Timeline | null> {
    const entity = await this.timelines.findOneBy({ slug });
    return entity ? this.toDomain(entity) : null;
  }

  async findItems(timelineId: string): Promise<TimelineItemRecord[]> {
    const entities = await this.items.find({ where: { timelineId }, order: { position: 'ASC' } });
    return entities.map((e) => this.toItemRecord(e));
  }

  async findAllItems(): Promise<TimelineItemRecord[]> {
    const entities = await this.items.find({ order: { timelineId: 'ASC', position: 'ASC' } });
    return entities.map((e) => this.toItemRecord(e));
  }

  async findItem(timelineId: string, itemId: string): Promise<TimelineItemRecord | null> {
    const entity = await this.items.findOneBy({ id: itemId, timelineId });
    return entity ? this.toItemRecord(entity) : null;
  }

  async upsertBySlug(timeline: Omit<Timeline, 'id'>): Promise<Timeline> {
    const existing = await this.timelines.findOneBy({ slug: timeline.slug });
    const saved = await this.timelines.save(
      existing ? this.timelines.merge(existing, timeline) : this.timelines.create(timeline),
    );
    return this.toDomain(saved);
  }

  async replaceItems(timelineId: string, items: TimelineSeedItem[]): Promise<void> {
    await this.items.manager.transaction(async (manager) => {
      await manager.delete(TimelineItemEntity, { timelineId });
      await manager.insert(
        TimelineItemEntity,
        items.map((item) => ({ ...item, timelineId })),
      );
    });
  }

  async removeBySlug(slug: string): Promise<void> {
    const timeline = await this.timelines.findOneBy({ slug });
    if (!timeline) {
      return;
    }
    await this.timelines.manager.transaction(async (manager) => {
      await manager.delete(TimelineItemEntity, { timelineId: timeline.id });
      await manager.delete(TimelineEntity, { id: timeline.id });
    });
  }

  private toDomain(entity: TimelineEntity): Timeline {
    return {
      id: entity.id,
      slug: entity.slug,
      name: entity.name,
      description: entity.description,
      posterPath: entity.posterPath,
      position: entity.position,
    };
  }

  private toItemRecord(entity: TimelineItemEntity): TimelineItemRecord {
    return {
      id: entity.id,
      timelineId: entity.timelineId,
      position: entity.position,
      section: entity.section,
      itemType: entity.itemType as TimelineItemType,
      tmdbId: entity.tmdbId,
      seasonNumber: entity.seasonNumber,
      title: entity.title,
      posterPath: entity.posterPath,
      releaseDate: entity.releaseDate,
    };
  }
}
