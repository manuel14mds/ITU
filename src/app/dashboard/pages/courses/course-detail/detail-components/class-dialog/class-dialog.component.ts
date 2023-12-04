import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from '../../../courses.service';

@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.scss']
})
export class ClassDialogComponent {

  inputForm:FormGroup

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,
    private courseService: CoursesService,
  ) {
    this.inputForm = this.fb.group({
      className:['', Validators.required]
    })
  }
  
  addClass():void{
    const{id, ...payload} = this.data.course
    payload.classes.push(this.getInputValue())
    this.courseService.updateCourse(id, payload)
  }
  getInputValue():any{
    return this.inputForm.value.className
  }

}
