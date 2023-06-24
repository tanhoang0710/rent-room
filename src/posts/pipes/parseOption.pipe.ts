import { BadRequestException, PipeTransform } from '@nestjs/common';
import { matches } from 'class-validator';
import { ICondition } from '../interface/condition.interface';

export class ParseOptionPipe implements PipeTransform {
  transform(value: string): ICondition {
    const check1 = matches(
      value,
      /\{"price": \{"min": \d+, "max": \d+\}, "arcreage": \{"min": \d+, "max": \d+\}\}/,
    );
    const check2 = matches(value, /\{"arcreage": \{"min": \d+, "max": \d+\}\}/);
    const check3 = matches(value, /\{"price": \{"min": \d+, "max": \d+\}\}/);
    if (check1 || check2 || check3) return JSON.parse(value);
    throw new BadRequestException('Value is not valid!');
  }
}
