import { Person } from "./person"
export class Student extends Person{
    courses:number[] = []


    addCourse(cid:number):void{
        this.courses.push(cid) 
    }
    deleteCourse(cid:number):void{
        this.courses = this.courses.filter((el)=> el !== cid)
    }

}