import { Component, Input } from '@angular/core';
import { Stats } from 'src/app/model/statistics';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent {
  constructor() {}

  @Input()
  dataSource: Stats={stats:{}} as Stats

}
