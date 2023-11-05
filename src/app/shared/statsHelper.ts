import { Stats } from "../model/statistics";

export const statsMaker =  (list:any[], description:string):Stats=>{
    try {
        let ages = 0
        
        let stats:any = {
            actives:0,
            inactives:0,
            total:0,
            activesAverage:0,
        }
        list.forEach(item=>{
            stats.total++
            item.active? (stats.actives += 1) : (stats.inactives += 1)
            if('age' in item){
                ages += item.age
            }
        })

        if(list.length > 0){
            stats.ageAverage=(ages / stats.total)
            stats.activesAverage = (stats.actives / stats.total) * 100
        }

        return {
            description,
            stats
        }
    } catch (error) {
        console.log({location:'statsMaker()', error})
        return {
            description, 
            stats: {actives:0, inactives:0, total:0, activesAverage:0}
        }
    }
}