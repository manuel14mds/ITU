import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { NgToastModule } from 'ng-angular-popup'
import { Student } from 'src/app/model/student'
import { SharedModule } from 'src/app/shared/shared.module'

import { StudentsMockService } from './students-mock.service'
import { StudentsComponent } from './students.component'
import { StudentsService } from './students.service'
import { StudentTableComponent } from './utilComponents/student-table/student-table.component'

describe('student Component', () => {
    let studentsComponent: StudentsComponent
    let fixture: ComponentFixture<StudentsComponent>
    let studentService: StudentsService

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [StudentsComponent, StudentTableComponent],
            imports: [SharedModule, NgToastModule],
            providers: [
                {
                    provide: StudentsService,
                    useClass: StudentsMockService
                }
            ]
        })
        fixture = TestBed.createComponent(StudentsComponent)
        studentsComponent = fixture.componentInstance
        studentService = studentsComponent.studentsService

    })

    it('should create student component', () => {
        expect(studentsComponent).toBeTruthy()
    })

    it('should call openStudentDialog() when the button "Add Student" is clicked', () => {
        const createStudentSpy = spyOn(studentService, 'openStudentDialog');

        const button = fixture.debugElement.query(By.css('.addBtn'));
        button.triggerEventHandler('click', null);

        expect(createStudentSpy).toHaveBeenCalled();
    })

    it('getStudents() should return a list of students', (done: DoneFn) => {
        studentService.getStudents().subscribe((students: Student[]) => {
            const expectedStudent: Student = {
                id: 'qwertyu',
                email: 'cristian@mail.com',
                firstName: 'Cristian',
                lastName: 'Ovejero',
                courses: [],
                age: 30,
                active: true,
                DNI: 1356789
            };

            expect(students).toEqual(jasmine.any(Array));
            expect(students).toContain(expectedStudent);

            done();
        });
    });

    it('should display the student table', () => {
        const tableFixture = TestBed.createComponent(StudentsComponent);
        const compiled = tableFixture.debugElement.nativeElement;

        // Busca el componente de la tabla usando tu selector personalizado
        const studentTable = compiled.querySelector('.student-table');

        // Verifica que el componente de la tabla exista en el DOM
        expect(studentTable).toBeDefined();

        // También puedes realizar más verificaciones según la estructura del componente
        // Por ejemplo, verificar la existencia de elementos dentro del componente.

        // ... otras verificaciones ...

        tableFixture.destroy();
    });



})