import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    const dbUser = this.configService.get<string>('DB_USERNAME');
    console.log(
      '🚀 ~ file: app.controller.ts:15 ~ AppController ~ getHello ~ dbUser:',
      dbUser,
    );
    return this.appService.getHello();
  }

  @Post()
  insert(): void {
    this.appService.insert();
  }
}
