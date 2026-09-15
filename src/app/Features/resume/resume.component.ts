import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ExtractedSkill {
  name: string;
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent {
  readonly hasResume = true;
  readonly fileName = 'alex_johnson_resume.pdf';
  readonly uploadedOn = 'Uploaded 3 days ago';

  readonly extractedSkills: ExtractedSkill[] = [
    { name: 'Angular' },
    { name: 'FastAPI' },
    { name: 'PostgreSQL' },
    { name: 'REST APIs' },
    { name: 'Docker' },
    { name: 'Git' },
  ];

  onUploadNew(): void {
    // TODO: open file picker and send to resume-parsing endpoint
  }

  onRemove(): void {
    // TODO: confirm and remove the stored resume
  }
}