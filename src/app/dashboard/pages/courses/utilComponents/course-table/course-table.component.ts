import { Component, Input } from '@angular/core';
import { CourseType } from 'src/app/shared/types.s';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent {
  @Input()
  dataSource: CourseType[] = [];

  displayedColumns = ['id', 'name', 'active', 'actions'];
}
