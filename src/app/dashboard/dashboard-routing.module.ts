import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                // /dashboard
                path:'',
                component: DashboardComponent,
                children:[
                    {
                        path: '',
                        loadChildren:()=> import('./pages/home/home.module').then( module => module.HomeModule)
                    },
                    {
                        path: 'courses',
                        loadChildren:()=> import('./pages/courses/courses.module').then( module => module.CoursesModule)
                    },
                    {
                        path: 'students',
                        loadChildren:()=> import('./pages/students/students.module').then( module => module.StudentsModule)
                    },
                    {
                        path:'teachers',
                        loadChildren:()=> import('./pages/teachers/teachers.module').then( module => module.TeachersModule)
                    },
                    {
                        path: 'home',
                        redirectTo:''
                    },
                ]
            },
            {
                path:'**',
                redirectTo:''
            }
            
        ])
    ],
    exports:[
        RouterModule,
    ],
})
export class DashboardRoutingModule { }
