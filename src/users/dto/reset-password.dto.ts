import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
    minLowercase: 1,
  })
  @ApiProperty({ example: 'Test123456' })
  newPassword: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
    minLowercase: 1,
  })
  @ApiProperty({ example: 'Test123456' })
  newPasswordConfirm: string;
}
