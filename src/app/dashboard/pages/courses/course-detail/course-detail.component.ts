import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';
import { Course } from 'src/app/model/course';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnDestroy{
  course$:Course|undefined = {} as Course
  courseId$:string= ''
  paramSubscription: Subscription
  courseSubscription: Subscription = new Subscription;
  teachers
  
  classes: { position: number; name: string }[] | undefined = []; 


  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    ){
      // Captura el ID de la URL
      this.paramSubscription = this.route.params.subscribe(params => {
        this.courseId$ = params['id'];

        // Asegurarse de que el ID no esté vacío antes de buscar el curso
        if (this.courseId$) {
          // Ahora puedes utilizar courseId para buscar el curso en la base de datos
          this.courseSubscription = this.coursesService.getCourseById(this.courseId$).subscribe(value => {
            this.course$ = value;
            this.classes = value?.classes.map((name, index) => ({ position: index + 1, name }))
          });
        }
      });

      this.teachers = this.coursesService.getTeachers()
    }


  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe()
    this.courseSubscription.unsubscribe()
  }
}
