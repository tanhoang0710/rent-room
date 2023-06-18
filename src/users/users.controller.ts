import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwtAccessToken.guard';
import { UserIsUserGuard } from 'src/common/guards/userIsUser.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':email/update-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserIsUserGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'email',
    example: 'tanhoang0710@gmail.com',
  })
  // chi user do ms dc doi pass cua minh va da dang nhap
  async updatePassword(
    @Param('email') email: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.usersService.updatePassword(email, updatePasswordDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    return await this.usersService.forgotPassword(forgotPassword.email);
  }
}
