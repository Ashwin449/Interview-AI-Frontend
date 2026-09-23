import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../app/Core/Environment/environment';

export interface DashboardActivityPoint {
  date: string;
  day_label: string;
  count: number;
}

// NOTE: the sample response you shared had empty arrays for these two, so the
// exact field names below are a best guess based on the mock data the UI used
// to render. Adjust the field names in DashboardService's mapping (or here) once
// you see a real non-empty payload from the backend.
export interface DashboardUpcomingInterview {
  candidate: string;
  role: string;
  time: string;
  initials?: string;
  is_next?: boolean;
}

export interface DashboardRecentInterview {
  candidate: string;
  role: string;
  date: string;
  score: number | string | null;
  status: string;
  initials?: string;
}

export interface DashboardSummary {
  total_interviews: number;
  completed: number;
  in_progress: number;
  scheduled: number;
  cancelled: number;
  average_score: number | null;
  activity: DashboardActivityPoint[];
  upcoming_interviews: DashboardUpcomingInterview[];
  recent_interviews: DashboardRecentInterview[];
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly baseUrl = `${environment.apiUrl}/dashboard`;

  constructor(private readonly http: HttpClient) {}

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.baseUrl}/summary`);
  }
}