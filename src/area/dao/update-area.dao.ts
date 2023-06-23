import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';
import { CreateAreaDto } from './create-area.dao';

export class UpdateAreaDto extends PartialType(CreateAreaDto) {
  @IsOptional()
  @MaxLength(4)
  @ApiProperty({ example: '3AQ3' })
  code: string;

  @IsOptional()
  @ApiProperty({ example: 'Từ 20m2 - 30m2' })
  @MaxLength(255)
  value: string;
}
