import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Course } from 'src/app/model/course';


@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnDestroy {
  roleSubscription: Subscription
  courseForm: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public course?: Course,) {

    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      active: ['', Validators.required],
    })

    if (this.course) {
      this.courseForm.patchValue(this.course)
    }

    this.roleSubscription = this.authService.authUser$.subscribe(value => {
      if (value?.role !== 'admin' && this.course) {
        this.courseForm.get("active")?.disable();
      }
    })
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

  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe()
  }

}
