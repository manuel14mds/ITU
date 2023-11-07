import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CourseDetailComponent } from "./course-detail/course-detail.component";
import { CoursesComponent } from "./courses.component";

@NgModule({
    imports:[
        RouterModule.forChild([
            {
                path:'',
                component:CoursesComponent
            },
            {
                path: ':id',
                component:CourseDetailComponent,
            },
        ])
    ]
})
export class CoursesRoutingModule {}