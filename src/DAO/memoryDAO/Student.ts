import { StudentType } from "src/app/shared/types.s"

import MemoryContainer from "./MemoryContainer"

export default class Student extends MemoryContainer {
    constructor() {
        super()
    }

    // create a new student
    create = (student: any): StudentType | false => {
        let list = this.getStudents()
        if (list.length === 0) {
            student.id = 1
        } else {
            student.id = list[list.length - 1].id + 1
        }
        student.active = (student.active === 'true' ? true : false)
        student.courses = []

        if (this.saveStudent(student)) {
            return student
        } else {
            return false
        }
    }

    //update student
    updateStudent = (sid:number, newData:any):StudentType|false=>{
        let list = this.getStudents()
        let index = list.findIndex((student)=>student.id === sid)

        if(index === -1){
            return false
        }else{
            list[index] = {...list[index], ...newData}
            this.setStudents(list)
            return list[index]
        }
    }

    // +++ Students basic methods
    // return student's list
    getStudents = ():StudentType[] =>{
        return this.data.students as StudentType[]
    }
    // set student's list
    private setStudents = (newList: StudentType[]) => {
        this.data.students = newList
        return true
    }
    // save one student into student list
    private saveStudent = (student:StudentType):StudentType =>{
        this.data.students.push(student)
        return student
    }




}
