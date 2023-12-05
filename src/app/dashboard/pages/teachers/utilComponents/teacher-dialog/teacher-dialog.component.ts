import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Teacher } from 'src/app/model/teacher';

@Component({
  selector: 'app-teacher-dialog',
  templateUrl: './teacher-dialog.component.html',
  styleUrls: ['./teacher-dialog.component.scss']
})
export class TeacherDialogComponent implements OnDestroy {
  roleSubscription: Subscription

  teacherForm: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<TeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public teacher?: Teacher,) {

    this.teacherForm = this.fb.group({
      DNI: ['', [Validators.required, Validators.min(5), Validators.pattern('[0-9]+')]],
      firstName: ['', [Validators.required, Validators.pattern(/^[^\s]+$/)]],
      lastName: ['', [Validators.required, , Validators.pattern(/^[^\s]+$/)]],
      age: ['', [Validators.required, Validators.min(10), Validators.max(99), Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
      profession: ['', Validators.required],
      active: ['', Validators.required],
    })

    if (this.teacher) {
      this.teacherForm.patchValue(this.teacher)
    }

    this.roleSubscription = this.authService.authUser$.subscribe(value => {
      if (value?.role !== 'admin' && this.teacher) {
        this.teacherForm.setControl("active", { value: this.teacher.active, disabled: true })
      }
    })
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

  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe()
  }
}
