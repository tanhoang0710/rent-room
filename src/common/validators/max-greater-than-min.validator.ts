import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class CustomValidatorMaxGreaterThanMin
  implements ValidatorConstraintInterface
{
  validate(value: number, validationArguments: ValidationArguments) {
    console.log(
      '🚀 ~ file: max-greater-than-min.validator.ts:12 ~ validate ~ validationArguments:',
      validationArguments,
    );
    return value > validationArguments.object['min'];
  }
}
