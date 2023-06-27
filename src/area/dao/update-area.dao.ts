import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, MaxLength, Validate } from 'class-validator';
import { CreateAreaDto } from './create-area.dao';
import { CustomValidatorMaxGreaterThanMin } from 'src/common/validators/max-greater-than-min.validator';

export class UpdateAreaDto extends PartialType(CreateAreaDto) {
  @IsOptional()
  @MaxLength(4)
  @ApiProperty({ example: '3AQ3' })
  code: string;

  @IsOptional()
  @ApiProperty({ example: 'Từ 20m2 - 30m2' })
  @MaxLength(255)
  value: string;

  @IsOptional()
  @ApiProperty({ example: 20 })
  @IsNumber()
  min: number;

  @IsOptional()
  @ApiProperty({ example: 30 })
  @IsNumber()
  @Validate(CustomValidatorMaxGreaterThanMin, {
    message: 'max must be greater than min',
  })
  max: number;
}
