import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeacherDialogComponent } from './utilComponents/teacher-dialog/teacher-dialog.component';
import { TeacherTableComponent } from './utilComponents/teacher-table/teacher-table.component';
import { NgToastModule } from 'ng-angular-popup';



@NgModule({
  declarations: [
    TeachersComponent,
    DetailComponent,
    TeacherDialogComponent,
    TeacherTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgToastModule,
  ],
  exports:[
    TeachersComponent,
  ]
})
export class TeachersModule { }
