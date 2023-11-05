import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from 'src/app/model/student';
import { StudentType } from 'src/app/shared/types.s';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent {
  students:Student[]=[]

  constructor(private studentService: StudentsService) { }

  ngOnInit():void{
    this.studentService.getStudents().subscribe(list=> this.students = list)
  }
  @Output()
  switchStudentStatus = new EventEmitter<Student>()

  @Output()
  editStudent = new EventEmitter<Student>()
  
  displayedColumns = ['id', 'name', 'age', 'email', 'active', 'actions'];
}
