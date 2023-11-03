import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseTableComponent } from './utilComponents/course-table/course-table.component';
import { CourseDialogComponent } from './utilComponents/course-dialog/course-dialog.component';
import { NgToastModule } from 'ng-angular-popup';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseTableComponent,
    CourseDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgToastModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  exports:[
    CoursesComponent,
  ]
})
export class CoursesModule { }
