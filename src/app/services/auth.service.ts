import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from './app-state.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  authInfo = new BehaviorSubject<User | null>(null);
  authErrorMessage = new Subject<string>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private appStateService: AppStateService
  ) {}

  login(username: string, password: string) {
    this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, {
        username,
        password,
      })
      .subscribe(
        (data) => {
          const loggedInUser: User = {
            ...data,
            expiration: new Date(Date.now() + 1000 * 60 * 60),
          };
          localStorage.setItem('user', JSON.stringify(loggedInUser));
          this.authInfo.next(loggedInUser);
          this.router.navigate(this.appStateService.attemptedRoute);
          this.autoLogout(Date.now() + 1000 * 60 * 60);
        },
        (e) => {
          this.authErrorMessage.next('Unable to log in.');
        }
      );
  }
  autologin() {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;
    const storedData = JSON.parse(storedUser);
    this.authInfo.next(storedData);
    this.autoLogout(new Date(storedData.expiration).getTime() - Date.now());
  }
  logout() {
    this.authInfo.next(null);
    localStorage.removeItem('user');
  }
  autoLogout(time: number) {
    setTimeout(() => {
      this.logout();
    }, time);
  }
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  username: string;
  token: string;
}

export interface User {
  username: string;
  token: string;
  expiration: Date;
}
