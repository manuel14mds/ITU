import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthComponent } from "./auth.component";

@NgModule({
    imports:[
        RouterModule.forChild([
            {
                path:'',
                component:AuthComponent,
                children:[
                    {
                        path:'login',
                        component:LoginComponent
                    },
                    {
                        path:'signUp',
                        component:RegisterComponent
                    },
                    {
                        path:'**',
                        redirectTo:'login'
                    }
                ]
            },
            {
                path:'**',
                redirectTo:''
            }
        ])
    ],
    exports:[
        RouterModule
    ]
})
export class AuthRoutingModule{}