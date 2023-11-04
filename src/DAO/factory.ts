import Student from './memoryDAO/Student'
import Teacher from './memoryDAO/Teacher'
import Course from './memoryDAO/Course'
import Statistics from './memoryDAO/Stats'

const persistence = 'MEMORY'
const StudentManager = new Student
const TeacherManager = new Teacher 
const CourseManager = new Course
const HomeStats = new Statistics

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
    HomeStats,
}
export default persistenceFactory
