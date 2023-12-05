import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Course } from 'src/app/model/course';

import { CoursesService } from './courses.service';
import { CourseDialogComponent } from './utilComponents/course-dialog/course-dialog.component';
import { ConfirmDialogService } from 'src/app/shared/confirm/confirm-dialog.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  constructor(
    private matDialog: MatDialog,
    private toast: NgToastService,
    public coursesService: CoursesService,
    private confirmService: ConfirmDialogService,
  ) {
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
            .then((documentReference) => {
              if (documentReference) {
                this.toast.success({ detail: 'Success', summary: `Course added successfully`, duration: 4000 })
              } else {
                this.toast.error({ detail: 'Error', summary: "Couldn't add new course" })
              }
            })
            .catch((error) => {
              console.error('Error adding student:', error);
              this.toast.error({ detail: 'Error', summary: "Couldn't add new course" })
            });

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

          const dataConfirm = {
            title: 'Confirm',
            message: 'Are you sure to edit this course?',
          }

          this.confirmService.openConfirmDialog(dataConfirm).subscribe((result) => {
            if (result && value) {
              value.active = (value.active === 'true' ? true : false)
              this.coursesService.updateCourse(course.id, value)
            }
          })

        },
      });
  }


}

