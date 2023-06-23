import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAreaDto {
  @IsNotEmpty()
  @MaxLength(4)
  @ApiProperty({ example: '3AQ3' })
  code: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Từ 20m2 - 30m2' })
  @MaxLength(255)
  value: string;
}
