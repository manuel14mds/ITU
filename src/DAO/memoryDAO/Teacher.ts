import { TeacherType } from "src/app/shared/types.s"

import MemoryContainer from "./MemoryContainer"

export default class Teacher extends MemoryContainer {
    constructor() {
        super()
    }

    //create a new teacher
    create = (teacher: any): TeacherType | false => {
        let list = this.getTeachers()
        if (list.length === 0) {
            teacher.id = 1
        } else {
            teacher.id = list[list.length - 1].id + 1
        }
        teacher.active = (teacher.active === 'true' ? true : false)
        teacher.courses = []

        if (this.saveTeacher(teacher)) {
            return teacher
        } else {
            return false
        }
    }

    //update teacher
    updateTeacher = (tid:number, newData:any):TeacherType|false=>{
        let list = this.getTeachers()
        let index = list.findIndex((teacher)=>teacher.id === tid)

        if(index === -1){
            return false
        }else{
            list[index] = {...list[index], ...newData}
            this.setTeachers(list)
            return list[index]
        }
    }

    //change the teacher's status
    switchTeacherStatus = (tid:number) =>{
        let list = this.getTeachers()
        let index = list.findIndex((teacher)=>teacher.id===tid)

        if(index === -1){
            return false
        }
        else{
            list[index].active = !list[index].active
            this.setTeachers(list)
            return true
        }
    }

    // +++ Teachers basic methods
    // return teacher's list
    getTeachers = ():TeacherType[] =>{
        return this.data.teachers as TeacherType[]
    }
    // set teacher list
    private setTeachers = (newList: TeacherType[]) => {
        this.data.teachers = newList
        return true
    }
    // save one teacher into teacher's list
    private saveTeacher = (teacher:TeacherType):TeacherType =>{
        this.data.teachers.push(teacher)
        return teacher
    }




}
