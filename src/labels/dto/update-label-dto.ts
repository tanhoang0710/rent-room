import { PartialType } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';
import { CreateLableDto } from './create-label.dto';

export class UpdateLableDto extends PartialType(CreateLableDto) {
  @IsOptional()
  @MaxLength(4)
  code?: string;

  @IsOptional()
  @MaxLength(255)
  value?: string;
}
