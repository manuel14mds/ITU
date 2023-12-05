import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';
import { TeachersService } from '../teachers.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent implements OnDestroy{
  loading: boolean = true
  teacher$: Teacher | undefined = {} as Teacher
  teacherId$: string | undefined
  paramSubscription: Subscription
  teacherSubscription: Subscription = new Subscription;

  courses: { position: number; name: string }[] | undefined = [];

  displayedColumns: string[] = ['position', 'name', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeachersService,
  ) {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.teacherId$ = params['id'];

      if (this.teacherId$) {
        this.getData()
      }
    })
  }
  
  
  getData(): void {
    if (this.teacherId$) {
      this.loading = true
      this.teacherSubscription = this.teacherService.getTeacherById(this.teacherId$).subscribe((response)=>{
        this.teacher$ = response
        this.courses = response?.courses.map((name,index)=>({ position: index + 1, name }))
        this.loading = false
      })
    }
  }
  
  
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
    this.teacherSubscription.unsubscribe()
  }
}
