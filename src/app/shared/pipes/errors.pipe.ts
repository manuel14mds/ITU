import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errors'
})
export class ErrorsPipe implements PipeTransform {

  transform(
    value: ValidationErrors | null | undefined,
    ...args: unknown[]
  ): unknown {
    if (!value) return '';

    const errorMessages: string[] = [];

    if ('required' in value) {
      errorMessages.push('requided field');
    }
    if ('min' in value) {
      errorMessages.push('wrong amount');
    }
    if ('max' in value) {
      errorMessages.push('wrong amount');
    }

    if ('pattern' in value) {
      switch (value['pattern'].requiredPattern) {
        case "/^[^\\s]+$/":
          errorMessages.push('not spaces allow');
          break;

        case "^[0-9]+$":
          errorMessages.push('not letters allow');
          break;

        case "/^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z]{2,7}$/":
          errorMessages.push('email address invalid');
          break;
      }

    }

    if ('email' in value) {
      errorMessages.push('wrong email');
    }

    return errorMessages.join('. ');
  }

}
