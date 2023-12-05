import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';

import { TeachersService } from '../../teachers.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.scss']
})
export class TeacherTableComponent {
  userRole: string = ''
  teachers: Teacher[] = []
  teacherSubs: Subscription
  roleSubscription: Subscription

  constructor(
    private teacherService: TeachersService,
    private authService: AuthService,
    ) {
      this.roleSubscription = this.authService.authUser$.subscribe(value => {
        if (value) {
          this.userRole = value.role
        }
      })

    this.teacherSubs = this.teacherService.getTeachers().subscribe((list) => this.teachers = list)
  }

  ngOnDestroy() {
    this.roleSubscription.unsubscribe()
    this.teacherSubs.unsubscribe()
  }

  @Output()
  switchTeacherStatus = new EventEmitter<Teacher>()

  @Output()
  editTeacher = new EventEmitter<Teacher>()

  displayedColumns = ['DNI', 'name', 'profession', 'email', 'active', 'actions'];
}
