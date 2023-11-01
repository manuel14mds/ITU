import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseTableComponent } from './utilComponents/course-table/course-table.component';
import { CourseDialogComponent } from './utilComponents/course-dialog/course-dialog.component';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseTableComponent,
    CourseDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[
    CoursesComponent,
  ]
})
export class CoursesModule { }
