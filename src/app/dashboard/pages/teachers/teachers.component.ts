import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeacherType } from 'src/app/shared/types.s';
import { TeacherDialogComponent } from './utilComponents/teacher-dialog/teacher-dialog.component';
import { NgToastService } from 'ng-angular-popup';

function updateValues(teacher: { [key: string]: any }, newData: { [key: string]: any }): object {
  for (const key in newData) {
    if (key !== 'id') {
      const newValue = newData[key];
      if (newValue !== null && newValue !== undefined && teacher[key] !== newValue) {
        teacher[key] = newValue;
      }
    }
  }
  return teacher
}


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {
  teacherList: TeacherType[] = []
  constructor(private matDialog: MatDialog, private toast: NgToastService) {
  }

  openTeacherDialog(): void {
    this.matDialog.open(TeacherDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            let id = 1
            // si hay profesores en la lista, se busca el id del último elemento 
            if (this.teacherList.length > 0) {
              id = (this.teacherList[length].id) + 1
            }

            this.teacherList = [
              {
                firstName: value.firstName,
                lastName: value.lastName,
                active: (value.active === 'true' ? true : false),
                email: value.email,
                age: value.age,
                profession: value.profession,
                courses: [],
                id: id
              },
              ...this.teacherList,
            ]
            //notification
            this.toast.success({ detail: 'Success', summary: `Teacher ${value.firstName} added sucessfully`, duration: 4000 })
          } else {
            //notification
            this.toast.error({ detail: 'Error', summary: "Couldn't add new teacher" })
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
              const newData = this.teacherList.map((item) => {
                if (item.id === teacher.id) {
                  value = updateValues(teacher, value)
                  item = { ...value }
                }
              })

              //notification
              this.toast.success({ detail: 'Success', summary: `Teacher ${teacher.firstName} set sucessfully`, duration: 4000 })
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
