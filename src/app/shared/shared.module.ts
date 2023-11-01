import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; 
import { ActivePipe } from './pipes/active.pipe';
import { ErrorsPipe } from './pipes/errors.pipe';
import { FullnamePipe } from './pipes/fullname.pipe';
import { MatTableModule } from '@angular/material/table'; 

@NgModule({
  declarations: [
    ActivePipe,
    ErrorsPipe,
    FullnamePipe,
  ],
  imports: [
    CommonModule,
    
  ],
  exports:[
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ActivePipe,
    ErrorsPipe,
    FullnamePipe,
    MatTableModule,
  ]
})
export class SharedModule { }
