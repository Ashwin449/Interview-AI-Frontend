import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

interface StatCard {
  label: string;
  value: string;
  icon: 'briefcase' | 'trending' | 'star' | 'clock';
  tone: 'purple' | 'green' | 'orange' | 'blue';
}

interface SkillTag {
  name: string;
}

interface ActivityItem {
  title: string;
  score: number;
  timeAgo: string;
  icon: 'backend' | 'frontend' | 'system';
}

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink, RouterLinkActive],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss'
})

export class DashboardUserComponent {
  readonly userName = 'Alex Johnson';
  readonly firstName = 'Alex';

  readonly navItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'home' },
    { label: 'Resume', route: '/resume', icon: 'file' },
    { label: 'Interviews', route: '/interviews', icon: 'mic' },
    { label: 'Results', route: '/results', icon: 'check-circle' },
    { label: 'Profile', route: '/profile', icon: 'user' },
  ] as const;

  readonly stats: StatCard[] = [
    { label: 'Interviews Completed', value: '3', icon: 'briefcase', tone: 'purple' },
    { label: 'Average Score', value: '78%', icon: 'trending', tone: 'green' },
    { label: 'Skills Practiced', value: '5', icon: 'star', tone: 'orange' },
    { label: 'Total Practice Time', value: '4.2 hrs', icon: 'clock', tone: 'blue' },
  ];

  readonly skills: SkillTag[] = [
    { name: 'Angular' },
    { name: 'FastAPI' },
    { name: 'PostgreSQL' },
    { name: 'REST APIs' },
    { name: 'Docker' },
    { name: 'Git' },
  ];

  readonly recentActivity: ActivityItem[] = [
    { title: 'Backend Interview', score: 82, timeAgo: '2 days ago', icon: 'backend' },
    { title: 'Frontend Interview', score: 76, timeAgo: '1 week ago', icon: 'frontend' },
    { title: 'System Design', score: 68, timeAgo: '1 week ago', icon: 'system' },
  ];

  onStartNewInterview(): void {
    // TODO: wire up to interview creation flow / router navigation
  }

  onUploadResume(): void {
    // TODO: wire up to resume upload flow
  }

  onEditSkills(): void {
    // TODO: open skills editor
  }
}