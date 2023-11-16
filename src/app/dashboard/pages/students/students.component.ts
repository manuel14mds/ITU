import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Student } from 'src/app/model/student';

import { StudentsService } from './students.service';
import { StudentDialogComponent } from './utilComponents/student-dialog/student-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent {

  constructor(
    public studentsService:StudentsService,
    private matDialog: MatDialog,
    private toast: NgToastService
    ) {
  }

  openStudentDialog(): void {
    this.matDialog.open(StudentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            let payload={
                DNI:value.DNI,
                firstName: value.firstName,
                lastName: value.lastName,
                age: value.age,
                email: value.email,
                active: (value.active === 'true' ? true : false),
                courses:[]
              }

              this.studentsService.addStudent(payload)

            /* if (student) {
              //notification
              this.studentList = [...persistenceFactory.StudentManager.getStudents()]
              this.toast.success({ detail: 'Success', summary: `Student ${student.firstName} added sucessfully`, duration: 4000 })
            } else {
              //notification
              this.toast.error({ detail: 'Error', summary: "Couldn't add new student" })
            } */
          }
        }
      }
      )
  }

  onEditStudent(student: Student): void {
    this.matDialog.open(StudentDialogComponent, {
      data: student
    })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            if (confirm('Está seguro que quiere editar los datos del estudiante?')) {
              value.active = (value.active === 'true' ? true : false)
              this.studentsService.updateStudent(student.id, value)
              
              /* if (response) {
                //notification
                this.studentList = [...persistenceFactory.StudentManager.getStudents()]
                this.toast.success({ detail: 'Success', summary: `Student ${value.firstName} set sucessfully`, duration: 4000 })
              } else {
                //notification
                this.toast.error({ detail: 'Error', summary: "Couldn't update student" })
              } */
            }

          }
        },
      });
  }

}
