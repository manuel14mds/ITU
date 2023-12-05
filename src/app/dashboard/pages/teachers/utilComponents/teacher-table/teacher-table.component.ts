import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';

import { TeachersService } from '../../teachers.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ConfirmDialogService } from 'src/app/shared/confirm/confirm-dialog.service';

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
    private confirmService: ConfirmDialogService,
    ) {
      this.roleSubscription = this.authService.authUser$.subscribe(value => {
        if (value) {
          this.userRole = value.role
        }
      })

    this.teacherSubs = this.teacherService.getTeachers().subscribe((list) => this.teachers = list)
  }

  changeStatus(teacher:Teacher):void{

    const dataConfirm = {
      title: 'Confirm',
      message: 'Are you sure to edit this course status?',
    }

    this.confirmService.openConfirmDialog(dataConfirm).subscribe((result) => {
      if(result){
        this.teacherService.switchTeacherStatus(teacher)
      }
    })

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
