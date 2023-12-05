import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';
import { TeachersService } from '../teachers.service';
import { CoursesService } from '../../courses/courses.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent implements OnDestroy {
  userRole: string = ''
  loading: boolean = true
  teacher$: Teacher | undefined = {} as Teacher
  teacherId$: string | undefined
  paramSubscription: Subscription
  teacherSubscription: Subscription = new Subscription
  roleSubscription: Subscription

  courses: { position: number; name: string }[] | undefined = []

  displayedColumns: string[] = ['position', 'name', 'actions']

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeachersService,
    private courseService: CoursesService,
    private authService:AuthService,
  ) {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.teacherId$ = params['id']

      if (this.teacherId$) {
        this.getData()
      }
    })

    this.roleSubscription = this.authService.authUser$.subscribe(value=> {
      if(value){
        this.userRole=value.role
      }
    })
  }


  getData(): void {
    if (this.teacherId$) {
      this.loading = true
      this.teacherSubscription = this.teacherService.getTeacherById(this.teacherId$).subscribe((response) => {
        this.teacher$ = response
        this.courses = response?.courses.map((name, index) => ({ position: index + 1, name }))
        this.loading = false
      })
    }
  }

  deregister(courseName: string): void {
    if (this.teacher$ && this.teacherId$) {
      let payload = this.teacher$
      payload.courses = this.teacher$.courses.filter((element) => element !== courseName)

      this.teacherService.updateTeacher(this.teacherId$, payload)

      this.courseService.clearTeacher(courseName)

      this.getData()
    }

  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
    this.teacherSubscription.unsubscribe()
    this.roleSubscription.unsubscribe()
  }
}
