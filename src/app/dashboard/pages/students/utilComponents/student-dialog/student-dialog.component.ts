import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentType } from 'src/app/shared/types.s';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent {
  studentForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public student?: StudentType,) {

    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(10), Validators.max(199)]],
      email: ['', [Validators.required, Validators.email]],
      active: ['', Validators.required],
    })

    if (this.student) {
      this.studentForm.patchValue(this.student)
    }
  }

  public get dataForm() {
    return this.studentForm.value
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched()
    } else {
      this.matDialogRef.close(this.studentForm.value)
    }
  }

  activateSubmitBtn(): boolean {
    if (this.studentForm.valid) {
      return false
    }
    return true
  }
}
