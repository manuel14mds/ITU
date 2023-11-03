import { CourseType } from "src/app/shared/types.s"

import MemoryContainer from "./MemoryContainer"

export default class Course extends MemoryContainer {
    constructor() {
        super()
    }

    // create a new course
    create = (course: any): CourseType | false => {
        let list = this.getCourses()
        if (list.length === 0) {
            course.id = 1
        } else {
            course.id = list[list.length - 1].id + 1
        }
        course.active = (course.active === 'true' ? true : false)
        course.students = []
        course.teachers = []

        if (this.saveCourse(course)) {
            return course
        } else {
            return false
        }
    }

    //update course
    updateCourse = (cid:number, newData:any):CourseType|false=>{
        let list = this.getCourses()
        let index = list.findIndex((course)=>course.id === cid)

        if(index === -1){
            return false
        }else{
            list[index] = {...list[index], ...newData}
            this.setCourses(list)
            return list[index]
        }
    }

    //change the curse's status
    switchCourseStatus=(cid:number):boolean=>{
        let list = this.getCourses()
        let index = list.findIndex((course)=>course.id === cid)

        if(index === -1){
            return false
        }else{
            list[index].active = !list[index].active
            this.setCourses(list)
            return true
        }
    }

    // +++ Courses basic methods
    // return course's list
    getCourses = ():CourseType[] =>{
        return this.data.courses as CourseType[]
    }
    // set course list
    private setCourses = (newList: CourseType[]) => {
        this.data.courses = newList
        return true
    }
    // save one course into course's list
    private saveCourse = (course:CourseType):CourseType =>{
        this.data.courses.push(course)
        return course
    }

}
