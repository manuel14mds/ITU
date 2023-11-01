import { Component } from '@angular/core';
import { CourseType } from 'src/app/shared/types.s';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  dataSource:CourseType[]=[]

}
