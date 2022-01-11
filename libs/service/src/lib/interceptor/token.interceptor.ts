import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  exhaustMap,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AppState } from '../+state/app.store';
import { select, Store } from '@ngrx/store';
import * as auth from '../+state/auth/auth.selectors';
import { AuthService } from '../+state/auth/auth.service';
import { RefreshTokenResponse } from '../+state/auth';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // check  login / refresh token api
    if (request.url.includes('refreshtoken') || request.url.includes('login')) {
      if (request.url.includes('refreshtoken')) {
        return next.handle(request).pipe(catchError(this.errorHandler));
      }
      return next.handle(request);
    }
    return this.sendRequest(request, next, true);
  }

  private attachSession(
    request: HttpRequest<unknown>,
    token: string
  ): HttpRequest<unknown> {
    const headers = request.headers.set('X-Token', token);
    return request.clone({ headers });
  }

  private handleAuthErrors(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap(
          (
            refreshTokenResponse: RefreshTokenResponse
          ): Observable<HttpEvent<unknown>> => {
            this.isTokenRefreshing = false;
            this.refreshTokenSubject.next(refreshTokenResponse.accessToken);
            return next.handle(
              this.attachSession(request, refreshTokenResponse.accessToken)
            );
          }
        ),
        catchError(
          (error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
            this.isTokenRefreshing = false;
            this.refreshTokenSubject.next(null);
            return this.errorHandler(error);
          }
        )
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((result) => result !== null),
        take(1),
        switchMap((): Observable<HttpEvent<any>> => {
          return this.sendRequest(request, next);
        })
      );
    }
  }

  private errorHandler(
    error: HttpErrorResponse
  ): Observable<HttpEvent<string>> {
    const err = new Error(error.error.message || '');
    return throwError(() => err);
  }

  private sendRequest(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    handleError = false
  ): Observable<HttpEvent<unknown>> {
    return this.store.pipe(
      take(1),
      select(auth.getSession),
      exhaustMap((token) => {
        if (!token) {
          return next.handle(request);
        }
        return next.handle(this.attachSession(request, token)).pipe(
          catchError(
            (error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
              if (error.status === 401 && handleError) {
                return this.handleAuthErrors(request, next);
              } else {
                return throwError(() => error);
              }
            }
          )
        );
      })
    );
  }
}
