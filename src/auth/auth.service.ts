import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getTokens(
    userId: number,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId },
        {
          expiresIn: 60 * 15,
          secret: this.configService.get<string>('JWT_ACCESS'),
        },
      ),
      this.jwtService.signAsync(
        { sub: userId },
        {
          expiresIn: '7d',
          secret: this.configService.get<string>('JWT_REFRESH'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const user = await this.userService.createUser({
      ...signUpDto,
      refreshToken: null,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = await this.getTokens(user.id);
    await this.userService.updateRefeshToken(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findOneByPhone(signInDto.phone);

    if (!user) throw new NotFoundException('No user found with that phone');
    const isSamePassword = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isSamePassword) throw new UnauthorizedException('Bad credential');
    const { accessToken, refreshToken } = await this.getTokens(user.id);
    await this.userService.updateRefeshToken(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userID: number) {
    return await this.userService.deleteRefreshToken(userID);
  }

  async refreshAccessToken(userID: number): Promise<{ accessToken: string }> {
    const newAccessToken = await this.jwtService.signAsync(
      { sub: userID },
      {
        expiresIn: 60 * 15,
        secret: this.configService.get<string>('JWT_ACCESS'),
      },
    );
    return { accessToken: newAccessToken };
  }
}
