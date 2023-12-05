import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/model/student';

import { StudentsService } from '../../students.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ConfirmDialogService } from 'src/app/shared/confirm/confirm-dialog.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent {
  userRole: string = ''
  students: Student[] = []
  studentSubs: Subscription
  roleSubscription: Subscription

  constructor(
    private studentService: StudentsService,
    private authService: AuthService,
    private confirmService: ConfirmDialogService,
  ) {
    this.roleSubscription = this.authService.authUser$.subscribe(value => {
      if (value) {
        this.userRole = value.role
      }
    })

    this.studentSubs = this.studentService.getStudents().subscribe(list => this.students = list)

  }

  ngOnDestroy() {
    this.roleSubscription.unsubscribe()
    this.studentSubs.unsubscribe()
  }

  changeStatus(student:Student):void{
    const dataConfirm = {
      title: 'Confirm',
      message: 'Are you sure to edit this student status?',
    }

    this.confirmService.openConfirmDialog(dataConfirm).subscribe((result) => {
      if(result){
        this.studentService.switchStudentStatus(student)
      }
    })
  }

  @Output()
  switchStudentStatus = new EventEmitter<Student>()

  @Output()
  editStudent = new EventEmitter<Student>()

  displayedColumns = ['DNI', 'name', 'age', 'email', 'active', 'actions'];
}
