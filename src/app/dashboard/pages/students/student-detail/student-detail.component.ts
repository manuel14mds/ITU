import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentsService } from '../students.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnDestroy{
  loading: boolean = true
  student$: Student | undefined = {} as Student
  studentId$: string | undefined
  paramSubscription: Subscription
  studentSubscription: Subscription = new Subscription;

  courses: { position: number; name: string }[] | undefined = [];

  displayedColumns: string[] = ['position', 'name', 'actions'];


  constructor(
    private route: ActivatedRoute,
    private studentService: StudentsService,
  ) {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.studentId$ = params['id'];

      if (this.studentId$) {
        this.getData()
      }
    })
  }


  getData(): void {
    if (this.studentId$) {
      this.loading = true
      this.studentSubscription = this.studentService.getStudentById(this.studentId$).subscribe((response)=>{
        this.student$ = response
        this.courses = response?.courses.map((name,index)=>({ position: index + 1, name }))
        this.loading = false
      })
    }
  }

  unEroll(courseName:string):void{
    if(this.student$ && this.studentId$){
      let payload = this.student$
      payload.courses = this.student$.courses.filter((element)=> element!== courseName)

      this.studentService.updateStudent(this.studentId$, payload)
      this.getData()
    }

  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
    this.studentSubscription.unsubscribe()
  }
}
