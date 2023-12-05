import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, DocumentData, DocumentReference, Firestore, getDoc, getDocs, query, setDoc, UpdateData, updateDoc, where } from '@angular/fire/firestore'
import { from, map, Observable } from 'rxjs';
import { Student } from 'src/app/model/student';


@Injectable()
export class StudentsService {
  docRef = collection(this.store, 'students')

  constructor(private store: Firestore) { }


  addStudent(payload: any) {
    addDoc(this.docRef, payload)
  }

  getStudents(): Observable<Student[]> {
    return collectionData(this.docRef, { idField: 'id' }) as Observable<Student[]>
  }

  getStudentById(sid: string): Observable<Student | undefined> {
    const studentDocRef: DocumentReference<DocumentData> = doc(this.store, `students/${sid}`);

    return from(getDoc(studentDocRef)).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          return docSnapshot.data() as Student;
        } else {
          return undefined;
        }
      })
    );
  }

  async updateStudent(sid: string, payload: Student) {
    const studentRef = doc(this.store, `students/${sid}`);
    const { id, ...updatedPayload } = payload;
    await updateDoc(studentRef, { ...updatedPayload });
  }

  switchStudentStatus(student: Student): void {
    const { id, active } = student

    const studentRef = doc(this.store, `students/${id}`)
    updateDoc(studentRef, { active: !active })
  }

  getStudentsByCourse(courseName: string): Observable<Student[]> {
    const studentsQuery = query(
      this.docRef,
      where('courses', 'array-contains-any', [courseName])
    );

    const studentsObservable = new Observable<Student[]>((observer) => {
      getDocs(studentsQuery)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const studentsData = querySnapshot.docs.map((doc) => {
              const studentData = doc.data() as Student;
              return { ...studentData, id: doc.id };
            });

            observer.next(studentsData);
          } else {
            observer.next([]);
          }

          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });

    return from(studentsObservable);
  }


  getStudentsNotInCourse(courseName: string): Observable<Student[]> {
    return this.getStudents().pipe(
      map((students) => {
        return students
          .filter((student) => !student.courses.includes(courseName))
          .map((student) => ({ ...student, fullName: `${student.firstName} ${student.lastName}` }));
      })
    );
  }


}
