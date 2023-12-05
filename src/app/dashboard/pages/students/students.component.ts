import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Student } from 'src/app/model/student';

import { StudentsService } from './students.service';
import { StudentDialogComponent } from './utilComponents/student-dialog/student-dialog.component';
import { ConfirmDialogService } from 'src/app/shared/confirm/confirm-dialog.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent {

  constructor(
    public studentsService: StudentsService,
    private matDialog: MatDialog,
    private toast: NgToastService,
    private confirmService: ConfirmDialogService,
  ) {
  }

  openStudentDialog(): void {
    this.matDialog.open(StudentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            let payload = {
              DNI: value.DNI,
              firstName: value.firstName,
              lastName: value.lastName,
              age: Number(value.age),
              email: value.email,
              active: (value.active === 'true' ? true : false),
              courses: []
            }

            this.studentsService.addStudent(payload)
              .then((documentReference) => {
                if (documentReference) {
                  this.toast.success({ detail: 'Success', summary: `Student added successfully`, duration: 4000 })
                } else {
                  this.toast.error({ detail: 'Error', summary: "Couldn't add new student" })
                }
              })
              .catch((error) => {
                console.error('Error adding student:', error);
                this.toast.error({ detail: 'Error', summary: "Couldn't add new student" })
              });


          }
        }
      }
      )
  }


  onEditStudent(student: Student) {
    this.studentsService.getStudentById(student.id).subscribe((originalStudent) => {
      const updatedStudent = { ...originalStudent, ...student };
      this.openEditDialog(updatedStudent);
    });
  }

  openEditDialog(student: Student) {
    const dialogRef = this.matDialog.open(StudentDialogComponent, {
      data: student,
    });

    dialogRef.afterClosed().subscribe((updatedStudent) => {
      const dataConfirm = {
        title: 'Confirm',
        message: 'Are you sure to edit this student?',
      }

      this.confirmService.openConfirmDialog(dataConfirm).subscribe((result) => {

        if (result && updatedStudent) {
          updatedStudent.age = Number(updatedStudent.age)
          updatedStudent.active = ((updatedStudent.active === 'true' || true) ? true : false)
          this.studentsService.updateStudent(student.id, updatedStudent);
        }
      })
    })

  }

  /* onEditStudent(student: Student){
    this.matDialog.open(StudentDialogComponent, {
      data: student
    })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            if (confirm('Está seguro que quiere editar los datos del estudiante?')) {
              value.age = Number(value.age)
              value.active = (value.active === 'true' ? true : false)
              this.studentsService.updateStudent(student.id, value)
              
              //if (response) {
                //notification
              //  this.studentList = [...persistenceFactory.StudentManager.getStudents()]
              //  this.toast.success({ detail: 'Success', summary: `Student ${value.firstName} set sucessfully`, duration: 4000 })
              //} else {
                //notification
                //this.toast.error({ detail: 'Error', summary: "Couldn't update student" })
              //}
            }

          }
        },
      });
  } */

}
