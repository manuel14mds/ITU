import { EntityList, StatisticType } from "./types.s";

export const statsMaker =  (list:EntityList, description:string):StatisticType|null=>{
    try {
        let ages = 0
        let ageAverage = 0
        
        const stats:any = {
            actives:0,
            inactives:0,
            total:0
        }
        list.forEach(item=>{
            stats.total++
            item.active? (stats.actives += 1) : (stats.inactives += 1)
            if('age' in item){
                ages +=item.age
            }
        })
        if(ages>0){
            ageAverage = ages / stats.total
            stats.ageAverage=ageAverage
        }
        return {
            description,
            stats
        }
    } catch (error) {
        console.log({location:'statsMaker()', error})
        return null
    }
}