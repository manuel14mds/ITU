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
import { StudentsService } from '../students/students.service';
import { EnrollDialogComponent } from './course-detail/detail-components/enroll-dialog/enroll-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { ClassDialogComponent } from './course-detail/detail-components/class-dialog/class-dialog.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseTableComponent,
    CourseDialogComponent,
    CourseDetailComponent,
    StudentsTableComponent,
    ClassesTableComponent,
    EnrollDialogComponent,
    ClassDialogComponent,

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
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe,
  ],
  exports: [
    CoursesComponent,
  ],
  providers: [
    CoursesService,
    TeachersService,
    StudentsService,
  ]
})
export class CoursesModule { }
