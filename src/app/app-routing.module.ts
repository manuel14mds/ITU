import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { CoursesComponent } from './dashboard/pages/courses/courses.component';
import { StudentsComponent } from './dashboard/pages/students/students.component';
import { TeachersComponent } from './dashboard/pages/teachers/teachers.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path:'',
    component:AppComponent,
    children:[
      {
        path:'auth',
        component:AuthComponent
      },
      {
        path:'dashboard',
        component:DashboardComponent,
        children:[
          {
            path:'',
            component:HomeComponent
          },
          {
            path:'home',
            component:HomeComponent
          },
          {
            path:'courses',
            component:CoursesComponent
          },
          {
            path:'students',
            component:StudentsComponent
          },
          {
            path:'teachers',
            component:TeachersComponent
          },
        ]
      },
      {
        path:'**',
        redirectTo:'dashboard'
      }
    ]
  },  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
