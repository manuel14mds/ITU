import { Component } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
  teachers = [
    {id: 'steak-0', name: 'Perez'},
    {id: 'pizza-1', name: 'Lopez'},
    {id: 'tacos-2', name: 'Gonzalez'},
  ];
}
