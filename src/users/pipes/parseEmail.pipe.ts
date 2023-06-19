import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';

export class ParseEmailPipe implements PipeTransform {
  transform(value: string) {
    const checkIsEmail = isEmail(value);
    if (!checkIsEmail) throw new BadRequestException('Email is not valid!');
    return value;
  }
}
