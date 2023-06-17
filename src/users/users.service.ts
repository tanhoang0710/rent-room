import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(signUpDto: SignUpDto): Promise<User> {
    return await this.userRepository.save(signUpDto);
  }

  async updateRefeshToken(userID: number, refreshToken: string) {
    return await this.userRepository.update(userID, { refreshToken });
  }

  async findOneByPhone(phone: string): Promise<User> {
    return await this.userRepository.findOneBy({
      phone,
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({
      id,
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
}
