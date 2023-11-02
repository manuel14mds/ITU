import { Component } from '@angular/core';
import { CourseType } from 'src/app/shared/types.s';
import { CourseDialogComponent } from './utilComponents/course-dialog/course-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private matDialog: MatDialog) {
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

            if (confirm('Está seguro que quiere editar los datos del estudiante?')) {
              const newData = this.courseList.map((item) => {
                if (item.id === course.id) {
                  value = updateValues(course, value)
                  item = { ...value }
                }
              })
            }

          }
        },
      });
  }

  switchCourseStatus(courseId: number): void {
    if (confirm('Quiere cambiar el estado del estudiante?')) {
      this.courseList.forEach((element) => {
        if (element.id === courseId) {
          element.active = !element.active
        }
      })
    }
  }

}
