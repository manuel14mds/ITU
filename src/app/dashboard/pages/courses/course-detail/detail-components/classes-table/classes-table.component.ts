import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassDialogComponent } from '../class-dialog/class-dialog.component';
import { Course } from 'src/app/model/course';
import { CoursesService } from '../../../courses.service';


@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss']
})
export class ClassesTableComponent {
  displayedColumns: string[] = ['#', 'name', 'actions'];

  @Input()
  dataSource: { position: number; name: string }[] | undefined = [];

  @Input() course: Course | undefined;

  @Output() refresh = new EventEmitter<boolean>();

  constructor(
    public dialog: MatDialog,
    private courseService: CoursesService,
  ) { }


  openAddClassDialog(): void {
    const dialogRef = this.dialog.open(ClassDialogComponent, {
      data: { course: this.course }
    })

    dialogRef.afterClosed().subscribe(() => {
      this.refreshCourse()
    })
  }

  deleteClass(className: string): void {
    const { id, ...payload } = this.course as any
    payload.classes = payload.classes.filter((item: string) => item !== className)
    this.courseService.updateCourse(id, payload)
    this.refreshCourse()
  }

  refreshCourse(): void {
    this.refresh.emit(true);
  }

}
