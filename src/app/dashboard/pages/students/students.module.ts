import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup';
import { SharedModule } from 'src/app/shared/shared.module';

import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsService } from './students.service';
import { StudentDialogComponent } from './utilComponents/student-dialog/student-dialog.component';
import { StudentTableComponent } from './utilComponents/student-table/student-table.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentTableComponent,
    StudentDialogComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgToastModule,
    StudentRoutingModule,
    ReactiveFormsModule,
  ],
  exports:[
    StudentsComponent,
  ],
  providers:[
    StudentsService,
    AuthService,
  ]
})
export class StudentsModule { }
