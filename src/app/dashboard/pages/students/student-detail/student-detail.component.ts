import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentsService } from '../students.service';
import { Subscription } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


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

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
    this.studentSubscription.unsubscribe()
  }
}
