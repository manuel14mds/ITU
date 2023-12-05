import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    AuthRoutingModule,
    SharedModule,
    MatDividerModule,
    NgToastModule,
  ],
  exports:[
    AuthComponent,
  ],
  providers:[
    NgToastService,
  ]
})
export class AuthModule { }
