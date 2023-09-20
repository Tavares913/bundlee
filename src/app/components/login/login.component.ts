import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state.service';
import { AuthService } from 'src/app/services/auth.service';
import { Theme } from 'src/app/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  theme = Theme;
  username: string = '';
  password: string = '';
  register: boolean = false;
  loading: boolean = true;
  loginErrorSubscription: Subscription = Subscription.EMPTY;
  registerSubscription: Subscription = Subscription.EMPTY;
  loginLoadingSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private appStateService: AppStateService
  ) {}

  ngOnInit(): void {
    this.loginErrorSubscription = this.authService.authErrorMessage.subscribe(
      (data) => {
        this.snackBar.open(data, 'Close', {
          duration: 5000,
        });
      }
    );
    this.registerSubscription = this.appStateService.register.subscribe(
      (data) => {
        this.register = data;
      }
    );
    this.loginLoadingSubscription = this.appStateService.loginLoading.subscribe(
      (data) => {
        this.loading = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.loginErrorSubscription.unsubscribe();
    this.registerSubscription.unsubscribe();
    this.loginLoadingSubscription.unsubscribe();
  }

  regOrLogin() {
    this.appStateService.setLoginLoading(true);
    if (this.register) {
      this.authService.signup(this.username, this.password);
    } else {
      this.authService.login(this.username, this.password);
    }
  }
}
