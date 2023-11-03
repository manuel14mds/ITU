import Student from './memoryDAO/Student'
import Teacher from './memoryDAO/Teacher'
import Course from './memoryDAO/Course'

const persistence = 'MEMORY'
const StudentManager = new Student
const TeacherManager = new Teacher 
const CourseManager = new Course

/* switch(persistence){
    case 'MEMORY':
        const {default:MemoryStudent} = await import('./memoryDAO/Student')
        StudentManager = new MemoryStudent()
        break
} */

const persistenceFactory = {
    StudentManager,
    TeacherManager,
    CourseManager,
}
export default persistenceFactory
