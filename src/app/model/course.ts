export interface Course {
    id:string
    name: string
    startDate:Date
    endDate:Date
    classes:string[]
    students:string[]
    teacher:string
    active:boolean
}