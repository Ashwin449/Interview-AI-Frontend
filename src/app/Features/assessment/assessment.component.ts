
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.scss'
})

type Tone = 'blue' | 'green' | 'orange' | 'purple';
type FilterTab = 'All Assessments' | 'Technical' | 'Behavioral' | 'Custom';

interface StatCard {
  label: string;
  value: string;
  icon: 'list' | 'active' | 'attempts' | 'score';
  tone: Tone;
}

interface AssessmentRow {
  name: string;
  type: 'Technical' | 'Behavioral';
  questions: number;
  duration: string;
  status: 'Active' | 'Inactive';
  createdOn: string;
}



export class AssessmentComponent {
  readonly userName = 'Ashwin Kumar';
  readonly userRole = 'Admin';

  readonly tabs: FilterTab[] = ['All Assessments', 'Technical', 'Behavioral', 'Custom'];
  activeTab: FilterTab = 'All Assessments';

  readonly stats: StatCard[] = [
    { label: 'Total Assessments', value: '12', icon: 'list', tone: 'blue' },
    { label: 'Active Assessments', value: '8', icon: 'active', tone: 'green' },
    { label: 'Total Attempts', value: '256', icon: 'attempts', tone: 'orange' },
    { label: 'Average Score', value: '78%', icon: 'score', tone: 'purple' },
  ];

  readonly assessments: AssessmentRow[] = [
    { name: 'Angular Developer Assessment', type: 'Technical', questions: 25, duration: '45 min', status: 'Active', createdOn: 'Sep 15, 2026' },
    { name: 'Python Developer Assessment', type: 'Technical', questions: 30, duration: '60 min', status: 'Active', createdOn: 'Sep 14, 2026' },
    { name: 'Behavioral Skills Assessment', type: 'Behavioral', questions: 15, duration: '30 min', status: 'Active', createdOn: 'Sep 12, 2026' },
    { name: 'Full Stack Developer Test', type: 'Technical', questions: 35, duration: '75 min', status: 'Inactive', createdOn: 'Sep 10, 2026' },
    { name: 'Data Analyst Assessment', type: 'Technical', questions: 25, duration: '45 min', status: 'Active', createdOn: 'Sep 08, 2026' },
  ];

  get filteredAssessments(): AssessmentRow[] {
    if (this.activeTab === 'All Assessments' || this.activeTab === 'Custom') {
      return this.assessments;
    }
    return this.assessments.filter((row) => row.type === this.activeTab);
  }

  onSetTab(tab: FilterTab): void {
    this.activeTab = tab;
  }

  onCreateAssessment(): void {
    // TODO: open assessment builder flow
  }

  onStartAssessment(row: AssessmentRow): void {
    // TODO: launch assessment
  }

  onGenerateWithAi(): void {
    // TODO: open AI-powered assessment generator
  }
}