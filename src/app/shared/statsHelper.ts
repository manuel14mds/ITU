import { Course } from "../model/course"
import { Stats } from "../model/statistics"
import { Student } from "../model/student"
import { Teacher } from "../model/teacher"

export const statsMaker = (list: PayloadList, description: string): Stats => {
    try {
        let ages = 0

        let stats: StatsType = {
            actives: 0,
            inactives: 0,
            total: 0,
            activesAverage: 0,
        }
        list.forEach(item => {
            stats.total++
            item.active ? (stats.actives += 1) : (stats.inactives += 1)
            if ('age' in item) {
                ages += item.age
            }
        })

        if (list.length > 0) {
            stats.ageAverage = parseFloat((ages / stats.total).toFixed(1))
            stats.activesAverage = parseFloat((stats.actives / stats.total).toFixed(1)) * 100
        }


        return {
            description,
            stats
        }
    } catch (error) {
        console.log({ location: 'statsMaker()', error })
        return {
            description,
            stats: { actives: 0, inactives: 0, total: 0, activesAverage: 0 }
        }
    }
}

type StatsType = {
    actives: number,
    inactives: number,
    total: number,
    activesAverage: number,
    ages?: number
    ageAverage?: number
}

type PayloadList = Teacher[] | Student[] | Course[]