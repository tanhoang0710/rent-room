import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ example: 'title' })
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ example: 'label' })
  label: string;
}
