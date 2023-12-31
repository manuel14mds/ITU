import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docSnapshots, DocumentData, DocumentReference, Firestore, getDoc, getDocs, query, QueryDocumentSnapshot, setDoc, updateDoc, where } from '@angular/fire/firestore'
import { from, map, Observable } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';

@Injectable()
export class TeachersService {

  docRef = collection(this.store, 'teachers')

  constructor(
    private store: Firestore
  ) { }


  addTeacher(payload: any) {
    return addDoc(this.docRef, payload)
  }

  getTeachers(): Observable<Teacher[]> {
    return collectionData(this.docRef, { idField: 'id' }) as Observable<Teacher[]>
  }

  getTeacherById(tid: string): Observable<Teacher | undefined> {
    const teacherDocRef: DocumentReference<DocumentData> = doc(this.store, `teachers/${tid}`)
    return from(getDoc(teacherDocRef)).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          return docSnapshot.data() as Teacher
        } else {
          return undefined
        }
      })
    )
  }

  updateTeacher(tid: string, payload: Teacher) {
    const teacherRef = doc(this.store, `teachers/${tid}`)
    const { id, ...updatedPayload } = payload;
    setDoc(teacherRef, updatedPayload)
  }

  switchTeacherStatus(teacher: Teacher): void {
    const { id, active } = teacher

    const teacherRef = doc(this.store, `teachers/${id}`)
    updateDoc(teacherRef, { active: !active })

  }

  async unassignCourse(course: any) {
    const docSnapshot = this.getTeacherByName(course.teacher)

    await docSnapshot.then(value => {
      const teacherData = value?.data()
      const teacherId = value?.id

      if (teacherId && teacherData) {
        teacherData['courses'] = teacherData['courses'].filter((item: string) => item !== course.name)

        this.updateTeacher(teacherId, teacherData as Teacher)
      }
    })
  }

  async getTeacherByName(name: string) {
    const [firstName, lastName] = name.split(' ');
    const teachersQuery = query(
      this.docRef,
      where('firstName', '==', firstName),
      where('lastName', '==', lastName)
    )

    try {
      const querySnapshot = await getDocs(teachersQuery)

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0]
        return docSnapshot
      } else {
        return undefined
      }
    } catch (error) {
      return undefined
    }
  }

}
