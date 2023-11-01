import { Component, Input } from '@angular/core';
import { TeacherType } from 'src/app/shared/types.s';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.scss']
})
export class TeacherTableComponent {

  @Input()
  dataSource:TeacherType[]=[]

  displayedColumns = ['id', 'name', 'profession', 'email', 'active', 'actions'];
}
