import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Course } from 'src/app/model/course';

import { CoursesService } from './courses.service';
import { CourseDialogComponent } from './utilComponents/course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  constructor(
    private matDialog: MatDialog,
    private toast: NgToastService,
    public coursesService:CoursesService,) {
  }

  openCourseDialog(): void {
    this.matDialog.open(CourseDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            let payload = {
              name: value.name,
              startDate: value.startDate,
              endDate: value.endDate,
              classes: [],
              students: [],
              teacher: '',
              active: value.active,
            }

            this.coursesService.addCourse(payload)

            /* if (course) {
              this.courseList = [...persistenceFactory.CourseManager.getCourses()]
              //notification
              this.toast.success({ detail: 'Success', summary: `Course ${course.name} added`, duration: 4000 })
            } else {
              //notification
              this.toast.error({ detail: 'Error', summary: "Couldn't add new course" })
            } */
          }
        }
      }
      )
  }


  onEditCourse(course: Course): void {
    this.matDialog.open(CourseDialogComponent, {
      data: course
    })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            if (confirm('Está seguro que quiere editar los datos del curso?')) {
              value.active = (value.active === 'true' ? true : false)
              this.coursesService.updateCourse(course.id, value)
              /* if (response) {
                this.courseList = [...persistenceFactory.CourseManager.getCourses()]
                //notification
                this.toast.success({ detail: 'Success', summary: `Course ${course.name} set sucessfully`, duration: 4000 })
              } else {
                //notification
                this.toast.error({ detail: 'Error', summary: "Couldn't update course" })
              } */
            }

          }
        },
      });
  }


}

