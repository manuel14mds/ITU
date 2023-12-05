import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore'
import { catchError, Observable, of } from 'rxjs';
import { Course } from 'src/app/model/course';
import { Teacher } from 'src/app/model/teacher';
import { TeachersService } from '../teachers/teachers.service';

@Injectable()
export class CoursesService {
  docRef = collection(this.store, 'courses')

  constructor(private store: Firestore, private teacherService: TeachersService) { }

  addCourse(payload: any) {
    return addDoc(this.docRef, payload)
  }

  getCourses(): Observable<Course[]> {
    return collectionData(this.docRef, { idField: 'id' }) as Observable<Course[]>
  }

  updateCourse(cid: string, payload: Course) {
    const courseRef = doc(this.store, `courses/${cid}`)
    const { id, ...updatedPayload } = payload;
    setDoc(courseRef, updatedPayload)
  }

  assignTeacher(course: Course, teacher: Teacher) {

    if (course.teacher !== (`${teacher.firstName} ${teacher.lastName}`)) {

      if (teacher) {
        this.teacherService.unassignCourse(course)
      }


      course.teacher = `${teacher.firstName} ${teacher.lastName}`;
      this.updateCourse(course.id, course)
    }

    if (!teacher.courses.includes(course.name)) {
      teacher.courses.push(course.name);
      this.teacherService.updateTeacher(teacher.id, teacher)
    }
  }

  getTeachers(): Observable<Teacher[] | []> {
    const teachersObservable = this.teacherService.getTeachers()

    return teachersObservable.pipe(
      catchError(error => {
        console.error('Error al obtener los profesores', error);
        return of([]);
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
            observer.next(undefined);
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error); // Manejar errores si hay problemas al obtener el curso
        });
    });
  }

  clearTeacher(courseName: string): void {
    this.getCourseByName(courseName).subscribe((course) => {
      if (course) {
        // Curso encontrado, actualizar el campo teacher con un string vacío
        course.teacher = '';
        this.updateCourse(course.id, course);
      } else {
        // El curso no fue encontrado
        console.error('Curso no encontrado');
      }
    });
  }
  

  private getCourseByName(courseName: string): Observable<Course | undefined> {
    const queryRef = query(this.docRef, where('name', '==', courseName));
  
    return new Observable<Course | undefined>((observer) => {
      getDocs(queryRef)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const courseDoc = querySnapshot.docs[0];
            const courseData = courseDoc.data() as Course;
            const courseWithId = { ...courseData, id: courseDoc.id };
            observer.next(courseWithId);
          } else {
            observer.next(undefined);
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
    
    const courseRef = doc(this.store, `courses/${id}`)
    updateDoc(courseRef, { active: !active })
  }
}

