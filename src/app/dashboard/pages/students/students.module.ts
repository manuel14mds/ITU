import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentTableComponent } from './utilComponents/student-table/student-table.component';
import { StudentDialogComponent } from './utilComponents/student-dialog/student-dialog.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentTableComponent,
    StudentDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports:[
    StudentsComponent,
  ]
})
export class StudentsModule { }
