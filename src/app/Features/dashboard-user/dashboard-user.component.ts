import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Tone = 'blue' | 'green' | 'orange' | 'purple';

interface StatCard {
  label: string;
  value: string;
  delta: string;
  icon: 'interviews' | 'completed' | 'progress' | 'score';
  tone: Tone;
}

interface ChartPoint {
  day: string;
  value: number;
}

interface UpcomingInterview {
  time: string;
  candidate: string;
  role: string;
  initials: string;
  tone: Tone;
  isNext?: boolean;
}

interface TableRow {
  candidate: string;
  role: string;
  date: string;
  score: string | null;
  status: 'Completed' | 'In Progress';
  initials: string;
  tone: Tone;
}

interface QuickAction {
  title: string;
  description: string;
  icon: 'schedule' | 'candidate' | 'resume' | 'job';
  tone: Tone | 'red';
}

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss',
})
export class DashboardUserComponent {
  readonly firstName = 'Ashwin';
  readonly userName = 'Ashwin Kumar';
  readonly userRole = 'Admin';

  readonly stats: StatCard[] = [
    { label: 'Total Interviews', value: '24', delta: '12% vs last month', icon: 'interviews', tone: 'blue' },
    { label: 'Completed', value: '18', delta: '20% vs last month', icon: 'completed', tone: 'green' },
    { label: 'In Progress', value: '4', delta: '8% vs last month', icon: 'progress', tone: 'orange' },
    { label: 'Average Score', value: '82%', delta: '5% vs last month', icon: 'score', tone: 'purple' },
  ];

  readonly chartData: ChartPoint[] = [
    { day: 'Mon', value: 12 },
    { day: 'Tue', value: 15 },
    { day: 'Wed', value: 9 },
    { day: 'Thu', value: 19 },
    { day: 'Fri', value: 13 },
    { day: 'Sat', value: 11 },
    { day: 'Sun', value: 7 },
  ];

  get chartMax(): number {
    return Math.max(...this.chartData.map((point) => point.value));
  }

  readonly upcomingInterviews: UpcomingInterview[] = [
    { time: '10:30 AM', candidate: 'John Doe', role: 'Senior Angular Developer', initials: 'JD', tone: 'blue', isNext: true },
    { time: '11:30 AM', candidate: 'Sarah Smith', role: 'Python Developer', initials: 'SS', tone: 'purple' },
    { time: '02:00 PM', candidate: 'Rahul Kumar', role: 'Full Stack Developer', initials: 'RK', tone: 'green' },
    { time: '04:00 PM', candidate: 'Anjali Patel', role: 'Data Analyst', initials: 'AP', tone: 'orange' },
  ];

  readonly recentInterviews: TableRow[] = [
    { candidate: 'John Doe', role: 'Angular Developer', date: 'Sep 19, 2026', score: '85%', status: 'Completed', initials: 'JD', tone: 'blue' },
    { candidate: 'Sarah Smith', role: 'Python Developer', date: 'Sep 18, 2026', score: '78%', status: 'Completed', initials: 'SS', tone: 'purple' },
    { candidate: 'Rahul Kumar', role: 'Full Stack Developer', date: 'Sep 18, 2026', score: null, status: 'In Progress', initials: 'RK', tone: 'green' },
    { candidate: 'Anjali Patel', role: 'Data Analyst', date: 'Sep 17, 2026', score: '92%', status: 'Completed', initials: 'AP', tone: 'orange' },
    { candidate: 'Michael Scott', role: 'Backend Developer', date: 'Sep 16, 2026', score: '67%', status: 'Completed', initials: 'MS', tone: 'blue' },
  ];

  readonly quickActions: QuickAction[] = [
    { title: 'Schedule Interview', description: 'Create and schedule a new interview session', icon: 'schedule', tone: 'red' },
    { title: 'Add Candidate', description: 'Add a new candidate to your talent pool', icon: 'candidate', tone: 'blue' },
    { title: 'Upload Resume', description: 'Upload and analyze resumes with AI', icon: 'resume', tone: 'green' },
    { title: 'Create Job', description: 'Create a new job posting and configure interviews', icon: 'job', tone: 'orange' },
  ];

  onStartInterview(row: UpcomingInterview): void {
    // TODO: wire up to interview session route
  }

  onViewInterview(row: TableRow): void {
    // TODO: wire up to interview detail route
  }

  onQuickAction(action: QuickAction): void {
    // TODO: route to the relevant flow per action.icon
  }

  onOpenAssistant(): void {
    // TODO: open AI Interview Assistant panel
  }
}