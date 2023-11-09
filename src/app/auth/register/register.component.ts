import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from '../../shared/Helpers/validatorHelper'
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(
    private registerService:RegisterService
  ){
    this.registerForm = this.registerService.registerForm
  }

  activateSubmitBtn():boolean{
    return this.registerForm.valid? false : true
  }
  onRegister=()=>this.registerService.onRegister()

}
