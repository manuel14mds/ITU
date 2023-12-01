import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore'
import { catchError, Observable, of } from 'rxjs';
import { Course } from 'src/app/model/course';
import { Teacher } from 'src/app/model/teacher';
import { TeachersService } from '../teachers/teachers.service';

@Injectable()
export class CoursesService {
  docRef = collection(this.store, 'courses')

  constructor(private store: Firestore, private teacherService: TeachersService) { }

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

  assignTeacher(course: Course, teacher: Teacher) {
    if (!teacher.courses.includes(course.name)) {
      teacher.courses.push(course.name);
      this.teacherService.updateTeacher(teacher.id, teacher)
    }

    if (course.teacher !== (`${teacher.firstName} ${teacher.lastName}`)) {
      course.teacher = `${teacher.firstName} ${teacher.lastName}`;
      this.updateCourse(course.id, course)
    }
  }

  getTeachers(): Observable<Teacher[] | []> {
    const teachersObservable = this.teacherService.getTeachers()

    return teachersObservable.pipe(
      catchError(error => {
        console.error('Error al obtener los profesores', error);
        return of([]); // Devuelve un observable vacío en caso de error
      })
    );
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

