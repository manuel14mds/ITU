import { Injectable } from '@angular/core';
import { TeacherDialogComponent } from './utilComponents/teacher-dialog/teacher-dialog.component';
import persistenceFactory from 'src/DAO/factory';
import { TeacherType } from 'src/app/shared/types.s';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  teacherList: TeacherType[] = []

  constructor(private matDialog: MatDialog, private toast: NgToastService) {
    this.teacherList = [...persistenceFactory.TeacherManager.getTeachers()]
  }

  openTeacherDialog(): void {
    this.matDialog.open(TeacherDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            let teacher = persistenceFactory.TeacherManager.create(
              {
                firstName: value.firstName,
                lastName: value.lastName,
                active: value.active,
                email: value.email,
                age: value.age,
                profession: value.profession,
              }
            )
            if (teacher) {
              this.teacherList = [...persistenceFactory.TeacherManager.getTeachers()]
              //notification
              this.toast.success({ detail: 'Success', summary: `Teacher ${teacher.firstName} added sucessfully`, duration: 4000 })
            } else {
              //notification
              this.toast.error({ detail: 'Error', summary: "Couldn't add new teacher" })

            }
          }
        }
      }
      )
  }


  onEditTeacher(teacher: TeacherType): void {
    this.matDialog.open(TeacherDialogComponent, {
      data: teacher
    })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            if (confirm('Está seguro que quiere editar los datos del profesor?')) {
              let response = persistenceFactory.TeacherManager.updateTeacher(teacher.id, value)
              if (response) {
                this.teacherList = [...persistenceFactory.TeacherManager.getTeachers()]
                //notification
                this.toast.success({ detail: 'Success', summary: `Teacher ${teacher.firstName} set sucessfully`, duration: 4000 })
              } else {
                //notification
                this.toast.error({ detail: 'Error', summary: "Couldn't update teacher" })
              }
            }

          }
        },
      });
  }

  switchTeacherStatus(teacherId: number): void {
    if (confirm('Quiere cambiar el estado del profesor?')) {
      this.teacherList.forEach((element) => {
        if (element.id === teacherId) {
          element.active = !element.active

          //notification
          this.toast.success({ detail: 'Success', summary: `Set ${element.active ? 'active' : 'inactive'} teacher status!`, duration: 4000 })
        }
      })
    }
  }

}
