import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, MaxLength } from 'class-validator';
import { TARGETS } from 'src/common/enum/targets.enum';

export class UpdatePostDto {
  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ example: 'title' })
  title?: string;

  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ example: 'label' })
  labelValue?: string;

  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ example: 'address' })
  address?: string;

  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({ example: 1 })
  price?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1 })
  arcreage?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1 })
  categoryId?: number;

  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ example: 'description' })
  description?: string;

  @IsOptional()
  @ApiProperty({
    enum: TARGETS,
    isArray: false,
    example: TARGETS.ALL,
  })
  overiewTarget?: string;

  @IsOptional()
  @MaxLength(255)
  @ApiProperty({
    example: 'bonus',
  })
  overviewBonus?: string;
}
