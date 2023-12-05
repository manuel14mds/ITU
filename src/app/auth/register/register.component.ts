import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from '../../shared/Helpers/validatorHelper'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder, 
    private router: Router,
    private toast: NgToastService,
  ){
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
      psw1: ['', [Validators.required, Validators.minLength(4)]],
      psw2: ['', [Validators.required, Validators.minLength(4)]],
    })
    this.registerForm.addValidators(
      matchValidator('psw1', 'psw2')
    );
  }

  activateSubmitBtn():boolean{
    return this.registerForm.valid? false : true
  }
  onRegister() {
    const value = this.registerForm.value
    const newUser = {
      name: value.name,
      email: value.email,
      password: value.psw1,
      thumbnail: '',
      role: 'user'
    }

    this.authService.signUp(newUser)
      .then((response) => {
        if (response.status){
          this.router.navigate(['/dashboard'])
        }else {
          this.toast.error({ detail: 'Error', summary: response.message })
        }
      })

  }

}
