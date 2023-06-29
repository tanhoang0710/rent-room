import { PartialType } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';
import { CreateImageDto } from './create-image.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {
  @IsOptional()
  @MaxLength(255)
  image?: string;
}
