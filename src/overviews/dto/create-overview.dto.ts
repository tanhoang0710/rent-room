import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateOverviewDto {
  @IsNotEmpty()
  @MaxLength(255)
  target: string;

  @IsNotEmpty()
  @MaxLength(255)
  bonus: string;

  @IsNotEmpty()
  @MaxLength(7)
  code: string;

  @IsNotEmpty()
  @MaxLength(255)
  area: string;

  @IsNotEmpty()
  @MaxLength(255)
  type: string;
}
