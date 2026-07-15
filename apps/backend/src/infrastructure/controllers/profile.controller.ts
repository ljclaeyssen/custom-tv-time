import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProfileStats } from '../../domain/models/progress.model';
import { ImportReport } from '../../domain/models/tvtime-export.model';
import { User } from '../../domain/models/user.model';
import { ImportTvtimeExportUseCase } from '../../use-cases/import-tvtime-export.use-case';
import { RetrieveCurrentUserUseCase } from '../../use-cases/retrieve-current-user.use-case';
import { RetrieveProfileStatsUseCase } from '../../use-cases/retrieve-profile-stats.use-case';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('me')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private readonly retrieveCurrentUser: RetrieveCurrentUserUseCase,
    private readonly retrieveProfileStats: RetrieveProfileStatsUseCase,
    private readonly importTvtimeExport: ImportTvtimeExportUseCase,
  ) {}

  @Get()
  async me(@CurrentUser() user: { userId: string }): Promise<{ user: User; stats: ProfileStats }> {
    const [profile, stats] = await Promise.all([
      this.retrieveCurrentUser.execute(user.userId),
      this.retrieveProfileStats.execute(user.userId),
    ]);
    return { user: profile, stats };
  }

  @Post('import/tvtime')
  importTvtime(@CurrentUser() user: { userId: string }): Promise<ImportReport> {
    return this.importTvtimeExport.execute(user.userId);
  }
}
