import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class StarPostDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ example: '5' })
  star: string;
}
