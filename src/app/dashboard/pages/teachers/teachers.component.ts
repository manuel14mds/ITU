import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Teacher } from 'src/app/model/teacher';

import { TeachersService } from './teachers.service';
import { TeacherDialogComponent } from './utilComponents/teacher-dialog/teacher-dialog.component';
import { ConfirmDialogService } from 'src/app/shared/confirm/confirm-dialog.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {

  constructor(
    private toast: NgToastService,
    private matDialog: MatDialog,
    public teachersService: TeachersService,
    private confirmService: ConfirmDialogService,
  ) {
  }

  openTeacherDialog(): void {
    this.matDialog.open(TeacherDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            let payload = {
              DNI: value.DNI,
              firstName: value.firstName,
              lastName: value.lastName,
              active: (value.active === 'true' ? true : false),
              email: value.email,
              age: Number(value.age),
              profession: value.profession,
              courses: []
            }

            this.teachersService.addTeacher(payload)

          }
        }
      }
      )
  }

  onEditTeacher(teacher: Teacher) {
    this.matDialog.open(TeacherDialogComponent, {
      data: teacher
    })
      .afterClosed()
      .subscribe({
        next: (value) => {
          
          const dataConfirm = {
            title: 'Confirm',
            message: 'Are you sure to edit this teacher?',
          }

          this.confirmService.openConfirmDialog(dataConfirm).subscribe((result) => {
            if (result && value) {
              value.age = Number(value.age)
              value.active = ((value.active === 'true' || true) ? true : false)
              this.teachersService.updateTeacher(teacher.id, value)
            }
          })

        },
      });
  }

}
