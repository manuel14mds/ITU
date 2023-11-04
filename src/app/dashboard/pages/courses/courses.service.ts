import { Injectable } from '@angular/core';
import { CourseDialogComponent } from './utilComponents/course-dialog/course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import persistenceFactory from 'src/DAO/factory';
import { CourseType } from 'src/app/shared/types.s';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courseList: CourseType[] = []

  constructor(
    private matDialog: MatDialog,
    private toast: NgToastService,
  ) { this.courseList = [...persistenceFactory.CourseManager.getCourses()] }

  openCourseDialog(): void {
    this.matDialog.open(CourseDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            let course = persistenceFactory.CourseManager.create(
              {
                name: value.name,
                startDate: value.startDate,
                active: value.active,
                endDate: value.endDate,
              }
            )
            if (course) {
              this.courseList = [...persistenceFactory.CourseManager.getCourses()]
              //notification
              this.toast.success({ detail: 'Success', summary: `Course ${course.name} added`, duration: 4000 })
            } else {
              //notification
              this.toast.error({ detail: 'Error', summary: "Couldn't add new course" })
            }
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
              let response = persistenceFactory.CourseManager.updateCourse(course.id, value)
              if (response) {
                this.courseList = [...persistenceFactory.CourseManager.getCourses()]
                //notification
                this.toast.success({ detail: 'Success', summary: `Course ${course.name} set sucessfully`, duration: 4000 })
              } else {
                //notification
                this.toast.error({ detail: 'Error', summary: "Couldn't update course" })
              }
            }

          }
        },
      });
  }

  switchCourseStatus(courseId: number): void {
    if (confirm('Quiere cambiar el estado del curso?')) {
      let result = persistenceFactory.CourseManager.switchCourseStatus(courseId)
      if (result) {
        //notification
        this.toast.success({ detail: 'Success', summary: "Set course status!", duration: 4000 })
      } else {
        //notification
        this.toast.error({ detail: 'Error', summary: "Couldn't change the course's state" })
      }

    }
  }
}
