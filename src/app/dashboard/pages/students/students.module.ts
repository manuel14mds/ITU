import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup';
import { SharedModule } from 'src/app/shared/shared.module';

import { StudentsComponent } from './students.component';
import { StudentDialogComponent } from './utilComponents/student-dialog/student-dialog.component';
import { StudentTableComponent } from './utilComponents/student-table/student-table.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentTableComponent,
    StudentDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgToastModule,
  ],
  exports:[
    StudentsComponent,
  ]
})
export class StudentsModule { }
