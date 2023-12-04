import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';

import { TeachersService } from '../../teachers.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.scss']
})
export class TeacherTableComponent {
  teachers: Teacher[] = []
  teacherSubs: Subscription

  constructor(private teacherService: TeachersService) {
    this.teacherSubs = this.teacherService.getTeachers().subscribe((list) => this.teachers = list)
  }

  ngOnDestroy() {
    this.teacherSubs.unsubscribe()
  }

  @Output()
  switchTeacherStatus = new EventEmitter<Teacher>()

  @Output()
  editTeacher = new EventEmitter<Teacher>()

  displayedColumns = ['DNI', 'name', 'profession', 'email', 'active', 'actions'];
}
