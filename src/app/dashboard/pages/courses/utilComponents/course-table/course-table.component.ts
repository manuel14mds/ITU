import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseType } from 'src/app/shared/types.s';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent {
  @Input()
  dataSource: CourseType[] = [];

  @Output()
  switchCourseStatus = new EventEmitter<number>()

  @Output()
  editCourse = new EventEmitter<CourseType>()

  displayedColumns = ['id', 'name', 'active', 'actions'];
}
