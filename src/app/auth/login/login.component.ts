import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(
    private loginService: LoginService,
  ) {
    this.loginForm = this.loginService.loginForm
  }

  public get dataForm() {
    return this.loginForm.value
  }

  onSubmit=()=> this.loginService.onSubmit()

  activateSubmitBtn(): boolean {
    return this.loginForm.valid ? false : true
  }

}
