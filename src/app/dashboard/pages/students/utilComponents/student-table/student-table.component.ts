import { Component, EventEmitter, Output } from '@angular/core';
import { Student } from 'src/app/model/student';
import { StudentsService } from '../../students.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent {
  students:Student[]=[]
  studentSubs:Subscription

  constructor(private studentService: StudentsService) { 
    this.studentSubs = this.studentService.getStudents().subscribe(list => this.students = list)
  }

  ngOnDestroy(){
    this.studentSubs.unsubscribe()
  }

  @Output()
  switchStudentStatus = new EventEmitter<Student>()

  @Output()
  editStudent = new EventEmitter<Student>()
  
  displayedColumns = ['id', 'name', 'age', 'email', 'active', 'actions'];
}
