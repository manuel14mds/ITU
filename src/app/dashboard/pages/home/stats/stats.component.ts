import { Component } from '@angular/core';
import { StatisticType } from 'src/app/shared/types.s';
import { StatsService } from './stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  data = {
    description: "Student",
    stats: {
      actives: 1,
      inactives: 1,
      total: 2
      , ageAverage: 21
    }
  }

  constructor() {


  }
}
