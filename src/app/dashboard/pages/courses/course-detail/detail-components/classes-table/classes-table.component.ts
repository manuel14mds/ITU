import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss']
})
export class ClassesTableComponent {
  displayedColumns: string[] = ['#', 'name', 'actions'];

  @Input()
  dataSource: { position: number; name: string }[] | undefined = [];

  constructor() {}
}
