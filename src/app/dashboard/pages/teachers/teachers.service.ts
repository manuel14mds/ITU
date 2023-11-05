import { Injectable } from '@angular/core';
import { TeacherDialogComponent } from './utilComponents/teacher-dialog/teacher-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';


import { Firestore, collection, addDoc, collectionData, doc, setDoc, updateDoc, UpdateData } from '@angular/fire/firestore'
import { Teacher } from 'src/app/model/teacher';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  docRef = collection(this.store, 'teachers')

  constructor(
    private matDialog: MatDialog,
    private toast: NgToastService,
    private store: Firestore) { }

  openTeacherDialog(): void {
    this.matDialog.open(TeacherDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            let payload = {
              DNI: value.DNI,
              firstName: value.firstName,
              lastName: value.lastName,
              active: (value.active === 'true' ? true : false),
              email: value.email,
              age: value.age,
              profession: value.profession,
              courses: []
            }

            this.addTeacher(payload)

          }
        }
      }
      )
  }

  addTeacher(payload: any) {
    addDoc(this.docRef, payload).then(res => console.log(res))
  }

  getTeachers(): Observable<Teacher[]> {
    return collectionData(this.docRef, { idField: 'id' }) as Observable<Teacher[]>
  }

  updateTeacher(tid: string, payload: Teacher) {
    const teacherRef = doc(this.store, `teachers/${tid}`)
    setDoc(teacherRef, payload)
  }



  onEditTeacher(teacher: Teacher) {
    this.matDialog.open(TeacherDialogComponent, {
      data: teacher
    })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            if (confirm('Está seguro que quiere editar los datos del profesor?')) {
              //let response = persistenceFactory.TeacherManager.updateTeacher(teacher.id, value)
              value.active = (value.active === 'true' ? true : false)
              this.updateTeacher(teacher.id, value)
              /* if (response) {
                this.teacherList = [...persistenceFactory.TeacherManager.getTeachers()]
                //notification
                this.toast.success({ detail: 'Success', summary: `Teacher ${teacher.firstName} set sucessfully`, duration: 4000 })
              } else {
                //notification
                this.toast.error({ detail: 'Error', summary: "Couldn't update teacher" })
              } */
            }

          }
        },
      });
  }

  switchTeacherStatus(teacher: Teacher): void {
    const { id, active } = teacher
    if (confirm('Quiere cambiar el estado del profesor?')) {
      const teacherRef = doc(this.store, `teachers/${id}`)
      updateDoc(teacherRef, { active: !active })
      //setDoc(teacherRef,{'active' : !active})
      //notification
      //this.toast.success({ detail: 'Success', summary: `Set ${element.active ? 'active' : 'inactive'} teacher status!`, duration: 4000 })
    }
  }

}
