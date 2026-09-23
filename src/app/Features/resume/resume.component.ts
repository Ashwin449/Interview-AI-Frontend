import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService, ResumeListItem } from '../../Core/Services/resumeSer';

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

const TONE_CYCLE: ReadonlyArray<Tone> = ['blue', 'green', 'orange', 'purple'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB, matches the dropzone hint text
const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

@Component({
  selector: 'app-resumes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumesComponent implements OnInit {
  readonly userName = 'Ashwin Kumar';
  readonly userRole = 'Admin';

  @ViewChild('fileInput') private readonly fileInputRef!: ElementRef<HTMLInputElement>;

  isDragging = false;
  isLoadingResumes = true;
  loadError: string | null = null;

  isUploading = false;
  uploadError: string | null = null;

  readonly analysisPoints: AnalysisPoint[] = [
    { title: 'Personal Information', description: 'Name, contact info and self-summary', icon: 'user', tone: 'blue' },
    { title: 'Skills', description: 'Technical and soft skills', icon: 'skills', tone: 'purple' },
    { title: 'Experience', description: 'Work history and responsibilities', icon: 'experience', tone: 'green' },
    { title: 'Education', description: 'Degrees and certifications', icon: 'education', tone: 'orange' },
    { title: 'Interview Blueprint', description: 'Custom questions based on their profile', icon: 'blueprint', tone: 'blue' },
  ];

  recentResumes: ResumeRow[] = [];

  constructor(private readonly resumeService: ResumeService) {}

  ngOnInit(): void {
    this.loadResumes();
  }

  private loadResumes(): void {
    this.isLoadingResumes = true;
    this.loadError = null;

    this.resumeService.list(0, 50).subscribe({
      next: (response) => {
        this.recentResumes = response.items.map((item, index) => this.mapResumeItem(item, index));
        this.isLoadingResumes = false;
      },
      error: () => {
        this.isLoadingResumes = false;
        this.loadError = 'Could not load recent resumes. Please try again.';
      },
    });
  }

  // NOTE: field names here (candidate_name, file_name, uploaded_at) are a best
  // guess since /api/resumes returned an empty list while testing. Update this
  // mapping to match the real item shape once resumes start coming back.
  private mapResumeItem(item: ResumeListItem, index: number): ResumeRow {
    const candidate = item.candidate_name ?? 'Unknown Candidate';
    return {
      candidate,
      fileName: item.file_name ?? '—',
      uploadedOn: item.uploaded_at ? this.formatDate(item.uploaded_at) : '—',
      status: item.status === 'Processing' ? 'Processing' : 'Analyzed',
      initials: this.toInitials(candidate),
      tone: TONE_CYCLE[index % TONE_CYCLE.length],
    };
  }

  private formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) {
      return isoDate;
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  private toInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  }

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
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }

  onChooseFile(): void {
    this.fileInputRef.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.handleFile(file);
    }
    // reset so selecting the same file again still fires a change event
    input.value = '';
  }

  private handleFile(file: File): void {
    this.uploadError = null;

    const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      this.uploadError = 'Unsupported file type. Please upload a PDF, DOC, or DOCX file.';
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      this.uploadError = 'File is too large. Max size is 10 MB.';
      return;
    }

    this.isUploading = true;
    this.resumeService.upload(file).subscribe({
      next: () => {
        this.isUploading = false;
        this.loadResumes();
      },
      error: (err) => {
        this.isUploading = false;
        // The backend currently rejects this endpoint for an ADMIN-role token
        // (403: "Requires one of roles: USER") — see note in the chat reply.
        this.uploadError =
          err?.status === 403
            ? 'Upload was rejected by the server (403 Forbidden). This looks like a role-permission issue on the backend, not the frontend — check which roles /api/resumes/upload accepts.'
            : 'Upload failed. Please try again.';
      },
    });
  }

  onViewResume(row: ResumeRow): void {
    // TODO: navigate to resume detail / extracted profile view
  }
}