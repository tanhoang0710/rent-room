import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsNumber, MaxLength } from 'class-validator';
import { CreateAttributeDto } from './create-attribute.dto';

export class UpdateAttributeDto extends PartialType(CreateAttributeDto) {
  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  arcreage?: number;

  @IsOptional()
  @MaxLength(6)
  hashtag?: string;

  @IsOptional()
  @MaxLength(6)
  published?: string;
}
