import { Routes } from '@angular/router';
import { AppShellComponent } from './Shared/app-shell/app-shell.component';
import { DashboardUserComponent } from './Features/dashboard-user/dashboard-user.component';
import { InterviewUserComponent } from './Features/interview-user/interview-user.component';
import { ResumesComponent } from './Features/resume/resume.component';
import { ResultsComponent } from './Features/results/results.component';
import { ProfileComponent } from './Features/profile/profile.component';
import { LoginComponent } from './Features/login/login.component';
// import { authGuard } from './core/guards/auth.guard'; // see note below

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', redirectTo: 'login', pathMatch: 'full' },

  // Exact-empty-path redirect must come BEFORE the shell route below,
  // since both use path: '' and Angular matches in array order.
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    component: AppShellComponent,
    // canActivate: [authGuard], // protect every child below in one place
    children: [
      { path: 'dashboard', component: DashboardUserComponent },
      { path: 'resume', component: ResumesComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'interviews', component: InterviewUserComponent }, // now inside the shell
    ],
  },
];