import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(REQUEST) private request: Request,
  ) {}

  async sendMailWhenSignUp(to: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to my website',
      template: `${path.join(__dirname, '../../mail/templates')}/welcome`,
      context: {
        title: 'Welcome',
        app_name: 'Rent room',
        text1:
          'Your email was provided for registration on Rent room and you were successfully registered.',
        url: 'http://localhost:3000/api-docs',
        actionTitle:
          'After that, please, go to http://localhost:3000/api-docs where you can login into the system.',
      },
    });
  }

  async sendForgotPasswordToken(to: string, resetPasswordToken: string) {
    const resetURL = `${this.request.protocol}://${this.request.get(
      'host',
    )}/api/v1/users/reset-password/${resetPasswordToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and password confirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`;

    await this.mailerService.sendMail({
      to,
      subject: 'Your password reset token (valid for 10 mins)',
      template: `${path.join(
        __dirname,
        '../../mail/templates',
      )}/forgot-password`,
      context: {
        text: message,
      },
    });
  }
}
