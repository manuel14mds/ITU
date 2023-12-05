import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ActivePipe } from './pipes/active.pipe';
import { ErrorsPipe } from './pipes/errors.pipe';
import { FullnamePipe } from './pipes/fullname.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider'
import { TimestampToDatePipe } from './pipes/date.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from './confirm/confirm-dialog.component';
import { ConfirmDialogService } from './confirm/confirm-dialog.service';
@NgModule({
  declarations: [
    ActivePipe,
    ErrorsPipe,
    FullnamePipe,
    TimestampToDatePipe,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ActivePipe,
    ErrorsPipe,
    FullnamePipe,
    TimestampToDatePipe,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    ConfirmDialogComponent
  ],
  providers:[
    ConfirmDialogService,
  ]
})
export class SharedModule { }
