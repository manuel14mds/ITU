import { Injectable } from '@angular/core';
import { StatisticType } from 'src/app/shared/types.s';
import { statsMaker } from 'src/app/shared/statsHelper'
import type { StudentType } from 'src/app/shared/types.s';


const mockStudents: StudentType[] = [
  {
    id: 1,
    firstName: "Emily",
    lastName: "Johnson",
    age: 20,
    email: "emily@example.com",
    active: true,
    courses: [101, 201]
  },
  {
    id: 2,
    firstName: "Michael",
    lastName: "Brown",
    age: 22,
    email: "michael@example.com",
    active: false,
    courses: [102, 202]
  }
];


@Injectable({
  providedIn: 'root'
})

export class StatsService {

  constructor() { }

  getDataStats(): StatisticType | null {
    return statsMaker(mockStudents, 'student')
  }
}
