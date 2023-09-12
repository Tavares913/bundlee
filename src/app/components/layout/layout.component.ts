import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state.service';
import { AuthService, User } from 'src/app/services/auth.service';
import { Theme } from 'src/app/theme';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  theme = Theme;

  authInfo: User | null = null;
  authInfoSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private authService: AuthService,
    private appStateService: AppStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.autologin();
    this.authInfoSubscription = this.authService.authInfo.subscribe((data) => {
      this.authInfo = data;
    });
  }
  ngOnDestroy(): void {
    this.authInfoSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
  goToRegisterOrLogin(option: string) {
    if (option === 'register') {
      this.appStateService.setResgister(true);
      this.router.navigate(['/login']);
    }
    if (option === 'login') {
      this.appStateService.setResgister(false);
      this.router.navigate(['/login']);
    }
  }
}
