import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { StudentDetailComponent } from "./student-detail/student-detail.component";
import { StudentsComponent } from "./students.component";

@NgModule({
    imports:[
        RouterModule.forChild([
            {
                path: '',
                component: StudentsComponent,
            },
            {
                path:':id',
                component:StudentDetailComponent,
            }
        ])
    ]
})
export class StudentRoutingModule {

}