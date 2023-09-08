import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
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
  loginErrorSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginErrorSubscription = this.authService.authErrorMessage.subscribe(
      (data) => {
        this.snackBar.open(data, 'Close', {
          duration: 5000,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.loginErrorSubscription.unsubscribe();
  }

  submitLogin() {
    this.authService.login(this.username, this.password);
  }
}
