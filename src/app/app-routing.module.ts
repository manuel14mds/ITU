import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardGuard } from './guards/dashboard.guard';


const routes: Routes = [
  {
    path:'dashboard',
    canActivate:[dashboardGuard],
    loadChildren: ()=> import('./dashboard/dashboard.module').then((module)=>module.DashboardModule),
  },
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth.module').then((module)=>module.AuthModule),
  },
  {
    path: '**',
    redirectTo:'dashboard'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
