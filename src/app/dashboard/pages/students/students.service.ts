import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, setDoc, UpdateData, updateDoc } from '@angular/fire/firestore'
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { Student } from 'src/app/model/student';

import { StudentDialogComponent } from './utilComponents/student-dialog/student-dialog.component';

@Injectable()
export class StudentsService {
  docRef = collection(this.store, 'students')

  constructor(
    private matDialog: MatDialog,
    private toast: NgToastService,
    private store: Firestore
  ) { }

  openStudentDialog(): void {
    this.matDialog.open(StudentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            let payload={
                DNI:value.DNI,
                firstName: value.firstName,
                lastName: value.lastName,
                age: value.age,
                email: value.email,
                active: (value.active === 'true' ? true : false),
                courses:[]
              }

              this.addStudent(payload)

            /* if (student) {
              //notification
              this.studentList = [...persistenceFactory.StudentManager.getStudents()]
              this.toast.success({ detail: 'Success', summary: `Student ${student.firstName} added sucessfully`, duration: 4000 })
            } else {
              //notification
              this.toast.error({ detail: 'Error', summary: "Couldn't add new student" })
            } */
          }
        }
      }
      )
  }

  addStudent(payload:any){
    addDoc(this.docRef, payload).then(res => console.log(res))
  }
  
  getStudents():Observable<Student[]>{
    return collectionData(this.docRef,{idField:'id'}) as Observable<Student[]>
  }

  updateStudent(sid:string, payload:Student){
    const studentRef = doc(this.store, `students/${sid}`)
    setDoc(studentRef, payload)
  }

  onEditStudent(student: Student): void {
    this.matDialog.open(StudentDialogComponent, {
      data: student
    })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            if (confirm('Está seguro que quiere editar los datos del estudiante?')) {
              value.active = (value.active === 'true' ? true : false)
              this.updateStudent(student.id, value)
              
              /* if (response) {
                //notification
                this.studentList = [...persistenceFactory.StudentManager.getStudents()]
                this.toast.success({ detail: 'Success', summary: `Student ${value.firstName} set sucessfully`, duration: 4000 })
              } else {
                //notification
                this.toast.error({ detail: 'Error', summary: "Couldn't update student" })
              } */
            }

          }
        },
      });
  }

  /* onEditStudent(student: StudentType): void {} */

  switchStudentStatus(student:Student): void {
    const {id, active} = student
    if (confirm('Quiere cambiar el estado del estudiante?')) {
      const studentRef = doc(this.store, `students/${id}`)
      updateDoc(studentRef, {active: !active})
      //notification
      //this.toast.success({ detail: 'Success', summary: `Set ${element.active ? 'active' : 'inactive'} student status!`, duration: 4000 })
    }
  }
}
