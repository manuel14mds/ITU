import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from 'src/app/model/teacher';
import { TeacherType } from 'src/app/shared/types.s';

@Component({
  selector: 'app-teacher-dialog',
  templateUrl: './teacher-dialog.component.html',
  styleUrls: ['./teacher-dialog.component.scss']
})
export class TeacherDialogComponent {
  teacherForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<TeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public teacher?: Teacher,) {

    this.teacherForm = this.fb.group({
      DNI: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(10), Validators.max(199)]],
      email: ['', [Validators.required, Validators.email]],
      profession:['', Validators.required],
      active: ['', Validators.required],
    })

    if (this.teacher) {
      this.teacherForm.patchValue(this.teacher)
    }
  }

  public get dataForm() {
    return this.teacherForm.value
  }

  onSubmit(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched()
    } else {
      this.matDialogRef.close(this.teacherForm.value)
    }
  }

  activateSubmitBtn(): boolean {
    if (this.teacherForm.valid) {
      return false
    }
    return true
  }

}
