import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Course } from 'src/app/model/course';
import { Teacher } from 'src/app/model/teacher';

import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnDestroy {
  course$: Course | undefined = {} as Course
  courseId$: string = ''
  paramSubscription: Subscription
  courseSubscription: Subscription = new Subscription;
  selectedTeacher: Teacher | undefined
  teacherList$: Observable<Teacher[] | []> = new Observable<Teacher[] | []>();
  loading:boolean=true

  classes: { position: number; name: string }[] | undefined = [];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
  ) {

    this.paramSubscription = this.route.params.subscribe(params => {
      this.courseId$ = params['id'];


      if (this.courseId$) {
        this.courseSubscription = this.coursesService.getCourseById(this.courseId$).subscribe(value => {
          this.course$ = value;
          this.classes = value?.classes.map((name, index) => ({ position: index + 1, name }))
          this.loading = false
        })
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


  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
    this.courseSubscription.unsubscribe()
  }
}
