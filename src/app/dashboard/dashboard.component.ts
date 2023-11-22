import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showFiller = false;
  user:User|null = null

  authService = inject(AuthService, )

  constructor(private router : Router){
    this.authService.authUser$.subscribe(value => this.user = value)
  }

  logout(){
    this.authService.logOut()
    this.router.navigate(['/auth/login'])
  }

}
