import { Pipe, PipeTransform } from '@angular/core';
import { StudentType, TeacherType } from '../types.s';

@Pipe({
  name: 'fullname',
  pure: false
})
export class FullnamePipe implements PipeTransform {

  transform(value: StudentType|TeacherType, ...args: unknown[]): unknown {

    return `${value.firstName} ${value.lastName}`;
  }

}
