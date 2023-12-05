import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoursesService } from '../../courses.service';
import { Course } from 'src/app/model/course';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ConfirmDialogService } from 'src/app/shared/confirm/confirm-dialog.service';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent {
  userRole: string = ''
  courses: Course[] = []
  courseSubs: Subscription
  roleSubscription: Subscription

  constructor(
    private authService: AuthService,
    private courseService: CoursesService,
    private confirmService: ConfirmDialogService,
  ) {
    this.roleSubscription = this.authService.authUser$.subscribe(value => {
      if (value) {
        this.userRole = value.role
      }
    })

    this.courseSubs = this.courseService.getCourses().subscribe(list => this.courses = list)
  }

  ngOnDestroy() {
    this.roleSubscription.unsubscribe()
    this.courseSubs.unsubscribe()
  }

  changeStatus(course:Course):void{

    const dataConfirm = {
      title: 'Confirm',
      message: 'Are you sure to edit this course status?',
    }

    this.confirmService.openConfirmDialog(dataConfirm).subscribe((result) => {
      if(result){
        this.courseService.switchCourseStatus(course)
      }
    })

  }

  @Input()
  dataSource: Course[] = [];

  @Output()
  switchCourseStatus = new EventEmitter<Course>()

  @Output()
  editCourse = new EventEmitter<Course>()

  displayedColumns = ['id', 'name', 'teacher', 'active', 'actions'];
}
