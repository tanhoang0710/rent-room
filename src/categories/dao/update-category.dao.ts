import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';
import { CreateCategoryDto } from './create-category.dao';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsOptional()
  @MaxLength(4)
  @ApiProperty({ example: 'CTCH' })
  code: string;

  @IsOptional()
  @ApiProperty({ example: 'Cho thuê căn hộ' })
  @MaxLength(255)
  value: string;

  @IsOptional()
  @ApiProperty({ example: 'Cho thuê căn hộ' })
  @MaxLength(255)
  subtitle: string;
}
