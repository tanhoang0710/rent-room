import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {
    const x = {
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      port: +process.env.DB_PORT,
    };
    console.log('🚀 ~ file: data-source.ts:17 ~ x:', x);
  }

  @Get()
  getHello(): string {
    const dbUser = this.configService.get<string>('DB_USERNAME');
    console.log(
      '🚀 ~ file: app.controller.ts:15 ~ AppController ~ getHello ~ dbUser:',
      dbUser,
    );
    return this.appService.getHello();
  }
}
