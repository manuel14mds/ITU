import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Course } from 'src/app/model/course';
import { Teacher } from 'src/app/model/teacher';

import { CoursesService } from '../courses.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})

export class CourseDetailComponent implements OnDestroy {
  userRole: string = ''
  course$: Course | undefined = {} as Course
  courseId$: string = ''
  paramSubscription: Subscription
  courseSubscription: Subscription = new Subscription;
  roleSubscription: Subscription
  selectedTeacher: Teacher | undefined
  teacherList$: Observable<Teacher[] | []> = new Observable<Teacher[] | []>();
  loading: boolean = true

  classes: { position: number; name: string }[] | undefined = [];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
  ) {

    this.paramSubscription = this.route.params.subscribe(params => {
      this.courseId$ = params['id'];

      if (this.courseId$) {
        this.getData()
      }
    })

    this.roleSubscription = this.authService.authUser$.subscribe(value => {
      if (value) {
        this.userRole = value.role
      }
    })

  }

  ngOnInit() {
    this.teacherList$ = this.coursesService.getTeachers();
  }

  onTeacherSelected(teacher: Teacher) {
    this.selectedTeacher = teacher;
  }

  setTeacher(): void {
    if (this.course$ && this.selectedTeacher) {
      this.coursesService.assignTeacher(this.course$, this.selectedTeacher)
    }
    this.selectedTeacher = undefined
  }

  getData(): void {
    if (this.courseId$) {
      this.courseSubscription = this.coursesService.getCourseById(this.courseId$).subscribe(value => {
        this.course$ = value;
        this.classes = value?.classes.map((name, index) => ({ position: index + 1, name }))
        this.loading = false
      })
    }
  }

  refreshCourse(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
    this.roleSubscription.unsubscribe()
    this.courseSubscription.unsubscribe()
  }
}
