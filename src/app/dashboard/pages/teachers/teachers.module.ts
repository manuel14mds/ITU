import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup';
import { SharedModule } from 'src/app/shared/shared.module';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { TeachersService } from './teachers.service';
import { TeacherDialogComponent } from './utilComponents/teacher-dialog/teacher-dialog.component';
import { TeacherTableComponent } from './utilComponents/teacher-table/teacher-table.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';

@NgModule({
  declarations: [
    TeachersComponent,
    TeacherDialogComponent,
    TeacherTableComponent,
    TeacherDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgToastModule,
    TeachersRoutingModule,
  ],
  exports: [
    TeachersComponent,
  ],
  providers: [
    TeachersService,
  ]
})
export class TeachersModule { }
