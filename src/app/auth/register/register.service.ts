import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchValidator } from 'src/app/shared/Helpers/validatorHelper';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerForm: FormGroup
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
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
        if (response) this.router.navigate(['/dashboard'])
      })

  }

}
