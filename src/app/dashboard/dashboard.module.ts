import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from '../app-routing.module';
import { CoursesModule } from './pages/courses/courses.module';
import { HomeModule } from './pages/home/home.module';
import { StudentsModule } from './pages/students/students.module';
import { TeachersModule } from './pages/teachers/teachers.module';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    MatSidenavModule,
    AppRoutingModule,
    CoursesModule,
    HomeModule,
    StudentsModule,
    TeachersModule,
  ],
  exports:[
    DashboardComponent,
  ]
})
export class DashboardModule { }
