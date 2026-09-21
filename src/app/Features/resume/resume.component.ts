import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Tone = 'blue' | 'green' | 'orange' | 'purple';

interface AnalysisPoint {
  title: string;
  description: string;
  icon: 'user' | 'skills' | 'experience' | 'education' | 'blueprint';
  tone: Tone;
}

interface ResumeRow {
  candidate: string;
  fileName: string;
  uploadedOn: string;
  status: 'Analyzed' | 'Processing';
  initials: string;
  tone: Tone;
}

@Component({
  selector: 'app-resumes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})


export class ResumesComponent {
  readonly userName = 'Ashwin Kumar';
  readonly userRole = 'Admin';

  isDragging = false;

  readonly analysisPoints: AnalysisPoint[] = [
    { title: 'Personal Information', description: 'Name, contact info and self-summary', icon: 'user', tone: 'blue' },
    { title: 'Skills', description: 'Technical and soft skills', icon: 'skills', tone: 'purple' },
    { title: 'Experience', description: 'Work history and responsibilities', icon: 'experience', tone: 'green' },
    { title: 'Education', description: 'Degrees and certifications', icon: 'education', tone: 'orange' },
    { title: 'Interview Blueprint', description: 'Custom questions based on their profile', icon: 'blueprint', tone: 'blue' },
  ];

  readonly recentResumes: ResumeRow[] = [
    { candidate: 'Rahul Sharma', fileName: 'rahul_sharma.pdf', uploadedOn: 'Sep 19, 2026', status: 'Analyzed', initials: 'RS', tone: 'blue' },
    { candidate: 'Priya Mehta', fileName: 'priya_mehta.docx', uploadedOn: 'Sep 18, 2026', status: 'Analyzed', initials: 'PM', tone: 'purple' },
    { candidate: 'Amit Verma', fileName: 'amit_verma.pdf', uploadedOn: 'Sep 17, 2026', status: 'Processing', initials: 'AV', tone: 'orange' },
    { candidate: 'Sneha Kapoor', fileName: 'sneha_kapoor.pdf', uploadedOn: 'Sep 16, 2026', status: 'Analyzed', initials: 'SK', tone: 'green' },
  ];

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(): void {
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    // TODO: handle dropped file(s) from event.dataTransfer?.files
  }

  onChooseFile(): void {
    // TODO: open native file picker and hand off to upload/analysis flow
  }

  onViewResume(row: ResumeRow): void {
    // TODO: navigate to resume detail / extracted profile view
  }
}