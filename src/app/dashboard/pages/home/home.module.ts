import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    HomeComponent,
    StatsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressSpinnerModule,
    HomeRoutingModule,
  ],
  exports:[
    HomeComponent,
  ],
  providers:[
    HomeService,
  ]
})
export class HomeModule { }
