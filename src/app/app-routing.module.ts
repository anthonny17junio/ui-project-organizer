import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoggedGuard } from './guards/logged.guard';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path:'',
  redirectTo: '/login',
  pathMatch: 'full'
  },
  {path:'login', component:LoginComponent, canActivate: [AuthGuardGuard]},
  {path:'projects', component:ProjectsComponent, canActivate: [LoggedGuard]},
  {path:'tasks', component:TasksComponent, canActivate: [LoggedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
