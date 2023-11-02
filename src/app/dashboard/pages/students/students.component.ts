import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentType } from 'src/app/shared/types.s';
import { StudentDialogComponent } from './utilComponents/student-dialog/student-dialog.component';

function updateValues(student: { [key: string]: any }, newData: { [key: string]: any }): object {
  for (const key in newData) {
    if (key !== 'id') {
      const newValue = newData[key];
      if (newValue !== null && newValue !== undefined && student[key] !== newValue) {
        student[key] = newValue;
      }
    }
  }
  return student
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent {
  studentList: StudentType[] = []
  constructor(private matDialog: MatDialog) {
  }

  openStudentDialog(): void {
    this.matDialog.open(StudentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            let id = 1
            // si hay estudiantes en la lista, se busca el id del último elemento 
            if(this.studentList.length>0){
              id=(this.studentList[length].id) + 1
            }

            this.studentList = [
              {
                firstName: value.firstName,
                lastName: value.lastName,
                active: (value.active === 'true'? true : false),
                email: value.email,
                age: value.age,
                courses: [],
                id: id
              },
              ...this.studentList,
            ]
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
              const newData = this.studentList.map((item) => {
                if (item.id === student.id) {
                  value = updateValues(student, value)
                  item = { ...value }
                }
              })
            }

          }
        },
      });
  }

  switchStudentStatus(studentId: number): void {
    if (confirm('Quiere cambiar el estado del estudiante?')) {
      this.studentList.forEach((element) => {
        if (element.id === studentId) {
          element.active = !element.active
        }
      })
    }
  }

}
