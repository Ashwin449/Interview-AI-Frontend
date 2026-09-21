import { Routes } from '@angular/router';
import { AppShellComponent } from './Shared/app-shell/app-shell.component';
import { DashboardUserComponent } from './Features/dashboard-user/dashboard-user.component';
import { InterviewUserComponent } from './Features/interview-user/interview-user.component';
import { ResumeComponent } from './Features/resume/resume.component';
import { ResultsComponent } from './Features/results/results.component';
import { ProfileComponent } from './Features/profile/profile.component';
import { LoginComponent } from './Features/login/login.component';

export const routes: Routes = [
  {
  path: 'login',
  component: LoginComponent,
},
{
  path: 'register',
  redirectTo: 'login', 
},
{ path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: 'dashboard', component: DashboardUserComponent },
      { path: 'resume', component: ResumeComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },

  { path: 'interviews', component: InterviewUserComponent },
];