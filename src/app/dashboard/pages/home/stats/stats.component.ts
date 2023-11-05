import { Component, Input } from '@angular/core';
import { StatisticType } from 'src/app/shared/types.s';

import { HomeService } from '../home.service';
import { Stats } from 'src/app/model/statistics';
import { Observable, Subscription } from 'rxjs';
import { StatsService } from './stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent {

  constructor() {

  }

  @Input()
  dataSource: Stats={stats:{}} as Stats

  ngOnInit(){
  }

  ngOnDestroy(){
    //
  }
}
