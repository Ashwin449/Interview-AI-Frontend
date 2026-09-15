import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProfileField {
  label: string;
  value: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  readonly userName = 'Alex Johnson';
  readonly email = 'alex.johnson@example.com';
  readonly targetRole = 'Frontend Engineer';

  readonly fields: ProfileField[] = [
    { label: 'Full name', value: this.userName },
    { label: 'Email', value: this.email },
    { label: 'Target role', value: this.targetRole },
  ];

  onEditProfile(): void {
    // TODO: open profile edit form
  }

  onSignOut(): void {
    // TODO: wire up to auth service sign-out
  }
}