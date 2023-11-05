import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseType } from 'src/app/shared/types.s';
import { CoursesService } from '../../courses.service';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent {
  courses:Course[] = []

  constructor(private courseService: CoursesService){}

  ngOnInit():void{
    this.courseService.getCourses().subscribe(list => this.courses = list)
  }

  @Input()
  dataSource: CourseType[] = [];

  @Output()
  switchCourseStatus = new EventEmitter<Course>()

  @Output()
  editCourse = new EventEmitter<Course>()

  displayedColumns = ['id', 'name', 'active', 'actions'];
}
