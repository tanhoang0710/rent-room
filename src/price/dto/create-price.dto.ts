import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength, Validate } from 'class-validator';
import { CustomValidatorMaxGreaterThanMin } from 'src/common/validators/max-greater-than-min.validator';

export class CreatePriceDto {
  @IsNotEmpty()
  @MaxLength(4)
  @ApiProperty({ example: 'Q9LC' })
  code: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Từ 100 - 200 triệu' })
  @MaxLength(255)
  value: string;

  @IsNotEmpty()
  @ApiProperty({ example: 100 })
  @IsNumber()
  min: number;

  @IsNotEmpty()
  @ApiProperty({ example: 200 })
  @IsNumber()
  @Validate(CustomValidatorMaxGreaterThanMin, {
    message: 'max must be greater than min',
  })
  max: number;
}
