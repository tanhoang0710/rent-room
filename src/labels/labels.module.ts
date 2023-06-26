import { Module } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';
import { Label } from './entities/label.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Label])],
  providers: [LabelsService],
  controllers: [LabelsController],
  exports: [LabelsService],
})
export class LabelsModule {}
