import persistenceFactory from "../factory";
export default class Statistics {
    studentStats = ()=>{
        const list = persistenceFactory.StudentManager.getStudents()
        let actives = 0
        let inactives = 0
        let totalAge = 0

        list.forEach(student=>{
            (student.active) ? actives++ : inactives++
            totalAge += student.age
        })
        if(list.length>0){
            return {
                actives,
                inactives,
                total:list.length,
                ageAverage:(totalAge / list.length),
                activesAverage:(actives / list.length) * 100
            }
        }else{
            return {
                actives:0,
                inactives:0,
                total:0,
                activesAverage:0
            }
        }
    }

    courseStats = ()=>{
        const list = persistenceFactory.CourseManager.getCourses()
        let actives = 0
        let inactives = 0

        list.forEach(course=>{
            (course.active) ? actives++ : inactives++

        })
        if(list.length>0){
            return {
                actives,
                inactives,
                total:list.length,
                activesAverage:(actives / list.length) * 100
            }
        }else{
            return {
                actives:0,
                inactives:0,
                total:0,
                activesAverage:0
            }
        }
    }

    teacherStats = ()=>{
        const list = persistenceFactory.TeacherManager.getTeachers()
        let actives = 0
        let inactives = 0
        let totalAge = 0

        list.forEach(teacher=>{
            (teacher.active) ? actives++ : inactives++
            totalAge += teacher.age
        })
        if(list.length>0){
            return {
                actives,
                inactives,
                total:list.length,
                ageAverage:(totalAge / list.length),
                activesAverage:(actives / list.length) * 100
            }
        }else{
            return {
                actives:0,
                inactives:0,
                total:0,
                activesAverage:0
            }
        }
    }
}
