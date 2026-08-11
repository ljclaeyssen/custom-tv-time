import { Module } from '@nestjs/common';
import { TimelinesSeeder } from '../seeds/timelines-seeder';
import { UseCasesModule } from './use-cases.module';

@Module({
  imports: [UseCasesModule],
  providers: [TimelinesSeeder],
})
export class SeedsModule {}
