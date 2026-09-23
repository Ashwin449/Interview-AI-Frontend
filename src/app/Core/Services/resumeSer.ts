import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../app/Core/Environment/environment';

// NOTE: /api/resumes returned { items: [], total: 0 } with nothing in it while
// testing, so the field names on ResumeListItem are a best guess based on the
// mock table columns (candidate, file, uploaded on, status). Confirm/adjust
// these against a real item once at least one resume has been uploaded and
// analyzed.
export interface ResumeListItem {
  id: string;
  candidate_name?: string;
  file_name?: string;
  uploaded_at?: string;
  status?: 'Analyzed' | 'Processing' | string;
}

export interface ResumeListResponse {
  items: ResumeListItem[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private readonly baseUrl = `${environment.apiUrl}/resumes`;

  constructor(private readonly http: HttpClient) {}

  list(skip = 0, limit = 50): Observable<ResumeListResponse> {
    const params = new HttpParams().set('skip', skip).set('limit', limit);
    return this.http.get<ResumeListResponse>(this.baseUrl, { params });
  }

  upload(file: File): Observable<ResumeListItem> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ResumeListItem>(`${this.baseUrl}/upload`, formData);
  }
}