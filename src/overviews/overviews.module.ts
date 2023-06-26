import { Module } from '@nestjs/common';
import { OverviewsController } from './overviews.controller';
import { OverviewsService } from './overviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Overview } from './entities/overview.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Overview])],
  controllers: [OverviewsController],
  providers: [OverviewsService],
  exports: [OverviewsService],
})
export class OverviewsModule {}
