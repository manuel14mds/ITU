export class Course {
    students:number[]=[]
    teachers:number[]=[]
    constructor(
        private id: number,
        private name: string,
        private startDate: string,
        private endDate: string,
    ){}

    addStudent(sid:number):void{
        this.students.push(sid) 
    }
    deleteStudent(sid:number):void{
        this.students = this.students.filter((el)=> el !== sid)
    }

    addTeacher(tid:number):void{
        this.teachers.push(tid) 
    }
    deleteTeacher(tid:number):void{
        this.teachers = this.teachers.filter((el)=> el !== tid)
    }


}