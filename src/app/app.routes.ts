import { Routes } from '@angular/router';
import { AppShellComponent } from './shared/app-shell/app-shell.component';
import { DashboardUserComponent } from './Features/dashboard-user/dashboard-user.component';
import { InterviewUserComponent } from './Features/interview-user/interview-user.component';
import { ResumeComponent } from './Features/resume/resume.component';
import { ResultsComponent } from './Features/results/results.component';
import { ProfileComponent } from './Features/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardUserComponent },
      { path: 'resume', component: ResumeComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  // Full-screen, no sidebar — the immersive interview session shouldn't carry the app chrome.
  { path: 'interviews', component: InterviewUserComponent },
];