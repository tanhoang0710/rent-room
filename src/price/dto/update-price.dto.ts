import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, MaxLength, Validate } from 'class-validator';
import { CreatePriceDto } from './create-price.dto';
import { CustomValidatorMaxGreaterThanMin } from 'src/common/validators/max-greater-than-min.validator';

export class UpdatePriceDto extends PartialType(CreatePriceDto) {
  @IsOptional()
  @MaxLength(4)
  @ApiProperty({ example: 'Q9LC' })
  code: string;

  @IsOptional()
  @ApiProperty({ example: 'Từ 100 - 200 triệu' })
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
