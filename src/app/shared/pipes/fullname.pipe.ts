import { Pipe, PipeTransform } from '@angular/core';
import { StudentType } from '../types.s';

@Pipe({
  name: 'fullname',
  pure: false
})
export class FullnamePipe implements PipeTransform {

  transform(value: StudentType, ...args: unknown[]): unknown {

    return `${value.firstName} ${value.lastName}`;
  }

}
