export interface Course {
    id:string
    name: string
    startDate:Date
    endDate:string
    classes:string[]
    students:string[]
    teacher:string
    active:boolean
}