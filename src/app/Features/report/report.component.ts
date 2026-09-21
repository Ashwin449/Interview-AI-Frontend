
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Tone = 'blue' | 'green' | 'orange' | 'purple';

interface StatCard {
  label: string;
  value: string;
  icon: 'briefcase' | 'completed' | 'score' | 'hired';
  tone: Tone;
}

interface WeekPoint {
  label: string;
  interviews: number;
  avgScore: number;
}

interface StatusSlice {
  label: string;
  percent: number;
  tone: Tone;
}

interface SkillBar {
  name: string;
  percent: number;
}

interface FeedbackItem {
  name: string;
  initials: string;
  tone: Tone;
  date: string;
  quote: string;
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  readonly userName = 'Ashwin Kumar';
  readonly userRole = 'Admin';
  readonly dateRange = 'Sep 01, 2026 - Sep 30, 2026';

  readonly stats: StatCard[] = [
    { label: 'Total Interviews', value: '24', icon: 'briefcase', tone: 'blue' },
    { label: 'Completed', value: '18', icon: 'completed', tone: 'green' },
    { label: 'Average Score', value: '82%', icon: 'score', tone: 'purple' },
    { label: 'Hired Candidates', value: '6', icon: 'hired', tone: 'orange' },
  ];

  readonly weeklyPerformance: WeekPoint[] = [
    { label: 'Week 1', interviews: 5, avgScore: 74 },
    { label: 'Week 2', interviews: 6, avgScore: 77 },
    { label: 'Week 3', interviews: 7, avgScore: 80 },
    { label: 'Week 4', interviews: 6, avgScore: 82 },
  ];

  readonly statusSlices: StatusSlice[] = [
    { label: 'Completed', percent: 60, tone: 'green' },
    { label: 'In Progress', percent: 15, tone: 'orange' },
    { label: 'Scheduled', percent: 15, tone: 'blue' },
    { label: 'Cancelled', percent: 10, tone: 'purple' },
  ];

  readonly topSkills: SkillBar[] = [
    { name: 'Angular', percent: 82 },
    { name: 'Python', percent: 75 },
    { name: 'JavaScript', percent: 71 },
    { name: 'SQL', percent: 68 },
    { name: 'Communication', percent: 65 },
  ];

  readonly feedback: FeedbackItem[] = [
    { name: 'John Doe', initials: 'JD', tone: 'blue', date: 'Sep 20, 2026', quote: 'Strong problem-solving skills and communicated clearly throughout.' },
    { name: 'Sarah Smith', initials: 'SS', tone: 'purple', date: 'Sep 18, 2026', quote: 'Solid technical knowledge, could improve on system design depth.' },
    { name: 'Rahul Kumar', initials: 'RK', tone: 'green', date: 'Sep 17, 2026', quote: 'Confident candidate overall — strongly recommended for the next round.' },
  ];

  readonly totalCandidates = 24;

  get donutSegments(): Array<StatusSlice & { dashArray: string; dashOffset: number }> {
    const circumference = 2 * Math.PI * 40; // r = 40
    let cumulative = 0;
    return this.statusSlices.map((slice) => {
      const length = (slice.percent / 100) * circumference;
      const segment = {
        ...slice,
        dashArray: `${length} ${circumference - length}`,
        dashOffset: -((cumulative / 100) * circumference),
      };
      cumulative += slice.percent;
      return segment;
    });
  }

  get maxInterviews(): number {
    return Math.max(...this.weeklyPerformance.map((point) => point.interviews));
  }

  get maxScore(): number {
    return Math.max(...this.weeklyPerformance.map((point) => point.avgScore));
  }

  private toPoints(values: number[], max: number): string {
    const width = 360;
    const height = 140;
    const step = width / (values.length - 1);
    return values
      .map((value, index) => {
        const x = index * step;
        const y = height - (value / max) * height;
        return `${x},${y}`;
      })
      .join(' ');
  }

  get interviewsLinePoints(): string {
    return this.toPoints(
      this.weeklyPerformance.map((point) => point.interviews),
      this.maxInterviews
    );
  }

  get scoreLinePoints(): string {
    return this.toPoints(
      this.weeklyPerformance.map((point) => point.avgScore),
      this.maxScore
    );
  }

  onExport(): void {
    // TODO: export current report range as PDF/CSV
  }
}