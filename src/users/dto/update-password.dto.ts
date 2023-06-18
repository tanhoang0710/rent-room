import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

export class UpdatePasswordDto extends OmitType(PartialType(SignUpDto), [
  'name',
  'refreshToken',
  'email',
  'phone',
]) {
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
}
