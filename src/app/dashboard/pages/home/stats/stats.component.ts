import { Component, Input } from '@angular/core';
import { StatisticType } from 'src/app/shared/types.s';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  @Input()
  dataSource: StatisticType ={} as StatisticType

  constructor() {
  }
}
