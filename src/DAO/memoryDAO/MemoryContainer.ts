import type { StudentType, CourseType, TeacherType } from "src/app/shared/types.s"

type Data = {students:StudentType[],  courses:CourseType[],  teachers:TeacherType[]}

export default class MemoryContainer {
    public data: Data;

    constructor() {
        this.data = {students:[], courses:[], teachers:[]};
    }

    getAll = (): Data => {
        return this.data;
    };





    





}
