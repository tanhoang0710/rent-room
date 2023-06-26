import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateAttributeDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  arcreage: number;

  @IsNotEmpty()
  @MaxLength(6)
  hashtag: string;

  @IsNotEmpty()
  @MaxLength(6)
  published: string;
}
