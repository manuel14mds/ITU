
import Student from './memoryDAO/Student'
const persistence = 'MEMORY'
let StudentManager = new Student

/* switch(persistence){
    case 'MEMORY':
        const {default:MemoryStudent} = await import('./memoryDAO/Student')
        StudentManager = new MemoryStudent()
        break
} */

const persistenceFactory = {
    StudentManager,
}
export default persistenceFactory
