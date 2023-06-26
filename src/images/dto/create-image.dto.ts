import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  @MaxLength(255)
  image: string;
}
