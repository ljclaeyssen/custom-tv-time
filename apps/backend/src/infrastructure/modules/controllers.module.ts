import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { CatalogController } from '../controllers/catalog.controller';
import { MoviesController } from '../controllers/movies.controller';
import { ProfileController } from '../controllers/profile.controller';
import { ShowsController } from '../controllers/shows.controller';
import { TimelinesController } from '../controllers/timelines.controller';
import { UseCasesModule } from './use-cases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [
    AuthController,
    ProfileController,
    ShowsController,
    MoviesController,
    CatalogController,
    TimelinesController,
  ],
})
export class ControllersModule {}
