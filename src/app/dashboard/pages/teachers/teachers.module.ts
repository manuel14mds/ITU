import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup';
import { SharedModule } from 'src/app/shared/shared.module';

import { teachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { TeacherDialogComponent } from './utilComponents/teacher-dialog/teacher-dialog.component';
import { TeacherTableComponent } from './utilComponents/teacher-table/teacher-table.component';

@NgModule({
  declarations: [
    TeachersComponent,
    TeacherDialogComponent,
    TeacherTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgToastModule,
    teachersRoutingModule,
  ],
  exports:[
    TeachersComponent,
  ]
})
export class TeachersModule { }
