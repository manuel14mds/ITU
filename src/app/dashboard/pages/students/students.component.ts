import { Component } from '@angular/core';

import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent {

  constructor(public studentsService:StudentsService) {
  }

}
