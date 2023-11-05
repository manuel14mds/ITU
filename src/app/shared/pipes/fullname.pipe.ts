import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/model/student';
import { Teacher } from 'src/app/model/teacher';

@Pipe({
  name: 'fullname',
  pure: false
})
export class FullnamePipe implements PipeTransform {

  transform(value: Student|Teacher, ...args: unknown[]): unknown {

    return `${value.firstName} ${value.lastName}`;
  }

}
