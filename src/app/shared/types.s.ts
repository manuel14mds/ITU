export type PersonType = {
    id:number
    firstName: string
    lastName: string
    age: number
    email: string
    active:boolean
}

export type StudentType = PersonType & {
    courses:number[]
}
export type TeacherType = PersonType & {
    profession:string
    courses:number[]
}
export type CourseType = {
    id:number
    name:string
    stardDate:string
    endDate:string
    active:boolean
}