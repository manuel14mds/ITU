import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { StudentDialogComponent } from './utilComponents/student-dialog/student-dialog.component';
import persistenceFactory from 'src/DAO/factory';
import { StudentType } from 'src/app/shared/types.s';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  studentList: StudentType[] = []

  constructor(
    private matDialog: MatDialog,
    private toast: NgToastService,
  ) { this.studentList = [...persistenceFactory.StudentManager.getStudents()] }

  openStudentDialog(): void {
    this.matDialog.open(StudentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            let student = persistenceFactory.StudentManager.create(
              {
                firstName: value.firstName,
                lastName: value.lastName,
                active: value.active,
                email: value.email,
                age: value.age,
              }
            )
            if (student) {
              //notification
              this.studentList = [...persistenceFactory.StudentManager.getStudents()]
              this.toast.success({ detail: 'Success', summary: `Student ${student.firstName} added sucessfully`, duration: 4000 })
            } else {
              //notification
              this.toast.error({ detail: 'Error', summary: "Couldn't add new student" })
            }
          }
        }
      }
      )
  }


  onEditStudent(student: StudentType): void {
    this.matDialog.open(StudentDialogComponent, {
      data: student
    })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            if (confirm('Está seguro que quiere editar los datos del estudiante?')) {
              let response = persistenceFactory.StudentManager.updateStudent(student.id, value)
              if (response) {
                //notification
                this.studentList = [...persistenceFactory.StudentManager.getStudents()]
                this.toast.success({ detail: 'Success', summary: `Student ${value.firstName} set sucessfully`, duration: 4000 })
              } else {
                //notification
                this.toast.error({ detail: 'Error', summary: "Couldn't update student" })
              }
            }

          }
        },
      });
  }

  /* onEditStudent(student: StudentType): void {} */

  switchStudentStatus(studentId: number): void {
    if (confirm('Quiere cambiar el estado del estudiante?')) {
      this.studentList.forEach((element) => {
        if (element.id === studentId) {
          element.active = !element.active

          //notification
          this.toast.success({ detail: 'Success', summary: `Set ${element.active ? 'active' : 'inactive'} student status!`, duration: 4000 })
        }
      })
    }
  }
}
