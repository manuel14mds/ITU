import { Component, Input } from '@angular/core';
import { StudentType } from 'src/app/shared/types.s';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent {

  @Input()
  dataSource:StudentType[]=[]
  
  displayedColumns = ['id', 'name', 'age', 'email', 'active', 'actions'];
}
