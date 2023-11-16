import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';

@Injectable()
export class TeachersService {

  docRef = collection(this.store, 'teachers')

  constructor(
    private store: Firestore
  ) { }


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

  switchTeacherStatus(teacher: Teacher): void {
    const { id, active } = teacher
    if (confirm('Quiere cambiar el estado del profesor?')) {
      const teacherRef = doc(this.store, `teachers/${id}`)
      updateDoc(teacherRef, { active: !active })
    }
  }

}
