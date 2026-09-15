import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon: 'home' | 'file' | 'mic' | 'check-circle' | 'user';
}

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})

export class AppShellComponent {
  readonly navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'home' },
    { label: 'Resume', route: '/resume', icon: 'file' },
    { label: 'Interviews', route: '/interviews', icon: 'mic' },
    { label: 'Results', route: '/results', icon: 'check-circle' },
    { label: 'Profile', route: '/profile', icon: 'user' },
  ];
}