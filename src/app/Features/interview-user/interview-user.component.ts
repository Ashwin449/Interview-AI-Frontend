import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface InterviewStage {
  label: string;
  status: 'complete' | 'active' | 'upcoming';
}

@Component({
  selector: 'app-interview-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './interview-user.component.html',
  styleUrl: './interview-user.component.scss'
})

export class InterviewUserComponent implements OnInit, OnDestroy {
  readonly interviewTitle = 'Angular Developer Interview';
  readonly currentQuestionIndex = 3;
  readonly totalQuestions = 10;

  readonly stages: InterviewStage[] = [
    { label: 'Introduction', status: 'complete' },
    { label: 'Angular Concepts', status: 'active' },
    { label: 'Hands-on Scenario', status: 'upcoming' },
    { label: 'Problem Solving', status: 'upcoming' },
    { label: 'Wrap Up', status: 'upcoming' },
  ];

  readonly currentQuestion =
    "Explain Angular's change detection mechanism. How does it work and when would you use OnPush strategy?";

  isMuted = false;
  isVideoOn = true;
  isRecording = true;
  recordingSeconds = 42;

  private timerHandle?: ReturnType<typeof setInterval>;

  get progressPercent(): number {
    return (this.currentQuestionIndex / this.totalQuestions) * 100;
  }

  get timeRemainingLabel(): string {
    const totalSeconds = 24 * 60 + 12;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  get recordingLabel(): string {
    const minutes = Math.floor(this.recordingSeconds / 60);
    const seconds = this.recordingSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  ngOnInit(): void {
    this.timerHandle = setInterval(() => {
      this.recordingSeconds += 1;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerHandle) {
      clearInterval(this.timerHandle);
    }
  }

  onListenAgain(): void {
    // TODO: replay the TTS audio for the current question
  }

  onToggleMute(): void {
    this.isMuted = !this.isMuted;
  }

  onToggleVideo(): void {
    this.isVideoOn = !this.isVideoOn;
  }

  onEndAnswer(): void {
    // TODO: submit current answer and advance to next question
  }

  onExitInterview(): void {
    // TODO: confirm and navigate back to dashboard
  }
}