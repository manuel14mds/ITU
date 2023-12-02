import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/dashboard/pages/students/students.service';
import { Student } from 'src/app/model/student';

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

  @Input() courseName: string | undefined;

  constructor(private studentService: StudentsService) {
  }

  ngOnInit(): void {
    if (this.courseName) {
      this.dataSubscription = this.studentService.getStudentsByCourse('dsfdsf').subscribe((value) => {
        this.dataSource = [...value]

        this.loading = false
      })
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe()
  }

}
