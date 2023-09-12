import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('running interceptor');
    return this.authService.authInfo.pipe(
      take(1),
      exhaustMap((authInfo) => {
        if (!authInfo) return next.handle(req);
        const addedReq = req.clone({
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${authInfo.token}`
          ),
        });
        return next.handle(addedReq);
      })
    );
  }
}
