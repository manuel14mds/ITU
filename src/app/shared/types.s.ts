export type PersonType = {
    id: number
    firstName: string
    lastName: string
    age: number
    email: string
    active: boolean
}

export type StudentType = PersonType & {
    courses: number[]
}
export type TeacherType = PersonType & {
    profession: string
    courses: number[]
}
export type CourseType = {
    id: number
    name: string
    startDate: string
    endDate: string
    active: boolean
    students: StudentType[]
    teachers: TeacherType[]
}
export type StatisticType = {
    description: string,
    stats: {
        actives: number,
        inactives: number,
        ageAverage?: number,
        activesAverage:number
        total: number,
    }
}
export type EntityList = TeacherType[] | StudentType[] | CourseType[]
