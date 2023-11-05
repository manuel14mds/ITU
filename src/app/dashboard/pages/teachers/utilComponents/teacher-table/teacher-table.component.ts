import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeacherType } from 'src/app/shared/types.s';
import { TeachersService } from '../../teachers.service';
import { Teacher } from 'src/app/model/teacher';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.scss']
})
export class TeacherTableComponent {
  teachers:Teacher[]=[]

  constructor(private teacherService:TeachersService){
  }
  ngOnInit():void{
    this.teacherService.getTeachers().subscribe((list)=> this.teachers=list )
  }

  @Output()
  switchTeacherStatus = new EventEmitter<Teacher>()

  @Output()
  editTeacher = new EventEmitter<Teacher>()

  displayedColumns = ['id', 'name', 'profession', 'email', 'active', 'actions'];
}
