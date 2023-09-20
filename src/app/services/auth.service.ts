import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from './app-state.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Collection } from '../components/collections/my-collections/my-collections.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from '../util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  util = Util;
  private baseUrl = `${this.util.BASE_URL}/api/auth`;
  authInfo = new BehaviorSubject<User | null>(null);
  authErrorMessage = new Subject<string>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private appStateService: AppStateService,
    private snackBar: MatSnackBar
  ) {}

  signup(username: string, password: string) {
    this.http
      .post<string>(`${this.baseUrl}/signup`, { username, password })
      .subscribe(
        (data) => {
          this.login(username, password);
        },
        (e) => {
          this.authErrorMessage.next(e.error || 'An error occured.');
        }
      );
  }
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
          this.appStateService.setLoginLoading(false);
          this.router.navigate(this.appStateService.attemptedRoute);
          this.autoLogout(1000 * 60 * 60);
          this.snackBar.open(
            `${loggedInUser.username} successfully logged in!`,
            'Close',
            {
              duration: 5000,
            }
          );
        },
        (e) => {
          this.authErrorMessage.next(e.error || 'An error occured');
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
    this.router.navigate(['/home']);
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
