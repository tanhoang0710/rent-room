import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, MoreThan, Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';
import * as moment from 'moment';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async createUser(signUpDto: SignUpDto): Promise<User> {
    return await this.userRepository.save(signUpDto);
  }

  async updateRefeshToken(userID: number, refreshToken: string) {
    return await this.userRepository.update(userID, { refreshToken });
  }

  async findOne(options: FindOptionsWhere<User>): Promise<User | null> {
    return await this.userRepository.findOne({
      where: options,
    });
  }

  async findUserIfRefreshTokenMatches(
    id: number,
    refreshToken: string,
  ): Promise<User> {
    return await this.userRepository.findOneBy({
      id,
      refreshToken,
    });
  }

  async deleteRefreshToken(userID: number) {
    return await this.userRepository.update(userID, { refreshToken: null });
  }

  async updatePassword(email: string, updatePassword: UpdatePasswordDto) {
    const user = await this.findOne({ email });

    const isOldPasswordMatches = await bcrypt.compare(
      updatePassword.password,
      user.password,
    );

    if (!isOldPasswordMatches)
      throw new BadRequestException('Your old password is incorrect!');

    const newPasswordHashed = await bcrypt.hash(updatePassword.newPassword, 10);

    return await this.userRepository.update(
      { email },
      {
        password: newPasswordHashed,
      },
    );
  }

  async forgotPassword(email: string) {
    const user = await this.findOne({ email });

    if (!user) throw new BadRequestException();

    const resetPasswordToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordTokenHashed = crypto
      .createHash('sha256')
      .update(resetPasswordToken)
      .digest('hex');

    await this.userRepository.update(
      { email },
      {
        resetPasswordToken: resetPasswordTokenHashed,
        resetPasswordExpires: moment(new Date())
          .add(10, 'minutes')
          .format('YYYY-MM-DD hh:mm:ss'),
      },
    );

    await this.mailService.sendForgotPasswordToken(email, resetPasswordToken);
  }

  async resetPassword(
    resetPasswordToken: string,
    resetPasswordDto: ResetPasswordDto,
  ) {
    const resetPasswordTokenHashed = crypto
      .createHash('sha256')
      .update(resetPasswordToken)
      .digest('hex');

    const user = await this.findOne({
      resetPasswordToken: resetPasswordTokenHashed,
      resetPasswordExpires: MoreThan(new Date()),
    });

    if (!user) throw new BadRequestException('Token is not valid!');

    if (resetPasswordDto.newPassword !== resetPasswordDto.newPasswordConfirm)
      throw new BadRequestException(
        'New password and new password confirm must be equal!',
      );

    const newPasswordHashed = await bcrypt.hash(
      resetPasswordDto.newPassword,
      10,
    );

    return await this.userRepository.update(user.id, {
      password: newPasswordHashed,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });
  }

  async updateProfile(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    try {
      const user = await this.findOne({ id });

      if (!user) throw new NotFoundException('No user found with that ID');

      const result = await this.userRepository.update(id, updateUserDto);

      if (result.affected === 1) return true;

      throw new BadRequestException();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllUser(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      });
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });
    if (!user) throw new NotFoundException();
    return user;
  }
}
