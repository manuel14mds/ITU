import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Course } from 'src/app/model/course';

@Injectable()
export class CoursesService {
  docRef = collection(this.store, 'courses')

  constructor(private store: Firestore) { }

  addCourse(payload: any) {
    addDoc(this.docRef, payload).then(res => console.log(res))
  }

  getCourses(): Observable<Course[]> {
    return collectionData(this.docRef, { idField: 'id' }) as Observable<Course[]>
  }

  updateCourse(cid: string, payload: Course) {
    const courseRef = doc(this.store, `courses/${cid}`)
    setDoc(courseRef, payload)
  }

  switchCourseStatus(course: Course): void {
    const { id, active } = course
    if (confirm('Quiere cambiar el estado del curso?')) {
      const courseRef = doc(this.store, `courses/${id}`)
      updateDoc(courseRef, { active: !active })
    }
  }
}


// casting Date to string MM/DD/YYY
function castDate(date: Date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return month + '/' + day + '/' + year;
}
