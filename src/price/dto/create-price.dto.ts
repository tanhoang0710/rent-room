import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePriceDto {
  @IsNotEmpty()
  @MaxLength(4)
  @ApiProperty({ example: 'Q9LC' })
  code: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Từ 100 - 200 triệu' })
  @MaxLength(255)
  value: string;
}
