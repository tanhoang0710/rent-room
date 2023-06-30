import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwtAccessToken.guard';
import { UserIsUserGuard } from 'src/common/guards/userIsUser.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ParseEmailPipe } from './pipes/parseEmail.pipe';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ROLES } from 'src/common/enum/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

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
    @Param('email', ParseEmailPipe) email: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.usersService.updatePassword(email, updatePasswordDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    return await this.usersService.forgotPassword(forgotPassword.email);
  }

  @Patch(':resetPasswordToken')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'resetPasswordToken',
    example: '5c1f0419336bdb651902cd708783c4',
  })
  async resetPassword(
    @Param('resetPasswordToken') resetPasswordToken: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.usersService.resetPassword(
      resetPasswordToken,
      resetPasswordDto,
    );
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('access-token')
  @UseGuards(UserIsUserGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiParam({
    name: 'id',
    example: '123',
  })
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    return await this.usersService.updateProfile(id, updateUserDto);
  }

  // chi admin moi co quyen getAll, user chi get dc minh
  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  @Roles(ROLES.ADMIN)
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUser();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    example: '123',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(UserIsUserGuard)
  @UseGuards(JwtAccessTokenGuard)
  async getOneUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getOne(id);
  }
}
