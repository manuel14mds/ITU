import { StudentType } from "src/app/shared/types.s"
import MemoryContainer from "./MemoryContainer"
/* type StudentPayload={
    firstName:string
    lastName:string
    active:string
    email:string
    age:number
    id?:number
    courses?:[]
} */


export default class Student extends MemoryContainer {
    constructor() {
        super()
    }

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




}
