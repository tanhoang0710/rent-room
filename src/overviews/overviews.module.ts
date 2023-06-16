import { Module } from '@nestjs/common';
import { OverviewsController } from './overviews.controller';
import { OverviewsService } from './overviews.service';

@Module({
  controllers: [OverviewsController],
  providers: [OverviewsService]
})
export class OverviewsModule {}
