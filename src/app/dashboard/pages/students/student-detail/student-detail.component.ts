import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentsService } from '../students.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnDestroy{
  userRole:string =''
  loading: boolean = true
  student$: Student | undefined = {} as Student
  studentId$: string | undefined
  paramSubscription: Subscription
  studentSubscription: Subscription = new Subscription;
  roleSubscription: Subscription

  courses: { position: number; name: string }[] | undefined = [];

  displayedColumns: string[] = ['position', 'name', 'actions'];


  constructor(
    private route: ActivatedRoute,
    private studentService: StudentsService,
    private authService:AuthService
  ) {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.studentId$ = params['id'];

      
      if (this.studentId$) {
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
    this.roleSubscription.unsubscribe()
  }
}
