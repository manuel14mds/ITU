import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgToastModule } from 'ng-angular-popup';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesService } from './courses.service';
import { CourseDialogComponent } from './utilComponents/course-dialog/course-dialog.component';
import { CourseTableComponent } from './utilComponents/course-table/course-table.component';
import { StudentsTableComponent } from './course-detail/detail-components/students-table/students-table.component';
import { ClassesTableComponent } from './course-detail/detail-components/classes-table/classes-table.component';
import { TeachersService } from '../teachers/teachers.service';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseTableComponent,
    CourseDialogComponent,
    CourseDetailComponent,
    StudentsTableComponent,
    ClassesTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgToastModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CoursesRoutingModule,
    MatTabsModule,
    MatSelectModule,
  ],
  exports: [
    CoursesComponent,
  ],
  providers: [
    CoursesService,
    TeachersService,
  ]
})
export class CoursesModule { }
