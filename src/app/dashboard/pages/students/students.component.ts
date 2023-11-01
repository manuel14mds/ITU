import { Component } from '@angular/core';
import { StudentType } from 'src/app/shared/types.s';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  studentList:StudentType[]=[] as StudentType[]
}
