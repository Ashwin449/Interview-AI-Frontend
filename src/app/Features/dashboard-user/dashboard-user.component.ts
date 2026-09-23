import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardSummary } from '../../Core/Services/dashboardSer';
import { AuthService, CurrentUser } from '../../Core/Services/authSer';

type Tone = 'blue' | 'green' | 'orange' | 'purple';

interface StatCard {
  label: string;
  value: string;
  delta?: string;
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

// Static shell for each stat card — the backend only sends the numbers
// (total_interviews, completed, in_progress, average_score), so label/icon/tone
// stay defined here and just get their value filled in from the API response.
const STAT_CARD_CONFIG: ReadonlyArray<{
  key: keyof Pick<DashboardSummary, 'total_interviews' | 'completed' | 'in_progress' | 'average_score'>;
  label: string;
  icon: StatCard['icon'];
  tone: Tone;
  suffix?: string;
}> = [
  { key: 'total_interviews', label: 'Total Interviews', icon: 'interviews', tone: 'blue' },
  { key: 'completed', label: 'Completed', icon: 'completed', tone: 'green' },
  { key: 'in_progress', label: 'In Progress', icon: 'progress', tone: 'orange' },
  { key: 'average_score', label: 'Average Score', icon: 'score', tone: 'purple', suffix: '%' },
];

const TONE_CYCLE: ReadonlyArray<Tone> = ['blue', 'green', 'orange', 'purple'];

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss',
})
export class DashboardUserComponent implements OnInit {
  // Identity fields — populated from GET /api/auth/me, no static values.
  firstName = '';
  userName = '';
  userRole = '';
  userInitials = '';

  isLoading = true;
  loadError: string | null = null;

  stats: StatCard[] = STAT_CARD_CONFIG.map((cfg) => ({
    label: cfg.label,
    value: '—',
    icon: cfg.icon,
    tone: cfg.tone,
  }));

  chartData: ChartPoint[] = [];
  upcomingInterviews: UpcomingInterview[] = [];
  recentInterviews: TableRow[] = [];

  get chartMax(): number {
    if (!this.chartData.length) {
      return 1;
    }
    return Math.max(...this.chartData.map((point) => point.value), 1);
  }

  readonly quickActions: QuickAction[] = [
    { title: 'Schedule Interview', description: 'Create and schedule a new interview session', icon: 'schedule', tone: 'red' },
    { title: 'Add Candidate', description: 'Add a new candidate to your talent pool', icon: 'candidate', tone: 'blue' },
    { title: 'Upload Resume', description: 'Upload and analyze resumes with AI', icon: 'resume', tone: 'green' },
    { title: 'Create Job', description: 'Create a new job posting and configure interviews', icon: 'job', tone: 'orange' },
  ];

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadSummary();
  }

  private loadCurrentUser(): void {
    this.authService.getMe().subscribe({
      next: (user) => this.applyCurrentUser(user),
      error: () => {
        // Leave identity fields blank rather than showing fake data.
      },
    });
  }

  private applyCurrentUser(user: CurrentUser): void {
    this.firstName = user.first_name;
    this.userName = `${user.first_name} ${user.last_name}`.trim();
    this.userRole = user.roles?.[0] ?? '';
    this.userInitials = this.toInitials(this.userName);
  }

  private loadSummary(): void {
    this.isLoading = true;
    this.loadError = null;

    this.dashboardService.getSummary().subscribe({
      next: (summary) => this.applySummary(summary),
      error: () => {
        this.isLoading = false;
        this.loadError = 'Could not load dashboard data. Please try again.';
      },
    });
  }

  private applySummary(summary: DashboardSummary): void {
    this.stats = STAT_CARD_CONFIG.map((cfg) => {
      const raw = summary[cfg.key];
      const value = raw === null || raw === undefined ? '—' : `${raw}${cfg.suffix ?? ''}`;
      return { label: cfg.label, value, icon: cfg.icon, tone: cfg.tone };
    });

    this.chartData = (summary.activity ?? []).map((point) => ({
      day: point.day_label,
      value: point.count,
    }));

    this.upcomingInterviews = (summary.upcoming_interviews ?? []).map((item, index) => ({
      time: item.time,
      candidate: item.candidate,
      role: item.role,
      initials: item.initials ?? this.toInitials(item.candidate),
      tone: this.toneForIndex(index),
      isNext: item.is_next ?? index === 0,
    }));

    this.recentInterviews = (summary.recent_interviews ?? []).map((item, index) => ({
      candidate: item.candidate,
      role: item.role,
      date: item.date,
      score: item.score === null || item.score === undefined ? null : String(item.score),
      status: item.status === 'In Progress' ? 'In Progress' : 'Completed',
      initials: item.initials ?? this.toInitials(item.candidate),
      tone: this.toneForIndex(index),
    }));

    this.isLoading = false;
  }

  private toInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  }

  private toneForIndex(index: number): Tone {
    return TONE_CYCLE[index % TONE_CYCLE.length];
  }

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