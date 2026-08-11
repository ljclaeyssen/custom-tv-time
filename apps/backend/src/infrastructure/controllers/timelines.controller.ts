import { Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { TimelineDetail, TimelineSummary } from '../../domain/models/timeline.model';
import { RetrieveTimelineDetailUseCase } from '../../use-cases/retrieve-timeline-detail.use-case';
import { RetrieveTimelinesUseCase } from '../../use-cases/retrieve-timelines.use-case';
import { WatchTimelineItemUseCase } from '../../use-cases/watch-timeline-item.use-case';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthenticatedUser, JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('timelines')
@UseGuards(JwtAuthGuard)
export class TimelinesController {
  constructor(
    private readonly retrieveTimelines: RetrieveTimelinesUseCase,
    private readonly retrieveTimelineDetail: RetrieveTimelineDetailUseCase,
    private readonly watchTimelineItem: WatchTimelineItemUseCase,
  ) {}

  @Get()
  all(@CurrentUser() user: AuthenticatedUser): Promise<TimelineSummary[]> {
    return this.retrieveTimelines.execute(user.userId);
  }

  @Get(':slug')
  detail(
    @CurrentUser() user: AuthenticatedUser,
    @Param('slug') slug: string,
  ): Promise<TimelineDetail> {
    return this.retrieveTimelineDetail.execute(user.userId, slug);
  }

  @Post(':slug/items/:itemId/watch')
  @HttpCode(204)
  async watchItem(
    @CurrentUser() user: AuthenticatedUser,
    @Param('slug') slug: string,
    @Param('itemId') itemId: string,
  ): Promise<void> {
    await this.watchTimelineItem.execute(user.userId, slug, itemId);
  }
}
