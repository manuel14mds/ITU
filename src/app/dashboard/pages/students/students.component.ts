import { Component } from '@angular/core';
import { StudentsService } from './students.service';
import { Student } from 'src/app/model/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent {
  studentList: Student[] = []
  constructor(public studentsService:StudentsService) {
    
  }

}
