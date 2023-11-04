import { Component } from '@angular/core';
import { StudentType } from 'src/app/shared/types.s';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent {
  studentList: StudentType[] = []
  constructor(public studentsService:StudentsService) {
    
  }

}
