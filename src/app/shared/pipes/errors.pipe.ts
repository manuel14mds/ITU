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
      errorMessages.push('Campo es requerido');
    }

    if ('email' in value) {
      errorMessages.push('Correo invalido');
    }

    return errorMessages.join('. ');
  }

}
