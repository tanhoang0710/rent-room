import { TARGETS } from './../../common/enum/targets.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ example: 'title' })
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ example: 'label' })
  labelValue: string;

  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ example: 'address' })
  address: string;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({ example: 1 })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  arcreage: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  categoryId: number;

  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ example: 'description' })
  description: string;

  @IsNotEmpty()
  @ApiProperty({
    enum: TARGETS,
    isArray: false,
    example: TARGETS.ALL,
  })
  overiewTarget: string;

  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    example: 'bonus',
  })
  overviewBonus: string;

  @IsNotEmpty()
  @MaxLength(9999)
  @ApiProperty({
    example: 'image',
  })
  image: string;
}
