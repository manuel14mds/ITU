import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { TeacherDetailComponent } from "./teacher-detail/teacher-detail.component";
import { TeachersComponent } from "./teachers.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path:'',
                component:TeachersComponent,
            },
            {
                path:':id',
                component:TeacherDetailComponent,
            }
        ])
    ],
    exports:[
        RouterModule,
    ],
})
export class teachersRoutingModule { }
