import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @MaxLength(4)
  @ApiProperty({ example: 'CTCH' })
  code: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Cho thuê căn hộ' })
  @MaxLength(255)
  value: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Cho thuê căn hộ' })
  @MaxLength(255)
  subtitle: string;
}
