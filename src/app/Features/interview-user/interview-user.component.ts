import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface InterviewStage {
  label: string;
  status: 'complete' | 'active' | 'upcoming';
}

type Tone = 'blue' | 'green' | 'orange' | 'purple';
type FilterTab = 'All Interviews' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';

interface StatCard {
  label: string;
  value: string;
  icon: 'briefcase' | 'completed' | 'progress' | 'cancelled';
  tone: Tone;
}

interface InterviewRow {
  candidate: string;
  role: string;
  type: string;
  dateTime: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  initials: string;
  tone: Tone;
}

@Component({
  selector: 'app-interviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interview-user.component.html',
  styleUrl: './interview-user.component.scss',
})
export class InterviewUserComponent {
  readonly userName = 'Ashwin Kumar';
  readonly userRole = 'Admin';

  readonly tabs: FilterTab[] = ['All Interviews', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'];
  activeTab: FilterTab = 'All Interviews';
  searchTerm = '';

  readonly stats: StatCard[] = [
    { label: 'Total Interviews', value: '24', icon: 'briefcase', tone: 'blue' },
    { label: 'Completed', value: '18', icon: 'completed', tone: 'green' },
    { label: 'In Progress', value: '4', icon: 'progress', tone: 'orange' },
    { label: 'Cancelled', value: '2', icon: 'cancelled', tone: 'purple' },
  ];

  readonly interviews: InterviewRow[] = [
    { candidate: 'John Doe', role: 'Angular Developer', type: 'Technical', dateTime: 'Sep 20, 2026 · 10:30 AM', status: 'Scheduled', initials: 'JD', tone: 'blue' },
    { candidate: 'Sarah Smith', role: 'Python Developer', type: 'Technical', dateTime: 'Sep 20, 2026 · 02:00 PM', status: 'In Progress', initials: 'SS', tone: 'purple' },
    { candidate: 'Rahul Kumar', role: 'Full Stack Developer', type: 'Technical', dateTime: 'Sep 18, 2026 · 11:00 AM', status: 'Completed', initials: 'RK', tone: 'green' },
    { candidate: 'Anjali Patel', role: 'Data Analyst', type: 'Technical', dateTime: 'Sep 17, 2026 · 03:30 PM', status: 'Completed', initials: 'AP', tone: 'orange' },
    { candidate: 'Michael Scott', role: 'Backend Developer', type: 'Technical', dateTime: 'Sep 16, 2026 · 01:00 PM', status: 'Cancelled', initials: 'MS', tone: 'blue' },
  ];

  get filteredInterviews(): InterviewRow[] {
    let rows = this.interviews;
    if (this.activeTab !== 'All Interviews') {
      rows = rows.filter((row) => row.status === this.activeTab);
    }
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.trim().toLowerCase();
      rows = rows.filter(
        (row) => row.candidate.toLowerCase().includes(term) || row.role.toLowerCase().includes(term)
      );
    }
    return rows;
  }

  onSetTab(tab: FilterTab): void {
    this.activeTab = tab;
  }

  onScheduleInterview(): void {
    // TODO: open schedule-interview flow
  }

  onViewInterview(row: InterviewRow): void {
    // TODO: navigate to interview detail / session
  }

  onStartAiInterview(): void {
    // TODO: launch AI-assisted live interview
  }
}