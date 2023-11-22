import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoursesService } from '../../courses.service';
import { Course } from 'src/app/model/course';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent {
  courses:Course[] = []
  courseSubs:Subscription

  constructor(private courseService: CoursesService){
    this.courseSubs =  this.courseService.getCourses().subscribe(list => this.courses = list)
  }

  ngOnDestroy(){
    this.courseSubs.unsubscribe()
  }

  @Input()
  dataSource: Course[] = [];

  @Output()
  switchCourseStatus = new EventEmitter<Course>()

  @Output()
  editCourse = new EventEmitter<Course>()

  displayedColumns = ['id', 'name', 'teacher', 'active', 'actions'];
}
