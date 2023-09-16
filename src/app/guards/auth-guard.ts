import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppStateService } from '../services/app-state.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private appStateService: AppStateService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.authInfo.pipe(
      take(1),
      map((authInfo) => {
        if (authInfo) return true;
        const triedRoute = route.url.toString();
        this.appStateService.attemptedRoute = [`${triedRoute}`];
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
