import { Injectable } from '@angular/core';
import { statsMaker } from 'src/app/shared/statsHelper'
import { StatisticType } from 'src/app/shared/types.s';

import type { StudentType } from 'src/app/shared/types.s';
import { HomeService } from '../home.service';
import { Observable, map } from 'rxjs';
import { Stats } from 'src/app/model/statistics';
import { Student } from 'src/app/model/student';



@Injectable({
  providedIn: 'root'
})

export class StatsService {


  constructor(private homeService: HomeService) { 
  }




}
