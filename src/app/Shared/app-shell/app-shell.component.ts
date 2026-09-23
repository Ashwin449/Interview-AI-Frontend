import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon: 'home' | 'mic' | 'users' | 'file' | 'briefcase' | 'check-circle' | 'user' | 'bar-chart' | 'settings';
}

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  readonly navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'home' },
    { label: 'Interviews', route: '/interviews', icon: 'mic' },
    { label: 'Candidates', route: '/candidates', icon: 'users' },
    { label: 'Resumes', route: '/resume', icon: 'file' },
    { label: 'Jobs', route: '/jobs', icon: 'briefcase' },
    { label: 'Assessments', route: '/assessments', icon: 'check-circle' },
    { label: 'Users', route: '/users', icon: 'user' },
    { label: 'Reports', route: '/reports', icon: 'bar-chart' },
    { label: 'Settings', route: '/settings', icon: 'settings' },
  ];
}