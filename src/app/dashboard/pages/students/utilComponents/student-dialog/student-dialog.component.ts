import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Student } from 'src/app/model/student';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent implements OnDestroy{
  roleSubscription: Subscription

  studentForm: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public student?: Student,) {

      
      this.studentForm = this.fb.group({
        DNI: ['', [Validators.required, Validators.min(5), Validators.pattern('[0-9]+')]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(10), Validators.max(99), Validators.pattern('[0-9]+')]],
        email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
        active: ['', Validators.required],
      })
      
      if (this.student) {
        this.studentForm.patchValue(this.student)
      }
      this.roleSubscription = this.authService.authUser$.subscribe(value => {
        if (value?.role !== 'admin' && this.student) {
          this.studentForm.setControl("active",{value:this.student.active, disabled:true})
        }
      })
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
  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe()
  }
}
