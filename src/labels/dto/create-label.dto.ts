import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateLableDto {
  @IsNotEmpty()
  @MaxLength(4)
  code: string;

  @IsNotEmpty()
  @MaxLength(255)
  value: string;
}
