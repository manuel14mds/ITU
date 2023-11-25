import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore'

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
  getTeachers(){
    const docRef = collection(this.store, 'teachers')
    return collectionData(this.docRef, { idField: 'id' })
  }
  getCourseById(courseId: string): Observable<Course | undefined> {
    const courseDocRef = doc(this.store, 'courses', courseId);
    
    return new Observable<Course | undefined>((observer) => {
      getDoc(courseDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const courseData = docSnapshot.data() as Course;
            const courseWithId = { ...courseData, id: courseId };
            observer.next(courseWithId);
          } else {
            observer.next(undefined); // Si no se encuentra el curso, emitir undefined
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error); // Manejar errores si hay problemas al obtener el curso
        });
    });
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
