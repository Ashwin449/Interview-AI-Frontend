import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../Core/Environment/environment';
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  RefreshResponse,
} from '../../Shared/Model/authModel';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly baseUrl = `${environment.apiUrl}/api/auth`;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isTokenValid());
  readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(`${this.baseUrl}/register`, payload)
      .pipe(catchError((err) => this.handleError(err)));
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap((res) => this.storeTokens(res.access_token, res.refresh_token)),
      catchError((err) => this.handleError(err))
    );
  }

  refresh(): Observable<RefreshResponse> {
    const refresh_token = localStorage.getItem(REFRESH_TOKEN_KEY) ?? '';
    return this.http
      .post<RefreshResponse>(`${this.baseUrl}/refresh`, { refresh_token })
      .pipe(
        tap((res) => this.storeTokens(res.access_token, res.refresh_token)),
        catchError((err) => {
          this.signOut();
          return this.handleError(err);
        })
      );
  }

  signOut(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  /** Synchronous, client-side check of JWT expiry (no network call). */
  isTokenValid(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryMs = payload.exp * 1000;
      return Date.now() < expiryMs;
    } catch {
      return false;
    }
  }

  private storeTokens(access_token: string, refresh_token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
    this.isAuthenticatedSubject.next(true);
  }

  private handleError(err: HttpErrorResponse) {
    const message =
      (err.error && (err.error.detail as string)) ||
      'Something went wrong. Please try again.';
    return throwError(() => new Error(message));
  }
}