import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';
import { CreatePriceDto } from './create-price.dto';

export class UpdatePriceDto extends PartialType(CreatePriceDto) {
  @IsOptional()
  @MaxLength(4)
  @ApiProperty({ example: 'Q9LC' })
  code: string;

  @IsOptional()
  @ApiProperty({ example: 'Từ 100 - 200 triệu' })
  @MaxLength(255)
  value: string;
}
