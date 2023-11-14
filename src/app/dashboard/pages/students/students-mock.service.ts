import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Student } from "src/app/model/student";

@Injectable()
export class StudentsMockService {
    student: Student = {
        id:'qwertyu',
        email:'cristian@mail.com',
        firstName: 'Cristian',
        lastName: 'Ovejero',
        courses:[],
        age:30,
        active:true,
        DNI:1356789
    }


    openStudentDialog(): void {}

    addStudent(payload: any) {}

    getStudents(): Observable<Student[]> {
        const list =[
            this.student,
        ]
        return of(list)
    }

    updateStudent(sid: string, payload: Student) {

    }

    onEditStudent(student: Student): void {
        if(Object.keys(student).length === 0){
            this.updateStudent('', student)
        }else{
            console.error('user with blank fields')
        }
    }

    switchStudentStatus(student: Student): void {}

}