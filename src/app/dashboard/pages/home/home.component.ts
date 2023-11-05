import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { Stats } from 'src/app/model/statistics';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  studentStats: Stats = {stats:{}} as Stats
  teacherStats: Stats = {stats:{}} as Stats
  courseStats: Stats = {stats:{}} as Stats

  studentSubs:Subscription
  teacherSubs:Subscription
  courseSubs:Subscription

  constructor(public homeService: HomeService){
    this.studentSubs = this.homeService.studentStats$.subscribe(res =>this.studentStats = res )
    this.teacherSubs= this.homeService.teacherStats$.subscribe(res => this.teacherStats = res)
    this.courseSubs = this.homeService.courseStats$.subscribe(res => this.courseStats = res)
  }

  ngOnDestroy(){
    this.studentSubs.unsubscribe()
    this.teacherSubs.unsubscribe()
    this.courseSubs.unsubscribe()
  }

}
