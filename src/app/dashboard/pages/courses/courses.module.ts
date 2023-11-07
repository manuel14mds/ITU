import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgToastModule } from 'ng-angular-popup';
import { SharedModule } from 'src/app/shared/shared.module';

import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesService } from './courses.service';
import { CourseDialogComponent } from './utilComponents/course-dialog/course-dialog.component';
import { CourseTableComponent } from './utilComponents/course-table/course-table.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseTableComponent,
    CourseDialogComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgToastModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CoursesRoutingModule,
  ],
  exports: [
    CoursesComponent,
  ],
  providers: [
    CoursesService,
  ]
})
export class CoursesModule { }
