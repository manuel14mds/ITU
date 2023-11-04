import { Injectable } from '@angular/core';
import persistenceFactory from 'src/DAO/factory';
import { StatisticType } from 'src/app/shared/types.s';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  studentStats:StatisticType={} as StatisticType
  courseStats:StatisticType={} as StatisticType
  teacherStats:StatisticType={} as StatisticType

  constructor() { 
    this.studentStats = this.getStudentStats()
    console.log(this.studentStats)
    this.teacherStats = this.getTeacherStats()
    console.log(this.teacherStats)
    this.courseStats =  this.getCourseStats()
    console.log(this.courseStats)
  }
  private getStudentStats=():StatisticType=>{
    return {
      description:'Student',
      stats:persistenceFactory.HomeStats.studentStats()
    }
  }
  private getTeacherStats=():StatisticType=>{
    return {
      description:'Teacher',
      stats:persistenceFactory.HomeStats.teacherStats()
    }
  }
  private getCourseStats=():StatisticType=>{
    return {
      description:'Course',
      stats:persistenceFactory.HomeStats.courseStats()
    }
  }

}
