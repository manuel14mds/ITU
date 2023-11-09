import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/shared/Helpers/validatorHelper';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerForm: FormGroup
  constructor(private authService: AuthService, private fb: FormBuilder, private router:Router) { 
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      psw1: ['', [Validators.required, Validators.minLength(4)]],
      psw2: ['', [Validators.required, Validators.minLength(4)]],
    })
    this.registerForm.addValidators(
      matchValidator('psw1', 'psw2')
    );
  }

  onRegister() {
    const value = this.registerForm.value
    this.authService.addUser({
      name: value.name,
      email: value.email,
      password: value.psw1,
      thumbnail:''
    })
    this.router.navigate(['login'])
  }

}
