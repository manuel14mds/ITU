import { Component } from '@angular/core';
import { CourseType } from 'src/app/shared/types.s';
import { CourseDialogComponent } from './utilComponents/course-dialog/course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

function updateValues(courses: { [key: string]: any }, newData: { [key: string]: any }): object {
  for (const key in newData) {
    if (key !== 'id') {
      const newValue = newData[key];
      if (newValue !== null && newValue !== undefined && courses[key] !== newValue) {
        courses[key] = newValue;
      }
    }
  }
  return courses
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courseList:CourseType[]=[]

  constructor(private matDialog: MatDialog, private toast: NgToastService) {
  }

  openCourseDialog(): void {
    console.log('entra')
    this.matDialog.open(CourseDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            let id = 1
            // si hay estudiantes en la lista, se busca el id del último elemento 
            if(this.courseList.length>0){
              id=(this.courseList[length].id) + 1
            }

            this.courseList = [
              {
                name: value.name,
                startDate: value.startDate,
                active: (value.active === 'true'? true : false),
                endDate: value.endDate,
                students: [],
                teachers: [],
                id: id
              },
              ...this.courseList,
            ]
            //notification
            this.toast.success({ detail: 'Success', summary: `Course ${value.name} added`, duration: 4000 })
          } else {
            //notification
            this.toast.error({ detail: 'Error', summary: "Couldn't add new course" })
          }
        }
      }
      )
  }

  onEditCourse(course: CourseType): void {
    this.matDialog.open(CourseDialogComponent, {
      data: course
    })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            if (confirm('Está seguro que quiere editar los datos del curso?')) {
              const newData = this.courseList.map((item) => {
                if (item.id === course.id) {
                  value = updateValues(course, value)
                  item = { ...value }
                }
              })

              //notification
              this.toast.success({ detail: 'Success', summary: `Course ${course.name} set sucessfully`, duration: 4000 })
            }

          }
        },
      });
  }

  switchCourseStatus(courseId: number): void {
    if (confirm('Quiere cambiar el estado del curso?')) {
      this.courseList.forEach((element) => {
        if (element.id === courseId) {
          element.active = !element.active

          //notification
          this.toast.success({ detail: 'Success', summary: `Set ${element.active ? 'active' : 'inactive'} course status!`, duration: 4000 })
        }
      })
    }
  }

}
