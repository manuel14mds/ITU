import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, map, startWith, switchMap } from 'rxjs';
import { StudentsService } from 'src/app/dashboard/pages/students/students.service';
import { Student } from 'src/app/model/student';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

interface StudentAux extends Student {
  fullName?: string;
}

@Component({
  selector: 'app-enroll-dialog',
  templateUrl: './enroll-dialog.component.html',
  styleUrls: ['./enroll-dialog.component.scss']
})
export class EnrollDialogComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  students$: Observable<StudentAux[]>
  studentsSubs: Subscription | undefined

  myControl = new FormControl<StudentAux | null>(null);
  filteredOptions: Observable<StudentAux[]>;

  selectedStudent: StudentAux | null = null;

  constructor(
    private studentService: StudentsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.students$ = this.studentService.getStudentsNotInCourse(this.data.courseName);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(null),
      switchMap(value => this._filter(value))
    );
  }


  ngOnInit() {
    this.studentsSubs = this.students$.subscribe(() => {
      this.loading = false;
    });

    this.myControl.valueChanges.subscribe((value) => {
      this.selectedStudent = value;
    });
  }


  displayFn(student: StudentAux): string {
    return student && student.fullName ? student.fullName : '';
  }


  private _filter(value: string | StudentAux | null): Observable<StudentAux[]> {
    const filterValue = (value && typeof value === 'string') ? value.toLowerCase() : '';

    return this.students$.pipe(
      map(students =>
        students.filter(student =>
          student.fullName && student.fullName.toLowerCase().includes(filterValue)
        )
      )
    );
  }


  enrollStudent() {
    if (this.selectedStudent) {
      const { id, fullName, ...payload } = this.selectedStudent;
      payload.courses.push(this.data.courseName)
      this.studentService.updateStudent(id, payload as Student)
    }
  }


  ngOnDestroy(): void {
    this.studentsSubs?.unsubscribe()
  }
}