import { Person } from "./person";

export interface Teacher extends Person{
    profession: string
    courses: string[]
}