import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TeachersComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[
    TeachersComponent,
  ]
})
export class TeachersModule { }
