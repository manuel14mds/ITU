import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { CoursesComponent } from "./pages/courses/courses.component";
import { HomeComponent } from "./pages/home/home.component";
import { StudentsComponent } from "./pages/students/students.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                // /dashboard
                path:'',
                component: DashboardComponent,
                children:[
                    {
                        path: 'home',
                        component: HomeComponent
                    },
                    {
                        path: 'courses',
                        component: CoursesComponent
                    },
                    {
                        path: 'students',
                        component: StudentsComponent
                    },
                    {
                        path:'teachers',
                        loadChildren:()=> import('./pages/teachers/teachers.module').then( module => module.TeachersModule)
                    },
                ]
            }
            
        ])
    ],
    exports:[
        RouterModule,
    ],
})
export class DashboardRoutingModule { }
