import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseType } from 'src/app/shared/types.s';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent {
  courseForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public course?: CourseType,) {

    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      active: ['', Validators.required],
    })

    if (this.course) {
      this.courseForm.patchValue(this.course)
    }
  }

  public get dataForm() {
    return this.courseForm.value
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched()
    } else {
      this.matDialogRef.close(this.courseForm.value)
    }
  }

  activateSubmitBtn(): boolean {
    if (this.courseForm.valid) {
      return false
    }
    return true
  }

}
