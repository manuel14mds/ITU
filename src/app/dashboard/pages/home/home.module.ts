import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatsComponent } from './stats/stats.component';



@NgModule({
  declarations: [
    HomeComponent,
    StatsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[
    HomeComponent,
  ]
})
export class HomeModule { }
