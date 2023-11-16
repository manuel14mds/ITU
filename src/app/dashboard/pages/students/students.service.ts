import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, setDoc, UpdateData, updateDoc } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
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

  updateStudent(sid: string, payload: Student) {
    const studentRef = doc(this.store, `students/${sid}`)
    setDoc(studentRef, payload)
  }

  switchStudentStatus(student: Student): void {
    const { id, active } = student
    if (confirm('Quiere cambiar el estado del estudiante?')) {
      const studentRef = doc(this.store, `students/${id}`)
      updateDoc(studentRef, { active: !active })
    }
  }
}
