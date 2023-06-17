import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsMobilePhone('vi-VN')
  @ApiProperty({ example: '0987256698' })
  phone: string;

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
}
