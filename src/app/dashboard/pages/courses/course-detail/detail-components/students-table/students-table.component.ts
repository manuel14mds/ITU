import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/dashboard/pages/students/students.service';
import { Student } from 'src/app/model/student';
import { EnrollDialogComponent } from '../enroll-dialog/enroll-dialog.component';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnDestroy, OnInit {
  displayedColumns: string[] = ['dni', 'fullname', 'email', 'actions'];

  dataSource: Student[] = []
  dataSubscription: Subscription = new Subscription;
  loading: boolean = true

  @Input() courseName: string | undefined; // aquí tengo el nombre del curso

  constructor(private studentService: StudentsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.courseName) {
      this.getStudents()
    }
  }
  private getStudents(): void {
    if (this.courseName) {
      this.dataSubscription = this.studentService.getStudentsByCourse(this.courseName).subscribe((value) => {
        this.dataSource = [...value]

        this.loading = false
      })
    }
  }

  openEnrollDialog() {
    const dialogRef = this.dialog.open(EnrollDialogComponent, {
      data: { courseName: this.courseName }
    })


    dialogRef.afterClosed().subscribe(() => {
      this.getStudents()
    })
  }

  unerollStudent(student:Student): void {
    const {id, ...payload} = student
    payload.courses = payload.courses.filter((element) => element !== this.courseName)
    this.studentService.updateStudent(id, payload as Student)
    this.getStudents()
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe()
  }

}
