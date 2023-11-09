import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]
    })
  }

  onSubmit(){
    const {email, password} = this.loginForm.value
    let response:User|null = {}as User
    this.authService.getUserByEmail(email).subscribe(res  => {
      if(res){
        if(res.password === password){
          this.authService.user = response as User
          this.authService.login(res)
          this.router.navigate(['/dashboard'])
        }else{
          alert('wrong credentials')
        }
      }else{
        alert('404, user not found')
      }
    })
    
  }

}
