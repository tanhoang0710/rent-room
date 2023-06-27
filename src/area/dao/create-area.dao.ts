import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength, Validate } from 'class-validator';
import { CustomValidatorMaxGreaterThanMin } from 'src/common/validators/max-greater-than-min.validator';

export class CreateAreaDto {
  @IsNotEmpty()
  @MaxLength(4)
  @ApiProperty({ example: '3AQ3' })
  code: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Từ 20m2 - 30m2' })
  @MaxLength(255)
  value: string;

  @IsNotEmpty()
  @ApiProperty({ example: 20 })
  @IsNumber()
  min: number;

  @IsNotEmpty()
  @ApiProperty({ example: 30 })
  @IsNumber()
  @Validate(CustomValidatorMaxGreaterThanMin, {
    message: 'max must be greater than min',
  })
  max: number;
}
