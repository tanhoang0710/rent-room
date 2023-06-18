import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ example: 'tanhun' })
  name: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
    minLowercase: 1,
  })
  @ApiProperty({ example: 'Tanhun123' })
  password: string;

  @IsNotEmpty()
  @IsMobilePhone('vi-VN')
  @ApiProperty({ example: '0987256698' })
  phone: string;

  refreshToken: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'tanhoang0710@gmail.com' })
  email: string;
}
