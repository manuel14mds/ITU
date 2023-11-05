import { Injectable } from '@angular/core';
import { CourseDialogComponent } from './utilComponents/course-dialog/course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import persistenceFactory from 'src/DAO/factory';
import { CourseType } from 'src/app/shared/types.s';



import { Firestore, collection, addDoc, collectionData, doc, setDoc, updateDoc } from '@angular/fire/firestore'

import { Observable } from 'rxjs';
import { Course } from 'src/app/model/course';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courseList: CourseType[] = []
  docRef = collection(this.store, 'courses')

  constructor(
    private matDialog: MatDialog,
    private toast: NgToastService,
    private store: Firestore,) {
      this.courseList = [...persistenceFactory.CourseManager.getCourses()]
      }

  openCourseDialog(): void {
    this.matDialog.open(CourseDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            
            let payload ={
                name: value.name,
                startDate: value.startDate,
                endDate: value.endDate,
                classes:[],
                students:[],
                teacher:'',
                active: value.active,
              }
              console.log(payload)

              this.addCourse(payload)

            /* if (course) {
              this.courseList = [...persistenceFactory.CourseManager.getCourses()]
              //notification
              this.toast.success({ detail: 'Success', summary: `Course ${course.name} added`, duration: 4000 })
            } else {
              //notification
              this.toast.error({ detail: 'Error', summary: "Couldn't add new course" })
            } */
          }
        }
      }
      )
  }

  addCourse(payload:any){
    addDoc(this.docRef, payload).then(res =>console.log(res))
  }

  getCourses():Observable<Course[]>{
    return collectionData(this.docRef, {idField:'id'}) as Observable<Course[]>
  }

  updateCourse(cid:string, payload:Course){
    const courseRef = doc(this.store, `courses/${cid}`)
    setDoc(courseRef, payload)
  }

  onEditCourse(course: Course): void {
    this.matDialog.open(CourseDialogComponent, {
      data: course
    })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {

            if (confirm('Está seguro que quiere editar los datos del curso?')) {
              value.active = (value.active === 'true' ? true : false)
              this.updateCourse(course.id, value)
              /* if (response) {
                this.courseList = [...persistenceFactory.CourseManager.getCourses()]
                //notification
                this.toast.success({ detail: 'Success', summary: `Course ${course.name} set sucessfully`, duration: 4000 })
              } else {
                //notification
                this.toast.error({ detail: 'Error', summary: "Couldn't update course" })
              } */
            }

          }
        },
      });
  }

  switchCourseStatus(course: Course): void {
    const {id, active} = course
    if (confirm('Quiere cambiar el estado del curso?')) {
      const courseRef = doc(this.store, `courses/${id}`)
      updateDoc(courseRef, {active: !active})
      /* if (result) {
        //notification
        this.toast.success({ detail: 'Success', summary: "Set course status!", duration: 4000 })
      } else {
        //notification
        this.toast.error({ detail: 'Error', summary: "Couldn't change the course's state" })
      } */

    }
  }
}


// casting Date to string MM/DD/YYY
function castDate(date:Date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return month + '/' + day + '/' + year;
}
