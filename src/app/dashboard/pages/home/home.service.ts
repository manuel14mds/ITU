import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore'
import { map, Observable } from 'rxjs';
import { Course } from 'src/app/model/course';
import { Stats } from 'src/app/model/statistics';
import { Student } from 'src/app/model/student';
import { Teacher } from 'src/app/model/teacher';
import { statsMaker } from 'src/app/shared/statsHelper';

@Injectable()

export class HomeService {
  //entity statistics
  studentStats$: Observable<Stats>;
  teacherStats$: Observable<Stats>;
  courseStats$: Observable<Stats>;

  constructor(private store: Firestore) { 
    this.studentStats$ = this.generateStudentStats()
    this.teacherStats$ = this.generateTeacherStats()
    this.courseStats$ = this.generateCourseStats()
  }

  // get firebase entities
  private getStudents=():Observable<Student[]>=>{
    const collectionRef = collection(this.store, 'students')
    return collectionData(collectionRef) as Observable<Student[]>
  }
  private getTeachers=():Observable<Teacher[]>=>{
    const collectionRef = collection(this.store, 'teachers')
    return collectionData(collectionRef) as Observable<Teacher[]>
  }
  private getCourses=():Observable<Course[]>=>{
    const collectionRef = collection(this.store, 'courses')
    return collectionData(collectionRef) as Observable<Course[]>
  }


  private generateStudentStats = (): Observable<Stats> => {
    return this.getStudents().pipe(
      map(students => {
        return statsMaker(students, 'Student');
      })
    );
  }
  private generateTeacherStats = (): Observable<Stats> => {
    return this.getTeachers().pipe(
      map(teachers => {
        return statsMaker(teachers, 'Teacher');
      })
    );
  }
  private generateCourseStats = (): Observable<Stats> => {
    return this.getCourses().pipe(
      map(courses => {
        return statsMaker(courses, 'Course');
      })
    );
  }

}