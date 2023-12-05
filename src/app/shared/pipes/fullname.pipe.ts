import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/model/student';
import { Teacher } from 'src/app/model/teacher';

@Pipe({
  name: 'fullname',
  pure: false
})
export class FullnamePipe implements PipeTransform {

  transform(value: Student|Teacher |undefined, ...args: unknown[]): unknown {
    if(value){
      return `${value.firstName} ${value.lastName}`;
    }
    return ''
  }

}
