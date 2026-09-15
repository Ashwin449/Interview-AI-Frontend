import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ResultEntry {
  title: string;
  score: number;
  date: string;
  strengths: string[];
  improve: string[];
}

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {
  readonly results: ResultEntry[] = [
    {
      title: 'Backend interview',
      score: 82,
      date: '2 days ago',
      strengths: ['Clear explanation of database indexing', 'Solid grasp of async request handling'],
      improve: ['Slow to structure the system-design answer'],
    },
    {
      title: 'Frontend interview',
      score: 76,
      date: '1 week ago',
      strengths: ['Strong understanding of change detection'],
      improve: ['Missed edge cases in the state-management question', 'Rushed the accessibility follow-up'],
    },
    {
      title: 'System design',
      score: 68,
      date: '1 week ago',
      strengths: ['Good instinct for identifying bottlenecks'],
      improve: ['Needs a clearer framework for trade-off discussions', 'Underestimated data volume in the estimate'],
    },
  ];
}