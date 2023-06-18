import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsOptional, MaxLength } from 'class-validator';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

export class UpdateUserDto extends OmitType(PartialType(SignUpDto), [
  'password',
  'refreshToken',
]) {
  @IsOptional()
  @MaxLength(50)
  @ApiProperty({ example: 'tanhun' })
  name?: string;

  @IsOptional()
  @IsMobilePhone('vi-VN')
  @ApiProperty({ example: '0987256698' })
  phone?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'tanhoang0710@gmail.com' })
  email?: string;
}
