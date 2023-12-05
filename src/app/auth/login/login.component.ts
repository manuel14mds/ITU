import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
      password: ['', [Validators.required]]
    })
  }

  public get dataForm() {
    return this.loginForm.value
  }

  onSubmit() {
    const { email, password } = this.loginForm.value

    this.authService.logIn({ email: email, password: password })
      .then((result) => {
        if (result.status) {
          this.router.navigate(['/dashboard'])
        } else {
          this.toast.error({ detail: 'Error', summary: result.message })
        }
      })
  }

  activateSubmitBtn(): boolean {
    return this.loginForm.valid ? false : true
  }

}
