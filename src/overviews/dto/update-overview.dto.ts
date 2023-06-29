import { PartialType } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';
import { CreateOverviewDto } from './create-overview.dto';

export class UpdateOverviewDto extends PartialType(CreateOverviewDto) {
  @IsOptional()
  @MaxLength(255)
  target?: string;

  @IsOptional()
  @MaxLength(255)
  bonus?: string;

  @IsOptional()
  @MaxLength(7)
  code?: string;

  @IsOptional()
  @MaxLength(255)
  area?: string;

  @IsOptional()
  @MaxLength(255)
  type?: string;
}
